import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Capabilities } from "@/components/home/Capabilities";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Selected capabilities from Retail Soft - the kinds of business challenges we design and build software for.",
  alternates: { canonical: "/work" },
};

/**
 * Case studies are intentionally not shown until client permission and verified outcomes are approved.
 * Add /work/[slug] once approved case studies exist.
 */
export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={["Built for real business challenges"]}
        bn="আমাদের কাজ"
        intro="We publish detailed case studies only with client permission. Meanwhile, here is the kind of work we do - and we're happy to show you relevant examples in a meeting."
        actions={<ButtonLink href="#" arrow>Request a Walkthrough</ButtonLink>}
      />
      <Capabilities showButton={false} />
      <FinalCTA />
    </>
  );
}
