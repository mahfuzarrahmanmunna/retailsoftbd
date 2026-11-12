import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { HardwareSection } from "@/components/home/HardwareSection";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { ProcessStack } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FAQ, faqJsonLd } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />

      <Hero />
      <Story />

      <SolutionsGrid />
      <WhyUs />
      <HardwareSection />
      <ProcessStack />
      <IndustriesGrid />

      <section className="border-t border-line bg-white py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="tag">FAQ</p>
            <h2 className="h2 mt-3 text-ink">Common questions</h2>
            <p lang="bn" className="bn mt-2 text-lg text-slate">সাধারণ জিজ্ঞাসা</p>
            <p className="mt-4 text-slate">Can&apos;t find your answer? Call or WhatsApp us. We&apos;re happy to explain.</p>
            <ButtonLink href="#" variant="outline" className="mt-6">Ask a question</ButtonLink>
          </div>
          <FAQ />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
