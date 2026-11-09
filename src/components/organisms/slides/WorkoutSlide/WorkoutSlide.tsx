"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Chip } from "@/components/atoms/Chip/Chip";
import { Button } from "@/components/atoms/Button/Button";
import { StreakPill } from "@/components/atoms/StreakPill/StreakPill";
import { Icon } from "@/components/atoms/Icon/Icon";
import { SlideHead } from "@/components/molecules/SlideHead/SlideHead";
import { ActiveSlot, WORKOUT_CHIPS, SLOT_META, type WorkoutChip } from "./slots";

/**
 * Slide 1 — Workout.
 *
 * Message (handoff): the workout is personalized from the user's
 * history, not a template.
 *
 * Mechanic: every `cycleMs` the selected chip advances to the next
 * one in the strip. The ActiveSlot swaps to match. The CTA label
 * follows the selection. Hover pauses the cycling so the viewer can
 * read; focusing a chip jumps to it.
 */

export interface WorkoutSlideProps {
  /** How long each chip stays selected before cycling. */
  cycleMs?: number;
  streakDays?: number;
  className?: string;
}

export function WorkoutSlide({
  cycleMs = 1600,
  streakDays = 7,
  className,
}: WorkoutSlideProps) {
  const [index, setIndex] = React.useState(1); // Start on Grammar per handoff example
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % WORKOUT_CHIPS.length),
      cycleMs,
    );
    return () => window.clearInterval(t);
  }, [paused, cycleMs]);

  const selected: WorkoutChip = WORKOUT_CHIPS[index];
  const slotMeta = SLOT_META[selected];

  return (
    <div
      className={clsx(
        "flex flex-col gap-6 rounded-3xl bg-surface-card p-5 md:p-8 border border-border",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <SlideHead
        eyebrow="Workout"
        headline={
          <>
            Built from your <em>last performance.</em>
          </>
        }
        sub="Yesterday's misses come back today. Today's wins get a rest. The workout is yours, not a template."
      />

      {/* App-faithful workout peek */}
      <div className="rounded-2xl border border-border bg-bg p-4 md:p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-fg">
            Today&apos;s workout
          </h3>
          <StreakPill days={streakDays} />
        </div>

        {/* Chip strip — horizontal scroll on mobile, wrap on desktop */}
        <div
          role="tablist"
          aria-label="Workouts"
          className="mb-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
        >
          {WORKOUT_CHIPS.map((c, i) => (
            <Chip
              key={c}
              flavor={c}
              density="pill"
              state={i === index ? "selected" : "default"}
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className="shrink-0"
            />
          ))}
        </div>

        {/* ActiveSlot fades in on change */}
        <div key={selected} className="animate-slot-in">
          <ActiveSlot chip={selected} />
        </div>

        {/* CTA */}
        <div className="mt-4">
          <Button tone="primary" size="md" block>
            <span>{slotMeta.cta}</span>
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
