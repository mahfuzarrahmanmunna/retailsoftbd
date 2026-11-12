import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { IconArrowRight } from "@/components/ui/Icons";

type Variant = "primary" | "brand" | "outline" | "white" | "outline-white" | "whatsapp";
type Size = "md" | "lg";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-navy",
  brand: "bg-teal-text text-white hover:bg-teal-deep",
  outline: "bg-white text-ink ring-1 ring-inset ring-ink/15 hover:ring-ink/40",
  white: "bg-white text-ink hover:bg-cloud",
  "outline-white": "text-white ring-1 ring-inset ring-white/30 hover:bg-white/10",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-[0.93rem]",
  lg: "px-6 py-3 text-base",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "lg", extra = "") =>
  `group/btn inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-[background-color,color,box-shadow] duration-200 ${styles[variant]} ${sizes[size]} ${extra}`;

/** Plain, clearly-labelled button link. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  children,
  arrow = false,
  className = "",
  ...rest
}: { href: string; variant?: Variant; size?: Size; children: ReactNode; arrow?: boolean } & Omit<ComponentProps<typeof Link>, "href">) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const content = (
    <>
      {children}
      {arrow && <IconArrowRight width={18} height={18} />}
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        className={buttonClass(variant, size, className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {content}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return <IconArrowRight width={18} height={18} className={`shrink-0 ${className}`} />;
}
