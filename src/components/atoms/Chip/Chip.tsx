import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

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
 * Each flavor comes with its own icon (vocab A-book, grammar paradigm,
 * sentence formula, reading open-book), rendered large in a tinted
 * square. iOS-app shape.
 */

export type ChipFlavor = "words" | "grammar" | "sentence" | "reading";
export type ChipState = "default" | "selected" | "done";

const flavorMeta: Record<
  ChipFlavor,
  { colorVar: string; label: string; icon: IconName }
> = {
  words: {
    colorVar: "var(--chip-words-color)",
    label: "Words",
    icon: "chip-words",
  },
  grammar: {
    colorVar: "var(--chip-grammar-color)",
    label: "Grammar",
    icon: "chip-grammar",
  },
  sentence: {
    colorVar: "var(--chip-sentence-color)",
    label: "Sentence",
    icon: "chip-sentence",
  },
  reading: {
    colorVar: "var(--chip-reading-color)",
    label: "Reading",
    icon: "chip-reading",
  },
};

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  flavor: ChipFlavor;
  state?: ChipState;
  /** Optional subtitle rendered under the main label. */
  caption?: string;
  /**
   * Density of the chip.
   *   "tile"  → square card, icon prominent (used in /try/ chip picker)
   *   "pill"  → horizontal icon+label strip (used in the Your-Workout row)
   */
  density?: "tile" | "pill";
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  function Chip(
    {
      flavor,
      state = "default",
      caption,
      density = "tile",
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) {
    const { colorVar, label, icon } = flavorMeta[flavor];
    const tintPct =
      state === "selected" ? "28%" : state === "done" ? "10%" : "14%";
    const isPill = density === "pill";

    return (
      <button
        ref={ref}
        data-chip-state={state}
        className={clsx(
          "group relative transition border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--chip-color)]",
          isPill
            ? "inline-flex items-center gap-2 rounded-xl px-3 py-2 min-h-11"
            : "flex w-full flex-col items-start justify-between rounded-2xl p-4 min-h-24 sm:min-h-28 text-left",
          "hover:-translate-y-px",
          state === "selected" && "ring-2 ring-[color:var(--chip-color)] shadow-lg",
          state === "done" && "opacity-90",
          state === "selected" ? "border-[color:var(--chip-color)]" : "border-transparent",
          className,
        )}
        style={{
          ["--chip-color" as string]: colorVar,
          background: `color-mix(in oklab, var(--chip-color) ${tintPct}, var(--surface-card))`,
          ...style,
        }}
        {...rest}
      >
        {/* Icon */}
        <span
          className={clsx(
            "inline-flex items-center justify-center rounded-lg",
            isPill ? "h-7 w-7" : "h-10 w-10 sm:h-11 sm:w-11",
          )}
          style={{
            background: `color-mix(in oklab, var(--chip-color) ${state === "done" ? "20%" : "36%"}, var(--surface-card))`,
          }}
          aria-hidden
        >
          <Icon
            name={icon}
            className={clsx(
              isPill ? "w-4 h-4" : "w-6 h-6",
              state === "done"
                ? "text-fg-muted"
                : "text-[color:var(--chip-color)]",
            )}
          />
        </span>

        {/* Label block (only in tile density; pill keeps it inline) */}
        {isPill ? (
          <span
            className={clsx(
              "font-display text-sm font-semibold",
              state === "done" ? "text-fg-muted line-through" : "text-fg",
            )}
          >
            {children ?? label}
          </span>
        ) : (
          <span className="mt-3 flex w-full flex-col items-start gap-0.5">
            <span
              className={clsx(
                "font-display text-base font-semibold sm:text-lg",
                state === "done" ? "text-fg-muted" : "text-fg",
              )}
            >
              {children ?? label}
            </span>
            {caption ? (
              <span className="text-xs text-fg-muted sm:text-sm">{caption}</span>
            ) : null}
          </span>
        )}

        {state === "done" ? (
          <span
            aria-label="done"
            className={clsx(
              "absolute inline-flex items-center justify-center rounded-full bg-ok text-white",
              isPill
                ? "-top-1.5 -right-1.5 h-4 w-4"
                : "bottom-2 right-2 h-6 w-6",
            )}
          >
            <Icon name="check" className={clsx(isPill ? "w-2.5 h-2.5" : "w-4 h-4")} />
          </span>
        ) : null}
      </button>
    );
  },
);
