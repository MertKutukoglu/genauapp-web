"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { PagerStrip } from "@/components/molecules/PagerStrip/PagerStrip";

/**
 * CarouselShell — the right-column carousel container.
 *
 * Owns `activeIndex` + `paused` + pause-on-hover + pause-on-interaction.
 * Every slide stays mounted but only the active one is visible
 * (opacity + z-index swap) so cycling snippets inside slides keep
 * their state.
 *
 * Each slide's `render` receives `isActive` so it can pause its own
 * inner cycler when the carousel moves to another slide (per the
 * production spec — the Workout chip cycler resets to Grammar on
 * re-activation).
 */

export interface Slide {
  id: string;
  dwellMs: number;
  render: (ctx: { isActive: boolean }) => React.ReactNode;
}

export interface CarouselShellProps {
  slides: Slide[];
  className?: string;
}

export function CarouselShell({ slides, className }: CarouselShellProps) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const active = slides[index];

  // Fire slide_viewed every time the active slide changes, including
  // the first slide on mount. Trigger split (auto vs manual) is not
  // tracked yet — PagerStrip's timer-advance and click both flow
  // through the same onChange, so distinguishing them would need a
  // PagerStrip API change. Launch with slide + position only; split
  // later if dashboards want it.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.__track?.("slide_viewed", {
        slide: active.id,
        index,
        total: slides.length,
      });
    } catch {
      /* no-op */
    }
  }, [index, active.id, slides.length]);

  return (
    <div
      className={clsx("flex flex-col gap-4", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="GenauApp feature showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <PagerStrip
        count={slides.length}
        activeIndex={index}
        paused={paused}
        durationMs={active.dwellMs}
        onChange={setIndex}
        onPauseToggle={setPaused}
      />

      <div className="relative min-h-[520px]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={clsx(
              "absolute inset-0 transition-opacity duration-500",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={i !== index}
          >
            {s.render({ isActive: i === index })}
          </div>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {slides.length}
      </p>
    </div>
  );
}
