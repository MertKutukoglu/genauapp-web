"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";

/**
 * iOS Beta pill — Apple icon + pulsing cherry dot + "iOS BETA · Q1 2027".
 * Ported from the live topnav. On narrow widths (<= 640px) the text slot
 * swaps to a rotator that cycles "iOS Beta → Q1 2027 → Soon" in a
 * 72px-wide window (handoff source §4). The rotator respects
 * `prefers-reduced-motion`: it freezes on the first label.
 */

export interface IOSBetaPillProps extends React.HTMLAttributes<HTMLSpanElement> {
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
        "max-[640px]:bg-transparent max-[640px]:border-transparent max-[640px]:px-[10px] max-[640px]:text-[10.5px]",
        className,
      )}
      {...rest}
    >
      <Icon name="apple" className="w-[13px] h-[13px] max-[640px]:w-[11px] max-[640px]:h-[11px] text-fg" />

      <span
        aria-hidden="true"
        className="inline-block w-[7px] h-[7px] rounded-full bg-accent animate-pulse motion-reduce:animate-none"
      />

      <span className="max-[640px]:hidden">iOS Beta · Q1 2027</span>

      {narrow === "rotate" ? (
        <span
          aria-hidden="true"
          className="hidden max-[640px]:inline-block relative w-[72px] h-[1.15em] overflow-hidden align-middle shrink-0"
        >
          <span className="iosbeta-rotator-item iosbeta-rotator-item-1">iOS Beta</span>
          <span className="iosbeta-rotator-item iosbeta-rotator-item-2">Q1 2027</span>
          <span className="iosbeta-rotator-item iosbeta-rotator-item-3">Soon</span>
        </span>
      ) : (
        <span className="hidden max-[640px]:inline">iOS Beta · Q1 2027</span>
      )}
    </span>
  );
}
