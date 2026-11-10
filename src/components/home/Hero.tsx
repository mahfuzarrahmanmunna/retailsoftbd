import { industries, site } from "@/lib/content";
import { DemoButton } from "@/components/demo/DemoButton";
import { IconArrowRight, IconPhone, IconWhatsApp, industryIcon } from "@/components/ui/Icons";

export function BDFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 12" className={className} aria-hidden="true">
      <rect width="20" height="12" rx="1.5" fill="#006a4e" />
      <circle cx="9" cy="6" r="3.6" fill="#f42a41" />
    </svg>
  );
}

const facts = [
  { k: "Local team", v: "North Badda, Dhaka" },
  { k: "Language", v: "Bangla & English" },
  { k: "Included", v: "Setup · training · support" },
];

/** Full-screen opener over the particle field (shape 0: the connected sphere). */
export function Hero() {
  return (
    <section data-morph-step="0" data-morph-side="right" aria-label="Introduction" className="relative z-10 flex min-h-svh flex-col">
      <div className="container-x flex flex-1 flex-col justify-center pb-10 pt-16 sm:pt-20">
        <p data-hero-in="0" className="tag !text-white/60">
          <BDFlag className="h-3 w-5 rounded-[2px]" /> Software company · Dhaka, Bangladesh
        </p>

        <h1 data-split="load" className="display mt-7 max-w-[11.5ch] text-white">
          Software built around <span className="text-gradient">your business.</span>
        </h1>

        <div className="mt-8 grid max-w-2xl gap-8">
          <div>
            <p data-hero-in="1" lang="bn" className="bn text-xl font-semibold text-teal">{site.taglineBn}</p>
            <p data-hero-in="2" className="lede mt-3 max-w-xl text-white/70">
              POS, inventory, accounts, ERP and websites - set up around the way your shop, factory or office already
              works, by a team you can meet in person.
            </p>
          </div>

          <div data-hero-in="3" className="flex flex-wrap items-center gap-3">
            <span data-magnetic className="inline-block">
              <DemoButton arrow className="!px-7 !py-4 shadow-[0_0_40px_-6px_rgb(0_212_199/0.6)]">Book a free demo</DemoButton>
            </span>
            <a
              data-magnetic
              href={`tel:${site.contact.phone}`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-4 font-semibold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10"
            >
              <IconPhone width={19} height={19} /> {site.contact.phoneDisplay}
            </a>
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2 py-4 font-semibold text-[#4ade80] hover:underline underline-offset-4"
            >
              <IconWhatsApp width={20} height={20} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* bottom rail: quick facts + scroll cue */}
      <div className="container-x">
        <div data-hero-in="4" className="flex flex-wrap items-end justify-between gap-6 border-t border-white/10 py-6">
          <dl className="flex flex-wrap gap-x-12 gap-y-4">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/40">{f.k}</dt>
                <dd className="mt-1 text-[0.95rem] text-white/85">{f.v}</dd>
              </div>
            ))}
          </dl>
          <span className="hidden items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/40 sm:flex">
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-teal [animation:scroll-cue_1.8s_ease-in-out_infinite]" />
            </span>
          </span>
        </div>
      </div>

      {/* industries ticker */}
      <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="marquee">
          {[0, 1].map((copy) =>
            industries.map((i) => {
              const Icon = industryIcon[i.slug];
              return (
                <li key={`${copy}-${i.slug}`} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-3 px-8 text-white/75">
                  <Icon width={22} height={22} className="text-teal" />
                  <span className="font-display text-xl font-medium tracking-tight">{i.name}</span>
                  <span lang="bn" className="bn text-sm text-white/40">{i.bn}</span>
                  <IconArrowRight width={14} height={14} className="ml-6 text-white/20" />
                </li>
              );
            }),
          )}
        </ul>
      </div>
    </section>
  );
}
