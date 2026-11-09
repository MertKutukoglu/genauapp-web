"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import type { ChipId } from "@/stores/chipStore";

/**
 * RightCardPlaceholder — the /try/ right column's empty state.
 *
 * Two shapes:
 *   - `null` chip → "Pick a workout to begin." (the default landing
 *     state right after the level picker)
 *   - a named chip → "`<Chip>` is being wired up." (the stub state
 *     for chips whose session content hasn't landed yet)
 *
 * Replaces itself with a real chip session component once that chip's
 * session lands. Kept here so the right column is never empty — a
 * blank slot across a 2-col grid reads broken on both desktop and
 * mobile.
 *
 * Shares the LeftCard's frame recipe (surface-card bg, 22 radius,
 * 20 padding, soft bottom shadow) so the two cards read as a pair.
 */

const CHIP_LABEL: Record<ChipId, string> = {
  words: "Words",
  grammar: "Grammar",
  sentence: "Sentence",
  reading: "Reading",
};

export interface RightCardPlaceholderProps {
  /**
   * When set, the copy flips to "`<chip>` is being wired up" instead
   * of the generic "pick a workout" state.
   */
  selectedChip?: ChipId | null;
  className?: string;
}

export function RightCardPlaceholder({
  selectedChip,
  className,
}: RightCardPlaceholderProps) {
  const isStub = Boolean(selectedChip);

  return (
    <section
      aria-label="Session area"
      className={clsx(
        // Frame — mirrors LeftCard chrome
        "bg-surface-card border border-border rounded-[22px] p-5",
        "shadow-[0_18px_44px_-28px_rgba(26,19,18,0.26)]",
        // Fill the right column. On desktop the parent grid stretches
        // us to match the LeftCard's row height (via items-stretch);
        // mobile keeps a sensible floor so the empty state doesn't
        // collapse against the LeftCard above.
        "flex flex-1 min-h-[520px] lg:min-h-0",
        className,
      )}
    >
      <div className="m-auto flex flex-col items-center gap-4 px-6 py-10 text-center max-w-[380px]">
        {/* Soft sparkle mark — matches the TryDemoCard icon on the landing */}
        <span
          aria-hidden
          className={clsx(
            "inline-flex items-center justify-center",
            "w-14 h-14 rounded-full",
            "bg-[color:color-mix(in_srgb,var(--accent)_10%,transparent)]",
            "text-accent",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            aria-hidden
          >
            {/* Four-point star — same one used in TryDemoCard */}
            <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
          </svg>
        </span>

        <h2
          className={clsx(
            "font-display italic font-semibold text-fg m-0",
            "text-[22px] md:text-[26px] leading-tight",
          )}
        >
          {isStub && selectedChip
            ? `${CHIP_LABEL[selectedChip]} is being wired up.`
            : "Pick a workout to begin."}
        </h2>
        <p className="font-sans text-[14px] leading-relaxed text-fg-muted m-0">
          {isStub
            ? "Pick a different workout on the left — we'll have this one running soon."
            : "Tap any of the four on the left. You'll see a real session land here."}
        </p>
      </div>
    </section>
  );
}
