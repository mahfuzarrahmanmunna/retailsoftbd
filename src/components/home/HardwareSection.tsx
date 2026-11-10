import { hardware, site } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { HardwareCard } from "@/components/hardware/HardwareCard";
import { IconWhatsApp } from "@/components/ui/Icons";

/** Homepage teaser for the POS hardware range - dark stage, cards tilt toward the cursor. */
export function HardwareSection() {
  return (
    <section id="hardware" className="bg-grid-dark relative scroll-mt-24 overflow-hidden py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="tag !text-white/50">POS hardware</p>
            <h2 data-split className="h2 mt-4 max-w-[15ch]">The machines on the counter, <span className="text-gradient">ready on day one.</span></h2>
            <p lang="bn" className="bn mt-3 text-lg text-teal">পিওএস মেশিন ও দোকানের সব হার্ডওয়্যার</p>
            <p className="lede mt-4 max-w-xl text-white/65">
              Terminals, receipt printers, scanners and cash drawers - delivered, installed and connected to your software
              by our team.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href="#" variant="white" arrow>All hardware</ButtonLink>
            <ButtonLink href={site.contact.whatsapp} variant="whatsapp">
              <IconWhatsApp width={20} height={20} /> Price list
            </ButtonLink>
          </div>
        </div>
        <ul data-stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hardware.slice(0, 4).map((h) => (
            <li key={h.kind}><HardwareCard item={h} compact /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
