import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow={title} title={[title]} />
      <section className="bg-white py-14 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 rounded-lg border border-[#f4b400]/40 bg-[#fff7e0] p-4 text-sm text-[#7a5600]">
              Draft for legal review - this text must be reviewed and approved by Retail Solutions Ltd. before launch.
            </p>
            <div className="prose-legal space-y-5 text-slate">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
