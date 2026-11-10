import { site } from "@/lib/content";
import { DemoButton } from "@/components/demo/DemoButton";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";

export function FinalCTA({
  title = ["Want to see how it works for your business?"],
  bn = "আজই আমাদের সাথে কথা বলুন",
  body = "Call us, send a WhatsApp message, or request a demo. A solution specialist will understand your needs and suggest a practical next step.",
  primary = "Get a Demo",
}: {
  title?: string[];
  bn?: string;
  body?: string;
  primary?: string;
}) {
  return (
    <section className="bg-grid-dark relative overflow-hidden py-24 text-white sm:py-32">
      <div aria-hidden="true" data-parallax="0.3" className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(0_212_199/0.16),rgb(139_92_246/0.08)_40%,transparent_68%)]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="tag !text-white/50">Let&apos;s talk</p>
          <h2 data-split className="mt-5 font-display text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[1] tracking-[-0.045em]">
            {title.join(" ")}
          </h2>
          <p lang="bn" className="bn mt-4 text-xl text-teal">{bn}</p>
          <p className="lede mt-4 max-w-xl text-white/65">{body}</p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            <a href={`tel:${site.contact.phone}`} className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/10">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal text-ink [animation:pulse-ring_2.4s_infinite]">
                <IconPhone width={22} height={22} />
              </span>
              <span>
                <span className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/45">Hotline</span>
                <span className="block text-lg font-semibold">{site.contact.phoneDisplay}</span>
              </span>
            </a>
            <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/10">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-whatsapp text-white">
                <IconWhatsApp width={22} height={22} />
              </span>
              <span>
                <span className="block font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/45">WhatsApp</span>
                <span className="block text-lg font-semibold">Message us</span>
              </span>
            </a>
          </div>
          <p className="mt-4 font-mono text-xs text-white/40">{site.contact.hours}</p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <span data-magnetic className="inline-block">
            <DemoButton
              unstyled
              className="group relative grid h-56 w-56 cursor-pointer place-items-center rounded-full bg-teal text-center font-display text-xl font-semibold text-ink shadow-[0_0_80px_-10px_rgb(0_212_199/0.7)] transition-transform duration-500 hover:scale-105 sm:h-64 sm:w-64"
            >
              <span aria-hidden="true" className="absolute inset-[-14px] rounded-full border border-teal/30" />
              <span aria-hidden="true" className="absolute inset-[-30px] rounded-full border border-teal/10" />
              <span className="flex flex-col items-center gap-2">
                {primary}
                <span className="text-3xl transition-transform duration-500 group-hover:translate-x-1.5">→</span>
              </span>
            </DemoButton>
          </span>
        </div>
      </div>
    </section>
  );
}
