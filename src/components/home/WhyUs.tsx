import { whyUs } from "@/lib/content";
import { whyIcons } from "@/components/ui/Icons";

/** Short statement, then the six reasons as a simple grid. */
export function WhyUs() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="tag">Why Retail Soft</p>
          <p className="h2 mt-3 text-ink">
            We&apos;re a Dhaka team. We visit your business, learn how it really runs, build around it, and pick up the
            phone after launch.
          </p>
          <p lang="bn" className="bn mt-3 text-lg text-slate">কেন আমাদের বেছে নেবেন</p>
        </div>

        <ul data-stagger className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => {
            const Icon = whyIcons[i];
            return (
              <li key={w.title} className="border-t border-line pt-6">
                <span className="text-teal-text">{Icon && <Icon width={22} height={22} />}</span>
                <h3 className="h3 mt-4 text-ink">{w.title}</h3>
                <p lang="bn" className="bn text-[0.92rem] text-slate">{w.bn}</p>
                <p className="mt-2 text-[0.95rem] text-slate">{w.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
