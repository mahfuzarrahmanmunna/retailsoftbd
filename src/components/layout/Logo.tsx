import Link from "next/link";
import { site } from "@/lib/content";

/** Interim logo mark - replace with the approved SVG logo before launch. */
export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Link href="#" aria-label={`${site.name} - home`} className="group flex shrink-0 items-center gap-2.5">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(140deg,#00d4c7,#8b5cf6)] font-display text-xl font-bold text-void">
        <span className="relative z-10">R</span>
        <span aria-hidden="true" className="absolute inset-0 translate-y-full bg-white/30 transition-transform duration-500 group-hover:translate-y-0" />
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-xl font-semibold tracking-[-0.03em] ${light ? "text-white" : "text-ink"}`}>
          Retail<span className={light ? "text-teal" : "text-teal-text"}>Soft</span>
        </span>
        {!compact && <span className={`block font-mono text-[0.62rem] uppercase tracking-[0.12em] ${light ? "text-white/45" : "text-slate"}`}>A concern of {site.parent}</span>}
      </span>
    </Link>
  );
}
