import type { Metadata } from "next";
import { hardware, hardwareFaqs, hardwarePackages, hardwareServices, site, whatsappWith } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FAQ, faqJsonLd } from "@/components/ui/FAQ";
import { JsonLd, breadcrumbLd } from "@/components/ui/JsonLd";
import { HardwareCard } from "@/components/hardware/HardwareCard";
import { HardwareArt } from "@/components/hardware/HardwareArt";
import { IconCheck, IconPhone, IconPOS, IconShield, IconTraining, IconWhatsApp, IconPin } from "@/components/ui/Icons";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "POS Hardware - POS Machine, Receipt Printer, Barcode Scanner",
  description:
    "POS terminals, receipt printers, barcode scanners, label printers, cash drawers, customer displays and weighing scales - delivered, installed and connected to your software.",
  alternates: { canonical: "/hardware" },
};

const serviceIcons = [IconPin, IconPOS, IconTraining, IconShield];

export default function HardwarePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(site.url, [{ name: "Home", path: "/" }, { name: "POS Hardware", path: "/hardware" }])} />
      <JsonLd data={faqJsonLd(hardwareFaqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "POS hardware",
          itemListElement: hardware.map((h, i) => ({ "@type": "ListItem", position: i + 1, name: h.name, description: h.short })),
        }}
      />

      <PageHero
        eyebrow="POS Hardware"
        title={["POS machines and shop hardware"]}
        bn="পিওএস মেশিন, প্রিন্টার, বারকোড স্ক্যানার - সব এক জায়গায়"
        intro="Everything you need at the counter: POS terminal, receipt printer, barcode scanner, cash drawer and more. We deliver, install and connect it all to your software."
        actions={
          <>
            <ButtonLink href={whatsappWith("Hi Retail Soft, I need POS hardware. Please share the price list.")} variant="whatsapp">
              <IconWhatsApp width={20} height={20} /> Get Price List
            </ButtonLink>
            <ButtonLink href={`tel:${site.contact.phone}`} variant="outline">
              <IconPhone width={20} height={20} /> {site.contact.phoneDisplay}
            </ButtonLink>
          </>
        }
        aside={
          <div className="card grid grid-cols-2 gap-2 p-4 sm:p-6">
            {(["pos", "printer", "scanner", "drawer"] as const).map((k) => (
              <div key={k} className="rounded-xl bg-cloud p-2">
                <HardwareArt kind={k} className="h-24 w-full sm:h-28" />
              </div>
            ))}
          </div>
        }
      />

      {/* Products */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <SectionHeader
            align="center"
            eyebrow="Our Products"
            title={["Hardware for your counter and store"]}
            bn="আপনার দোকানের জন্য প্রয়োজনীয় হার্ডওয়্যার"
            intro="Buy single items or a complete package. Tap “Ask Price” to get today's price on WhatsApp."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hardware.map((h) => (
              <li key={h.kind}><HardwareCard item={h} /></li>
            ))}
          </ul>
          <p className="mt-8 text-center text-slate">
            Need something else - a kitchen printer, an attendance device or a different brand?{" "}
            <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-dark hover:underline">Ask us on WhatsApp</a>.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-cloud py-16 sm:py-20">
        <div className="container-x">
          <SectionHeader
            align="center"
            eyebrow="Complete Packages"
            title={["Hardware + software packages"]}
            bn="হার্ডওয়্যার ও সফটওয়্যার একসাথে - রেডি প্যাকেজ"
            intro="Everything set up and tested together, so you can start selling from the first day."
          />
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {hardwarePackages.map((p) => (
              <li
                key={p.name}
                className={`relative flex flex-col rounded-2xl bg-white p-6 sm:p-8 ${p.popular ? "shadow-xl ring-2 ring-accent lg:-translate-y-3" : "card"}`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-sm font-bold text-white">Most popular</span>
                )}
                <h3 className="text-xl font-bold text-ink">{p.name}</h3>
                <p lang="bn" className="bn font-semibold text-brand-dark">{p.bn}</p>
                <p className="mt-2 text-sm text-slate">{p.for}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-ink/90">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white"><IconCheck width={12} height={12} strokeWidth={3} /></span>
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <p className="mb-3 text-center text-sm font-semibold text-accent">Price on call · <span lang="bn" className="bn">দাম জানতে যোগাযোগ করুন</span></p>
                  <ButtonLink
                    href={whatsappWith(`Hi Retail Soft, I am interested in the ${p.name}. Please share the price.`)}
                    variant={p.popular ? "primary" : "brand"}
                    className="w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconWhatsApp width={20} height={20} /> Get Package Price
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="bg-brand py-16 sm:py-20">
        <div className="container-x">
          <SectionHeader tone="dark" align="center" eyebrow="More than a box" title={["We set it up for you"]} bn="শুধু বিক্রি নয় - সেটআপ থেকে সাপোর্ট পর্যন্ত" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hardwareServices.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <li key={s.title} className="rounded-2xl bg-white p-6 text-center shadow-lg shadow-black/10">
                  <span className="icon-box mx-auto !bg-iris-50 !text-iris-dark"><Icon width={26} height={26} /></span>
                  <h3 className="h3 mt-4 text-ink">{s.title}</h3>
                  <p lang="bn" className="bn text-[0.95rem] text-brand-dark">{s.bn}</p>
                  <p className="mt-2 text-slate">{s.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader eyebrow="FAQ" title={["Hardware questions"]} bn="হার্ডওয়্যার নিয়ে সাধারণ জিজ্ঞাসা" />
          <FAQ items={hardwareFaqs} />
        </div>
      </section>

      <FinalCTA
        title={["Setting up a new shop or counter?"]}
        bn="নতুন দোকান? আমরা সব সেটআপ করে দেব"
        body="Tell us your type of business and number of counters. We will suggest the right hardware and software and send you a quotation."
        primary="Get a Quotation"
      />
    </>
  );
}
