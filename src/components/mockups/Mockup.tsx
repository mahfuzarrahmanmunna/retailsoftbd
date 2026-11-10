import type { MockupKind } from "@/lib/content";

/**
 * Conceptual interface fragments. These are illustrative UI with sample data -
 * labelled as such - until approved product screenshots are supplied.
 */
export function Mockup({ kind, tone = "dark", className = "" }: { kind: MockupKind; tone?: "dark" | "light"; className?: string }) {
  const dark = tone === "dark";
  const Body = BODIES[kind];
  return (
    <figure
      className={`overflow-hidden rounded-2xl text-[11px] leading-tight shadow-2xl ${
        dark ? "bg-[#0c1729] text-white/80 shadow-black/40 ring-1 ring-white/10" : "bg-white text-ink/80 shadow-ink/10 ring-1 ring-ink/10"
      } ${className}`}
    >
      <div className={`flex items-center gap-1.5 border-b px-3 py-2 ${dark ? "border-white/10" : "border-ink/10"}`}>
        <span className="h-2 w-2 rounded-full bg-[#ff6b6b]/70" />
        <span className="h-2 w-2 rounded-full bg-[#ffd166]/70" />
        <span className="h-2 w-2 rounded-full bg-teal/70" />
        <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${dark ? "bg-white/5 text-white/50" : "bg-ink/5 text-ink/50"}`}>
          Concept UI · sample data
        </span>
      </div>
      <div className="p-3.5">
        <Body dark={dark} />
      </div>
      <figcaption className="sr-only">Conceptual interface for {LABELS[kind]}, shown with sample data.</figcaption>
    </figure>
  );
}

const LABELS: Record<MockupKind, string> = {
  pos: "a retail point-of-sale",
  erp: "an ERP and CRM dashboard",
  inventory: "multi-warehouse inventory",
  saas: "a multi-tenant SaaS admin",
  commerce: "an e-commerce storefront",
  manufacturing: "manufacturing work orders",
};

type B = { dark: boolean };
const muted = (d: boolean) => (d ? "text-white/45" : "text-ink/45");
const panel = (d: boolean) => (d ? "bg-white/[0.04] ring-1 ring-white/[0.06]" : "bg-cloud ring-1 ring-ink/[0.05]");

function Bars({ values, dark }: { values: number[]; dark: boolean }) {
  return (
    <div className="flex h-16 items-end gap-1">
      {values.map((v, i) => (
        <div key={i} className={`flex-1 rounded-sm ${i === values.length - 1 ? "bg-iris" : dark ? "bg-teal/70" : "bg-teal-deep/70"}`} style={{ height: `${v}%` }} />
      ))}
    </div>
  );
}

function POS({ dark }: B) {
  const items = [["Cotton shirt · M", "1", "1,450"], ["Denim jeans · 32", "1", "2,200"], ["Leather belt", "2", "1,300"]];
  return (
    <div className="grid grid-cols-5 gap-2.5">
      <div className="col-span-3 grid grid-cols-3 gap-1.5">
        {["Shirts", "Denim", "Shoes", "Bags", "Belts", "Kids"].map((c, i) => (
          <div key={c} className={`rounded-lg p-2.5 ${i === 0 ? "bg-teal text-ink" : panel(dark)}`}>
            <div className="font-semibold">{c}</div>
            <div className={i === 0 ? "text-ink/60" : muted(dark)}>{12 + i * 7} items</div>
          </div>
        ))}
        <div className={`col-span-3 mt-1 flex items-center gap-2 rounded-lg px-2.5 py-2 ${panel(dark)}`}>
          <span className={muted(dark)}>Scan or search…</span>
          <span className="ml-auto rounded bg-teal/15 px-1.5 py-0.5 text-[9px] font-semibold text-teal">BARCODE</span>
        </div>
      </div>
      <div className={`col-span-2 flex flex-col rounded-lg p-2.5 ${panel(dark)}`}>
        <div className="mb-2 font-semibold">Current sale</div>
        {items.map(([n, q, p]) => (
          <div key={n} className="flex justify-between py-1">
            <span className="truncate pr-2">{q}× {n}</span>
            <span className="tabular-nums">{p}</span>
          </div>
        ))}
        <div className={`mt-auto flex justify-between border-t pt-2 font-semibold ${dark ? "border-white/10" : "border-ink/10"}`}>
          <span>Total</span>
          <span className="tabular-nums">৳4,950</span>
        </div>
        <div className="mt-2 rounded-md bg-teal py-1.5 text-center font-semibold text-ink">Charge</div>
      </div>
    </div>
  );
}

function ERP({ dark }: B) {
  const stages = [["New", 8], ["Qualified", 5], ["Proposal", 3], ["Won", 2]] as const;
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-3 gap-1.5">
        {[["Open orders", "42"], ["Pending approvals", "6"], ["Invoices due", "11"]].map(([l, v]) => (
          <div key={l} className={`rounded-lg p-2.5 ${panel(dark)}`}>
            <div className={muted(dark)}>{l}</div>
            <div className="mt-1 font-display text-base font-semibold">{v}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {stages.map(([s, n], i) => (
          <div key={s} className={`rounded-lg p-2 ${panel(dark)}`}>
            <div className="mb-1.5 flex justify-between font-semibold"><span>{s}</span><span className={muted(dark)}>{n}</span></div>
            {Array.from({ length: Math.min(n, 3) }).map((_, k) => (
              <div key={k} className={`mb-1 h-4 rounded ${i === 3 ? "bg-teal/30" : dark ? "bg-white/[0.07]" : "bg-white"}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Inventory({ dark }: B) {
  const rows = [["SKU-1042", "Main WH", 320, "ok"], ["SKU-2210", "Branch 2", 14, "low"], ["SKU-0877", "Main WH", 96, "ok"], ["SKU-3301", "Branch 1", 0, "out"]] as const;
  const badge = { ok: "bg-teal/15 text-teal", low: "bg-[#ffd166]/15 text-[#e0a800]", out: "bg-[#ff6b6b]/15 text-[#ff6b6b]" };
  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {["All locations", "Main WH", "Branch 1", "Branch 2"].map((l, i) => (
          <span key={l} className={`rounded-full px-2 py-1 ${i === 0 ? "bg-teal text-ink" : panel(dark)}`}>{l}</span>
        ))}
      </div>
      <div className={`overflow-hidden rounded-lg ${panel(dark)}`}>
        {rows.map(([sku, loc, qty, st]) => (
          <div key={sku} className={`grid grid-cols-4 items-center px-2.5 py-2 ${dark ? "border-white/5" : "border-ink/5"} border-b last:border-0`}>
            <span className="font-semibold">{sku}</span>
            <span className={muted(dark)}>{loc}</span>
            <span className="tabular-nums">{qty}</span>
            <span className={`justify-self-end rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase ${badge[st]}`}>{st}</span>
          </div>
        ))}
      </div>
      <div className={`rounded-lg p-2 ${panel(dark)}`}>
        <div className="mb-1 flex justify-between"><span className="font-semibold">Transfer · Main WH → Branch 2</span><span className="text-teal">In transit</span></div>
        <div className={`h-1.5 rounded-full ${dark ? "bg-white/10" : "bg-ink/10"}`}><div className="h-1.5 w-2/3 rounded-full bg-teal" /></div>
      </div>
    </div>
  );
}

function SaaS({ dark }: B) {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      <div className={`col-span-1 space-y-1 rounded-lg p-2 ${panel(dark)}`}>
        {["Overview", "Tenants", "Plans", "Users", "API keys"].map((n, i) => (
          <div key={n} className={`rounded px-1.5 py-1 ${i === 1 ? "bg-teal/15 font-semibold text-teal" : muted(dark)}`}>{n}</div>
        ))}
      </div>
      <div className="col-span-3 space-y-2">
        <div className={`rounded-lg p-2.5 ${panel(dark)}`}>
          <div className="mb-2 flex justify-between font-semibold"><span>Active workspaces</span><span className={muted(dark)}>Last 8 weeks</span></div>
          <Bars dark={dark} values={[30, 38, 42, 47, 55, 61, 70, 82]} />
        </div>
        <div className={`rounded-lg ${panel(dark)}`}>
          {[["northwind-school", "Growth", "Active"], ["acme-clinic", "Starter", "Trial"]].map(([t, p, s]) => (
            <div key={t} className={`grid grid-cols-3 px-2.5 py-1.5 ${dark ? "border-white/5" : "border-ink/5"} border-b last:border-0`}>
              <span className="font-semibold">{t}</span><span className={muted(dark)}>{p}</span><span className="justify-self-end text-teal">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Commerce({ dark }: B) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold">Your Store</span>
        <span className={muted(dark)}>New · Men · Women · Sale</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[["Linen overshirt", "2,450", "from-teal/40 to-iris/30"], ["Canvas tote", "890", "from-iris/40 to-teal/20"], ["Runner sneaker", "3,900", "from-[#3BA7FF]/40 to-teal/30"]].map(([n, p, g]) => (
          <div key={n} className={`overflow-hidden rounded-lg ${panel(dark)}`}>
            <div className={`h-16 bg-gradient-to-br ${g}`} />
            <div className="p-2">
              <div className="truncate font-semibold">{n}</div>
              <div className={muted(dark)}>৳{p}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={`flex items-center justify-between rounded-lg p-2 ${panel(dark)}`}>
        <span>Stock synced with POS & warehouse</span>
        <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_8px_#00D4C7]" />
      </div>
    </div>
  );
}

function Manufacturing({ dark }: B) {
  const steps = ["Cutting", "Sewing", "Finishing", "QC", "Packing"];
  const orders = [["WO-2318", 4], ["WO-2321", 2], ["WO-2325", 1]] as const;
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-5 gap-1 text-center">
        {steps.map((s) => (<div key={s} className={muted(dark)}>{s}</div>))}
      </div>
      {orders.map(([wo, stage]) => (
        <div key={wo} className={`rounded-lg p-2 ${panel(dark)}`}>
          <div className="mb-1.5 flex justify-between font-semibold"><span>{wo}</span><span className={muted(dark)}>Step {stage + 1} of 5</span></div>
          <div className="grid grid-cols-5 gap-1">
            {steps.map((s, i) => (
              <div key={s} className={`h-1.5 rounded-full ${i < stage ? "bg-teal" : i === stage ? "bg-iris" : dark ? "bg-white/10" : "bg-ink/10"}`} />
            ))}
          </div>
        </div>
      ))}
      <div className={`flex justify-between rounded-lg p-2 ${panel(dark)}`}>
        <span>Material check · BOM-114</span><span className="text-teal">Components available</span>
      </div>
    </div>
  );
}

const BODIES: Record<MockupKind, (p: B) => React.JSX.Element> = {
  pos: POS,
  erp: ERP,
  inventory: Inventory,
  saas: SaaS,
  commerce: Commerce,
  manufacturing: Manufacturing,
};
