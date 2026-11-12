import { hardware, site } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { HardwareCard } from "@/components/hardware/HardwareCard";
import { IconWhatsApp } from "@/components/ui/Icons";

/** Homepage teaser for the POS hardware range. */
export function HardwareSection() {
  return (
    <section id="hardware" className="scroll-mt-24 border-t border-line bg-cloud py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="tag">POS hardware</p>
            <h2 className="h2 mt-3 text-ink">The machines on the counter, ready on day one.</h2>
            <p lang="bn" className="bn mt-2 text-lg text-slate">পিওএস মেশিন ও দোকানের সব হার্ডওয়্যার</p>
            <p className="mt-4 text-slate">
              Terminals, receipt printers, scanners and cash drawers, delivered, installed and connected to your
              software by our team.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href="#" variant="outline">All hardware</ButtonLink>
            <ButtonLink href={site.contact.whatsapp} variant="whatsapp">
              <IconWhatsApp width={18} height={18} /> Price list
            </ButtonLink>
          </div>
        </div>
        <ul data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hardware.slice(0, 4).map((h) => (
            <li key={h.kind}><HardwareCard item={h} compact /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
