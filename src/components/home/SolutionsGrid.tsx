import Link from "next/link";
import { solutions } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight, solutionIcon } from "@/components/ui/Icons";

/** Software range as a plain card grid. */
export function SolutionsGrid() {
  return (
    <section id="solutions" className="scroll-mt-24 border-t border-line bg-cloud py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="tag">Our software</p>
            <h2 className="h2 mt-3 text-ink">Pick what you need today. Add the rest later.</h2>
            <p lang="bn" className="bn mt-2 text-lg text-slate">আপনার ব্যবসার প্রতিটি কাজের জন্য সফটওয়্যার</p>
          </div>
          <ButtonLink href="#" variant="outline" className="self-start lg:self-auto">All software</ButtonLink>
        </div>

        <ul data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => {
            const Icon = solutionIcon[s.slug];
            return (
              <li key={s.slug}>
                <Link href="#" className="card card-hover group flex h-full flex-col p-7">
                  <span className="icon-box">{Icon && <Icon width={21} height={21} />}</span>
                  <h3 className="h3 mt-5 text-ink">{s.name}</h3>
                  <p lang="bn" className="bn text-[0.92rem] text-slate">{s.bn}</p>
                  <p className="mt-3 text-[0.95rem] text-slate">{s.short}</p>
                  <p className="mt-4 text-[0.85rem] text-ink/70">{s.modules.slice(0, 4).map((m) => m.title).join(" · ")}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.92rem] font-semibold text-ink">
                    Learn more <IconArrowRight width={15} height={15} className="text-ink/40 group-hover:text-ink" />
                  </span>
                </Link>
              </li>
            );
          })}
          <li>
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-dashed border-ink/20 p-7">
              <div>
                <h3 className="h3 text-ink">Need something that isn&apos;t on this list?</h3>
                <p className="mt-3 text-[0.95rem] text-slate">We build custom software too, from a single workflow to a full product.</p>
              </div>
              <ButtonLink href="#" variant="primary" size="md" className="self-start">Talk to an engineer</ButtonLink>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
