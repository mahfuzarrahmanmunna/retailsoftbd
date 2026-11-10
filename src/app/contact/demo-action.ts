"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { alreadyProcessed, deliverLead, demoSchema, forgetKey, rateLimited } from "@/lib/leads";

export type DemoState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  values?: Record<string, string>;
};

const MIN_FILL_MS = 2500;

/** Handles the "Get a Demo" popup. Same spam/rate-limit/delivery path as the full contact form. */
export async function submitDemo(_prev: DemoState, formData: FormData): Promise<DemoState> {
  const now = Date.now();
  const keys = ["name", "phone", "email", "businessName", "businessType", "need", "location", "contactMethod", "message", "page"] as const;
  const values: Record<string, string> = {};
  for (const k of keys) {
    const v = formData.get(k);
    if (typeof v === "string") values[k] = v;
  }

  // Honeypot + minimum time with the popup open. Bots get a fake success.
  const startedAt = Number(formData.get("startedAt"));
  if (formData.get("website") || !startedAt || now - startedAt < MIN_FILL_MS) return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip, now)) {
    return { status: "error", message: "Too many requests. Please wait a few minutes, or call / WhatsApp us directly.", values };
  }

  const parsed = demoSchema.safeParse(values);
  if (!parsed.success) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const key = String(formData.get("idempotencyKey") ?? "");
  const id = /^[\w-]{8,64}$/.test(key) ? key : crypto.randomUUID();
  if (alreadyProcessed(id, now)) return { status: "success" };

  const ok = await deliverLead({
    ...parsed.data,
    intent: "demo-popup",
    id,
    receivedAt: new Date(now).toISOString(),
    userAgent: h.get("user-agent")?.slice(0, 300) ?? undefined,
  });
  if (!ok) {
    forgetKey(id);
    return { status: "error", message: "Sorry, we couldn't send your request. Please try again, or call / WhatsApp us.", values };
  }
  return { status: "success" };
}
