import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { WordmarkLogo } from "./WordmarkLogo";

/**
 * Wordmark — the GenauApp logo as a link back to /, with an optional
 * "SOON" beta pill nudged to its top-right corner.
 *
 * Variants:
 *   - `topnav`  → 24px tall, pill visible on all breakpoints
 *   - `compact` → 20px tall (mobile pill-nav crunch)
 *   - `footer`  → 18px tall, pill inlined next to the mark
 *
 * The pill uses absolute positioning (top: -6px, left: full) in topnav
 * to tuck above the "p" tail. On footer it renders inline so it doesn't
 * collide with the centered "Made in Berlin" text.
 */

type Variant = "topnav" | "compact" | "footer";

const heightByVariant: Record<Variant, number> = {
  topnav: 24,
  compact: 20,
  footer: 18,
};

export interface WordmarkProps {
  variant?: Variant;
  showPill?: boolean;
  href?: string;
  className?: string;
}

export function Wordmark({
  variant = "topnav",
  showPill = true,
  href = "/",
  className,
}: WordmarkProps) {
  const h = heightByVariant[variant];
  const isFooter = variant === "footer";

  return (
    <Link
      href={href}
      aria-label="GenauApp — back to landing"
      className={clsx(
        "relative inline-flex items-center text-fg",
        isFooter && "text-white/90",
        className,
      )}
    >
      <WordmarkLogo height={h} />
      {showPill ? (
        <span
          aria-label="Coming soon"
          className={clsx(
            "inline-flex items-center justify-center rounded-full uppercase font-sans font-bold whitespace-nowrap select-none",
            isFooter
              ? "ml-1.5 px-1.5 py-[2px] text-[8px] border border-white/30 text-white/75 tracking-[0.08em] leading-none"
              : "absolute left-[calc(100%+6px)] -top-[6px] px-[7px] py-[2px] text-[9px] border border-[color:color-mix(in_srgb,var(--fg)_24%,transparent)] tracking-[0.08em] leading-none",
          )}
        >
          SOON
        </span>
      ) : null}
    </Link>
  );
}
