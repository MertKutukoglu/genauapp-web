"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * ModeToggle — the segmented Learn / Exercise pill that sits above
 * every Words chip card (and the other chips as they land).
 *
 * Spec §2.1 of the Words chip brief:
 *   - Track: color-mix(in srgb, var(--fg) 6%, transparent), padding 6,
 *     radius 999
 *   - Each button: height 44, flex 1, radius 999, Open Sans semi-bold 16
 *   - Selected: var(--surface-card) bg + var(--fg) text + soft lift
 *   - Unselected: transparent + var(--fg-muted)
 *   - Transition: 200ms ease-in-out between states
 *
 * Presentational — the parent organism (WordsChip) owns which mode
 * is active and what tapping one does.
 */

export type WordsMode = "learn" | "exercise";

export interface ModeToggleProps {
  mode: WordsMode;
  onChange?: (mode: WordsMode) => void;
  /**
   * Per-key label override. Reading uses `{ learn: "Read" / "Oku" }`
   * so the left tab reads "Read" instead of "Learn" without renaming
   * the internal `WordsMode` union. When omitted the toggle uses the
   * default `strings.try.mode` copy for the current locale.
   */
  labels?: Partial<Record<WordsMode, string>>;
  className?: string;
}

const MODES: WordsMode[] = ["learn", "exercise"];

export function ModeToggle({
  mode,
  onChange,
  labels,
  className,
}: ModeToggleProps) {
  const { strings } = useLocale();
  const modeLabel = strings.try.mode;
  return (
    <div
      role="tablist"
      aria-label="Card mode"
      className={clsx(
        "flex items-center p-1.5 rounded-full",
        // Sunken surface token — the lighter gray used elsewhere for
        // nested/pressed-looking backgrounds. Keeps the active pill
        // (--surface-card) distinct against the track.
        "bg-surface-sunk",
        className,
      )}
    >
      {MODES.map((m) => {
        const isActive = mode === m;
        return (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange?.(m)}
            className={clsx(
              "flex-1 h-11 rounded-full",
              "font-sans font-semibold text-base",
              "transition-colors duration-200 ease-in-out",
              isActive
                ? "bg-surface-card text-fg shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "bg-transparent text-fg-muted hover:text-fg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
          >
            {labels?.[m] ?? modeLabel[m]}
          </button>
        );
      })}
    </div>
  );
}
