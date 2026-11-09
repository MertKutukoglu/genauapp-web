import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * LandingLayout — the two-column shell for the home page.
 *
 * Desktop (≥ 1024px): fits the viewport — no outer scroll. The layout
 * fills the main element's `flex-1` space (the parent body is a
 * flex column with topnav + main + footer), and the two cards fill
 * that height with `h-full + min-h-0` so their inner content
 * (phone mockup, carousel) does the sizing, not the other way around.
 *
 * Mobile / tablet: single-column stack, both cards flow at natural
 * height; the page scrolls as usual.
 */

export interface LandingLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export function LandingLayout({ left, right, className }: LandingLayoutProps) {
  return (
    <div
      className={clsx(
        "flex-1 min-h-0 w-full mx-auto max-w-[1400px] px-3 pb-3 pt-3 md:px-4 md:pb-4 md:pt-2",
        className,
      )}
    >
      <div
        className={clsx(
          "grid gap-3 md:gap-4 h-full min-h-0",
          "grid-cols-1 lg:grid-cols-[1fr_1fr]",
        )}
      >
        {/* LEFT card */}
        <section
          aria-label="Introduction"
          className={clsx(
            "min-h-0 flex flex-col overflow-hidden rounded-[28px]",
            "border border-border bg-[color:color-mix(in_srgb,var(--accent)_3%,var(--surface-card))]",
          )}
        >
          {left}
        </section>

        {/* RIGHT card */}
        <section
          aria-label="What it looks like"
          className={clsx(
            "min-h-0 flex flex-col overflow-hidden rounded-[28px] p-4 md:p-5",
            "border border-border bg-surface-card",
          )}
        >
          {right}
        </section>
      </div>
    </div>
  );
}
