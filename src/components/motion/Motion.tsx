"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Site-wide motion layer (GSAP + Lenis). Pages stay server components and opt in with attributes:
 *
 *   data-hero-in="n"     entrance on page load, ordered by n
 *   data-split           heading lines rise out of a mask when scrolled into view ("load" = on page load)
 *   data-reveal          fade + rise into view
 *   data-stagger         children reveal one after another
 *   data-scrub-words     words brighten one by one as you scroll through the paragraph
 *   data-parallax="0.2"  drifts against the scroll
 *   data-magnetic        pulls toward the cursor (fine pointers)
 *   data-tilt="8"        3D tilt toward the cursor (fine pointers)
 *   data-hscroll         pinned horizontal scroll; the moving row is [data-hscroll-track] (desktop)
 *   data-progress        scaleY 0→1 while its parent scrolls through the viewport
 *   .spotlight           radial glow follows the cursor
 *
 * Reduced-motion visitors get static, fully visible content and native scrolling.
 */
export function Motion() {
  const pathname = usePathname();

  // Smooth scroll, synced to GSAP's ticker - set up once.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.09,
      anchors: { offset: -90 },
      prevent: (node) => Boolean(node.closest?.("dialog, [data-lenis-prevent]")),
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Pause page scrolling while the demo popup or mobile menu is open.
    const mo = new MutationObserver(() => {
      const locked = document.querySelector("dialog[open]") || document.documentElement.style.overflow === "hidden";
      if (locked) lenis.stop();
      else lenis.start();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    mo.observe(document.body, { attributes: true, attributeFilter: ["open"], subtree: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Cursor spotlight - one delegated listener.
    const spot = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(".spotlight");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", spot, { passive: true });

    return () => {
      document.removeEventListener("pointermove", spot);
      mo.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Per-route animations.
  useEffect(() => {
    const root = document.documentElement;
    (window as unknown as { __lenis?: Lenis }).__lenis?.scrollTo(0, { immediate: true });

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("motion");
      return;
    }
    root.classList.add("motion");

    // Wait until React has hydrated the page: GSAP/SplitText must not touch server HTML that React
    // has not claimed yet, or hydration fails and the tree is re-rendered.
    let ctx: gsap.Context | null = null;
    let cancelled = false;
    const hydrated = () =>
      [...document.querySelectorAll("main [data-split], main [data-hero-in], main [data-reveal], main [data-stagger]")].every((el) =>
        Object.keys(el).some((k) => k.startsWith("__reactFiber")),
      );
    const waitHydrated = (tries = 0) => {
      if (cancelled) return;
      if (hydrated() || tries > 60) init();
      else setTimeout(() => waitHydrated(tries + 1), 50);
    };

    const init = () => {
      ctx = gsap.context(() => {
        // ---- page-load entrance
        const heroIn = gsap.utils.toArray<HTMLElement>("[data-hero-in]").sort((a, b) => Number(a.dataset.heroIn || 0) - Number(b.dataset.heroIn || 0));
        if (heroIn.length) {
          gsap.fromTo(heroIn, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.09, delay: 0.35 });
        }

        // ---- split-line headings
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const onLoad = el.dataset.split === "load";
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(self.lines, {
                yPercent: 112,
                rotate: 2,
                duration: 1.25,
                ease: "expo.out",
                stagger: 0.09,
                delay: onLoad ? 0.15 : 0,
                scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        });

        // ---- simple reveals
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          [...group.children].forEach((c) => c.setAttribute("data-reveal", ""));
        });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
        });

        // ---- scrubbed word highlight
        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(split.words, { opacity: 0.14 }, {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          });
        });

        // ---- parallax
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax) || 0.15;
          gsap.fromTo(el, { yPercent: -speed * 50 }, {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        // ---- progress lines
        gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => {
          gsap.fromTo(el, { scaleY: 0 }, {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top 60%", end: "bottom 60%", scrub: true },
          });
        });

        // ---- desktop-only: horizontal scroll, magnetic, tilt
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((wrap) => {
            const track = wrap.querySelector<HTMLElement>("[data-hscroll-track]");
            if (!track) return;
            const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });
          });
        });
        mm.add("(hover: hover) and (pointer: fine)", () => {
          const offs: (() => void)[] = [];
          gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
            const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
            const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              x((e.clientX - r.left - r.width / 2) * 0.3);
              y((e.clientY - r.top - r.height / 2) * 0.35);
            };
            const leave = () => { x(0); y(0); };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            offs.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
          });
          gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
            const max = Number(el.dataset.tilt) || 8;
            gsap.set(el, { transformPerspective: 1000 });
            const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3" });
            const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3" });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              ry(((e.clientX - r.left) / r.width - 0.5) * max * 2);
              rx(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
            };
            const leave = () => { rx(0); ry(0); };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            offs.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
          });
          return () => offs.forEach((f) => f());
        });
      });

      root.classList.add("motion-ready");
      // Fonts can shift layout after first paint - recalc trigger positions once settled.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    };

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    waitHydrated();

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
