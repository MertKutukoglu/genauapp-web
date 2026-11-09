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
 * Icons inlined per spec (Repeat: SF Symbol arrow.counterclockwise at
 * 2.2 stroke; I know: SF Symbol hand.thumbsup.fill, filled). Keeping
 * them inline rather than passing through the Icon atom guarantees
 * stroke-width / fill match the spec without the atom having to
 * special-case them.
 */

export interface LearnActionsProps {
  onRepeat?: () => void;
  onIKnow?: () => void;
  disabled?: boolean;
  className?: string;
}

export function LearnActions({
  onRepeat,
  onIKnow,
  disabled,
  className,
}: LearnActionsProps) {
  return (
    <div className={clsx("flex gap-3", className)}>
      <ActionButton onClick={onRepeat} disabled={disabled} label="Repeat">
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
      <ActionButton onClick={onIKnow} disabled={disabled} label="I know">
        {/* hand.thumbsup.fill */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
          aria-hidden
        >
          <path d="M7 22h2a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H7v12zm12.5-8H14l1.1-4.4c.1-.5.0-1.1-.3-1.5-.3-.4-.8-.6-1.3-.6h-.5c-.3 0-.7.1-.9.4L8 12v10h10l3.4-6.2c.3-.5.3-1.1.1-1.6-.2-.5-.6-.9-1.1-1.1l-.9-.1z" />
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
