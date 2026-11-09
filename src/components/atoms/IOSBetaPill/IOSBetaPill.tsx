"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * iOS Beta pill — Apple icon + pulsing cherry dot + "iOS BETA · Q1 2027".
 * Ported from the live topnav. On narrow widths (<= 640px) the text slot
 * swaps to a rotator that cycles "iOS Beta → Q1 2027 → Soon" in a
 * 72px-wide window (handoff source §4). The rotator respects
 * `prefers-reduced-motion`: it freezes on the first label.
 */

export interface IOSBetaPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Behavior on narrow widths.
   * - "rotate": cycle through 3 labels (default — matches live)
   * - "static": always show the full "iOS BETA · Q1 2027"
   */
  narrow?: "rotate" | "static";
}

export function IOSBetaPill({
  narrow = "rotate",
  className,
  ...rest
}: IOSBetaPillProps) {
  return (
    <span
      aria-label="iOS beta coming Q1 2027"
      className={clsx(
        "inline-flex items-center gap-[7px] whitespace-nowrap rounded-full border border-border bg-surface-card text-fg-muted font-semibold uppercase",
        "px-[14px] h-[34px] text-[12px] tracking-[0.06em]",
        // Narrow-pill treatment: thinner padding, lower type.
        "max-[640px]:bg-transparent max-[640px]:border-transparent max-[640px]:px-[10px] max-[640px]:text-[10.5px]",
        className,
      )}
      {...rest}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-[13px] h-[13px] max-[640px]:w-[11px] max-[640px]:h-[11px] text-fg"
      >
        <path d="M17.6 13.1c0-2.8 2.3-4.2 2.4-4.2-1.3-1.9-3.4-2.2-4.1-2.2-1.7-.2-3.4 1-4.3 1-.9 0-2.3-1-3.8-1-2 .1-3.8 1.2-4.8 3-2.1 3.6-.5 8.9 1.5 11.9 1 1.4 2.1 3 3.6 2.9 1.5-.1 2-.9 3.8-.9s2.2.9 3.8.9c1.6 0 2.6-1.4 3.5-2.9.6-1 1.3-2.3 1.6-3.7-.1 0-3.2-1.2-3.2-4.8zm-2.9-8.9c.8-1 1.4-2.3 1.3-3.7-1.2.1-2.7.8-3.5 1.8-.8.8-1.5 2.2-1.3 3.5 1.4.1 2.7-.7 3.5-1.6z" />
      </svg>

      <span
        aria-hidden="true"
        className="inline-block w-[7px] h-[7px] rounded-full bg-accent animate-pulse motion-reduce:animate-none"
      />

      {/* Default (desktop) label */}
      <span className="max-[640px]:hidden">iOS Beta · Q1 2027</span>

      {/* Narrow (mobile) label */}
      {narrow === "rotate" ? (
        <span
          aria-hidden="true"
          className="hidden max-[640px]:inline-block relative w-[72px] h-[1.15em] overflow-hidden align-middle shrink-0"
        >
          <span className="iosbeta-rotator-item iosbeta-rotator-item-1">
            iOS Beta
          </span>
          <span className="iosbeta-rotator-item iosbeta-rotator-item-2">
            Q1 2027
          </span>
          <span className="iosbeta-rotator-item iosbeta-rotator-item-3">
            Soon
          </span>
        </span>
      ) : (
        <span className="hidden max-[640px]:inline">iOS Beta · Q1 2027</span>
      )}
    </span>
  );
}
