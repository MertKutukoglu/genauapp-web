import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * DoneBadge — the 22×22 green ✓ circle that appears bottom-right on a
 * completed chip in the /try/ picker.
 *
 * Spec: claude/GenauApp_Web_Try_ChipPicker_Brief.md §3.1 (`.chip-state`)
 *   - 22×22 circle
 *   - Background: var(--ok)
 *   - 2px ring in --surface-card so it reads as a tacked-on sticker on
 *     either theme (the ring matches the card background it sits on)
 *   - 12×12 check SVG, polyline "5 12 10 17 19 7"
 *
 * Positioning is the parent's job (absolute placement relative to the
 * chip). This component is pure visual — no state, no behavior.
 */

export interface DoneBadgeProps {
  className?: string;
}

export function DoneBadge({ className }: DoneBadgeProps) {
  return (
    <span
      aria-hidden
      className={clsx(
        "inline-flex items-center justify-center",
        "w-[22px] h-[22px] rounded-full",
        "bg-[var(--ok)] text-white",
        "ring-2 ring-[var(--surface-card)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3"
      >
        <polyline points="5 12 10 17 19 7" />
      </svg>
    </span>
  );
}
