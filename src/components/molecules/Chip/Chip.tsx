"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { DoneBadge } from "@/components/atoms/DoneBadge/DoneBadge";

/**
 * Chip — a single row in the /try/ left card's picker. Mirrors the
 * production markup in claude/GenauApp_Web_Try_ChipPicker_Brief.md §3.
 *
 * Shape (left to right): colored icon slot · title + meta · optional
 * done-badge pinned to bottom-right.
 *
 * Color handling: each chip owns a `--chip-color` CSS custom property
 * written from the per-kind color map below; every state-driven
 * background then color-mixes against --surface-card so the same
 * recipe works in both themes. Icons inherit --chip-color via
 * stroke=currentColor.
 *
 * States (data-state):
 *   - default:  14% tint bg, transparent border, icon slot at 32% tint
 *   - selected: 28% tint bg + solid 1.5px border + chip-color shadow
 *               glow; icon slot fills solid, icon turns white
 *   - done:     10% tint bg + muted title + DoneBadge in corner
 *   - locked:   reserved — NOT USED in v1 per spec §1
 *
 * The component is presentational: hand it a state and an onClick and
 * it renders. The picker organism owns the state → store wiring.
 */

export type ChipKind = "words" | "grammar" | "sentence" | "reading";
export type ChipState = "default" | "selected" | "done" | "locked";

export interface ChipProps {
  kind: ChipKind;
  state?: ChipState;
  title: string;
  meta: string;
  onClick?: () => void;
  className?: string;
}

const CHIP_COLOR_VAR: Record<ChipKind, string> = {
  words: "var(--chip-words-color)",
  grammar: "var(--chip-grammar-color)",
  sentence: "var(--chip-sentence-color)",
  reading: "var(--chip-reading-color)",
};

/**
 * Inline SVG icons, verbatim from the spec §2.1. Kept inline rather
 * than in the Icon atom because they're specific to this picker and
 * tuned to 2.2 stroke-width to match the chip-icon slot's optical
 * weight; the shared Icon atom uses 2.0.
 */
function ChipIcon({ kind }: { kind: ChipKind }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-[22px] h-[22px]",
    "aria-hidden": true,
  };

  switch (kind) {
    case "words":
      return (
        <svg {...common}>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        </svg>
      );
    case "grammar":
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
      );
    case "sentence":
      return (
        <svg {...common}>
          <line x1="21" y1="6" x2="3" y2="6" />
          <line x1="17" y1="10" x2="3" y2="10" />
          <line x1="21" y1="14" x2="3" y2="14" />
          <line x1="17" y1="18" x2="3" y2="18" />
        </svg>
      );
    case "reading":
      return (
        <svg {...common}>
          <path d="M4 22h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2z" />
          <path d="M6 6h8v5H6z" />
          <path d="M16 6h0M6 15h12M6 18h8" />
        </svg>
      );
  }
}

export function Chip({
  kind,
  state = "default",
  title,
  meta,
  onClick,
  className,
}: ChipProps) {
  const disabled = state === "locked";

  // Set the chip's color var on the root so every nested color-mix
  // expression resolves against the right hue without prop drilling.
  const style = {
    ["--chip-color" as string]: CHIP_COLOR_VAR[kind],
  } as React.CSSProperties;

  return (
    <button
      type="button"
      data-chip={kind}
      data-kind={kind}
      data-state={state}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      aria-pressed={state === "selected"}
      style={style}
      className={clsx(
        // Layout
        "group relative w-full flex items-center gap-3.5",
        "px-4 py-3.5 rounded-[18px]",
        "text-left",
        // Default surface — 14% chip-color mixed into the card
        "bg-[color-mix(in_srgb,var(--chip-color)_14%,var(--surface-card))]",
        "border border-transparent",
        // Motion
        "transition-[background,border-color,box-shadow,transform]",
        "duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        // Hover — 22% tint + 1px lift. Locked gets no hover.
        !disabled &&
          "hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--chip-color)_22%,var(--surface-card))]",
        !disabled && "cursor-pointer",
        // Selected
        "data-[state=selected]:bg-[color-mix(in_srgb,var(--chip-color)_28%,var(--surface-card))]",
        "data-[state=selected]:border-[color:var(--chip-color)]",
        "data-[state=selected]:border-[1.5px]",
        "data-[state=selected]:shadow-[0_8px_22px_-10px_color-mix(in_srgb,var(--chip-color)_70%,transparent)]",
        // Done
        "data-[state=done]:bg-[color-mix(in_srgb,var(--chip-color)_10%,var(--surface-card))]",
        // Locked
        "data-[state=locked]:opacity-50 data-[state=locked]:cursor-not-allowed",
        // Focus ring (keyboard)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-[color:var(--chip-color)] focus-visible:ring-offset-bg",
        className,
      )}
    >
      {/* Colored icon slot — 40×40, radius 12 */}
      <span
        className={clsx(
          "flex-shrink-0 inline-flex items-center justify-center",
          "w-10 h-10 rounded-xl",
          // Default: 32% tint, icon in chip color
          "bg-[color-mix(in_srgb,var(--chip-color)_32%,var(--surface-card))]",
          "text-[color:var(--chip-color)]",
          "transition-colors duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          // Selected: solid fill, white icon
          "group-data-[state=selected]:bg-[color:var(--chip-color)]",
          "group-data-[state=selected]:text-white",
          // Done: 20% tint, 75% opacity
          "group-data-[state=done]:bg-[color-mix(in_srgb,var(--chip-color)_20%,var(--surface-card))]",
          "group-data-[state=done]:opacity-75",
        )}
      >
        <ChipIcon kind={kind} />
      </span>

      {/* Title + meta column */}
      <span className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span
          className={clsx(
            "font-sans font-bold text-[15px] leading-tight text-fg",
            // Done dims the title
            "group-data-[state=done]:text-fg-muted",
          )}
        >
          {title}
        </span>
        <span className="font-sans font-normal text-xs text-fg-muted leading-tight">
          {meta}
        </span>
      </span>

      {/* Done badge — pinned bottom-right, outside normal flow */}
      {state === "done" && (
        <span className="absolute -bottom-1.5 -right-1.5 pointer-events-none">
          <DoneBadge />
        </span>
      )}
    </button>
  );
}
