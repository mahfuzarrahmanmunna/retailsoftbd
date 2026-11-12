import Link from "next/link";
import { industries } from "@/lib/content";
import { IconArrowRight, industryIcon } from "@/components/ui/Icons";

/** Industries as a plain, scannable grid. */
export function IndustryList() {
  return (
    <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind) => {
        const Icon = industryIcon[ind.slug];
        return (
          <li key={ind.slug}>
            <Link href="#" className="card card-hover group flex h-full items-start gap-4 p-6">
              <span className="icon-box">{Icon && <Icon width={20} height={20} />}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3">
                  <span className="font-display text-[1.08rem] font-semibold text-ink">{ind.name}</span>
                  <IconArrowRight width={15} height={15} className="shrink-0 text-ink/30 group-hover:text-ink" />
                </span>
                <span lang="bn" className="bn block text-[0.9rem] text-slate">{ind.bn}</span>
                <span className="mt-2 block text-[0.92rem] leading-relaxed text-slate">{ind.hero}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
