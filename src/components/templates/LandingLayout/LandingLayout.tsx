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
 * Dark mode: translucent-white vertical gradient (4% → 10%) as the
 * whole lift, plus a 1-pixel top-edge inset sheen that reads as
 * glass on the warm-dark page bg. Pure neutral white (not --fg,
 * which is a warm cream in dark mode and would leave a faint pink
 * tint).
 *
 * Light mode: opaque white card on the neutral #FAFAFA page bg,
 * with a soft gray hairline stroke so the card edge is visible
 * without competing with the content inside. The old translucent-
 * black gradient bled into the page and left cards looking like
 * ghost tiles; a plain white + gray stroke reads as clearly
 * card-like, matches the /try/ page's chrome, and is easier on
 * the eye at low contrast.
 */
const cardChrome = clsx(
  "relative min-h-0 flex flex-col overflow-hidden rounded-[32px]",
  // Dark mode: translucent glass gradient + sheen.
  "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0.10))]",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)]",
  // Light mode: opaque white + 1px gray hairline stroke.
  "[html:not([data-theme=dark])_&]:bg-surface-card",
  "[html:not([data-theme=dark])_&]:border",
  "[html:not([data-theme=dark])_&]:border-[color:rgba(14,10,10,0.08)]",
  "[html:not([data-theme=dark])_&]:shadow-none",
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
