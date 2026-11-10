import { site } from "@/lib/content";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";

/** Always-visible WhatsApp (all screens) + Call button (phones) - the way most local customers reach out. */
export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a
        href={`tel:${site.contact.phone}`}
        aria-label={`Call ${site.contact.phoneDisplay}`}
        className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-lg md:hidden"
      >
        <IconPhone width={24} height={24} />
      </a>
      <a
        href={site.contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-lg sm:pr-5"
      >
        <IconWhatsApp width={28} height={28} />
        <span className="hidden font-semibold sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
