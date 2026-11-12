"use client";

import { useActionState, useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { submitInquiry, type InquiryState } from "@/app/contact/actions";
import { budgetRanges, businessTypes, employeeRanges, interestOptions, site, timelines } from "@/lib/content";

const initial: InquiryState = { status: "idle" };
const noopSubscribe = () => () => {};

const field =
  "mt-2 block w-full rounded-lg border-0 bg-white px-4 py-3 text-base text-ink ring-1 ring-inset ring-ink/15 placeholder:text-ink/35 transition-shadow focus:outline-none focus:ring-2 focus:ring-brand aria-[invalid=true]:ring-[#d64545]";

export function DiscoveryForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const urlIntent = useSyncExternalStore(
    noopSubscribe,
    () => (new URLSearchParams(window.location.search).get("intent") === "demo" ? "demo" : "project"),
    () => "project" as const,
  );
  const [intentOverride, setIntent] = useState<"project" | "demo" | null>(null);
  const intent = intentOverride ?? urlIntent;
  const startedAt = useRef(0);
  const idemKey = useRef("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    startedAt.current = Date.now();
    idemKey.current = crypto.randomUUID();
  }, []);

  // Stamp anti-spam timing + idempotency key into the payload at submit time.
  const stamp = (e: React.FormEvent<HTMLFormElement>) => {
    const f = e.currentTarget;
    (f.elements.namedItem("startedAt") as HTMLInputElement).value = String(startedAt.current);
    (f.elements.namedItem("idempotencyKey") as HTMLInputElement).value = idemKey.current;
  };

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") summaryRef.current?.focus();
  }, [state]);

  const err = (name: string) => state.fieldErrors?.[name]?.[0];
  const val = (name: string) => {
    const v = state.values?.[name];
    return typeof v === "string" ? v : undefined;
  };
  const vals = (name: string) => {
    const v = state.values?.[name];
    return Array.isArray(v) ? v : [];
  };

  if (state.status === "success") {
    return (
      <div ref={summaryRef} tabIndex={-1} role="status" className="card-light p-10 text-center focus:outline-none sm:p-14">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-accent">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" /></svg>
        </span>
        <h2 className="h2 mt-6 text-ink">Thanks for reaching out.</h2>
        <p className="mx-auto mt-3 max-w-md text-slate">
          Your inquiry has been received. Our team will review it and contact you using the details provided. {site.contact.responseExpectation}
        </p>
      </div>
    );
  }

  // Keyed on submission so uncontrolled defaults repopulate after a server error.
  const formKey = state.values ? JSON.stringify(state.values).length : 0;

  return (
    <form key={formKey} action={action} onSubmit={stamp} noValidate className="card-light p-6 sm:p-10" aria-describedby={`${uid}-req`}>
      <input type="hidden" name="intent" value={intent} />
      <input type="hidden" name="startedAt" defaultValue="" />
      <input type="hidden" name="idempotencyKey" defaultValue="" />
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div ref={summaryRef} tabIndex={-1} className="focus:outline-none" aria-live="assertive">
        {state.status === "error" && (
          <div role="alert" className="mb-8 rounded-xl bg-[#fdecec] p-4 text-sm text-[#a12d2d]">
            <p className="font-semibold">{state.message ?? "We could not send your inquiry. Please try again or contact us directly."}</p>
            {state.fieldErrors && (
              <ul className="mt-2 list-inside list-disc">
                {Object.entries(state.fieldErrors).map(([k, v]) => v?.[0] && <li key={k}><a href="#" className="underline">{v[0]}</a></li>)}
              </ul>
            )}
          </div>
        )}
      </div>

      <fieldset className="mb-8">
        <legend className="text-sm font-semibold text-ink">What would you like to do?</legend>
        <div className="mt-3 inline-flex rounded-full bg-cloud p-1 ring-1 ring-ink/10">
          {(["project", "demo"] as const).map((v) => (
            <label key={v} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${intent === v ? "bg-brand text-white" : "text-slate hover:text-ink"}`}>
              <input type="radio" name="_intent" value={v} checked={intent === v} onChange={() => setIntent(v)} className="sr-only" />
              {v === "project" ? "Discuss a project" : "Request a demo"}
            </label>
          ))}
        </div>
      </fieldset>

      <p id={`${uid}-req`} className="mb-6 text-sm text-slate">Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Contact person" required error={err("name")}>
          {(p) => <input {...p} name="name" autoComplete="name" defaultValue={val("name")} className={field} />}
        </Field>
        <Field id={`${uid}-company`} label="Company" required error={err("company")}>
          {(p) => <input {...p} name="company" autoComplete="organization" defaultValue={val("company")} className={field} />}
        </Field>
        <Field id={`${uid}-email`} label="Email" required error={err("email")}>
          {(p) => <input {...p} type="email" name="email" autoComplete="email" defaultValue={val("email")} className={field} />}
        </Field>
        <Field id={`${uid}-phone`} label="Phone" required error={err("phone")}>
          {(p) => <input {...p} type="tel" name="phone" autoComplete="tel" placeholder="+880" defaultValue={val("phone")} className={field} />}
        </Field>
        <Field id={`${uid}-businessType`} label="Business type" required error={err("businessType")}>
          {(p) => (
            <select {...p} name="businessType" defaultValue={val("businessType") ?? ""} className={field}>
              <option value="" disabled>Select…</option>
              {businessTypes.map((b) => <option key={b}>{b}</option>)}
            </select>
          )}
        </Field>
        <Field id={`${uid}-location`} label="Location" error={err("location")}>
          {(p) => <input {...p} name="location" autoComplete="address-level2" placeholder="City / country" defaultValue={val("location")} className={field} />}
        </Field>
        <Field id={`${uid}-employees`} label="Team size" error={err("employees")}>
          {(p) => (
            <select {...p} name="employees" defaultValue={val("employees") ?? ""} className={field}>
              <option value="">Prefer not to say</option>
              {employeeRanges.map((b) => <option key={b}>{b}</option>)}
            </select>
          )}
        </Field>
        <Field id={`${uid}-existingSoftware`} label="Software you use today" error={err("existingSoftware")}>
          {(p) => <input {...p} name="existingSoftware" placeholder="e.g. Excel, Tally" defaultValue={val("existingSoftware")} className={field} />}
        </Field>
      </div>

      <fieldset className="mt-8" id={`${uid}-interests`} aria-invalid={!!err("interests")} aria-describedby={err("interests") ? `${uid}-interests-err` : undefined}>
        <legend className="text-sm font-semibold text-ink">Services of interest <span aria-hidden="true" className="text-accent">*</span></legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interestOptions.map((o) => (
            <label key={o} className="cursor-pointer rounded-full px-4 py-2 text-sm text-ink ring-1 ring-inset ring-ink/15 transition-colors has-[:checked]:bg-brand has-[:checked]:text-white has-[:checked]:ring-brand has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand">
              <input type="checkbox" name="interests" value={o} defaultChecked={vals("interests").includes(o)} className="sr-only" />
              {o}
            </label>
          ))}
        </div>
        {err("interests") && <p id={`${uid}-interests-err`} className="mt-2 text-sm text-[#a12d2d]">{err("interests")}</p>}
      </fieldset>

      <div className="mt-8">
        <Field id={`${uid}-summary`} label="Project summary & current challenges" required error={err("summary")} hint="What would you like to improve? Mention current pain points and goals.">
          {(p) => <textarea {...p} name="summary" rows={5} defaultValue={val("summary")} className={field} />}
        </Field>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-budget`} label="Budget range (optional)" error={err("budget")}>
          {(p) => (
            <select {...p} name="budget" defaultValue={val("budget") ?? ""} className={field}>
              <option value="">Prefer not to say</option>
              {budgetRanges.map((b) => <option key={b}>{b}</option>)}
            </select>
          )}
        </Field>
        <Field id={`${uid}-timeline`} label="Timeline (optional)" error={err("timeline")}>
          {(p) => (
            <select {...p} name="timeline" defaultValue={val("timeline") ?? ""} className={field}>
              <option value="">Not sure yet</option>
              {timelines.map((b) => <option key={b}>{b}</option>)}
            </select>
          )}
        </Field>
      </div>

      <fieldset className="mt-8" id={`${uid}-contactMethod`} aria-describedby={err("contactMethod") ? `${uid}-cm-err` : undefined}>
        <legend className="text-sm font-semibold text-ink">Preferred contact method <span aria-hidden="true" className="text-accent">*</span></legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Email", "Phone", "WhatsApp"].map((m) => (
            <label key={m} className="cursor-pointer rounded-full px-4 py-2 text-sm text-ink ring-1 ring-inset ring-ink/15 has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand">
              <input type="radio" name="contactMethod" value={m} defaultChecked={(val("contactMethod") ?? "Email") === m} className="sr-only" />
              {m}
            </label>
          ))}
        </div>
        {err("contactMethod") && <p id={`${uid}-cm-err`} className="mt-2 text-sm text-[#a12d2d]">{err("contactMethod")}</p>}
      </fieldset>

      <div className="mt-8">
        <label className="flex items-start gap-3 text-sm text-slate" htmlFor={`${uid}-consent`}>
          <input
            id={`${uid}-consent`}
            type="checkbox"
            name="consent"
            defaultChecked={val("consent") === "on"}
            aria-invalid={!!err("consent")}
            aria-describedby={err("consent") ? `${uid}-consent-err` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded accent-[#0f766e]"
          />
          <span>
            I agree that Retail Soft may store these details and contact me about this inquiry, as described in the{" "}
            <a href="#" className="font-semibold text-ink underline underline-offset-2">privacy policy</a>. <span aria-hidden="true" className="text-accent">*</span>
          </span>
        </label>
        {err("consent") && <p id={`${uid}-consent-err`} className="mt-2 text-sm text-[#a12d2d]">{err("consent")}</p>}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-8 py-4 text-lg font-semibold text-white transition hover:bg-navy disabled:translate-y-0 disabled:opacity-60"
        >
          {pending ? "Sending…" : intent === "demo" ? "Request a Demo" : "Send Inquiry"}
        </button>
        <p className="text-sm text-slate">{site.contact.responseExpectation}</p>
      </div>
    </form>
  );
}

type FieldProps = { id: string; "aria-invalid": boolean; "aria-describedby"?: string; required?: boolean };

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (p: FieldProps) => ReactNode;
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="text-[0.95rem] font-semibold text-ink">
        {label} {required && <span aria-hidden="true" className="text-accent">*</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-slate">{hint}</p>}
      {children({ id, "aria-invalid": !!error, "aria-describedby": describedBy, required })}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm text-[#a12d2d]">{error}</p>}
    </div>
  );
}
