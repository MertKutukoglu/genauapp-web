"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";

/**
 * PagerStrip — the progress-bar row above the landing scene showcase.
 *
 * N bars representing N scenes. The active bar fills over
 * `durationMs` milliseconds, then the strip auto-advances to the next
 * scene and emits `onChange`. Pass `activeIndex` from the parent so the
 * strip is driven from one source of truth; use `paused` to freeze the
 * timer. Clicking a bar jumps to that scene and emits onChange.
 *
 * respects prefers-reduced-motion: the fill still animates but hidden
 * from any assistive reader (it's progress indication, not content).
 */

export interface PagerStripProps {
  count: number;
  activeIndex: number;
  durationMs?: number;
  paused?: boolean;
  onChange?: (index: number) => void;
  onPauseToggle?: (next: boolean) => void;
  className?: string;
}

export function PagerStrip({
  count,
  activeIndex,
  durationMs = 5500,
  paused = false,
  onChange,
  onPauseToggle,
  className,
}: PagerStripProps) {
  // Local "progress" for the active bar — 0..1. Resets when activeIndex changes.
  const [progress, setProgress] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);
  const startRef = React.useRef<number | null>(null);

  // Reset on activeIndex change.
  React.useEffect(() => {
    // Reset the progress bar when a new slide becomes active.
    // Intentional sync — the dwell timer below reads this.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(0);
    startRef.current = null;
  }, [activeIndex]);

  // Animation loop.
  React.useEffect(() => {
    if (paused) return;
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      if (startRef.current == null) startRef.current = now;
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / durationMs, 1);
      setProgress(p);
      if (p >= 1) {
        onChange?.((activeIndex + 1) % count);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, activeIndex, count, durationMs, onChange]);

  return (
    <div
      className={clsx("flex items-center gap-2", className)}
      aria-label={`Scene ${activeIndex + 1} of ${count}`}
    >
      <div className="flex flex-1 items-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => {
          const fill =
            i < activeIndex ? 1 : i === activeIndex ? progress : 0;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange?.(i)}
              className="group relative h-1 flex-1 rounded-full bg-surface-sunk/60 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Go to scene ${i + 1}`}
              aria-current={i === activeIndex ? "step" : undefined}
            >
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-accent"
                style={{ width: `${fill * 100}%` }}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => onPauseToggle?.(!paused)}
        aria-label={paused ? "Play" : "Pause"}
        aria-pressed={paused}
        className="inline-grid h-7 w-7 place-items-center rounded-full border border-border bg-surface-card text-fg-muted transition hover:text-fg hover:border-accent"
      >
        <Icon name={paused ? "play" : "pause"} className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
