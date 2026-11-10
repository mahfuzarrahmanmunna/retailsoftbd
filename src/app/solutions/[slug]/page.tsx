import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, site, solutions, getSolution } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/Section";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Mockup } from "@/components/mockups/Mockup";
import { FAQ, faqJsonLd } from "@/components/ui/FAQ";
import { IconCheck, IconPhone, IconPlug, solutionIcon } from "@/components/ui/Icons";
import { JsonLd, breadcrumbLd } from "@/components/ui/JsonLd";
import { ProcessStack } from "@/components/home/Process";
import { HardwareSection } from "@/components/home/HardwareSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { DemoButton } from "@/components/demo/DemoButton";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: `${s.name} Software - ${s.hero}`,
    description: `${s.intro} ${s.short}`,
    alternates: { canonical: `/solutions/${s.slug}` },
    openGraph: { title: `${s.name} · ${site.name}`, description: s.intro },
  };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const relatedIndustries = industries.filter((i) => i.relatedSolutions.includes(s.slug));
  const others = solutions.filter((o) => o.slug !== s.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.intro,
          serviceType: s.name,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: "BD",
        }}
      />
      <JsonLd data={breadcrumbLd(site.url, [{ name: "Home", path: "/" }, { name: "Software", path: "/solutions" }, { name: s.name, path: `/solutions/${s.slug}` }])} />
      <JsonLd data={faqJsonLd()} />

      <PageHero
        crumbs={[{ label: "Software", href: "#" }, { label: s.name, href: "#" }]}
        eyebrow={s.name}
        title={[`${s.name}: ${s.hero}`]}
        bn={s.bn}
        intro={s.intro}
        actions={
          <>
            <DemoButton arrow />
            <ButtonLink href={`tel:${site.contact.phone}`} variant="outline">
              <IconPhone width={20} height={20} /> Call Us
            </ButtonLink>
          </>
        }
        aside={<Mockup kind={s.mockup} tone="light" className="w-full" />}
      />

      {/* Problem */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-x">
          <div className="flex flex-col gap-4 rounded-2xl border-l-4 border-accent bg-accent-50 p-6 sm:flex-row sm:p-8">
            <p className="shrink-0 font-bold text-accent-dark">The problem <span lang="bn" className="bn block font-semibold">সমস্যা কোথায়?</span></p>
            <p className="text-lg text-ink sm:text-xl">{s.challenge}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-cloud py-16 sm:py-20">
        <div className="container-x">
          <SectionHeader align="center" eyebrow="Features" title={["What you get"]} bn="যা যা থাকছে" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.modules.map((m) => (
              <li key={m.title} className="card flex gap-4 p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white"><IconCheck width={20} height={20} strokeWidth={2.6} /></span>
                <div>
                  <h3 className="h3 text-ink">{m.title}</h3>
                  <p className="mt-1 text-slate">{m.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <SectionHeader align="center" eyebrow="Daily workflow" title={["How your daily work will flow"]} bn="প্রতিদিনের কাজ যেভাবে চলবে" intro="A sample flow. We map it to your actual process before setting anything up." />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {s.workflow.map((w, i) => (
              <li key={w} className="relative flex items-center gap-3 rounded-xl bg-brand-50 p-5 lg:flex-col lg:text-center">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand font-bold text-white">{i + 1}</span>
                <p className="font-semibold text-ink">{w}</p>
                {i < s.workflow.length - 1 && <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-accent text-sm text-white lg:grid">›</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Integrations + fit */}
      <section className="bg-cloud py-16 sm:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="icon-box"><IconPlug width={24} height={24} /></span>
              <div>
                <h2 className="text-xl font-bold text-ink">Connects with</h2>
                <p lang="bn" className="bn text-brand-dark">যেসব সিস্টেমের সাথে যুক্ত করা যায়</p>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.integrations.map((x) => <li key={x} className="rounded-lg bg-brand-50 px-4 py-2 font-medium text-brand-dark">{x}</li>)}
            </ul>
            <p className="mt-5 text-sm text-slate">Integration options are confirmed after we check your current tools and data.</p>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink">Best for</h2>
            <p lang="bn" className="bn text-brand-dark">কাদের জন্য উপযোগী</p>
            <ul className="mt-6 space-y-3">
              {s.idealFit.map((x) => (
                <li key={x} className="flex items-start gap-3 text-lg text-ink/90"><IconCheck className="mt-1 shrink-0 text-brand-dark" width={20} height={20} strokeWidth={2.6} />{x}</li>
              ))}
            </ul>
            {relatedIndustries.length > 0 && (
              <p className="mt-6 border-t border-line pt-4 text-slate">
                Often used in:{" "}
                {relatedIndustries.map((ind, i) => (
                  <span key={ind.slug}>
                    <Link href="#" className="font-semibold text-brand-dark hover:underline">{ind.name}</Link>
                    {i < relatedIndustries.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </section>

      {(s.slug === "retail-pos" || s.slug === "inventory-warehouse") && <HardwareSection />}

      <ProcessStack />

      {/* FAQ */}
      <section className="bg-cloud py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader eyebrow="FAQ" title={["Common questions"]} bn="সাধারণ জিজ্ঞাসা" />
          <FAQ />
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-14">
        <div className="container-x">
          <h2 className="text-xl font-bold text-ink">Other software you may need</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((o) => {
              const Icon = solutionIcon[o.slug];
              return (
                <li key={o.slug}>
                  <Link href="#" className="card card-hover group flex h-full gap-4 p-5">
                    <span className="icon-box !h-11 !w-11"><Icon width={22} height={22} /></span>
                    <span>
                      <span className="block font-semibold text-ink group-hover:text-brand-dark">{o.name}</span>
                      <span className="mt-1 block text-sm text-slate">{o.short}</span>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-dark">Learn more <Arrow /></span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FinalCTA title={[`Interested in ${s.name}?`]} primary={s.cta} />
    </>
  );
}
