import { phases } from "@/lib/content";
import { DemoButton } from "@/components/demo/DemoButton";

const bnDigits = ["১", "২", "৩", "৪"];

/** Sticky heading + a timeline whose line fills as you scroll through the four steps. */
export function ProcessStack() {
  return (
    <section id="process" className="scroll-mt-24 bg-white py-24 sm:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="tag">How we work</p>
          <h2 data-split className="h2 mt-4 max-w-[12ch] text-ink">Four steps. No surprises.</h2>
          <p lang="bn" className="bn mt-3 text-lg text-teal-text">মাত্র ৪টি সহজ ধাপে আপনার সফটওয়্যার</p>
          <p className="lede mt-5 max-w-md text-slate">
            No confusing technical talk. You see working screens early, your staff tries them before launch, and we stay
            on after go-live.
          </p>
          <DemoButton arrow className="mt-8">Start with step one</DemoButton>
        </div>

        <ol className="relative">
          {/* rail + scrubbed fill */}
          <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px bg-line" />
          <span aria-hidden="true" data-progress className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-teal to-iris" />
          {phases.map((p, i) => (
            <li key={p.name} data-reveal className="relative grid grid-cols-[56px_1fr] gap-6 pb-14 last:pb-0">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-line bg-white font-mono text-sm font-medium text-ink shadow-[0_0_0_8px_#fff]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-2">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-slate">
                  Step {i + 1} <span lang="bn" className="bn normal-case tracking-normal">· ধাপ {bnDigits[i]}</span>
                </p>
                <h3 className="mt-2 font-display text-[2rem] font-semibold leading-none tracking-[-0.035em] text-ink">{p.name}</h3>
                <p lang="bn" className="bn mt-1 text-teal-text">{p.bn}</p>
                <p className="mt-3 text-lg text-slate">{p.body}</p>
                <div className="mt-5 grid gap-4 rounded-[20px] border border-line bg-cloud p-5 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate">You get</p>
                    <ul className="mt-2 space-y-1 text-[0.95rem] text-ink/85">
                      {p.deliverables.map((d) => (
                        <li key={d} className="flex gap-2"><span className="text-teal-text">→</span>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate">Who&apos;s involved</p>
                    <p className="mt-2 text-[0.95rem] text-ink/85">{p.involvement}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
