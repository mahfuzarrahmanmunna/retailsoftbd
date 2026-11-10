import Link from "next/link";
import { IconCheck } from "@/components/ui/Icons";

/** Sample UI strings shown in each chapter's readout - illustrative only. */
const chapters = [
  {
    shape: 1,
    tag: "Sell",
    title: "Bill fast at the counter.",
    bn: "দ্রুত বিলিং, নির্ভুল হিসাব",
    body: "Scan, bill and take payment in seconds - cash, card or mobile banking. Every sale updates stock and accounts on its own.",
    points: ["Barcode billing & receipts", "Cash, card, bKash & Nagad", "Returns & exchanges"],
    readout: [["INV-04182", "৳ 1,240"], ["Paid", "bKash ✓"], ["Stock", "−3 items"]],
    link: { label: "Retail POS", href: "#" },
  },
  {
    shape: 2,
    tag: "Stock",
    title: "Know what's on every shelf.",
    bn: "প্রতিটি পণ্যের সঠিক হিসাব",
    body: "Every warehouse, branch and rack in one view. Get warned before something runs out - not after a customer asks for it.",
    points: ["Multi-warehouse & branches", "Low-stock alerts", "Transfers with a full audit trail"],
    readout: [["SKU 2231", "12 left"], ["Reorder at", "15"], ["Status", "⚠ Low"]],
    link: { label: "Inventory & Warehouse", href: "#" },
  },
  {
    shape: 3,
    tag: "Numbers",
    title: "See today's numbers today.",
    bn: "আজকের হিসাব, আজকেই",
    body: "Sales, purchases, expenses and profit - by branch, product or staff member - on your computer or your phone.",
    points: ["Daily sales & profit", "Accounts, purchases & dues", "Dashboards for owners"],
    readout: [["Today", "Branch 2"], ["Sales", "৳ 2,48,600"], ["Trend", "▲ rising"]],
    link: { label: "ERP & CRM", href: "#" },
  },
  {
    shape: 4,
    tag: "Grow",
    title: "Add branches without starting over.",
    bn: "ব্যবসা বাড়ান, সিস্টেম বদলাতে হবে না",
    body: "Open a new outlet, launch an online shop or add a factory line. The same system grows with you - one login, one set of numbers.",
    points: ["Central prices & stock control", "Online shop on the same stock", "Role-based access per branch"],
    readout: [["Branches", "1 → 6"], ["Online", "Connected"], ["Login", "One system"]],
    link: { label: "E-commerce & Websites", href: "#" },
  },
];

/** Scroll story over the particle field: each chapter re-forms the particles into its shape. */
export function Story() {
  return (
    <section aria-labelledby="story-title" className="relative z-10">
      <div className="container-x pt-24 sm:pt-32">
        <p className="tag !text-white/50">One connected system</p>
        <h2 id="story-title" data-split className="h2 mt-5 max-w-[16ch] text-white">
          Every counter, shelf and ledger - <span className="text-gradient">in one place.</span>
        </h2>
      </div>

      {chapters.map((c, i) => (
        <div key={c.tag} data-morph-step={c.shape} data-morph-side="right" className="container-x flex min-h-svh items-center py-16">
          <article data-reveal className="glass w-full max-w-[540px] rounded-[28px] p-7 text-white max-lg:bg-void/85 sm:p-10">
            <div className="flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.16em]">
              <span className="text-teal">{String(i + 1).padStart(2, "0")} - {c.tag}</span>
              <span className="text-white/35">{String(i + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-6 font-display text-[clamp(1.9rem,2.4vw+1rem,2.9rem)] font-semibold leading-[1.05] tracking-[-0.035em]">{c.title}</h3>
            <p lang="bn" className="bn mt-2 text-lg text-teal/90">{c.bn}</p>
            <p className="mt-4 text-white/70">{c.body}</p>

            <ul className="mt-6 grid gap-2.5">
              {c.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white/90">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-teal/15 text-teal">
                    <IconCheck width={14} height={14} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            {/* live-looking readout (sample data) */}
            <dl className="mt-7 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30 font-mono text-[0.78rem]">
              {c.readout.map(([k, v]) => (
                <div key={k} className="border-r border-white/10 px-3.5 py-3 last:border-r-0">
                  <dt className="text-[0.66rem] uppercase tracking-[0.14em] text-white/40">{k}</dt>
                  <dd className="mt-1 truncate text-white">{v}</dd>
                </div>
              ))}
            </dl>

            <Link href={c.link.href} className="group mt-7 inline-flex items-center gap-2 font-semibold text-white">
              <span className="border-b border-white/30 pb-0.5 transition-colors group-hover:border-teal">Explore {c.link.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </article>
        </div>
      ))}
    </section>
  );
}
