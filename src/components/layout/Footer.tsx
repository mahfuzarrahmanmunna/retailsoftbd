import Link from "next/link";
import { industries, site, solutions } from "@/lib/content";
import { Logo } from "@/components/layout/Logo";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/ui/Icons";

const company = [
  { label: "About Us", href: "#" },
  { label: "Our Services", href: "#" },
  { label: "Our Work", href: "#" },
  { label: "How We Work", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void text-white/70">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-3">
          <Logo light />
          <p className="mt-5 max-w-sm text-[0.95rem]">{site.description}</p>
          <p lang="bn" className="bn mt-3 font-medium text-teal">{site.taglineBn}</p>
          <div className="mt-6 flex gap-2">
            <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-whatsapp">
              <IconWhatsApp width={20} height={20} />
            </a>
            <a href="#" aria-label="Email" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-accent">
              <IconMail width={20} height={20} />
            </a>
            <a href={`tel:${site.contact.phone}`} aria-label="Call" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-brand">
              <IconPhone width={20} height={20} />
            </a>
          </div>
        </div>

        <FooterCol title="Software & Hardware" className="lg:col-span-2" links={[...solutions.map((s) => ({ label: s.name, href: "#" })), { label: "POS Hardware", href: "#" }]} />
        <FooterCol title="Industries" className="lg:col-span-2" links={industries.map((i) => ({ label: i.name, href: "#" }))} />
        <FooterCol title="Company" className="lg:col-span-2" links={company} />

        <div className="sm:col-span-2 lg:col-span-3">
          <h2 className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/45">Contact Us</h2>
                    <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li className="flex gap-3">
              <IconPin width={20} height={20} className="mt-1 shrink-0 text-teal" />
              <a href="#" className="hover:text-white">
                <address className="not-italic">{site.contact.address.slice(1).join(", ")}</address>
              </a>
            </li>
            <li className="flex gap-3">
              <IconPhone width={20} height={20} className="mt-0.5 shrink-0 text-teal" />
              <a href={`tel:${site.contact.phone}`} className="font-semibold text-white hover:text-teal">{site.contact.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <IconMail width={20} height={20} className="mt-0.5 shrink-0 text-teal" />
              <a href="#" className="break-all hover:text-white">{site.contact.email}</a>
            </li>
            <li className="flex gap-3">
              <IconClock width={20} height={20} className="mt-0.5 shrink-0 text-teal" />
              <span>{site.contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* oversized wordmark */}
      <div aria-hidden="true" className="container-x select-none overflow-hidden">
        <p className="translate-y-[12%] whitespace-nowrap bg-[linear-gradient(180deg,rgb(255_255_255/0.14),rgb(255_255_255/0))] bg-clip-text font-display text-[19.5vw] font-semibold leading-[0.85] tracking-[-0.065em] text-transparent 2xl:text-[284px]">
          RetailSoft
        </p>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© Retail Soft - A concern of {site.parent}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <h2 className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-white/45">{title}</h2>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="transition-colors hover:text-teal">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
