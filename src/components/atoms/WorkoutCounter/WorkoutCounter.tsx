"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * WorkoutCounter — the dumbbell pill on the /try/ left card header.
 *
 * Shows how many chips the user has completed, 0 → 4. Bumps briefly
 * on every increment (spring scale), and flips to a green --ok tint
 * when all four are done.
 *
 * Spec: claude/GenauApp_Web_Try_ChipPicker_Brief.md §7.2.
 *
 * The component doesn't own the count; a parent reads it from the
 * chip store and passes it in. Keeping it dumb lets the same atom
 * sit on other surfaces (e.g. a mini summary at the top of the
 * right card) without coupling to one store.
 */

export interface WorkoutCounterProps {
  /** How many chips are done. Clamped to 0-4 for display. */
  count: number;
  /** Total chips in the demo. Defaults to 4; `maxed` state fires when count ≥ total. */
  total?: number;
  className?: string;
}

export function WorkoutCounter({
  count,
  total = 4,
  className,
}: WorkoutCounterProps) {
  const [bump, setBump] = React.useState(false);
  const prev = React.useRef(count);

  React.useEffect(() => {
    if (prev.current === count) return;
    prev.current = count;
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 280);
    return () => window.clearTimeout(t);
  }, [count]);

  const safe = Math.max(0, Math.min(count, total));
  const maxed = safe >= total;

  return (
    <span
      aria-label={`${safe} of ${total} workouts completed`}
      className={clsx(
        // Layout
        "inline-flex items-center gap-1.5",
        "pl-[9px] pr-[11px] py-[5px]",
        "rounded-full",
        // Type
        "font-sans font-bold text-sm text-fg-muted leading-none",
        // Default surface — sunk pill
        "bg-surface-sunk",
        // Motion
        "transition-[transform,color,background-color]",
        "duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        // Bump — 1.12 scale when count changes
        bump && "scale-[1.12]",
        // Maxed — green tint when count hits total
        maxed &&
          "!bg-[color:color-mix(in_srgb,var(--ok)_14%,var(--surface-card))] !text-[color:var(--ok)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={clsx(
          "w-[18px] h-[18px] transition-opacity duration-200",
          maxed ? "opacity-100" : "opacity-60",
        )}
      >
        <path d="M6.5 6.5v11M17.5 6.5v11" />
        <rect x="2" y="9" width="4" height="6" rx="1" />
        <rect x="18" y="9" width="4" height="6" rx="1" />
        <path d="M6 12h12" />
      </svg>
      <span>{safe}</span>
    </span>
  );
}
