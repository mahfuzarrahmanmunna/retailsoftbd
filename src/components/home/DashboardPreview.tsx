"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Interactive product preview for the homepage banner.
 * The sidebar works like tabs: each item swaps the screen in place (no page change).
 * All figures are illustrative sample data.
 */

type ViewId = "dashboard" | "sales" | "stock" | "purchases" | "accounts" | "reports";

const tabs: { id: ViewId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "sales", label: "Sales" },
  { id: "stock", label: "Stock" },
  { id: "purchases", label: "Purchases" },
  { id: "accounts", label: "Accounts" },
  { id: "reports", label: "Reports" },
];

export function DashboardPreview() {
  const [active, setActive] = useState<ViewId>("dashboard");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = tabs.find((t) => t.id === active)!;

  // Arrow keys move between tabs, like a native tab list.
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number, layout: "side" | "top") => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    refs.current[`${layout}-${next}`]?.focus();
  };

  const tabButton = (t: (typeof tabs)[number], i: number, layout: "side" | "top") => {
    const on = t.id === active;
    return (
      <button
        key={t.id}
        ref={(el) => { refs.current[`${layout}-${i}`] = el; }}
        type="button"
        role="tab"
        id={`dp-tab-${layout}-${t.id}`}
        aria-selected={on}
        aria-controls="dp-panel"
        tabIndex={on ? 0 : -1}
        onClick={() => setActive(t.id)}
        onKeyDown={(e) => onKey(e, i, layout)}
        className={`cursor-pointer whitespace-nowrap rounded-md px-2.5 py-1.5 text-left transition-colors ${
          layout === "side" ? "block w-full" : "shrink-0"
        } ${on ? "bg-teal-50 font-semibold text-teal-text" : "text-slate hover:bg-cloud hover:text-ink"}`}
      >
        {t.label}
      </button>
    );
  };

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-28px_rgb(20_26_34/0.35)]">
      {/* window bar */}
      <div className="flex items-center gap-3 border-b border-line bg-cloud/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </span>
        <span className="flex-1 truncate rounded-md border border-line bg-white px-3 py-1 text-center text-[0.72rem] text-slate">
          app.retailsoft · {current.label}
        </span>
        <span className="hidden text-[0.68rem] text-slate sm:inline">Sample data</span>
      </div>

      {/* top tabs when there's no room for the sidebar */}
      <div role="tablist" aria-label="Preview sections" className="flex gap-1 overflow-x-auto border-b border-line px-3 py-2 text-[0.78rem] sm:hidden lg:flex xl:hidden">
        {tabs.map((t, i) => tabButton(t, i, "top"))}
      </div>

      <div className="grid grid-cols-[auto_1fr] text-ink">
        <div role="tablist" aria-orientation="vertical" aria-label="Preview sections" className="hidden w-36 space-y-0.5 border-r border-line p-3 text-[0.78rem] sm:block lg:hidden xl:block">
          {tabs.map((t, i) => tabButton(t, i, "side"))}
        </div>

        <div id="dp-panel" role="tabpanel" aria-label={current.label} className="min-h-[430px] min-w-0 p-4 sm:min-h-[510px] sm:p-5">
          <View id={active} go={setActive} />
        </div>
      </div>
      <figcaption className="sr-only">Interactive preview of the Retail Soft app with sample data.</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ building blocks */

function Head({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <p className="text-[0.95rem] font-semibold">{title}</p>
      <p className="truncate text-[0.72rem] text-slate">{note}</p>
    </div>
  );
}

type Kpi = { label: string; value: string; note: string; tone?: "warn" | "good"; to?: ViewId };

function Kpis({ items, go }: { items: Kpi[]; go: (v: ViewId) => void }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2.5">
      {items.map((k) => {
        const body = (
          <>
            <span className="block text-[0.7rem] text-slate">{k.label}</span>
            <span className={`mt-1 block whitespace-nowrap text-[0.95rem] font-semibold tabular-nums sm:text-[1.05rem] ${k.tone === "warn" ? "text-[#b54708]" : k.tone === "good" ? "text-teal-text" : ""}`}>
              {k.value}
            </span>
            <span className="mt-0.5 hidden truncate text-[0.66rem] text-slate sm:block">{k.note}</span>
          </>
        );
        return k.to ? (
          <button
            key={k.label}
            type="button"
            onClick={() => go(k.to!)}
            className="cursor-pointer rounded-lg border border-line p-3 text-left transition-colors hover:border-ink/25 hover:bg-cloud/50"
          >
            {body}
          </button>
        ) : (
          <div key={k.label} className="rounded-lg border border-line p-3">{body}</div>
        );
      })}
    </div>
  );
}

function Box({ title, action, children }: { title: string; action?: { label: string; onClick: () => void }; children: ReactNode }) {
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-line text-[0.75rem]">
      <div className="flex items-baseline justify-between border-b border-line bg-cloud/60 px-3 py-2">
        <span className="font-medium text-slate">{title}</span>
        {action && (
          <button type="button" onClick={action.onClick} className="cursor-pointer text-[0.68rem] font-medium text-teal-text hover:underline">
            {action.label}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Bars({ data, unit = "" }: { data: (readonly [string, number])[]; unit?: string }) {
  const max = Math.max(...data.map(([, v]) => v));
  return (
    <div className="flex h-28 items-end gap-2 px-3 pb-2 pt-3" aria-hidden="true">
      {data.map(([d, v], i) => (
        <div key={d} className="flex flex-1 flex-col items-center gap-1.5" title={`${d}: ${v}${unit}`}>
          <div className={`w-full rounded-[3px] ${i === data.length - 1 ? "bg-teal-text" : "bg-teal-100"}`} style={{ height: `${Math.round((v / max) * 76)}px` }} />
          <span className="text-[0.62rem] text-slate">{d}</span>
        </div>
      ))}
    </div>
  );
}

function Rows({ rows, cols }: { rows: ReactNode[][]; cols: string }) {
  return (
    <ul>
      {rows.map((r, i) => (
        <li key={i} className={`grid items-center gap-3 border-b border-line px-3 py-2 last:border-0 ${cols}`}>
          {r.map((c, j) => (
            <span key={j} className={`min-w-0 truncate ${j === 0 ? "font-medium tabular-nums" : j === r.length - 1 ? "text-right font-semibold tabular-nums" : "text-slate"}`}>
              {c}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}

const badge = (text: string, tone: "ok" | "warn" | "bad" | "plain" = "plain") => (
  <span
    className={`rounded px-1.5 py-0.5 text-[0.66rem] font-medium ${
      tone === "ok" ? "bg-teal-50 text-teal-text" : tone === "warn" ? "bg-[#fff4e5] text-[#b54708]" : tone === "bad" ? "bg-[#fdecec] text-[#b42318]" : "bg-cloud text-slate"
    }`}
  >
    {text}
  </span>
);

/* ------------------------------------------------------------------ views */

const week = [["Sat", 48], ["Sun", 62], ["Mon", 55], ["Tue", 70], ["Wed", 66], ["Thu", 84], ["Fri", 92]] as const;
const hours = [["10am", 12], ["12pm", 26], ["2pm", 31], ["4pm", 22], ["6pm", 38], ["8pm", 45]] as const;

function View({ id, go }: { id: ViewId; go: (v: ViewId) => void }) {
  switch (id) {
    case "dashboard":
      return (
        <>
          <Head title="Today · Main branch" note="Updated just now" />
          <Kpis
            go={go}
            items={[
              { label: "Sales", value: "৳ 2,48,600", note: "+12% vs last week", to: "sales" },
              { label: "Invoices", value: "184", note: "31 via bKash/Nagad", to: "sales" },
              { label: "Low stock", value: "6 items", note: "Reorder suggested", tone: "warn", to: "stock" },
            ]}
          />
          <Box title="Sales this week" action={{ label: "View report", onClick: () => go("reports") }}>
            <Bars data={[...week]} />
          </Box>
          <Box title="Recent sales" action={{ label: "View all", onClick: () => go("sales") }}>
            <Rows
              cols="grid-cols-[auto_1fr_auto_auto]"
              rows={[
                ["INV-04182", "Walk-in", badge("bKash"), "৳ 1,240"],
                ["INV-04181", "Rahim Traders", badge("Cash"), "৳ 8,950"],
                ["INV-04180", "Walk-in", badge("Card"), "৳ 3,420"],
              ]}
            />
          </Box>
        </>
      );

    case "sales":
      return (
        <>
          <Head title="Sales · Today" note="Counter 1 & 2" />
          <Kpis
            go={go}
            items={[
              { label: "Total sales", value: "৳ 2,48,600", note: "184 bills" },
              { label: "Average bill", value: "৳ 1,351", note: "+৳ 96 vs yesterday", tone: "good" },
              { label: "Returns", value: "3", note: "৳ 2,150 refunded" },
            ]}
          />
          <Box title="Sales by hour">
            <Bars data={[...hours]} />
          </Box>
          <Box title="Latest bills">
            <Rows
              cols="grid-cols-[auto_1fr_auto_auto]"
              rows={[
                ["INV-04182", "Walk-in", badge("bKash"), "৳ 1,240"],
                ["INV-04181", "Rahim Traders", badge("Cash"), "৳ 8,950"],
                ["INV-04180", "Walk-in", badge("Card"), "৳ 3,420"],
              ]}
            />
          </Box>
        </>
      );

    case "stock":
      return (
        <>
          <Head title="Stock · All locations" note="Main WH · Branch 1 · Branch 2" />
          <Kpis
            go={go}
            items={[
              { label: "Products", value: "1,248", note: "Across 3 locations" },
              { label: "Low stock", value: "6", note: "Below reorder level", tone: "warn" },
              { label: "Out of stock", value: "2", note: "Purchase order drafted", to: "purchases" },
            ]}
          />
          <Box title="Items to watch" action={{ label: "Create PO", onClick: () => go("purchases") }}>
            <Rows
              cols="grid-cols-[auto_1fr_auto_auto]"
              rows={[
                ["SKU-2231", "Cotton shirt · M", badge("Low", "warn"), "12"],
                ["SKU-1187", "Denim jeans · 32", badge("Low", "warn"), "9"],
                ["SKU-3301", "Leather belt", badge("Out", "bad"), "0"],
                ["SKU-1042", "Polo shirt · L", badge("OK", "ok"), "320"],
                ["SKU-0877", "Canvas tote", badge("OK", "ok"), "96"],
              ]}
            />
          </Box>
          <Box title="Transfer · Main WH → Branch 2">
            <div className="px-3 py-3">
              <div className="flex justify-between text-slate"><span>24 items · in transit</span><span className="font-medium text-teal-text">2 of 3 steps</span></div>
              <div className="mt-2 h-1.5 rounded-full bg-ink/10"><div className="h-1.5 w-2/3 rounded-full bg-teal-text" /></div>
            </div>
          </Box>
        </>
      );

    case "purchases":
      return (
        <>
          <Head title="Purchases · This month" note="12 suppliers" />
          <Kpis
            go={go}
            items={[
              { label: "Open orders", value: "9", note: "4 arriving this week" },
              { label: "Due to suppliers", value: "৳ 3,12,000", note: "2 overdue", tone: "warn", to: "accounts" },
              { label: "Received today", value: "4", note: "Stock updated", to: "stock" },
            ]}
          />
          <Box title="Purchase orders">
            <Rows
              cols="grid-cols-[auto_1fr_auto_auto]"
              rows={[
                ["PO-0318", "Karim Textiles", badge("Received", "ok"), "৳ 84,500"],
                ["PO-0317", "Dhaka Leather Co.", badge("Pending", "warn"), "৳ 42,000"],
                ["PO-0316", "Star Packaging", badge("Ordered"), "৳ 18,750"],
                ["PO-0315", "Karim Textiles", badge("Received", "ok"), "৳ 1,12,000"],
                ["PO-0314", "City Garments", badge("Overdue", "bad"), "৳ 54,750"],
              ]}
            />
          </Box>
        </>
      );

    case "accounts":
      return (
        <>
          <Head title="Accounts · Balances" note="As of today" />
          <Kpis
            go={go}
            items={[
              { label: "Cash in hand", value: "৳ 84,300", note: "3 counters" },
              { label: "Bank & mobile", value: "৳ 6,42,000", note: "City Bank · bKash · Nagad" },
              { label: "Customer dues", value: "৳ 1,18,500", note: "14 customers", tone: "warn" },
            ]}
          />
          <Box title="Today's entries">
            <Rows
              cols="grid-cols-[auto_1fr_auto_auto]"
              rows={[
                ["JV-2201", "Sales collection", badge("In", "ok"), "৳ 2,48,600"],
                ["JV-2202", "Paid Karim Textiles", badge("Out"), "৳ 84,500"],
                ["JV-2203", "Shop rent · Branch 2", badge("Out"), "৳ 35,000"],
                ["JV-2204", "Electricity bill", badge("Out"), "৳ 6,420"],
                ["JV-2205", "Due received · Rahim", badge("In", "ok"), "৳ 12,000"],
              ]}
            />
          </Box>
        </>
      );

    case "reports":
      return (
        <>
          <Head title="Reports · This week" note="All branches" />
          <Kpis
            go={go}
            items={[
              { label: "Gross profit", value: "৳ 3,62,150", note: "+8% vs last week", tone: "good" },
              { label: "Margin", value: "24.6%", note: "Target 25%" },
              { label: "Expenses", value: "৳ 98,400", note: "Rent, salary, utilities", to: "accounts" },
            ]}
          />
          <Box title="Sales this week">
            <Bars data={[...week]} />
          </Box>
          <Box title="Sales by branch">
            <div className="space-y-2.5 px-3 py-3">
              {[["Main branch", 100, "৳ 9,84,000"], ["Branch 1", 64, "৳ 6,30,000"], ["Branch 2", 41, "৳ 4,05,000"]].map(([b, w, v]) => (
                <div key={b as string} className="grid grid-cols-[80px_1fr_auto] items-center gap-3">
                  <span className="text-slate">{b}</span>
                  <span className="h-2 rounded-full bg-ink/[0.06]"><span className="block h-2 rounded-full bg-teal-text" style={{ width: `${w}%` }} /></span>
                  <span className="font-semibold tabular-nums">{v}</span>
                </div>
              ))}
            </div>
          </Box>
        </>
      );
  }
}
