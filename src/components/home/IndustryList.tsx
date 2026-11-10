"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { industries } from "@/lib/content";
import { industryIcon } from "@/components/ui/Icons";

/**
 * Big hover list. On desktop a preview card follows the cursor and swaps content per row;
 * on touch screens each row simply shows its summary inline.
 */
export function IndustryList() {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = card.current;
    const area = wrap.current;
    if (!el || !area || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" });
    const r = gsap.quickTo(el, "rotation", { duration: 0.9, ease: "power3" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      const b = area.getBoundingClientRect();
      x(e.clientX - b.left + 28);
      y(e.clientY - b.top - 120);
      r(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
    };
    area.addEventListener("pointermove", move);
    return () => area.removeEventListener("pointermove", move);
  }, []);

  const show = active !== null ? industries[active] : null;
  const ShowIcon = show ? industryIcon[show.slug] : null;

  return (
    <div ref={wrap} className="relative" onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-ink/15">
        {industries.map((ind, i) => {
          const Icon = industryIcon[ind.slug];
          const dim = active !== null && active !== i;
          return (
            <li key={ind.slug} className="border-b border-ink/15">
              <Link
                href="#"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 transition-opacity duration-500 sm:gap-8 sm:py-8 ${dim ? "lg:opacity-30" : ""}`}
              >
                <span className="font-mono text-xs tracking-[0.16em] text-slate">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span className="font-display text-[clamp(1.6rem,3.6vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                      {ind.name}
                    </span>
                    <span lang="bn" className="bn text-[0.95rem] text-teal-text">{ind.bn}</span>
                  </span>
                  <span className="mt-2 block text-slate lg:hidden">{ind.hero}</span>
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:-rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-teal">
                  <Icon width={20} height={20} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* cursor-follow preview (desktop) */}
      <div
        ref={card}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 z-20 hidden w-[340px] rounded-[24px] bg-ink p-6 text-white shadow-[0_30px_60px_-20px_rgb(4_7_13/0.6)] transition-[opacity,scale] duration-300 lg:block ${show ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >
        {show && ShowIcon && (
          <>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal text-ink"><ShowIcon width={22} height={22} /></span>
            <p className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight">{show.hero}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {show.scope.slice(0, 5).map((s) => (
                <li key={s} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80">{s}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
