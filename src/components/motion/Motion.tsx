"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Minimal motion layer. Elements opt in with:
 *
 *   data-reveal    fades up softly the first time it scrolls into view
 *   data-stagger   each direct child fades up, a little after the previous one
 *
 * No smooth-scroll hijacking, no 3D, no cursor effects. Reduced-motion visitors see everything at once.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      root.classList.remove("motion");
      return;
    }
    root.classList.add("motion");

    const targets: HTMLElement[] = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
      ...[...document.querySelectorAll<HTMLElement>("[data-stagger]")].flatMap((group) =>
        [...group.children].map((child, i) => {
          (child as HTMLElement).style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
          return child as HTMLElement;
        }),
      ),
    ];

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    root.classList.add("motion-ready");

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
