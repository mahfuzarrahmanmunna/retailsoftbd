import Link from "next/link";
import { solutions } from "@/lib/content";
import { Mockup } from "@/components/mockups/Mockup";
import { ButtonLink } from "@/components/ui/Button";
import { solutionIcon } from "@/components/ui/Icons";

/** Software range - a pinned horizontal gallery on desktop, a stacked list on mobile. */
export function SolutionsGrid() {
  return (
    <section id="solutions" data-hscroll className="relative scroll-mt-24 overflow-hidden bg-white lg:flex lg:h-svh lg:flex-col lg:justify-center">
      <div className="container-x flex flex-col gap-6 pt-20 sm:pt-28 lg:flex-row lg:items-end lg:justify-between lg:pt-10">
        <div>
          <p className="tag">Our software</p>
          <h2 data-split className="h2 mt-4 max-w-[18ch] text-ink">Pick what you need today. Add the rest later.</h2>
          <p lang="bn" className="bn mt-3 text-lg text-teal-text">আপনার ব্যবসার প্রতিটি কাজের জন্য সফটওয়্যার</p>
        </div>
        <div className="flex items-center gap-5">
          <p className="hidden max-w-[16rem] text-sm text-slate xl:block">Everything shares one database - no typing the same data twice.</p>
          <ButtonLink href="#" variant="outline" arrow>All software</ButtonLink>
        </div>
      </div>

      <div className="mt-10 pb-20 sm:pb-28 lg:mt-12 lg:pb-10">
        <ul data-hscroll-track className="flex flex-col gap-5 px-[var(--gutter)] lg:w-max lg:flex-row lg:gap-6 lg:pl-[max(var(--gutter),calc((100vw-1320px)/2+var(--gutter)))]">
          {solutions.map((s, i) => {
            const Icon = solutionIcon[s.slug];
            return (
              <li key={s.slug} className="lg:w-[min(600px,46vw)]">
                <Link
                  href="#"
                  className="spotlight group grid h-full gap-6 overflow-hidden rounded-[28px] border border-line bg-cloud p-6 transition-colors duration-500 hover:border-ink/20 sm:p-8 lg:grid-rows-[auto_1fr]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="font-mono text-xs tracking-[0.16em] text-slate">{String(i + 1).padStart(2, "0")} / {String(solutions.length).padStart(2, "0")}</span>
                      <h3 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-ink">{s.name}</h3>
                      <p lang="bn" className="bn text-[0.95rem] text-teal-text">{s.bn}</p>
                      <p className="mt-3 max-w-md text-slate">{s.short}</p>
                    </div>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-teal transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-rotate-45">
                      <Icon width={24} height={24} />
                    </span>
                  </div>
                  <div className="relative">
                    <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:scale-[1.015]">
                      <Mockup kind={s.mockup} tone="light" className="w-full" />
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.modules.slice(0, 4).map((m) => (
                        <li key={m.title} className="rounded-full border border-ink/10 bg-white px-3 py-1 text-[0.82rem] font-medium text-ink/75">{m.title}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            );
          })}
          {/* end card */}
          <li className="lg:w-[min(420px,34vw)]">
            <div className="flex h-full flex-col justify-between gap-10 rounded-[28px] bg-ink p-8 text-white">
              <p className="font-display text-[1.9rem] font-semibold leading-tight tracking-[-0.03em]">
                Need something that isn&apos;t on this list?
              </p>
              <div>
                <p className="text-white/65">We build custom software from scratch too - from a single workflow to a full product.</p>
                <ButtonLink href="#" className="mt-6" arrow>Talk to an engineer</ButtonLink>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
