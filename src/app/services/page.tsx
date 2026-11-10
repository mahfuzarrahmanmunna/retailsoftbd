import type { Metadata } from "next";
import { services } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IconCheck, IconGrow, IconLayers, IconSaaS, IconTraining } from "@/components/ui/Icons";
import { Engineering } from "@/components/home/Engineering";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Services",
  description: "Product engineering, UI/UX, cloud & DevOps, SEO, branding and digital marketing - one partner from platform to growth.",
  alternates: { canonical: "/services" },
};

const engIcons = [IconLayers, IconTraining, IconSaaS];
const engBn = ["সফটওয়্যার ও অ্যাপ তৈরি", "সহজ ও সুন্দর ডিজাইন", "সার্ভার, হোস্টিং ও ব্যাকআপ"];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={["Software and digital marketing, under one roof"]}
        bn="সফটওয়্যার তৈরি থেকে অনলাইন মার্কেটিং - এক জায়গায়"
        intro="We design, build and run the systems your business depends on, and help you reach the customers those systems serve."
        actions={<ButtonLink href="#" arrow>Discuss Your Project</ButtonLink>}
      />

      <section className="bg-cloud py-16 sm:py-20">
        <div className="container-x">
          <SectionHeader align="center" eyebrow="Engineering" title={["Build it properly"]} bn="সঠিকভাবে তৈরি, দীর্ঘদিন টেকসই" />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {services.engineering.map((s, i) => {
              const Icon = engIcons[i];
              return (
                <li key={s.title} className="card p-6 sm:p-8">
                  <span className="icon-box"><Icon width={26} height={26} /></span>
                  <h3 className="h3 mt-5 text-ink">{s.title}</h3>
                  <p lang="bn" className="bn text-[0.95rem] text-brand-dark">{engBn[i]}</p>
                  <p className="mt-2 text-slate">{s.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Engineering />

      <section id="growth" className="scroll-mt-24 bg-brand-50 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <span className="icon-box !bg-white"><IconGrow width={26} height={26} /></span>
            <div className="mt-5">
              <SectionHeader
                eyebrow="Digital growth"
                title={["Grow your business online"]}
                bn="অনলাইনে আপনার ব্যবসা বাড়ান"
                intro="Good software is only part of the journey. We help you present your business well, reach more customers and measure results."
              />
            </div>
            <ButtonLink href="#" variant="brand" className="mt-8" arrow>Plan Your Growth</ButtonLink>
          </div>
          <ul className="space-y-3">
            {services.growth.map((s) => (
              <li key={s.title} className="card flex gap-4 p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white"><IconCheck width={18} height={18} strokeWidth={2.6} /></span>
                <div>
                  <h3 className="h3 text-ink">{s.title}</h3>
                  <p className="mt-0.5 text-slate">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
