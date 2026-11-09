import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * Chip — the workout picker tile. Four flavors keyed to the four demo
 * workouts; the color comes from a CSS var that the chip tints.
 *
 * Handoff §5 states:
 *   default  → color-mix(chip 14%, surface-card)
 *   hover    → 22% tint, translateY(-1px)
 *   selected → 28% tint, solid border, shadow glow
 *   done     → 10% tint, muted title, green check bottom-right
 *
 * We implement those states via a CSS var `--chip-color` so this file never
 * references a specific color. The flavor prop only sets that var.
 */

export type ChipFlavor = "words" | "grammar" | "sentence" | "reading";
export type ChipState = "default" | "selected" | "done";

const flavorVar: Record<ChipFlavor, string> = {
  words: "var(--chip-words-color)",
  grammar: "var(--chip-grammar-color)",
  sentence: "var(--chip-sentence-color)",
  reading: "var(--chip-reading-color)",
};

const flavorLabel: Record<ChipFlavor, string> = {
  words: "Words",
  grammar: "Grammar",
  sentence: "Sentence",
  reading: "Reading",
};

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  flavor: ChipFlavor;
  state?: ChipState;
  /** Optional subtitle rendered under the main label. */
  caption?: string;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  function Chip(
    { flavor, state = "default", caption, className, children, style, ...rest },
    ref,
  ) {
    const tintPct =
      state === "selected" ? "28%" : state === "done" ? "10%" : "14%";

    return (
      <button
        ref={ref}
        data-chip-state={state}
        className={clsx(
          "group relative flex min-h-24 w-full flex-col items-start justify-between rounded-2xl p-4 text-left transition sm:min-h-28",
          "border border-transparent",
          "hover:-translate-y-px",
          state === "selected" &&
            "ring-2 ring-[color:var(--chip-color)] shadow-lg",
          state === "done" && "opacity-90",
          className,
        )}
        style={{
          ["--chip-color" as string]: flavorVar[flavor],
          background: `color-mix(in oklab, var(--chip-color) ${tintPct}, var(--surface-card))`,
          borderColor:
            state === "selected"
              ? "var(--chip-color)"
              : "color-mix(in oklab, var(--chip-color) 28%, transparent)",
          ...style,
        }}
        {...rest}
      >
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "var(--chip-color)" }}
          />
          <span
            className={clsx(
              "font-display text-base font-semibold sm:text-lg",
              state === "done" ? "text-fg-muted" : "text-fg",
            )}
          >
            {children ?? flavorLabel[flavor]}
          </span>
        </span>
        {caption ? (
          <span className="text-xs text-fg-muted sm:text-sm">{caption}</span>
        ) : null}

        {state === "done" ? (
          <span
            aria-label="done"
            className="absolute bottom-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-ok text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M5 12l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : null}
      </button>
    );
  },
);
