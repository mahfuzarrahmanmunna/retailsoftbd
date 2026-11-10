import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icons";

type Props = {
  children?: ReactNode;
  variant?: Parameters<typeof buttonClass>[0];
  size?: Parameters<typeof buttonClass>[1];
  className?: string;
  arrow?: boolean;
  /** Pre-selects "What do you need?" in the popup, e.g. "POS Hardware". */
  need?: string;
  /** Replace the default button styling entirely. */
  unstyled?: boolean;
};

/**
 * Opens the "Get a Demo" popup. Works from server components: the click is picked up
 * by <DemoModal> through the data-demo attribute, so no client JS is needed here.
 */
export function DemoButton({ children = "Get a Demo", variant = "primary", size = "lg", className = "", arrow = false, need, unstyled = false }: Props) {
  return (
    <button
      type="button"
      data-demo={need ?? ""}
      aria-haspopup="dialog"
      className={unstyled ? className : buttonClass(variant, size, `cursor-pointer ${className}`)}
    >
      {children}
      {arrow && <IconArrowRight width={18} height={18} />}
    </button>
  );
}
