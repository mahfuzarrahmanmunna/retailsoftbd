import type { Metadata } from "next";
import { site } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IconLayers, IconShield, IconSync, IconUsers } from "@/components/ui/Icons";
import { ProcessStack } from "@/components/home/Process";
import { WhyUs } from "@/components/home/WhyUs";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "About Us",
  description: "Retail Soft is the software and digital solutions business within Retail Solutions Ltd. We understand how a business works, then build technology that helps it work better.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Understand before building", bn: "আগে বুঝি, তারপর বানাই", body: "We start with your people, process and goals - not a feature list.", icon: IconUsers },
  { title: "Easy for everyday users", bn: "সবার জন্য সহজ", body: "Software should feel simple for the cashier, the manager and the owner.", icon: IconLayers },
  { title: "Reliable and secure", bn: "নির্ভরযোগ্য ও নিরাপদ", body: "Solid foundations, sensible architecture and careful testing.", icon: IconShield },
  { title: "Keep improving", bn: "নিয়মিত উন্নয়ন", body: "Launch is the beginning; your system should grow with your business.", icon: IconSync },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={["We build technology around real business"]}
        bn="আমরা বাস্তব ব্যবসার জন্য প্রযুক্তি তৈরি করি"
        intro={`Retail Soft is the software and digital solutions business of ${site.parent}. Our focus is simple: understand how a business works, then build technology that helps it work better.`}
        actions={<ButtonLink href="#" arrow>Meet Our Team</ButtonLink>}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader eyebrow="Our Story" title={["Rooted in retail, built for every business"]} bn="আমাদের গল্প" />
            <p className="lede mt-5 text-slate">
              Our roots in retail solutions give us a practical view of shops, stock, counters and customers. We know
              what happens at the cash counter on a busy Eid evening.
            </p>
            <p className="lede mt-4 text-slate">
              Retail Soft brings that experience to connected digital systems - from custom software and ERP to
              websites, automation and digital growth.
            </p>
          </div>
          <div className="rounded-[28px] bg-navy p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-highlight">Visit our office</p>
            <address className="mt-4 text-lg not-italic leading-relaxed">
              {site.contact.address.map((l, i) => <span key={l} className={`block ${i === 0 ? "font-bold" : "text-white/85"}`}>{l}</span>)}
            </address>
            <p className="mt-4 text-white/85">{site.contact.hours}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="#" variant="white" size="md">View on Map</ButtonLink>
              <ButtonLink href={`tel:${site.contact.phone}`} variant="outline-white" size="md">Call {site.contact.phoneDisplay}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cloud py-16 sm:py-20">
        <div className="container-x">
          <SectionHeader align="center" eyebrow="Our Values" title={["How we work"]} bn="আমাদের মূলনীতি" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="card p-6 text-center">
                <span className="icon-box mx-auto"><v.icon width={26} height={26} /></span>
                <h3 className="h3 mt-4 text-ink">{v.title}</h3>
                <p lang="bn" className="bn text-[0.95rem] text-brand-dark">{v.bn}</p>
                <p className="mt-2 text-slate">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhyUs />
      <ProcessStack />
      <FinalCTA />
    </>
  );
}
