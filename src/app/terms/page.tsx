import type { Metadata } from "next";
import { site } from "@/lib/content";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>These terms govern your use of the Retail Soft website, operated by {site.parent}.</p>
      <h2>Website content</h2>
      <p>Content on this site is provided for general information about our services. Interface illustrations labelled &ldquo;Concept UI&rdquo; are conceptual and use sample data.</p>
      <h2>No offer</h2>
      <p>Nothing on this website constitutes a binding offer. Project scope, pricing, support and timelines are defined in a written proposal and service agreement.</p>
      <h2>Intellectual property</h2>
      <p>The Retail Soft name, branding and site content are owned by {site.parent} unless stated otherwise.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to <a className="font-semibold text-ink underline" href="#">{site.contact.email}</a>.</p>
    </LegalPage>
  );
}
