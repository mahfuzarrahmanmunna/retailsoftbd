import type { Metadata } from "next";
import { site } from "@/lib/content";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This policy explains how Retail Soft, a concern of {site.parent}, collects and uses personal information through this website.</p>
      <h2>Information we collect</h2>
      <p>When you submit an inquiry we collect the details you provide: your name, company, business type, email, phone number, location, team size, services of interest, existing software, project summary, optional budget and timeline, and preferred contact method.</p>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your inquiry and discuss your requirements.</li>
        <li>To prepare proposals you have asked for.</li>
        <li>To keep a record of our communication with you.</li>
      </ul>
      <p>We do not sell your information. We collect only what is needed to respond to you.</p>
      <h2>Storage and security</h2>
      <p>Inquiry data is transmitted over HTTPS, validated on our servers and stored with access limited to the team responsible for responding. We apply rate limiting and spam protection to our forms.</p>
      <h2>Retention</h2>
      <p>We keep inquiry records only as long as needed for the purposes above, or as required by law.</p>
      <h2>Your choices</h2>
      <p>You can ask us to access, correct or delete your information by contacting <a className="font-semibold text-ink underline" href="#">{site.contact.email}</a>.</p>
      <h2>Analytics</h2>
      <p>If we use analytics, it will be consent-aware and used only to understand how the website is used and improve it.</p>
    </LegalPage>
  );
}
