import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * LandingLayout — the two-column shell for the home page.
 *
 * Desktop (≥ 1024px): fixed-viewport 2-column split inside a max-width
 * container. Left panel is sticky so the hero stays visible as the
 * (small amount of) scroll happens; the right card hosts the carousel.
 *
 * Mobile (< 1024px): single-column stack — hero content first, then
 * the carousel beneath. Both columns breathe into their own natural
 * height.
 *
 * Padding + rounded card surfaces live here so page-level composition
 * can stay declarative: pass `left` + `right` nodes and the template
 * lays them out.
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
        "mx-auto w-full max-w-[1400px] px-3 pb-10 pt-4 md:px-6 md:pt-6",
        className,
      )}
    >
      <div
        className={clsx(
          "grid gap-4 md:gap-6",
          "grid-cols-1 lg:grid-cols-[1fr_1fr]",
          "lg:min-h-[calc(100vh-7.5rem)]",
        )}
      >
        {/* LEFT card */}
        <section
          aria-label="Introduction"
          className={clsx(
            "flex flex-col overflow-hidden rounded-[32px]",
            "border border-border bg-[color:color-mix(in_srgb,var(--accent)_3%,var(--surface-card))]",
            "lg:sticky lg:top-6 lg:self-start lg:h-[calc(100vh-7.5rem)]",
          )}
        >
          {left}
        </section>

        {/* RIGHT card */}
        <section
          aria-label="What it looks like"
          className={clsx(
            "flex flex-col overflow-hidden rounded-[32px] p-4 md:p-6",
            "border border-border bg-surface-card",
            "lg:self-start lg:min-h-[calc(100vh-7.5rem)]",
          )}
        >
          {right}
        </section>
      </div>
    </div>
  );
}
