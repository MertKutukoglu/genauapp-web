import * as React from "react";
import type { WorkoutChipKey } from "./slots";

/**
 * Chip-specific SVG icons for the workout peek card.
 *
 * Ported verbatim from `_landing-deploy/index.html` (see
 * claude/GenauApp_Web_Landing_Slide1_Workout.md §1). Each icon is
 * 24×24 with currentColor fill; the parent chip tints via `color`.
 *
 * These are NOT the same as the generic chip-* icons in the Icon
 * library — those are schematic glyphs for the /try/ demo chip
 * picker. These are the workout-peek's app-faithful SF-Symbol
 * equivalents.
 */

export function WpChipIcon({ chip }: { chip: WorkoutChipKey }) {
  switch (chip) {
    case "words":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
          <path d="M6 2.5A1.5 1.5 0 0 0 4.5 4v16A1.5 1.5 0 0 0 6 21.5h13V18H6a.5.5 0 0 1 0-1h13V2.5H6zm2.75 4.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5zm0 3.5h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5z" />
        </svg>
      );
    case "grammar":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
          <path d="M16.24 3.56a1.5 1.5 0 0 1 2.12 0l2.08 2.08a1.5 1.5 0 0 1 0 2.12l-1.1 1.1-4.2-4.2 1.1-1.1zm-2.16 2.16 4.2 4.2L8.3 20.9H4.1v-4.2L14.08 5.72z" />
        </svg>
      );
    case "story":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
          <path d="M4 4h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9.5L5 20v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 4h8v1.5H6V8zm0 3h6v1.5H6V11z" />
        </svg>
      );
    case "sentence":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
          <rect x="3" y="5" width="18" height="2.4" rx="1.2" />
          <rect x="3" y="10.8" width="12" height="2.4" rx="1.2" />
          <rect x="3" y="16.6" width="15" height="2.4" rx="1.2" />
        </svg>
      );
    case "pronunciation":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
          <rect x="2"  y="10" width="2" height="4"  rx="1" />
          <rect x="6"  y="7"  width="2" height="10" rx="1" />
          <rect x="10" y="4"  width="2" height="16" rx="1" />
          <rect x="14" y="7"  width="2" height="10" rx="1" />
          <rect x="18" y="9"  width="2" height="6"  rx="1" />
        </svg>
      );
    case "reading":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
          <path d="M3 4.5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4.5zm2 1V18h10V5.5H5zm1.5 1.75h4.5v3.25h-4.5V7.25zm6 0h2v1.25h-2V7.25zm0 2h2v1.25h-2v-1.25zm-6 4.25h7v1.25h-7V13.5zm0 2h5v1.25h-5V15.5z" />
          <path d="M18 8.5h2.5a1 1 0 0 1 1 1V18a2 2 0 0 1-2 2H18V8.5z" />
        </svg>
      );
  }
}
