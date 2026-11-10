"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { submitDemo, type DemoState } from "@/app/contact/demo-action";
import { businessTypes, site, whatsappWith } from "@/lib/content";
import { IconCheck, IconClose, IconPhone, IconWhatsApp } from "@/components/ui/Icons";

const NEEDS = [
  { value: "Software", bn: "সফটওয়্যার" },
  { value: "POS Hardware", bn: "পিওএস হার্ডওয়্যার" },
  { value: "Software + Hardware", bn: "দুটোই" },
  { value: "Not sure yet", bn: "এখনো নিশ্চিত না" },
] as const;

const field =
  "mt-1.5 block w-full rounded-lg border-0 bg-white px-3.5 py-3 text-base text-ink ring-1 ring-inset ring-ink/15 placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-teal-deep aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#d64545]";

/**
 * Global "Get a Demo" popup, mounted once in the root layout.
 * Any element with a data-demo attribute opens it (see DemoButton).
 */
export function DemoModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState(0);
  const [need, setNeed] = useState("");

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest?.("[data-demo]");
      if (!trigger) return;
      e.preventDefault();
      setNeed(trigger.getAttribute("data-demo") ?? "");
      setSession((n) => n + 1); // fresh form each time
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      aria-labelledby="demo-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // click on the dark backdrop
      }}
      className="fixed inset-0 m-auto max-h-[94svh] w-[calc(100%-1.25rem)] max-w-2xl overflow-hidden rounded-2xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-[2px] open:flex open:flex-col"
    >
      <header className="flex items-start justify-between gap-4 bg-navy px-5 py-5 text-white sm:px-7">
        <div>
          <h2 id="demo-title" className="text-xl font-bold sm:text-2xl">Get a Free Demo</h2>
          <p lang="bn" className="bn mt-0.5 font-semibold text-teal">ফ্রি ডেমো বুক করুন</p>
          <p className="mt-1.5 text-sm text-white/75">Fill in a few details and our team will call you back. {site.contact.responseExpectation}</p>
        </div>
        <button
          type="button"
          onClick={close}
          className="-mr-1 grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
          aria-label="Close"
        >
          <IconClose width={22} height={22} />
        </button>
      </header>
      <div data-lenis-prevent className="overflow-y-auto overscroll-contain">
        {session > 0 && <DemoForm key={session} need={need} onClose={close} />}
      </div>
    </dialog>
  );
}

function DemoForm({ need, onClose }: { need: string; onClose: () => void }) {
  const [state, action, pending] = useActionState<DemoState, FormData>(submitDemo, { status: "idle" });
  const startedAt = useRef(0);
  const idemKey = useRef("");
  const alertRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    startedAt.current = Date.now();
    idemKey.current = crypto.randomUUID();
  }, []);

  useEffect(() => {
    if (state.status !== "idle") alertRef.current?.focus();
  }, [state]);

  const stamp = (e: React.FormEvent<HTMLFormElement>) => {
    const f = e.currentTarget;
    (f.elements.namedItem("startedAt") as HTMLInputElement).value = String(startedAt.current);
    (f.elements.namedItem("idempotencyKey") as HTMLInputElement).value = idemKey.current;
    (f.elements.namedItem("page") as HTMLInputElement).value = window.location.pathname;
  };

  const err = (n: string) => state.fieldErrors?.[n]?.[0];
  const val = (n: string) => state.values?.[n];
  const id = (n: string) => `${uid}-${n}`;
  const invalid = (n: string) => ({ "aria-invalid": err(n) ? true : undefined, "aria-describedby": err(n) ? id(`${n}-err`) : undefined });
  const errMsg = (n: string) =>
    err(n) ? <p id={id(`${n}-err`)} className="mt-1 text-sm font-medium text-[#c23434]">{err(n)}</p> : null;

  if (state.status === "success") {
    return (
      <div ref={alertRef} tabIndex={-1} role="status" className="px-6 py-10 text-center focus:outline-none sm:px-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-50 text-teal-text">
          <IconCheck width={32} height={32} strokeWidth={2.4} />
        </span>
        <h3 className="mt-5 text-2xl font-bold">Thank you! Request received.</h3>
        <p lang="bn" className="bn mt-1 text-lg font-semibold text-teal-text">ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
        <p className="mx-auto mt-3 max-w-md text-slate">
          Our team will contact you soon to fix a demo time. In a hurry? Call or WhatsApp us now.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={`tel:${site.contact.phone}`} className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-3 font-semibold text-white hover:bg-ink">
            <IconPhone width={18} height={18} /> {site.contact.phoneDisplay}
          </a>
          <a
            href={whatsappWith("Hi, I just requested a demo on your website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-5 py-3 font-semibold text-white hover:brightness-95"
          >
            <IconWhatsApp width={18} height={18} /> WhatsApp
          </a>
        </div>
        <button type="button" onClick={onClose} className="mt-6 cursor-pointer font-semibold text-slate underline underline-offset-4 hover:text-ink">
          Close
        </button>
      </div>
    );
  }

  const selectedNeed = val("need") ?? (NEEDS.some((n) => n.value === need) ? need : "");

  return (
    <form action={action} onSubmit={stamp} noValidate className="px-5 py-6 sm:px-7">
      <input type="hidden" name="startedAt" defaultValue="" />
      <input type="hidden" name="idempotencyKey" defaultValue="" />
      <input type="hidden" name="page" defaultValue="" />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {state.status === "error" && (
        <div ref={alertRef} tabIndex={-1} role="alert" className="mb-5 rounded-lg bg-[#fdecec] px-4 py-3 text-sm font-medium text-[#a52a2a] focus:outline-none">
          {state.message}
        </div>
      )}

      <p className="mb-4 text-sm text-slate">
        Fields marked <span className="font-bold text-[#c23434]">*</span> are required.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="font-semibold">
            Your name <span className="text-[#c23434]">*</span> <span lang="bn" className="bn text-sm font-normal text-slate">· আপনার নাম</span>
          </label>
          <input id={id("name")} name="name" autoComplete="name" required defaultValue={val("name")} className={field} placeholder="e.g. Rahim Uddin" {...invalid("name")} />
          {errMsg("name")}
        </div>

        <div>
          <label htmlFor={id("phone")} className="font-semibold">
            WhatsApp / Phone <span className="text-[#c23434]">*</span> <span lang="bn" className="bn text-sm font-normal text-slate">· মোবাইল</span>
          </label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" required defaultValue={val("phone")} className={field} placeholder="01XXX-XXXXXX" {...invalid("phone")} />
          {errMsg("phone")}
        </div>

        <div>
          <label htmlFor={id("email")} className="font-semibold">
            Email <span className="text-sm font-normal text-slate">(optional)</span>
          </label>
          <input id={id("email")} name="email" type="email" autoComplete="email" defaultValue={val("email")} className={field} placeholder="you@example.com" {...invalid("email")} />
          {errMsg("email")}
        </div>

        <div>
          <label htmlFor={id("businessName")} className="font-semibold">
            Shop / Business name <span className="text-sm font-normal text-slate">(optional)</span>
          </label>
          <input id={id("businessName")} name="businessName" autoComplete="organization" defaultValue={val("businessName")} className={field} placeholder="e.g. Rahim Super Shop" />
        </div>

        <div>
          <label htmlFor={id("businessType")} className="font-semibold">
            Business type <span className="text-[#c23434]">*</span> <span lang="bn" className="bn text-sm font-normal text-slate">· ব্যবসার ধরন</span>
          </label>
          <select id={id("businessType")} name="businessType" required defaultValue={val("businessType") ?? ""} className={field} {...invalid("businessType")}>
            <option value="" disabled>Select one…</option>
            {businessTypes.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {errMsg("businessType")}
        </div>

        <div>
          <label htmlFor={id("location")} className="font-semibold">
            Area / District <span className="text-sm font-normal text-slate">(optional)</span>
          </label>
          <input id={id("location")} name="location" autoComplete="address-level2" defaultValue={val("location")} className={field} placeholder="e.g. Mirpur, Dhaka" />
        </div>
      </div>

      <fieldset className="mt-5" {...invalid("need")}>
        <legend className="font-semibold">
          What do you need? <span className="text-[#c23434]">*</span> <span lang="bn" className="bn text-sm font-normal text-slate">· কী দরকার?</span>
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          {NEEDS.map((n) => (
            <label
              key={n.value}
              className="flex cursor-pointer flex-col rounded-lg px-3.5 py-2.5 ring-1 ring-inset ring-ink/15 transition hover:bg-cloud has-checked:bg-teal-50 has-checked:ring-2 has-checked:ring-teal-deep has-focus-visible:ring-2 has-focus-visible:ring-teal-deep"
            >
              <span className="flex items-center gap-2 font-semibold">
                <input type="radio" name="need" value={n.value} defaultChecked={selectedNeed === n.value} className="h-4 w-4 accent-[#00a89e]" />
                {n.value}
              </span>
              <span lang="bn" className="bn pl-6 text-sm text-slate">{n.bn}</span>
            </label>
          ))}
        </div>
        {errMsg("need")}
      </fieldset>

      <div className="mt-5">
        <label htmlFor={id("message")} className="font-semibold">
          Message <span className="text-sm font-normal text-slate">(optional)</span> <span lang="bn" className="bn text-sm font-normal text-slate">· বিস্তারিত লিখুন</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={3}
          defaultValue={val("message")}
          className={field}
          placeholder="e.g. I have 2 shops and need POS with stock tracking."
        />
      </div>

      <fieldset className="mt-5">
        <legend className="font-semibold">How should we contact you?</legend>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
          {(["WhatsApp", "Phone call"] as const).map((m) => (
            <label key={m} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="contactMethod" value={m} defaultChecked={(val("contactMethod") ?? "WhatsApp") === m} className="h-4 w-4 accent-[#00a89e]" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate">We never share your number. No spam.</p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 text-base font-bold text-ink transition hover:bg-teal-deep disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Book My Free Demo"}
        </button>
      </div>
    </form>
  );
}
