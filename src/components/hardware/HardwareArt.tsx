import type { HardwareKind } from "@/lib/content";

/**
 * Simple product illustrations for the hardware range.
 * Replace with real product photos (next/image) once the approved catalogue images are available.
 */
const DARK = "#14233c";
const BODY = "#2a3b55";
const LIGHT = "#e8edf2";
const SCREEN = "#00a89e";
const SCREEN_2 = "#c4f1ec";
const RED = "#e3432b";
const GOLD = "#f4b400";

function Pos() {
  return (
    <g>
      <rect x="70" y="118" width="60" height="8" rx="3" fill={DARK} />
      <path d="M90 118 96 92h8l6 26Z" fill={BODY} />
      <rect x="42" y="18" width="116" height="80" rx="8" fill={DARK} />
      <rect x="49" y="25" width="102" height="66" rx="3" fill={SCREEN_2} />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={54 + c * 21} y={30 + r * 19} width="17" height="15" rx="2" fill={r === 0 && c === 0 ? SCREEN : "#fff"} />))}
      <rect x="120" y="30" width="26" height="56" rx="2" fill="#fff" />
      <rect x="123" y="35" width="20" height="3" rx="1" fill="#b8c4cf" />
      <rect x="123" y="42" width="16" height="3" rx="1" fill="#b8c4cf" />
      <rect x="123" y="49" width="18" height="3" rx="1" fill="#b8c4cf" />
      <rect x="123" y="76" width="20" height="7" rx="2" fill={SCREEN} />
    </g>
  );
}

function Printer() {
  return (
    <g>
      <path d="M76 22h48v40H76Z" fill="#fff" stroke="#c9d3dc" strokeWidth="1.5" />
      <path d="M76 22h48l-4 5-4-5-4 5-4-5-4 5-4-5-4 5-4-5-4 5-4-5-4 5Z" fill="#fff" stroke="#c9d3dc" strokeWidth="1.5" />
      {[32, 38, 44, 50].map((y, i) => <rect key={y} x="84" y={y} width={i === 3 ? 18 : 32} height="2.5" rx="1" fill="#b8c4cf" />)}
      <rect x="50" y="56" width="100" height="62" rx="12" fill={BODY} />
      <rect x="50" y="56" width="100" height="18" rx="9" fill={DARK} />
      <rect x="70" y="60" width="60" height="5" rx="2.5" fill="#1b2533" />
      <circle cx="132" cy="100" r="5" fill={SCREEN} />
      <rect x="62" y="96" width="24" height="7" rx="3" fill="#56677e" />
    </g>
  );
}

function Scanner() {
  return (
    <g>
      <path d="M140 52 186 34M140 60l46 0M140 68l46 18" stroke={RED} strokeWidth="2" strokeLinecap="round" opacity="0.65" />
      <path d="M58 40c0-8 6-14 14-14h58c6 0 10 4 10 10v30c0 6-4 10-10 10H102l-10 46c-1 6-6 9-12 8l-8-2c-5-1-8-6-7-11l7-41h-0c-8 0-14-6-14-14Z" fill={BODY} />
      <path d="M128 26h4c5 0 8 4 8 9v32c0 5-3 9-8 9h-4Z" fill={DARK} />
      <rect x="134" y="36" width="6" height="30" rx="2" fill={RED} />
      <rect x="74" y="40" width="34" height="10" rx="5" fill={SCREEN} />
      <path d="M88 76 98 76" stroke="#56677e" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Label() {
  return (
    <g>
      <rect x="44" y="36" width="112" height="78" rx="12" fill={BODY} />
      <path d="M44 56c0-11 9-20 20-20h72c11 0 20 9 20 20Z" fill={DARK} />
      <rect x="62" y="96" width="76" height="26" rx="3" fill="#fff" stroke="#c9d3dc" strokeWidth="1.5" />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={68 + i * 4} y="100" width={i % 3 === 0 ? 2.4 : 1.2} height="12" fill={DARK} />
      ))}
      <rect x="68" y="115" width="30" height="3" rx="1" fill="#b8c4cf" />
      <text x="122" y="118" fontSize="7" fontWeight="700" fill={RED} fontFamily="sans-serif">৳250</text>
      <circle cx="140" cy="70" r="5" fill={SCREEN} />
      <rect x="58" y="66" width="30" height="8" rx="3" fill="#56677e" />
    </g>
  );
}

function Drawer() {
  return (
    <g>
      <path d="M36 62h128l-8 44H44Z" fill={LIGHT} stroke="#c9d3dc" strokeWidth="1.5" />
      {[54, 80, 106, 132].map((x) => <rect key={x} x={x - 10} y="68" width="22" height="22" rx="2" fill="#fff" stroke="#c9d3dc" />)}
      <rect x="44" y="70" width="20" height="16" rx="1" fill="#79c99e" />
      <rect x="70" y="70" width="20" height="16" rx="1" fill="#f3a9a0" />
      <rect x="96" y="70" width="20" height="16" rx="1" fill="#8fb8e8" />
      <circle cx="128" cy="78" r="4" fill={GOLD} />
      <circle cx="136" cy="80" r="4" fill={GOLD} />
      <rect x="30" y="96" width="140" height="28" rx="6" fill={BODY} />
      <rect x="84" y="104" width="32" height="5" rx="2.5" fill={DARK} />
      <circle cx="148" cy="110" r="4" fill="#9aa8b6" />
    </g>
  );
}

function Display() {
  return (
    <g>
      <rect x="74" y="118" width="52" height="8" rx="3" fill={DARK} />
      <rect x="96" y="66" width="8" height="54" fill={BODY} />
      <rect x="40" y="24" width="120" height="46" rx="8" fill={DARK} />
      <rect x="47" y="31" width="106" height="32" rx="3" fill="#0e1a2e" />
      <text x="100" y="54" textAnchor="middle" fontSize="18" fontWeight="700" fill="#00d4c7" fontFamily="sans-serif">৳ 1,250</text>
    </g>
  );
}

function Scale() {
  return (
    <g>
      <rect x="40" y="38" width="96" height="10" rx="3" fill="#c9d3dc" />
      <rect x="46" y="48" width="84" height="6" fill="#aab6c2" />
      <circle cx="72" cy="30" r="10" fill="#f3a9a0" />
      <circle cx="90" cy="28" r="12" fill="#f9c74f" />
      <circle cx="108" cy="31" r="9" fill="#90d39c" />
      <path d="M32 54h112l6 60H26Z" fill={BODY} />
      <rect x="138" y="34" width="34" height="80" rx="6" fill={DARK} />
      <rect x="143" y="40" width="24" height="14" rx="2" fill="#0e1a2e" />
      <text x="155" y="50.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#00d4c7" fontFamily="monospace">1.25</text>
      <rect x="143" y="60" width="24" height="12" rx="1.5" fill="#fff" />
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={146 + i * 2.4} y="62" width="1.2" height="8" fill={DARK} />)}
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={144 + c * 8} y={78 + r * 9} width="6" height="6" rx="1" fill="#56677e" />))}
    </g>
  );
}

function Pda() {
  return (
    <g>
      <path d="M118 30 150 14M118 36h34M118 42l32 16" stroke={RED} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <rect x="70" y="20" width="54" height="104" rx="12" fill={DARK} />
      <rect x="112" y="28" width="10" height="16" rx="2" fill={RED} />
      <rect x="77" y="30" width="40" height="52" rx="3" fill={SCREEN_2} />
      <rect x="81" y="35" width="32" height="6" rx="1.5" fill={SCREEN} />
      {[46, 53, 60, 67].map((y) => <rect key={y} x="81" y={y} width="32" height="4" rx="1" fill="#fff" />)}
      <rect x="81" y="74" width="32" height="5" rx="1.5" fill={GOLD} />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={80 + c * 12} y={88 + r * 10} width="10" height="7" rx="2" fill="#56677e" />))}
    </g>
  );
}

const ART: Record<HardwareKind, () => React.JSX.Element> = {
  pos: Pos,
  printer: Printer,
  scanner: Scanner,
  label: Label,
  drawer: Drawer,
  display: Display,
  scale: Scale,
  pda: Pda,
};

export function HardwareArt({ kind, className = "" }: { kind: HardwareKind; className?: string }) {
  const Art = ART[kind];
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden="true">
      <ellipse cx="100" cy="130" rx="74" ry="6" fill="#17263a" opacity="0.08" />
      <Art />
    </svg>
  );
}
