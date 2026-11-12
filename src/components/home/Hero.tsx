import { industries, site } from "@/lib/content";
import { DemoButton } from "@/components/demo/DemoButton";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import {
  IconCheck,
  IconInsight,
  IconPhone,
  IconPOS,
  IconStock,
  IconWhatsApp,
  industryIcon,
} from "@/components/ui/Icons";

export function BDFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 12" className={className} aria-hidden="true">
      <rect width="20" height="12" rx="1.5" fill="#006a4e" />
      <circle cx="9" cy="6" r="3.6" fill="#f42a41" />
    </svg>
  );
}

const highlights = [
  { icon: IconPOS, label: "POS & billing" },
  { icon: IconStock, label: "Stock & warehouse" },
  { icon: IconInsight, label: "Accounts & reports" },
];

/** Homepage banner: message and actions on the left, a clickable product preview on the right. */
export function Hero() {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden border-b border-line bg-white">
      {/* quiet backdrop: a tinted panel behind the product preview (desktop) */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[42%] border-l border-line bg-cloud lg:block" />

      <div className="container-x relative grid items-center gap-14 py-14 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-20">
        {/* ---------- message ---------- */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1.5 pr-3 text-[0.82rem] font-medium text-slate">
            <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[0.75rem] font-semibold text-teal-text">Dhaka</span>
            <BDFlag className="h-3 w-5 rounded-[2px]" />
            Business software company in Bangladesh
          </p>

          <h1 className="mt-6 max-w-[17ch] font-display text-[clamp(2.4rem,3.4vw+1rem,3.9rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-balance text-ink">
            Software built around <span className="text-teal-text">your business.</span>
          </h1>

          <p lang="bn" className="bn mt-4 text-[1.2rem] font-medium text-ink/75">{site.taglineBn}</p>

          <p className="mt-4 max-w-[34rem] text-[1.08rem] leading-relaxed text-slate">
            POS, inventory, accounts, ERP and websites, set up around the way your shop, factory or office already
            works. Installed, trained and supported by our team in Dhaka.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <DemoButton arrow className="!px-7 !py-3.5">Book a free demo</DemoButton>
            <a
              href={`tel:${site.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3.5 font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-shadow hover:ring-ink/40"
            >
              <IconPhone width={18} height={18} className="text-teal-text" /> <span className="sm:max-xl:hidden">Call</span> {site.contact.phoneDisplay}
            </a>
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9rem] text-slate">
            <IconWhatsApp width={16} height={16} className="text-whatsapp" />
            Or
            <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              chat with us on WhatsApp
            </a>
            <span aria-hidden="true" className="hidden text-line sm:inline">|</span>
            {site.contact.hours}
          </p>

          <ul className="mt-10 grid max-w-[34rem] grid-cols-3 divide-x divide-line border-t border-line pt-6">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col gap-2 px-4 first:pl-0 sm:flex-row sm:items-center">
                <Icon width={20} height={20} className="shrink-0 text-teal-text" />
                <span className="text-[0.88rem] font-medium leading-snug text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- product preview ---------- */}
        <div className="relative lg:pl-6">
          <DashboardPreview />

          <div className="absolute bottom-16 -left-12 hidden w-52 rounded-xl border border-line bg-white p-4 shadow-[0_12px_32px_-12px_rgb(20_26_34/0.22)] xl:block">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-50 text-teal-text">
                <IconCheck width={17} height={17} strokeWidth={2.6} />
              </span>
              <div className="leading-tight">
                <p className="text-[0.85rem] font-semibold text-ink">Payment received</p>
                <p className="text-[0.78rem] text-slate">bKash · ৳ 1,240</p>
              </div>
            </div>
            <p className="mt-3 border-t border-line pt-2.5 text-[0.75rem] text-slate">Stock and accounts updated automatically</p>
          </div>
        </div>
      </div>

      {/* ---------- industries strip ---------- */}
      <div className="relative border-t border-line bg-white">
        <div className="container-x flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:gap-10">
          <p className="shrink-0 text-[0.85rem] font-semibold text-ink">Built for</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {industries.map((i) => {
              const Icon = industryIcon[i.slug];
              return (
                <li key={i.slug} className="flex items-center gap-2 text-[0.9rem] text-slate">
                  {Icon && <Icon width={17} height={17} className="text-ink/45" />}
                  {i.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
