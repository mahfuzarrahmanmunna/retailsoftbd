import { hardware, whatsappWith } from "@/lib/content";
import { HardwareArt } from "@/components/hardware/HardwareArt";
import { IconCheck, IconWhatsApp } from "@/components/ui/Icons";

type Item = (typeof hardware)[number];

export function HardwareCard({ item, compact = false }: { item: Item; compact?: boolean }) {
  return (
    <article data-tilt="6" className="spotlight group flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-white text-ink [transform-style:preserve-3d]">
      <div className="relative overflow-hidden bg-[linear-gradient(160deg,#f2f4f8,#e8f6f4)] px-6 pt-7">
        <span aria-hidden="true" className="absolute bottom-3 left-1/2 h-3 w-2/3 -translate-x-1/2 rounded-[50%] bg-navy/15 blur-md transition-all duration-700 group-hover:w-1/2" />
        <HardwareArt kind={item.kind} className="relative mx-auto h-32 w-full max-w-[220px] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:scale-[1.05] sm:h-36" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="h3">{item.name}</h3>
        <p lang="bn" className="bn text-[0.95rem] text-teal-text">{item.bn}</p>
        <p className="mt-2 text-[0.95rem] text-slate">{item.short}</p>
        {!compact && (
          <ul className="mt-3 space-y-1.5 text-[0.92rem] text-ink/85">
            {item.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <IconCheck width={16} height={16} strokeWidth={2.6} className="mt-1 shrink-0 text-teal-text" /> {f}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-5">
          <p className="mb-3 flex flex-wrap items-baseline justify-between gap-x-2 border-t border-line pt-3 font-mono text-[0.72rem] uppercase tracking-[0.12em]">
            <span className="text-ink">Price on call</span>
            <span lang="bn" className="bn text-xs normal-case tracking-normal text-slate">দাম জানতে যোগাযোগ করুন</span>
          </p>
          <a
            href={whatsappWith(`Hi Retail Soft, I want the price of: ${item.name}`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask price of ${item.name} on WhatsApp`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp"
          >
            <IconWhatsApp width={18} height={18} /> Ask price on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
