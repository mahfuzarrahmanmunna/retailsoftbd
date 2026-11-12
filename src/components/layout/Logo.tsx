import Link from "next/link";
import { site } from "@/lib/content";

/** Interim logo mark - replace with the approved SVG logo before launch. */
export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Link href="#" aria-label={`${site.name} - home`} className="flex shrink-0 items-center gap-2.5">
      <span className={`grid h-9 w-9 place-items-center rounded-lg font-display text-lg font-bold ${light ? "bg-white text-ink" : "bg-ink text-white"}`}>
        R
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[1.15rem] font-semibold tracking-[-0.02em] ${light ? "text-white" : "text-ink"}`}>
          Retail<span className={light ? "text-teal" : "text-teal-text"}>Soft</span>
        </span>
        {!compact && <span className={`block text-[0.7rem] ${light ? "text-white/50" : "text-slate"}`}>A concern of {site.parent}</span>}
      </span>
    </Link>
  );
}
