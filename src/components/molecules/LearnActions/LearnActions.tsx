"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * LearnActions — the bottom row of the Learn card: `Repeat` + `I know`.
 *
 * Spec §7:
 *   - Both buttons IDENTICAL ghost styling. No primary CTA in Learn
 *     mode — there is no "correct" choice, and visually pushing the
 *     user toward one would distort the Learn-mode signal.
 *   - Flex 1 each, height 52, radius 16, gap 12
 *   - Background: color-mix(in srgb, var(--fg) 6%, transparent)
 *   - Text: var(--fg), Open Sans semi-bold 16
 *   - Icons: 20×20 on the left of each label
 *
 * Icons inlined so both use the same 2.2-stroke outline grammar:
 *   - Repeat: arrow.counterclockwise outline
 *   - I know: thumbs-up outline (stroked, not filled — the two
 *     actions carry equal weight; a filled thumb was reading as the
 *     primary CTA)
 */

export interface LearnActionsProps {
  onRepeat?: () => void;
  onIKnow?: () => void;
  /** Disables both buttons (card-level lock). */
  disabled?: boolean;
  /** Disables Repeat alone — e.g. when the deck is in a transient state. */
  repeatDisabled?: boolean;
  /**
   * Disables I know alone — used by the assembly variants to gate
   * advancement until the puzzle is solved.
   */
  iKnowDisabled?: boolean;
  className?: string;
}

export function LearnActions({
  onRepeat,
  onIKnow,
  disabled,
  repeatDisabled,
  iKnowDisabled,
  className,
}: LearnActionsProps) {
  return (
    <div className={clsx("flex gap-3", className)}>
      <ActionButton
        onClick={onRepeat}
        disabled={disabled || repeatDisabled}
        label="Repeat"
      >
        {/* arrow.counterclockwise, 2.2 stroke */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden
        >
          <path d="M3 12a9 9 0 1 0 2.5-6.3" />
          <path d="M3 4v4h4" />
        </svg>
      </ActionButton>
      <ActionButton
        onClick={onIKnow}
        disabled={disabled || iKnowDisabled}
        label="I know"
      >
        {/* thumbs-up outline, same 2.2 stroke as the Repeat icon so
            the pair reads as one visual family. Open contour by
            design — no primary CTA in Learn mode. */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden
        >
          <path d="M7 11v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3Zm0 0 5-8a2.5 2.5 0 0 1 2.5 2.5V9h4.5a2 2 0 0 1 2 2.3l-1.4 7a2 2 0 0 1-2 1.7H7" />
        </svg>
      </ActionButton>
    </div>
  );
}

function ActionButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "flex-1 inline-flex items-center justify-center gap-2",
        "h-[52px] rounded-2xl",
        "font-sans font-semibold text-base text-fg",
        "bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
        "transition-colors duration-150",
        "hover:bg-[color:color-mix(in_srgb,var(--fg)_10%,transparent)]",
        "active:bg-[color:color-mix(in_srgb,var(--fg)_14%,transparent)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "disabled:hover:bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      )}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
