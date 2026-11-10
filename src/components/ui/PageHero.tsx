import Link from "next/link";
import type { ReactNode } from "react";

/** Inner-page banner on the dark stage: breadcrumb, split-in title (+ Bangla line), intro, actions, optional visual. */
export function PageHero({
  eyebrow,
  title,
  bn,
  intro,
  crumbs,
  actions,
  aside,
}: {
  eyebrow: string;
  title: string[];
  bn?: string;
  intro?: ReactNode;
  crumbs?: { label: string; href: string }[];
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  const trail = crumbs ?? [{ label: eyebrow, href: "" }];
  return (
    <section className="bg-grid-dark relative overflow-hidden text-white">
      <div aria-hidden="true" data-parallax="0.3" className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgb(0_212_199/0.2),rgb(139_92_246/0.1)_45%,transparent_70%)]" />
      <div className={`container-x relative grid gap-12 pb-20 pt-16 sm:pb-28 sm:pt-24 ${aside ? "lg:grid-cols-[1.05fr_1fr] lg:items-center" : ""}`}>
        <div>
          <nav data-hero-in="0" aria-label="Breadcrumb" className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/45">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="#" className="hover:text-teal">Home</Link></li>
              {trail.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {i === trail.length - 1 || !c.href ? (
                    <span aria-current="page" className="text-teal">{c.label}</span>
                  ) : (
                    <Link href="#" className="hover:text-teal">{c.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 data-split="load" className="h1 mt-7 max-w-[16ch]">{title.join(" ")}</h1>
          {bn && <p data-hero-in="1" lang="bn" className="bn mt-4 text-xl text-teal">{bn}</p>}
          {intro && <p data-hero-in="2" className="lede mt-5 max-w-2xl text-white/65">{intro}</p>}
          {actions && <div data-hero-in="3" className="mt-9 flex flex-wrap gap-3 [&_a[class*='ring-ink']]:text-white [&_a[class*='ring-ink']]:ring-white/30">{actions}</div>}
        </div>
        {aside && <div data-hero-in="2" className="relative">{aside}</div>}
      </div>
    </section>
  );
}
