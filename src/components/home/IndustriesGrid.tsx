import Link from "next/link";
import { IndustryList } from "@/components/home/IndustryList";

export function IndustriesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="border-t border-line bg-cloud py-20 sm:py-28">
      <div className="container-x">
        {heading && (
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="tag">Industries</p>
              <h2 className="h2 mt-3 max-w-[16ch] text-ink">Made for your type of business.</h2>
              <p lang="bn" className="bn mt-2 text-lg text-slate">আপনার ব্যবসার ধরন অনুযায়ী সমাধান</p>
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
          <Link href="#" className="font-semibold text-ink underline decoration-line underline-offset-4">Tell us about your business →</Link>
        </p>
      </div>
    </section>
  );
}
