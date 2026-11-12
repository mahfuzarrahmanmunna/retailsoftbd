import Link from "next/link";
import type { ReactNode } from "react";

/** Inner-page banner: breadcrumb, title (+ Bangla line), intro, actions, optional visual. Light and still. */
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
    <section className="border-b border-line bg-white text-ink">
      <div className={`container-x grid gap-12 pb-16 pt-12 sm:pb-20 sm:pt-16 ${aside ? "lg:grid-cols-[1.05fr_1fr] lg:items-center" : ""}`}>
        <div>
          <nav aria-label="Breadcrumb" className="text-[0.85rem] text-slate">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="#" className="hover:text-ink">Home</Link></li>
              {trail.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {i === trail.length - 1 || !c.href ? (
                    <span aria-current="page" className="text-ink">{c.label}</span>
                  ) : (
                    <Link href="#" className="hover:text-ink">{c.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="h1 mt-5 max-w-[18ch]">{title.join(" ")}</h1>
          {bn && <p lang="bn" className="bn mt-3 text-xl text-slate">{bn}</p>}
          {intro && <p className="lede mt-4 max-w-2xl text-slate">{intro}</p>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </div>
    </section>
  );
}
