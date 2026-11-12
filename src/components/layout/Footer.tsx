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
    <footer className="border-t border-line bg-cloud text-slate">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-3">
          <Logo />
          <p className="mt-5 max-w-sm text-[0.95rem]">{site.description}</p>
          <p lang="bn" className="bn mt-3 font-medium text-ink/80">{site.taglineBn}</p>
          <div className="mt-6 flex gap-2">
            <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white text-ink/70 transition-colors hover:text-whatsapp">
              <IconWhatsApp width={20} height={20} />
            </a>
            <a href="#" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white text-ink/70 transition-colors hover:text-ink">
              <IconMail width={20} height={20} />
            </a>
            <a href={`tel:${site.contact.phone}`} aria-label="Call" className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white text-ink/70 transition-colors hover:text-ink">
              <IconPhone width={20} height={20} />
            </a>
          </div>
        </div>

        <FooterCol title="Software & Hardware" className="lg:col-span-2" links={[...solutions.map((s) => ({ label: s.name, href: "#" })), { label: "POS Hardware", href: "#" }]} />
        <FooterCol title="Industries" className="lg:col-span-2" links={industries.map((i) => ({ label: i.name, href: "#" }))} />
        <FooterCol title="Company" className="lg:col-span-2" links={company} />

        <div className="sm:col-span-2 lg:col-span-3">
          <h2 className="text-[0.85rem] font-semibold text-ink">Contact Us</h2>
                  <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li className="flex gap-3">
              <IconPin width={20} height={20} className="mt-1 shrink-0 text-teal-text" />
              <a href="#" className="hover:text-ink">
                <address className="not-italic">{site.contact.address.slice(1).join(", ")}</address>
              </a>
            </li>
            <li className="flex gap-3">
              <IconPhone width={20} height={20} className="mt-0.5 shrink-0 text-teal-text" />
              <a href={`tel:${site.contact.phone}`} className="font-semibold text-ink hover:text-teal-text">{site.contact.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <IconMail width={20} height={20} className="mt-0.5 shrink-0 text-teal-text" />
              <a href="#" className="break-all hover:text-ink">{site.contact.email}</a>
            </li>
            <li className="flex gap-3">
              <IconClock width={20} height={20} className="mt-0.5 shrink-0 text-teal-text" />
              <span>{site.contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-5 text-sm text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>© Retail Soft - A concern of {site.parent}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link href="#" className="hover:text-ink">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-ink">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <h2 className="text-[0.85rem] font-semibold text-ink">{title}</h2>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="transition-colors hover:text-ink">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
