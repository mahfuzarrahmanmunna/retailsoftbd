import { phases } from "@/lib/content";
import { DemoButton } from "@/components/demo/DemoButton";

const bnDigits = ["১", "২", "৩", "৪"];

/** Sticky heading + a simple four-step timeline. */
export function ProcessStack() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-line bg-white py-20 sm:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="tag">How we work</p>
          <h2 className="h2 mt-3 max-w-[14ch] text-ink">Four steps. No surprises.</h2>
          <p lang="bn" className="bn mt-2 text-lg text-slate">মাত্র ৪টি সহজ ধাপে আপনার সফটওয়্যার</p>
          <p className="mt-4 max-w-md text-slate">
            No confusing technical talk. You see working screens early, your staff tries them before launch, and we stay
            on after go-live.
          </p>
          <DemoButton className="mt-7">Start with step one</DemoButton>
        </div>

        <ol className="relative">
          <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-line" />
          {phases.map((p, i) => (
            <li key={p.name} data-reveal className="relative grid grid-cols-[40px_1fr] gap-6 pb-12 last:pb-0">
              <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-sm font-semibold text-ink shadow-[0_0_0_6px_#fff]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5">
                <p className="text-[0.8rem] font-medium text-slate">
                  Step {i + 1} <span lang="bn" className="bn">· ধাপ {bnDigits[i]}</span>
                </p>
                <h3 className="mt-1 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{p.name}</h3>
                <p lang="bn" className="bn mt-0.5 text-slate">{p.bn}</p>
                <p className="mt-2 text-slate">{p.body}</p>
                <div className="mt-5 grid gap-4 rounded-xl border border-line bg-cloud/60 p-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.8rem] font-semibold text-ink">You get</p>
                    <ul className="mt-2 space-y-1 text-[0.95rem] text-ink/85">
                      {p.deliverables.map((d) => (
                        <li key={d} className="flex gap-2"><span className="text-slate">-</span>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[0.8rem] font-semibold text-ink">Who&apos;s involved</p>
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
