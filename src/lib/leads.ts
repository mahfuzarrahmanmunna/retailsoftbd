import "server-only";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { budgetRanges, businessTypes, employeeRanges, interestOptions, timelines } from "@/lib/content";
import { mailConfigured, sendLeadEmail } from "@/lib/mailer";

const optionalEnum = (values: readonly string[]) =>
  z.union([z.enum(values as [string, ...string[]]), z.literal("")]).optional().transform((v) => v || undefined);

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  company: z.string().trim().min(2, "Please enter your company or organisation.").max(160),
  businessType: z.enum(businessTypes as [string, ...string[]], { error: "Please choose your business type." }),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a phone number we can reach you on.")
    .max(30)
    .regex(/^[+\d\s()-]+$/, "Phone numbers may contain digits, spaces, +, - and brackets."),
  location: z.string().trim().max(120).optional(),
  employees: optionalEnum(employeeRanges),
  interests: z.array(z.enum(interestOptions as [string, ...string[]])).min(1, "Choose at least one area of interest."),
  existingSoftware: z.string().trim().max(500).optional(),
  summary: z.string().trim().min(20, "Tell us a little more - at least a sentence or two.").max(4000),
  budget: optionalEnum(budgetRanges),
  timeline: optionalEnum(timelines),
  contactMethod: z.enum(["Email", "Phone", "WhatsApp"], { error: "Choose how you'd like us to reach you." }),
  consent: z.literal("on", { error: "Please confirm you agree to be contacted." }),
  intent: z.enum(["project", "demo"]).default("project"),
});

export type Lead = z.infer<typeof leadSchema>;

/** What the visitor needs - shown as big tap-friendly choices in the demo modal. */
export const demoNeeds = ["Software", "POS Hardware", "Software + Hardware", "Not sure yet"] as const;

/** Short "Get a Demo" popup form. Only name, phone, business type and need are required. */
export const demoSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name. / আপনার নাম লিখুন।").max(120),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your mobile number. / মোবাইল নম্বর দিন।")
    .regex(/^[+\d\s()-]*$/, "Only digits, spaces, + and - please.")
    .refine((v) => {
      const d = v.replace(/\D/g, "");
      return d.length >= 10 && d.length <= 15;
    }, "Please enter a valid mobile number, e.g. 01XXX-XXXXXX. / সঠিক মোবাইল নম্বর দিন।"),
  email: z.union([z.email("Please enter a valid email address.").max(200), z.literal("")]).optional().transform((v) => v || undefined),
  businessName: z.string().trim().max(160).optional().transform((v) => v || undefined),
  businessType: z.enum(businessTypes as [string, ...string[]], { error: "Please choose your business type. / ব্যবসার ধরন বাছাই করুন।" }),
  need: z.enum(demoNeeds, { error: "Please choose what you need. / কী দরকার বাছাই করুন।" }),
  location: z.string().trim().max(120).optional().transform((v) => v || undefined),
  contactMethod: z.enum(["WhatsApp", "Phone call"]).default("WhatsApp"),
  message: z.string().trim().max(2000).optional().transform((v) => v || undefined),
  page: z.string().trim().max(200).optional(),
});

export type DemoLead = z.infer<typeof demoSchema>;

/* ---------- abuse protection ---------- */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
const seenKeys = new Map<string, number>();

/** In-memory sliding window. Swap for Redis/Upstash when running multiple instances. */
export function rateLimited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

/** Duplicate-submission guard keyed by a client-generated idempotency key. */
export function alreadyProcessed(key: string, now: number) {
  for (const [k, t] of seenKeys) if (now - t > WINDOW_MS) seenKeys.delete(k);
  if (seenKeys.has(key)) return true;
  seenKeys.set(key, now);
  return false;
}

/** Release a key when delivery failed so the visitor can retry. */
export function forgetKey(key: string) {
  seenKeys.delete(key);
}

/* ---------- delivery ---------- */

type StoredLead = (Lead | (DemoLead & { intent: "demo-popup" })) & { id: string; receivedAt: string; userAgent?: string };

/**
 * Persist + forward a lead.
 * - LEADS_WEBHOOK_URL: POSTs JSON to your CRM / automation endpoint (with optional bearer secret).
 * - SMTP_USER / SMTP_PASS: emails the lead to LEADS_EMAIL_TO (defaults to SMTP_USER) via nodemailer.
 * - Without email or webhook (or additionally, in development) appends to ./.data/leads.ndjson.
 * Replace with PostgreSQL + Prisma per the architecture plan when the database is provisioned.
 */
export async function deliverLead(lead: StoredLead) {
  const webhook = process.env.LEADS_WEBHOOK_URL;
  let delivered = false;

  if (mailConfigured()) {
    try {
      await sendLeadEmail(leadEmail(lead));
      delivered = true;
    } catch (err) {
      console.error("[leads] email failed", err);
    }
  }

  if (webhook) {
    for (let attempt = 0; attempt < 3 && !delivered; attempt++) {
      try {
        const res = await fetch(webhook, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "idempotency-key": lead.id,
            ...(process.env.LEADS_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.LEADS_WEBHOOK_SECRET}` } : {}),
          },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(8000),
        });
        delivered = res.ok;
      } catch {
        // retry
      }
      if (!delivered) await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }

  if ((!webhook && !mailConfigured()) || process.env.NODE_ENV !== "production") {
    try {
      const dir = path.join(process.cwd(), ".data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "leads.ndjson"), JSON.stringify(lead) + "\n", "utf8");
      delivered = true;
    } catch (err) {
      console.error("[leads] could not write local store", err);
    }
  }

  return delivered;
}

/** Turn a stored lead into a readable email. */
function leadEmail(lead: StoredLead) {
  const when = new Date(lead.receivedAt).toLocaleString("en-GB", { timeZone: "Asia/Dhaka", dateStyle: "medium", timeStyle: "short" });
  if (lead.intent === "demo-popup") {
    return {
      subject: `New demo request: ${lead.name} (${lead.businessName ?? lead.businessType}) - ${lead.need}`,
      heading: "New demo request",
      replyTo: lead.email,
      phone: lead.phone,
      rows: [
        ["Name", lead.name],
        ["WhatsApp / Phone", lead.phone],
        ["Contact by", lead.contactMethod],
        ["Email", lead.email],
        ["Business name", lead.businessName],
        ["Business type", lead.businessType],
        ["Needs", lead.need],
        ["Area / District", lead.location],
        ["Message", lead.message],
        ["Sent from page", lead.page],
        ["Received", `${when} (Dhaka)`],
      ] as [string, unknown][],
    };
  }
  return {
    subject: `New ${lead.intent === "demo" ? "demo request" : "inquiry"}: ${lead.name} (${lead.company})`,
    heading: lead.intent === "demo" ? "New demo request (contact page)" : "New project inquiry (contact page)",
    replyTo: lead.email,
    phone: lead.phone,
    rows: [
      ["Name", lead.name],
      ["Company", lead.company],
      ["Business type", lead.businessType],
      ["Email", lead.email],
      ["Phone", lead.phone],
      ["Preferred contact", lead.contactMethod],
      ["Location", lead.location],
      ["Employees", lead.employees],
      ["Interested in", lead.interests.join(", ")],
      ["Current software", lead.existingSoftware],
      ["Project summary", lead.summary],
      ["Budget", lead.budget],
      ["Timeline", lead.timeline],
      ["Received", `${when} (Dhaka)`],
    ] as [string, unknown][],
  };
}
