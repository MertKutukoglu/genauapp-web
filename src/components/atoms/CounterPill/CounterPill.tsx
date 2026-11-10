import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * CounterPill — the small `N/total` pill in the top-right of every
 * card toolbar (Learn + Exercise). Shared across all chips.
 *
 * Spec: claude/GenauApp_Web_Try_Words_Learn_Card.md §4 (toolbar).
 *   - Open Sans semi-bold 12, line-height 1
 *   - Padding 10×4 horizontal / vertical
 *   - Radius 12
 *   - Background: color-mix(in srgb, var(--fg) 6%, transparent)
 *   - Text: var(--fg)
 *
 * No animation on count change — the card itself re-mounts between
 * words, which is enough of a transition cue. A bump here would
 * compete with the card swap.
 */

export interface CounterPillProps {
  current: number;
  total: number;
  className?: string;
}

export function CounterPill({ current, total, className }: CounterPillProps) {
  return (
    <span
      aria-label={`Card ${current} of ${total}`}
      className={clsx(
        "inline-flex items-center",
        "px-2.5 py-1 rounded-xl",
        "font-sans font-semibold text-xs leading-none text-fg",
        "bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
        className,
      )}
    >
      {current}/{total}
    </span>
  );
}
