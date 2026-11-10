import Link from "next/link";
import { IndustryList } from "@/components/home/IndustryList";

export function IndustriesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-cloud py-24 sm:py-32">
      <div className="container-x">
        {heading && (
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="tag">Industries</p>
              <h2 data-split className="h2 mt-4 max-w-[14ch] text-ink">Made for your type of business.</h2>
              <p lang="bn" className="bn mt-3 text-lg text-teal-text">আপনার ব্যবসার ধরন অনুযায়ী সমাধান</p>
            </div>
            <p className="max-w-sm text-slate">
              A shop, a garment factory and a school all work differently. We set the software up to match the way you
              already work.
            </p>
          </div>
        )}
        <IndustryList />
        <p className="mt-10 text-slate">
          Something else?{" "}
          <Link href="#" className="font-semibold text-ink underline decoration-teal decoration-2 underline-offset-4">Tell us about your business →</Link>
        </p>
      </div>
    </section>
  );
}
