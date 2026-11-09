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
 * Shared card chrome.
 *
 * Gradient uses pure neutral white/black (via dark/light theme) instead
 * of --fg, because --fg is a warm cream in dark mode and leaves a
 * faint pink tint when overlaid on the warm-dark page bg. Pure white
 * reads as clean neutral in both themes.
 *
 * Top-edge inset shadow gives the glass sheen; same neutral white.
 */
const cardChrome = clsx(
  "relative min-h-0 flex flex-col overflow-hidden rounded-[32px]",
  "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0.10))]",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)]",
  // Light theme inverts — the white overlay would wash out on a cream bg,
  // so swap to subtle dark gradient + dark top hairline.
  "[html:not([data-theme=dark])_&]:bg-[linear-gradient(to_bottom,rgba(14,10,10,0.03),rgba(14,10,10,0.07))]",
  "[html:not([data-theme=dark])_&]:shadow-[inset_0_1px_0_0_rgba(14,10,10,0.08)]",
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
