"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { alreadyProcessed, deliverLead, forgetKey, leadSchema, rateLimited } from "@/lib/leads";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  values?: Record<string, string | string[]>;
};

const MIN_FILL_MS = 3000;

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const now = Date.now();
  const raw = {
    name: formData.get("name"),
    company: formData.get("company"),
    businessType: formData.get("businessType"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location") || undefined,
    employees: formData.get("employees") ?? "",
    interests: formData.getAll("interests"),
    existingSoftware: formData.get("existingSoftware") || undefined,
    summary: formData.get("summary"),
    budget: formData.get("budget") ?? "",
    timeline: formData.get("timeline") ?? "",
    contactMethod: formData.get("contactMethod"),
    consent: formData.get("consent"),
    intent: formData.get("intent") || "project",
  };
  // Echo back non-sensitive values so the form can be repopulated after an error.
  const values: Record<string, string | string[]> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string") values[k] = v;
    else if (Array.isArray(v)) values[k] = v.filter((x): x is string => typeof x === "string");
  }

  // Spam: honeypot + minimum time on form. Respond as success so bots learn nothing.
  const startedAt = Number(formData.get("startedAt"));
  if (formData.get("website") || !startedAt || now - startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip, now)) {
    return { status: "error", message: "Too many submissions from this connection. Please wait a few minutes or contact us directly.", values };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const key = String(formData.get("idempotencyKey") ?? "");
  const id = /^[\w-]{8,64}$/.test(key) ? key : crypto.randomUUID();
  if (alreadyProcessed(id, now)) return { status: "success" };

  const ok = await deliverLead({
    ...parsed.data,
    id,
    receivedAt: new Date(now).toISOString(),
    userAgent: h.get("user-agent")?.slice(0, 300) ?? undefined,
  });

  if (!ok) {
    forgetKey(id);
    return { status: "error", message: "We could not send your inquiry. Please try again or contact us directly.", values };
  }
  return { status: "success" };
}
