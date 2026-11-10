"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * LevelButton — a single CEFR card on the /try/ level-picker gateway.
 *
 * Shape (top → bottom): CEFR code (Fraunces italic), short label
 * (Open Sans bold), description (Open Sans regular). A `soon` flag
 * flips the card to a muted, non-interactive state with a pill in
 * the top-right — kept in the API for future levels or locked
 * states, though the current picker ships only four active cards.
 *
 * Selection isn't enforced here: pass `selected` to mark one, pass
 * `onClick` to drive the choice. The template owns which level is
 * active and what tapping one does.
 */

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface LevelButtonProps {
  level: CEFRLevel;
  /** One-line brand label beneath the CEFR code, e.g. "Starting out." */
  label: string;
  /** Body copy underneath; spec allows 2–3 sentences, no em-dashes. */
  description: string;
  /** Muted + non-interactive variant with a "Soon" pill top-right. */
  soon?: boolean;
  /** Highlighted (ring + accent border) state for the current pick. */
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LevelButton({
  level,
  label,
  description,
  soon = false,
  selected = false,
  onClick,
  className,
}: LevelButtonProps) {
  const inert = soon;

  return (
    <button
      type="button"
      disabled={inert}
      onClick={inert ? undefined : onClick}
      aria-pressed={selected}
      data-level={level}
      data-state={soon ? "soon" : selected ? "selected" : "default"}
      className={clsx(
        // Layout
        "group relative flex flex-col gap-3 text-left w-full h-full",
        "rounded-2xl p-5",
        // Surface
        "bg-surface-card border border-border",
        // Motion
        "transition-[transform,border-color,background-color,box-shadow]",
        "duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        // Interactive
        !inert && "cursor-pointer hover:-translate-y-0.5 hover:border-accent",
        !inert &&
          "hover:shadow-[0_12px_28px_-16px_color-mix(in_srgb,var(--accent)_45%,transparent)]",
        // Selected
        selected && "border-accent",
        selected && "shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_20%,transparent)]",
        // Soon
        inert && "opacity-55 cursor-not-allowed",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className,
      )}
    >
      {/* Top row: CEFR code + optional Soon pill */}
      <div className="flex items-start justify-between gap-2">
        <span
          className={clsx(
            "font-display italic font-semibold text-[32px] leading-none",
            "text-accent",
            "transition-colors duration-200",
          )}
        >
          {level}
        </span>
        {soon ? (
          <span
            className={clsx(
              "rounded-full px-2 py-[2px]",
              "text-[10px] font-sans font-bold uppercase tracking-[0.08em]",
              "text-fg-muted",
              "bg-[color:color-mix(in_srgb,var(--fg)_8%,transparent)]",
            )}
          >
            Soon
          </span>
        ) : null}
      </div>

      {/* Label + description */}
      <div className="flex flex-col gap-1.5">
        <span className="font-sans font-bold text-[15px] leading-tight text-fg">
          {label}
        </span>
        <span className="font-sans text-[13px] leading-[1.45] text-fg-muted">
          {description}
        </span>
      </div>
    </button>
  );
}
