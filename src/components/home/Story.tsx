import Link from "next/link";
import { IconCheck } from "@/components/ui/Icons";

const chapters = [
  {
    tag: "Sell",
    title: "Bill fast at the counter.",
    bn: "দ্রুত বিলিং, নির্ভুল হিসাব",
    body: "Scan, bill and take payment in seconds - cash, card or mobile banking. Every sale updates stock and accounts on its own.",
    points: ["Barcode billing & receipts", "Cash, card, bKash & Nagad", "Returns & exchanges"],
    link: { label: "Retail POS", href: "#" },
  },
  {
    tag: "Stock",
    title: "Know what's on every shelf.",
    bn: "প্রতিটি পণ্যের সঠিক হিসাব",
    body: "Every warehouse, branch and rack in one view. Get warned before something runs out - not after a customer asks for it.",
    points: ["Multi-warehouse & branches", "Low-stock alerts", "Transfers with a full audit trail"],
    link: { label: "Inventory & Warehouse", href: "#" },
  },
  {
    tag: "Numbers",
    title: "See today's numbers today.",
    bn: "আজকের হিসাব, আজকেই",
    body: "Sales, purchases, expenses and profit - by branch, product or staff member - on your computer or your phone.",
    points: ["Daily sales & profit", "Accounts, purchases & dues", "Dashboards for owners"],
    link: { label: "ERP & CRM", href: "#" },
  },
  {
    tag: "Grow",
    title: "Add branches without starting over.",
    bn: "ব্যবসা বাড়ান, সিস্টেম বদলাতে হবে না",
    body: "Open a new outlet, launch an online shop or add a factory line. The same system grows with you - one login, one set of numbers.",
    points: ["Central prices & stock control", "Online shop on the same stock", "Role-based access per branch"],
    link: { label: "E-commerce & Websites", href: "#" },
  },
];

/** Four everyday jobs the system handles, side by side. */
export function Story() {
  return (
    <section aria-labelledby="story-title" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="tag">One connected system</p>
          <h2 id="story-title" className="h2 mt-3 text-ink">Every counter, shelf and ledger in one place.</h2>
          <p className="lede mt-4 text-slate">Sales, stock and accounts share the same data, so nobody types the same thing twice.</p>
        </div>

        <ol data-stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {chapters.map((c, i) => (
            <li key={c.tag} className="flex flex-col bg-white p-7">
              <p className="text-[0.8rem] font-semibold text-teal-text">
                {String(i + 1).padStart(2, "0")} &middot; {c.tag}
              </p>
              <h3 className="h3 mt-3 text-ink">{c.title}</h3>
              <p lang="bn" className="bn mt-1 text-[0.92rem] text-slate">{c.bn}</p>
              <p className="mt-3 text-[0.95rem] text-slate">{c.body}</p>
              <ul className="mt-5 space-y-2 text-[0.92rem] text-ink/85">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <IconCheck width={15} height={15} strokeWidth={2.5} className="mt-1 shrink-0 text-teal-text" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link href={c.link.href} className="mt-auto pt-6 text-[0.92rem] font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                {c.link.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
