import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Mockup } from "@/components/mockups/Mockup";
import { IconCheck, solutionIcon } from "@/components/ui/Icons";
import { FinalCTA } from "@/components/home/FinalCTA";
import { DemoButton } from "@/components/demo/DemoButton";

export const metadata: Metadata = {
  title: "Software Solutions",
  description: "Retail POS, ERP & CRM, inventory and warehouse, custom SaaS, e-commerce and manufacturing software - tailored to the way your business works.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Software"
        title={["Business software for Bangladeshi companies"]}
        bn="আপনার প্রয়োজন অনুযায়ী সফটওয়্যার বেছে নিন"
        intro="Start with what your business needs today and add more as you grow - custom development, proven platforms and integrations, combined around your workflow."
        actions={
          <>
            <DemoButton arrow />
            <ButtonLink href="#" variant="outline">Discuss Your Needs</ButtonLink>
          </>
        }
      />
      <section className="bg-cloud py-14 sm:py-20">
        <div className="container-x space-y-6">
          {solutions.map((s, i) => {
            const Icon = solutionIcon[s.slug];
            return (
              <article key={s.slug} className="card grid overflow-hidden lg:grid-cols-2">
                <div className={`flex flex-col p-6 sm:p-10 ${i % 2 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-4">
                    <span className="icon-box"><Icon width={26} height={26} /></span>
                    <div className="leading-snug">
                      <h2 className="text-2xl font-bold text-ink">{s.name}</h2>
                      <p lang="bn" className="bn font-medium text-brand-dark">{s.bn}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-lg font-semibold text-ink">{s.hero}</p>
                  <p className="mt-1 text-slate">{s.intro}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {s.modules.map((m) => (
                      <li key={m.title} className="flex items-center gap-2 text-ink/85">
                        <IconCheck width={18} height={18} strokeWidth={2.6} className="shrink-0 text-brand-dark" /> {m.title}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <Link href="#" className="group inline-flex items-center gap-1.5 rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-ink">
                      View Details <Arrow />
                    </Link>
                    <DemoButton unstyled need="Software" className="inline-flex cursor-pointer items-center rounded-lg px-5 py-3 font-semibold text-accent ring-2 ring-inset ring-accent/30 hover:bg-accent-50">
                      Request Demo
                    </DemoButton>
                  </div>
                </div>
                <div className="flex items-center bg-cloud p-6 sm:p-10">
                  <Mockup kind={s.mockup} tone="light" className="w-full" />
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
