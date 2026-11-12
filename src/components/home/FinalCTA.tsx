import { site } from "@/lib/content";
import { DemoButton } from "@/components/demo/DemoButton";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";

export function FinalCTA({
  title = ["Want to see how it works for your business?"],
  bn = "আজই আমাদের সাথে কথা বলুন",
  body = "Call us, send a WhatsApp message, or request a demo. A solution specialist will understand your needs and suggest a practical next step.",
  primary = "Get a demo",
}: {
  title?: string[];
  bn?: string;
  body?: string;
  primary?: string;
}) {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="grid items-center gap-10 rounded-2xl bg-ink px-7 py-12 text-white sm:px-12 sm:py-14 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <h2 className="h2">{title.join(" ")}</h2>
            <p lang="bn" className="bn mt-2 text-lg text-white/70">{bn}</p>
            <p className="mt-4 max-w-xl text-white/65">{body}</p>
          </div>

          <div className="flex flex-col gap-3">
            <DemoButton variant="white" className="w-full">{primary}</DemoButton>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${site.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/10"
              >
                <IconPhone width={17} height={17} /> Call
              </a>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/10"
              >
                <IconWhatsApp width={17} height={17} /> WhatsApp
              </a>
            </div>
            <p className="text-center text-[0.85rem] text-white/50">
              {site.contact.phoneDisplay} · {site.contact.hours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
