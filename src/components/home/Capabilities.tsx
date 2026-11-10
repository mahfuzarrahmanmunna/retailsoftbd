import { SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IconBuilding, IconCart, IconFactory, IconLayers, IconSaaS, IconShop } from "@/components/ui/Icons";

/**
 * Proof section. Verified case studies replace this once client permission and outcomes
 * are approved. Until then: "What we build" - no invented metrics.
 */
export const capabilities = [
  { title: "Multi-branch retail operations", body: "POS, stock and reporting connected across stores, with role-based access for every branch.", icon: IconShop },
  { title: "Order-to-delivery tracking", body: "Production stages, materials and delivery commitments visible in one place for garment and manufacturing teams.", icon: IconFactory },
  { title: "Manufacturing workflow software", body: "Production stages, materials and delivery commitments visible in one place for manufacturing teams.", icon: IconLayers },
  { title: "Connected online shops", body: "Websites and online stores that share stock and orders with POS and warehouse systems.", icon: IconCart },
  { title: "School & clinic portals", body: "Admissions, appointments, fees and records with secure access for staff and clients.", icon: IconBuilding },
  { title: "Software products (SaaS)", body: "Multi-tenant architecture, subscriptions and APIs for founders building a product.", icon: IconSaaS },
];

export function Capabilities({ showButton = true }: { index?: string; showButton?: boolean }) {
  return (
    <section className="bg-cloud py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="What We Build"
          title={["Built for real business problems"]}
          accent="real"
          bn="বাস্তব ব্যবসার সমস্যার বাস্তব সমাধান"
          intro="The kinds of problems we solve. Detailed client case studies are shared only with permission - ask us for a walkthrough."
        />
        <ul data-stagger className="mt-14 grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <li key={c.title} className="group flex gap-4 border-t border-navy/15 py-7">
              <span className="icon-box"><c.icon width={24} height={24} /></span>
              <div>
                <h3 className="h3 text-ink">{c.title}</h3>
                <p className="mt-1.5 text-slate">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
        {showButton && (
          <div data-reveal className="mt-10">
            <ButtonLink href="#" arrow>Ask for a Walkthrough</ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}
