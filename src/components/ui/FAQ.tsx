import { faqs } from "@/lib/content";

export function FAQ({ items = faqs }: { tone?: "light" | "dark"; items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <details key={f.q} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.05rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center text-xl leading-none text-slate transition-transform duration-200 group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-6 pr-12 text-slate">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
