import { Hero } from "@/components/home/Hero";
import { Story } from "@/components/home/Story";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { WhyUs } from "@/components/home/WhyUs";
import { HardwareSection } from "@/components/home/HardwareSection";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { ProcessStack } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";
import { MorphCanvas } from "@/components/three/MorphCanvas";
import { FAQ, faqJsonLd } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />

      {/* Hero + scroll story share one sticky WebGL particle field */}
      <div data-morph-root className="bg-grid-dark relative text-white">
        <MorphCanvas />
        <Hero />
        <Story />
        <div className="h-24" />
      </div>

      <SolutionsGrid />
      <WhyUs />
      <HardwareSection />
      <ProcessStack />
      <IndustriesGrid />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="tag">FAQ</p>
            <h2 data-split className="h2 mt-4 text-ink">Common questions</h2>
            <p lang="bn" className="bn mt-3 text-lg text-teal-text">সাধারণ জিজ্ঞাসা</p>
            <p className="lede mt-4 text-slate">Can&apos;t find your answer? Call or WhatsApp us - we&apos;re happy to explain.</p>
            <ButtonLink href="#" variant="brand" className="mt-7" arrow>Ask a question</ButtonLink>
          </div>
          <FAQ />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
