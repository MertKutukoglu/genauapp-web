"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { WorkoutCounter } from "@/components/atoms/WorkoutCounter/WorkoutCounter";
import { SkillStrip } from "@/components/molecules/SkillStrip/SkillStrip";
import { ChipList } from "@/components/organisms/ChipList/ChipList";
import { useChipStore } from "@/stores/chipStore";

/**
 * LeftCard — the /try/ page's sticky left column.
 *
 * Composition (top → bottom, per spec §7 + §9):
 *   1. Header row: "Your workout" h2 + WorkoutCounter
 *   2. Subtitle paragraph
 *   3. SkillStrip (deferred — rendered as a slot when the SkillStrip
 *      organism lands in its own round)
 *   4. ChipList
 *
 * Reads chipStore here so the header counter + chip list stay in sync
 * from one source. If a future surface needs the same card with a
 * different data source, lift the counter out of this template and
 * pass count as a prop.
 *
 * Sticky positioning (desktop): `top-[92px]` clears the floating
 * topnav; `self-start` prevents the card from stretching to the grid
 * row height. On mobile the parent /try/ layout drops the sticky so
 * the card scrolls with the page.
 *
 * Spec: claude/GenauApp_Web_Try_ChipPicker_Brief.md §7, §9.
 */

export interface LeftCardProps {
  /**
   * Override for the SkillStrip slot between subtitle and chip list.
   * When `undefined` (default) an empty SkillStrip renders. Pass `null`
   * to suppress it, or any React node to swap in a connected strip
   * (e.g. one wired to the skill store).
   */
  skillStrip?: React.ReactNode | null;
  className?: string;
}

export function LeftCard({ skillStrip, className }: LeftCardProps) {
  const doneCount = useChipStore((s) =>
    Object.values(s.progress).filter((v) => v === "done").length,
  );

  // Default strip: all four skills empty. Caller can override via the
  // skillStrip prop once the collect mechanic + skill store land.
  const stripNode =
    skillStrip === undefined ? <SkillStrip /> : skillStrip;

  return (
    <aside
      aria-label="Your workout"
      className={clsx(
        // Frame
        "bg-surface-card border border-border rounded-[22px] p-5",
        "shadow-[0_18px_44px_-28px_rgba(26,19,18,0.26)]",
        // Sticky on desktop only; the parent grid stacks on mobile
        "lg:sticky lg:top-[92px] lg:self-start",
        className,
      )}
    >
      {/* Header: title + counter */}
      <header className="flex items-center justify-between gap-3">
        <h2
          className={clsx(
            "font-display font-semibold italic text-[22px] leading-tight",
            "text-fg m-0",
          )}
        >
          Your workout
        </h2>
        <WorkoutCounter count={doneCount} total={4} />
      </header>

      {/* Subtitle */}
      <p className="mt-2 mb-3.5 font-sans text-[13px] leading-normal text-fg-muted">
        Four workouts, five questions each. Tap any to begin, all four are open.
      </p>

      {/* Skill strip — spec §8 placement: between subtitle and chip list,
          `margin: 10px 0 14px`. */}
      {stripNode ? (
        <div className="mt-2.5 mb-3.5">{stripNode}</div>
      ) : null}

      {/* The picker itself */}
      <ChipList />
    </aside>
  );
}
