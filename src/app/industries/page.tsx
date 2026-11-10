import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Industries",
  description: "Tailored software for retail & e-commerce, garments, manufacturing, education, healthcare, restaurants & bakeries and real estate.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={["Software for your type of business"]}
        bn="দোকান, কারখানা, স্কুল, হাসপাতাল - সবার জন্য"
        intro="Retail, garments, manufacturing, education, healthcare, restaurants, bakeries and real estate all work differently. We set up software around the details that matter to you."
        actions={<ButtonLink href="#" arrow>Discuss Your Business</ButtonLink>}
      />
      <IndustriesGrid heading={false} />
      <FinalCTA />
    </>
  );
}
