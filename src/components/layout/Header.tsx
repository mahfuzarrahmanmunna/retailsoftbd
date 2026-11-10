"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { industries, site, solutions } from "@/lib/content";
import { buttonClass } from "@/components/ui/Button";
import {
  IconArrowRight,
  IconChevron,
  IconClock,
  IconClose,
  IconMail,
  IconMenu,
  IconPhone,
  IconWhatsApp,
  industryIcon,
  solutionIcon,
} from "@/components/ui/Icons";
import { Logo } from "@/components/layout/Logo";

type NavChild = { label: string; bn: string; desc: string; href: string; slug: string };
type NavItem = {
  label: string;
  bn: string;
  href: string;
  /** route prefix used to highlight the current section */
  path: string;
  kind?: "solution" | "industry";
  intro?: { title: string; body: string; all: string };
  children?: NavChild[];
};

const nav: NavItem[] = [
  { label: "Home", bn: "হোম", href: "#", path: "/" },
  {
    label: "Software",
    bn: "সফটওয়্যার",
    href: "#",
    path: "/solutions",
    kind: "solution",
    intro: {
      title: "Software solutions",
      body: "Business systems designed around how your team already works - from the counter to the boardroom.",
      all: "View all solutions",
    },
    children: solutions.map((s) => ({ label: s.name, bn: s.bn, desc: s.short, href: "#", slug: s.slug })),
  },
  { label: "Hardware", bn: "হার্ডওয়্যার", href: "#", path: "/hardware" },
  {
    label: "Industries",
    bn: "ব্যবসার ধরন",
    href: "#",
    path: "/industries",
    kind: "industry",
    intro: {
      title: "Industries we serve",
      body: "Proven workflows for the sectors that keep Bangladesh moving, tailored to your operation.",
      all: "View all industries",
    },
    children: industries.map((i) => ({ label: i.name, bn: i.bn, desc: i.scope.slice(0, 3).join(" · "), href: "#", slug: i.slug })),
  },
  { label: "Services", bn: "সেবা", href: "#", path: "/services" },
  { label: "About", bn: "আমাদের সম্পর্কে", href: "#", path: "/about" },
  { label: "Contact", bn: "যোগাযোগ", href: "#", path: "/contact" },
];

const isActive = (pathname: string, path: string) => (path === "/" ? pathname === "/" : pathname.startsWith(path));

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // hide while scrolling down, show again on the way up
      if (Math.abs(y - last) > 6) setHidden(y > last && y > 400);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden border-b border-white/[0.06] bg-void text-[0.78rem] text-white/55 md:block">
        <div className="container-x flex h-9 items-center justify-between gap-6">
          <p className="truncate">
            A concern of <span className="text-white/80">{site.parent}</span>
          </p>
          <ul className="flex items-center divide-x divide-white/10">
            <li className="hidden items-center gap-1.5 pr-4 lg:flex">
              <IconClock width={14} height={14} className="text-teal/80" /> {site.contact.hours}
            </li>
            <li className="px-4">
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
                <IconMail width={14} height={14} className="text-teal/80" /> {site.contact.email}
              </a>
            </li>
            <li className="pl-4">
              <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-white">
                <IconWhatsApp width={14} height={14} className="text-teal/80" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main bar */}
      <header
        className={`sticky top-0 z-50 border-b text-white transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] ${
          scrolled
            ? "border-white/10 bg-void/80 shadow-[0_10px_30px_-15px_rgb(0_0_0/0.6)] backdrop-blur-xl"
            : "border-white/[0.06] bg-void"
        } ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        <div className={`container-x flex items-center justify-between gap-8 transition-[height] duration-500 ease-[var(--ease-out-expo)] ${scrolled ? "h-16" : "h-[76px]"}`}>
          <Logo light />

          <nav aria-label="Primary" className="hidden h-full xl:block">
            <ul className="flex h-full items-center gap-1">
              {nav.map((item) => {
                const active = isActive(pathname, item.path);
                return (
                  <li key={item.label} className="group flex h-full items-center">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex items-center gap-1 whitespace-nowrap px-3.5 py-2 text-[0.92rem] font-medium tracking-[-0.005em] transition-colors after:absolute after:inset-x-3.5 after:-bottom-px after:h-0.5 after:origin-left after:rounded-full after:bg-teal after:transition-transform after:duration-300 group-hover:text-white group-hover:after:scale-x-100 ${
                        active ? "text-white after:scale-x-100" : "text-white/70 after:scale-x-0"
                      }`}
                    >
                      {item.label}
                      {item.children && (
                        <IconChevron width={14} height={14} className="opacity-60 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                      )}
                    </Link>

                    {item.children && item.intro && (
                      <div className="invisible absolute inset-x-0 top-full -translate-y-1 border-y border-white/10 bg-ink/[0.97] opacity-0 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)] group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="container-x grid grid-cols-[260px_1fr] gap-10 py-8">
                          <div className="flex flex-col border-r border-white/10 pr-10">
                            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-teal">{item.label}</p>
                            <p className="mt-3 font-display text-xl font-semibold tracking-[-0.02em] text-white">{item.intro.title}</p>
                            <p className="mt-2 text-[0.9rem] leading-relaxed text-white/55">{item.intro.body}</p>
                            <Link href={item.href} className="group/all mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9rem] font-semibold text-teal hover:text-white">
                              {item.intro.all}
                              <IconArrowRight width={16} height={16} className="transition-transform group-hover/all:translate-x-1" />
                            </Link>
                          </div>
                          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 2xl:grid-cols-3">
                            {item.children.map((c) => {
                              const Icon = item.kind === "solution" ? solutionIcon[c.slug] : industryIcon[c.slug];
                              return (
                                <li key={c.slug}>
                                  <Link href={c.href} className="group/item flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-white/[0.05]">
                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-teal transition-colors group-hover/item:border-teal group-hover/item:bg-teal group-hover/item:text-ink">
                                      {Icon && <Icon width={18} height={18} />}
                                    </span>
                                    <span className="min-w-0 leading-snug">
                                      <span className="flex items-center gap-1 text-[0.94rem] font-semibold text-white">
                                        {c.label}
                                        <IconArrowRight width={14} height={14} className="-translate-x-1 text-teal opacity-0 transition-[opacity,transform] group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                                      </span>
                                      <span className="mt-0.5 line-clamp-2 block text-[0.82rem] text-white/50">{c.desc}</span>
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href={`tel:${site.contact.phone}`} className="group/call hidden items-center gap-3 pr-2 md:flex">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-teal transition-colors group-hover/call:border-teal group-hover/call:bg-teal group-hover/call:text-ink">
                <IconPhone width={17} height={17} />
              </span>
            </a>
            <span className="hidden h-8 w-px bg-white/10 md:block" aria-hidden="true" />
            <span className="hidden sm:block">
              <button type="button" data-demo="" aria-haspopup="dialog" className={buttonClass("primary", "md", "cursor-pointer")}>
                Get a Demo <IconArrowRight width={17} height={17} />
              </button>
            </span>
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 xl:hidden"
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] overflow-hidden xl:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
            <Logo compact />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-cloud">
              <IconClose />
            </button>
          </div>
          <nav aria-label="Mobile" data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-2">
            <ul>
              {nav.map((item) => {
                const active = isActive(pathname, item.path);
                return (
                  <li key={item.label} className="border-b border-line last:border-0">
                    <div className="flex items-center">
                      <Link href={item.href} aria-current={active ? "page" : undefined} className="flex flex-1 items-center gap-3 py-3.5">
                        <span className={`h-5 w-0.5 rounded-full ${active ? "bg-teal" : "bg-transparent"}`} aria-hidden="true" />
                        <span>
                          <span className="block font-semibold text-ink">{item.label}</span>
                          <span lang="bn" className="bn block text-[0.82rem] text-slate">{item.bn}</span>
                        </span>
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                          aria-expanded={expanded === item.label}
                          aria-label={`Show ${item.label} list`}
                          className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate transition-colors hover:bg-cloud"
                        >
                          <IconChevron width={16} height={16} className={`transition-transform duration-300 ${expanded === item.label ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    {item.children && expanded === item.label && (
                      <ul className="mb-3 space-y-0.5 rounded-xl bg-cloud p-2">
                        {item.children.map((c) => {
                          const Icon = item.kind === "solution" ? solutionIcon[c.slug] : industryIcon[c.slug];
                          return (
                            <li key={c.slug}>
                              <Link href={c.href} className="flex items-center gap-3 rounded-lg px-2 py-2 text-[0.93rem] text-ink transition-colors hover:bg-white">
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-teal-text">{Icon && <Icon width={16} height={16} />}</span>
                                {c.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="space-y-2 border-t border-line bg-cloud/60 p-5">
            <button type="button" data-demo="" aria-haspopup="dialog" onClick={() => setOpen(false)} className={buttonClass("primary", "md", "w-full cursor-pointer")}>
              Get a Demo <IconArrowRight width={17} height={17} />
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a href={`tel:${site.contact.phone}`} className={buttonClass("brand", "md", "w-full")}>
                <IconPhone width={17} height={17} /> Call
              </a>
              <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", "md", "w-full")}>
                <IconWhatsApp width={17} height={17} /> WhatsApp
              </a>
            </div>
            <p className="pt-1 text-center text-[0.78rem] text-slate">{site.contact.hours}</p>
          </div>
        </div>
      </div>
    </>
  );
}
