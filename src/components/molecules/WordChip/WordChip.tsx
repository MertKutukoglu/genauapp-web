"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * WordChip — the tappable word button in the Sentence Exercise's
 * builder. One component covers four render states (brief §5.7):
 *
 *   idle         pool chip, awaiting tap
 *   placed       sitting inside a slot; teal bg, white text
 *   correct      post-check, in the right position; green tint
 *   wrong        post-check, in a wrong position; red tint
 *
 * No role-color surfacing here on purpose — the brief's design
 * principle (§8.9) is that pool chips are neutral until the check
 * step; role coloring only appears in Learn examples and in the
 * post-check Incorrect banner's reveal. Painting the pool chips
 * would telegraph the answer.
 *
 * `locked` disables the click but doesn't re-tint — used post-check
 * so the user can see the colored verdict without being able to
 * rearrange things.
 */

export type WordChipState = "idle" | "placed" | "correct" | "wrong";

export interface WordChipProps {
  text: string;
  state: WordChipState;
  onClick?: () => void;
  /** Disable clicks (post-check); doesn't change visuals. */
  locked?: boolean;
  className?: string;
}

export function WordChip({
  text,
  state,
  onClick,
  locked,
  className,
}: WordChipProps) {
  const style = STYLES[state];
  const disabled = locked || !onClick;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={text}
      className={clsx(
        "min-h-[44px] rounded-[14px] px-3 py-2.5",
        "font-sans font-semibold text-base",
        "transition-all duration-180 ease-out",
        !disabled && "cursor-pointer hover:brightness-105 active:brightness-95",
        disabled && "cursor-default",
        className,
      )}
      style={style}
    >
      {text}
    </button>
  );
}

/**
 * Inline color table instead of CSS classes because the "placed"
 * state uses the chip-sentence-color token and the correct/wrong
 * states mix `--ok` and a fixed red — easier to keep all four shapes
 * next to each other as plain objects than to shuttle through
 * Tailwind arbitrary values.
 */
const STYLES: Record<WordChipState, React.CSSProperties> = {
  idle: {
    background: "var(--surface-card)",
    border: "1px solid var(--border-strong)",
    color: "var(--fg)",
  },
  placed: {
    background: "var(--chip-sentence-color)",
    border: "1px solid var(--chip-sentence-color)",
    color: "#ffffff",
  },
  correct: {
    background: "color-mix(in srgb, var(--ok) 20%, transparent)",
    border: "1px solid color-mix(in srgb, var(--ok) 50%, transparent)",
    color: "var(--ok)",
  },
  wrong: {
    background: "color-mix(in srgb, #EA3C3C 20%, transparent)",
    border: "1px solid color-mix(in srgb, #EA3C3C 50%, transparent)",
    color: "#EA3C3C",
  },
};
