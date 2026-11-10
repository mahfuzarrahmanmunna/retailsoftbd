import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, getSolution, industries, site } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/Section";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Mockup } from "@/components/mockups/Mockup";
import { IconCheck, IconPhone, industryIcon, solutionIcon } from "@/components/ui/Icons";
import { JsonLd, breadcrumbLd } from "@/components/ui/JsonLd";
import { FinalCTA } from "@/components/home/FinalCTA";
import { DemoButton } from "@/components/demo/DemoButton";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: `${ind.name} Software - ${ind.hero}`,
    description: `Tailored software for ${ind.name.toLowerCase()}: ${ind.scope.join(", ")}.`,
    alternates: { canonical: `/industries/${ind.slug}` },
  };
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <>
      <JsonLd data={breadcrumbLd(site.url, [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }, { name: ind.name, path: `/industries/${ind.slug}` }])} />
      <PageHero
        crumbs={[{ label: "Industries", href: "#" }, { label: ind.name, href: "#" }]}
        eyebrow={ind.name}
        title={[`Software for ${ind.name}`]}
        bn={ind.bn}
        intro={`${ind.hero} Software shaped around how ${ind.name.toLowerCase()} businesses actually work - ${ind.scope.slice(0, -1).join(", ").toLowerCase()} and ${ind.scope.at(-1)?.toLowerCase()}.`}
        actions={
          <>
            <DemoButton arrow />
            <ButtonLink href={`tel:${site.contact.phone}`} variant="outline">
              <IconPhone width={20} height={20} /> Call Us
            </ButtonLink>
          </>
        }
        aside={<Mockup kind={ind.mockup} tone="light" className="w-full" />}
      />

      <section className="bg-cloud py-16 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink">Problems we often hear</h2>
            <p lang="bn" className="bn text-accent">যে সমস্যাগুলো প্রায়ই শুনি</p>
            <ul className="mt-6 space-y-3">
              {ind.challenges.map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-lg bg-accent-50 p-4 text-ink">
                  <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-white">!</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink">What we can manage for you</h2>
            <p lang="bn" className="bn text-brand-dark">যা যা সফটওয়্যারে করা যাবে</p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {ind.scope.map((s) => (
                <li key={s} className="flex items-center gap-2 rounded-lg bg-brand-50 p-4 font-semibold text-brand-dark">
                  <IconCheck width={18} height={18} strokeWidth={2.6} className="shrink-0" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <SectionHeader align="center" eyebrow="Recommended" title={["Software that fits"]} bn="যে সফটওয়্যারগুলো আপনার কাজে লাগবে" intro="You only set up what your business needs - nothing extra." />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {ind.relatedSolutions.map((sl) => {
              const s = getSolution(sl);
              if (!s) return null;
              const Icon = solutionIcon[sl];
              return (
                <li key={sl}>
                  <Link href="#" className="card card-hover group flex h-full flex-col p-6">
                    <span className="icon-box"><Icon width={26} height={26} /></span>
                    <h3 className="h3 mt-5 text-ink group-hover:text-brand-dark">{s.name}</h3>
                    <p lang="bn" className="bn text-[0.95rem] text-brand-dark">{s.bn}</p>
                    <p className="mt-2 text-slate">{s.short}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold text-brand-dark">Learn more <Arrow /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {ind.slug === "healthcare" && (
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate">
              Healthcare projects involve extra privacy and security review, which we plan together with you before setup.
            </p>
          )}
        </div>
      </section>

      <section className="bg-cloud py-12">
        <div className="container-x">
          <h2 className="text-lg font-bold text-ink">Other industries</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => {
              const Icon = industryIcon[o.slug];
              return (
                <li key={o.slug}>
                  <Link href="#" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-ink ring-1 ring-line hover:text-brand-dark hover:ring-brand">
                    <Icon width={18} height={18} /> {o.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FinalCTA title={[`Let's set up software for your ${ind.name.toLowerCase()} business`]} primary="Get a Demo" />
    </>
  );
}
