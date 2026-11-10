"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SceneApi } from "./scene";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky WebGL backdrop for a [data-morph-root] wrapper.
 * Each child marked [data-morph-step="n"] re-forms the particles into shape n while it is centred.
 * [data-morph-side="right"] on a step pushes the shape right on wide screens (text on the left).
 * The scene loads after first paint, pauses when off-screen, and degrades to the CSS glow without WebGL.
 */
export function MorphCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const root = canvas?.closest<HTMLElement>("[data-morph-root]");
    if (!canvas || !root) return;

    let api: SceneApi | null = null;
    let disposed = false;
    const triggers: ScrollTrigger[] = [];
    let io: IntersectionObserver | null = null;

    const start = async () => {
      const probe = document.createElement("canvas");
      if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
      const { createScene } = await import("./scene");
      if (disposed) return;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      api = createScene(canvas, {
        reduced,
        tween: (target, to, duration) => gsap.to(target, { value: to, duration, ease: "power3.inOut", overwrite: true }),
      });
      gsap.to(canvas, { opacity: 1, duration: 1.6, ease: "power2.out" });

      const wide = matchMedia("(min-width: 1024px)");
      const offsetFor = (el: HTMLElement) => (wide.matches && el.dataset.morphSide === "right" ? 2.1 : 0);

      root.querySelectorAll<HTMLElement>("[data-morph-step]").forEach((el) => {
        const step = Number(el.dataset.morphStep) || 0;
        const activate = () => {
          api?.setStep(step);
          api?.setOffset(offsetFor(el));
        };
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: activate,
            onEnterBack: activate,
          }),
        );
        if (step === 0) api?.setOffset(offsetFor(el));
      });

      io = new IntersectionObserver(([e]) => api?.setActive(e.isIntersecting), { rootMargin: "100px" });
      io.observe(root);
    };

    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const handle = idle ? idle(() => void start(), { timeout: 900 }) : window.setTimeout(() => void start(), 200);

    return () => {
      disposed = true;
      if (!idle) clearTimeout(handle);
      triggers.forEach((t) => t.kill());
      io?.disconnect();
      api?.destroy();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="sticky top-0 h-svh w-full overflow-hidden max-lg:opacity-70">
        <canvas ref={ref} className="h-full w-full opacity-0" />
        {/* edge fades so the field melts into the page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      </div>
    </div>
  );
}
