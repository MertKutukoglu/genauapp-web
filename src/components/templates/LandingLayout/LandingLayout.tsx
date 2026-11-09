import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * LandingLayout — the two-column shell for the home page.
 *
 * Card treatment matches the Figma testimonial card
 * (file KKZjlNDb3FQM8lAbt6534y, node 2555:172):
 *   - Rounded 32px corners
 *   - Very subtle vertical translucent gradient (6% → 12% fg) — reads
 *     as a soft "lift" in either theme without hard borders
 *   - An inset 1px white (or theme-fg translucent) top-edge highlight
 *     — the glass sheen along the top of the card
 *   - No stroke; the treatment is all surface + light
 *
 * Desktop (≥ 1024px): the layout fits the viewport. On mobile/tablet
 * it stacks and the page scrolls naturally.
 */

export interface LandingLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

/**
 * Shared card chrome. Painted as a wrapper with a pseudo-background
 * overlay so the gradient lives on top of the token-driven bg instead
 * of replacing it.
 */
const cardChrome = clsx(
  "relative min-h-0 flex flex-col overflow-hidden rounded-[32px]",
  // Translucent gradient — works on light and dark via --fg.
  "bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--fg)_6%,transparent),color-mix(in_srgb,var(--fg)_12%,transparent))]",
  // Hairline top-edge highlight. Inset shadow so it sits just inside
  // the radius; translucent --fg so it's a subtle sheen in dark theme
  // and a soft dark hairline in light theme.
  "shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--fg)_22%,transparent)]",
);

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
        <section aria-label="Introduction" className={cardChrome}>
          {left}
        </section>

        <section aria-label="What it looks like" className={clsx(cardChrome, "p-4 md:p-5")}>
          {right}
        </section>
      </div>
    </div>
  );
}
