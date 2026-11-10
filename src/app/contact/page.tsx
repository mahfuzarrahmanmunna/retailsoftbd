import type { Metadata } from "next";
import { site } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/Section";
import { DiscoveryForm } from "@/components/forms/DiscoveryForm";
import { FAQ, faqJsonLd } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact Us - Get a Demo",
  description: "Call, WhatsApp or send us your requirements. We'll review them and discuss a practical next step.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    { icon: IconPhone, label: "Call us", bn: "কল করুন", value: site.contact.phoneDisplay, href: `tel:${site.contact.phone}`, color: "bg-brand" },
    { icon: IconWhatsApp, label: "WhatsApp", bn: "মেসেজ দিন", value: site.contact.phoneDisplay, href: site.contact.whatsapp, external: true, color: "bg-whatsapp" },
    { icon: IconMail, label: "Email", bn: "ইমেইল করুন", value: site.contact.email, href: "#", color: "bg-accent" },
  ];
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <PageHero
        eyebrow="Contact"
        title={["Contact us"]}
        bn="আমাদের সাথে যোগাযোগ করুন"
        intro="The quickest way is to call or WhatsApp us. You can also fill in the form below and we'll get back to you."
      />

      {/* Quick contact cards */}
      <section className="bg-white pt-12">
        <div className="container-x">
          <ul className="grid gap-4 md:grid-cols-3">
            {channels.map(({ icon: Icon, label, bn, value, href, external, color }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card card-hover flex items-center gap-4 p-5"
                >
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-white ${color}`}><Icon width={26} height={26} /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate">{label} <span lang="bn" className="bn">· {bn}</span></span>
                    <span className="block truncate text-lg font-bold text-ink">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-ink">Send us your requirements</h2>
            <p lang="bn" className="bn mb-6 text-brand-dark">আপনার প্রয়োজনের কথা লিখে পাঠান</p>
            <DiscoveryForm />
          </div>
          <aside className="space-y-5 lg:col-span-4" aria-label="Office information">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="icon-box"><IconPin width={24} height={24} /></span>
                <div>
                  <h2 className="font-bold text-ink">Our office</h2>
                  <address className="mt-1 text-[0.95rem] not-italic text-slate">
                    {site.contact.address.map((l) => <span key={l} className="block">{l}</span>)}
                  </address>
                  <a href="#" className="mt-2 inline-block font-semibold text-brand-dark hover:underline">Open in Google Maps ›</a>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="icon-box"><IconClock width={24} height={24} /></span>
                <div>
                  <h2 className="font-bold text-ink">Office hours</h2>
                  <p className="mt-1 text-slate">{site.contact.hours}</p>
                  <p lang="bn" className="bn text-sm text-slate">{site.contact.hoursBn}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-brand p-6 text-white">
              <h2 className="text-lg font-bold">What happens next?</h2>
              <p lang="bn" className="bn text-sm text-highlight">এরপর কী হবে?</p>
              <ol className="mt-4 space-y-3">
                {[
                  "We review your requirements.",
                  "Our specialist calls or messages you the way you prefer.",
                  "We discuss a practical next step - no obligation.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-brand-dark">{i + 1}</span>
                    <span className="text-white/90">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cloud py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader eyebrow="FAQ" title={["Frequently asked questions"]} bn="সাধারণ জিজ্ঞাসা" />
          <FAQ />
        </div>
      </section>
    </>
  );
}
