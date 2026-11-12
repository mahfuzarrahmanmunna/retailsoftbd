import { hardware, whatsappWith } from "@/lib/content";
import { HardwareArt } from "@/components/hardware/HardwareArt";
import { IconCheck, IconWhatsApp } from "@/components/ui/Icons";

type Item = (typeof hardware)[number];

export function HardwareCard({ item, compact = false }: { item: Item; compact?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink">
      <div className="border-b border-line bg-cloud/60 px-6 py-6">
        <HardwareArt kind={item.kind} className="mx-auto h-28 w-full max-w-[200px] sm:h-32" />
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
          <p className="mb-3 flex flex-wrap items-baseline justify-between gap-x-2 border-t border-line pt-3 text-[0.82rem] font-medium">
            <span className="text-ink">Price on call</span>
            <span lang="bn" className="bn text-xs text-slate">দাম জানতে যোগাযোগ করুন</span>
          </p>
          <a
            href={whatsappWith(`Hi Retail Soft, I want the price of: ${item.name}`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask price of ${item.name} on WhatsApp`}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-shadow hover:ring-ink/40"
          >
            <IconWhatsApp width={18} height={18} className="text-whatsapp" /> Ask price on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
