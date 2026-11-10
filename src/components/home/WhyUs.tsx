import { whyUs } from "@/lib/content";
import { whyIcons } from "@/components/ui/Icons";

/** Statement that lights up word by word as you scroll, then the six reasons. */
export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-cloud py-24 sm:py-36">
      <div aria-hidden="true" data-parallax="0.4" className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgb(0_212_199/0.18),transparent_65%)]" />
      <div className="container-x relative">
        <p className="tag">Why Retail Soft</p>
        <p data-scrub-words className="mt-8 max-w-[22ch] font-display text-[clamp(2rem,4.2vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink">
          We&apos;re a Dhaka team. We visit your business, learn how it really runs, build around it - and pick up the phone after launch.
        </p>
        <p lang="bn" className="bn mt-6 text-xl text-teal-text">কেন আমাদের বেছে নেবেন</p>

        <ul data-stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => {
            const Icon = whyIcons[i];
            return (
              <li key={w.title} className="spotlight group overflow-hidden rounded-[24px] border border-line bg-white p-7 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-ink/15">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-teal transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
                    <Icon width={22} height={22} />
                  </span>
                  <span className="font-mono text-xs tracking-[0.16em] text-slate/70">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="h3 mt-7 text-ink">{w.title}</h3>
                <p lang="bn" className="bn text-[0.95rem] text-teal-text">{w.bn}</p>
                <p className="mt-3 text-slate">{w.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
