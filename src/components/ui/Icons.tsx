import type { SVGProps } from "react";

type Icon = (p: SVGProps<SVGSVGElement>) => React.JSX.Element;

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p,
});

export const IconPOS: Icon = (p) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 20h10M12 16v4M7 8h6M7 11h3"/></svg>);
export const IconERP: Icon = (p) => (<svg {...base(p)}><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M12 7.5v4M12 11.5 6.5 16M12 11.5l5.5 4.5"/></svg>);
export const IconStock: Icon = (p) => (<svg {...base(p)}><path d="M3 8 12 3l9 5v8l-9 5-9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg>);
export const IconSaaS: Icon = (p) => (<svg {...base(p)}><path d="M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7Z"/><path d="M12 12v4M10 14h4"/></svg>);
export const IconCart: Icon = (p) => (<svg {...base(p)}><path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>);
export const IconFactory: Icon = (p) => (<svg {...base(p)}><path d="M3 20V10l5 3V10l5 3V6h4l1 14H3Z"/><path d="M7 17h2M12 17h2"/></svg>);
export const IconInsight: Icon = (p) => (<svg {...base(p)}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>);
export const IconSync: Icon = (p) => (<svg {...base(p)}><path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M4 4v4h4M20 20v-4h-4"/></svg>);
export const IconGrow: Icon = (p) => (<svg {...base(p)}><path d="M3 17 9 11l4 4 8-8"/><path d="M15 7h6v6"/></svg>);
export const IconCheck: Icon = (p) => (<svg {...base(p)}><path d="m5 12 4.5 4.5L19 7"/></svg>);
export const IconChat: Icon = (p) => (<svg {...base(p)}><path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4.2A8 8 0 1 1 20 12Z"/></svg>);
export const IconMail: Icon = (p) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>);
export const IconPhone: Icon = (p) => (<svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>);
export const IconPin: Icon = (p) => (<svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>);
export const IconClock: Icon = (p) => (<svg {...base(p)}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
export const IconUsers: Icon = (p) => (<svg {...base(p)}><circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 4.5a3 3 0 0 1 0 6M21 20a5.5 5.5 0 0 0-3.5-5.1"/></svg>);
export const IconTraining: Icon = (p) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4M7 9l3 2-3 2"/></svg>);
export const IconSupport: Icon = (p) => (<svg {...base(p)}><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19a3 3 0 0 1-3 2h-2"/></svg>);
export const IconLayers: Icon = (p) => (<svg {...base(p)}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>);
export const IconPlug: Icon = (p) => (<svg {...base(p)}><path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4"/></svg>);
export const IconShop: Icon = (p) => (<svg {...base(p)}><path d="M4 9h16l-1.5-5h-13L4 9Z"/><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9"/><path d="M5 12v8h14v-8M10 20v-5h4v5"/></svg>);
export const IconShirt: Icon = (p) => (<svg {...base(p)}><path d="M8 3 3 6l2 5 2-1v11h10V10l2 1 2-5-5-3a3 3 0 0 1-8 0Z"/></svg>);
export const IconSchool: Icon = (p) => (<svg {...base(p)}><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"/></svg>);
export const IconHealth: Icon = (p) => (<svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>);
export const IconFood: Icon = (p) => (<svg {...base(p)}><path d="M5 3v8a2 2 0 0 0 4 0V3M7 11v10M16 21V3c2.5 1 4 3.5 4 7h-4"/></svg>);
export const IconBuilding: Icon = (p) => (<svg {...base(p)}><path d="M4 21V5l8-2v18M12 8l8 2v11M2 21h20"/><path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/></svg>);
export const IconArrowRight: Icon = (p) => (<svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
export const IconMenu: Icon = (p) => (<svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16"/></svg>);
export const IconClose: Icon = (p) => (<svg {...base(p)}><path d="M6 6l12 12M18 6 6 18"/></svg>);
export const IconChevron: Icon = (p) => (<svg {...base(p)}><path d="m6 9 6 6 6-6"/></svg>);
export const IconShield: Icon = (p) => (<svg {...base(p)}><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>);

/** Official-style WhatsApp glyph (filled). */
export const IconWhatsApp: Icon = (p) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);
export const IconFacebook: Icon = (p) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
  </svg>
);

export const solutionIcon: Record<string, Icon> = {
  "retail-pos": IconPOS,
  "erp-crm": IconERP,
  "inventory-warehouse": IconStock,
  "custom-saas": IconSaaS,
  "ecommerce-websites": IconCart,
  "manufacturing-software": IconFactory,
};

export const industryIcon: Record<string, Icon> = {
  "retail-ecommerce": IconShop,
  garments: IconShirt,
  manufacturing: IconFactory,
  education: IconSchool,
  healthcare: IconHealth,
  "restaurants-bakeries": IconFood,
  "real-estate": IconBuilding,
};

export const whyIcons: Icon[] = [IconUsers, IconLayers, IconTraining, IconSupport, IconGrow, IconPlug];
