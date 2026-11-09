import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * TryLayout — the /try/ page's 2-column shell.
 *
 * Desktop (≥ 1024px): 360px sticky left column + flex-1 right column.
 *   The left card's own `lg:sticky lg:top-[92px]` handles the sticky
 *   itself; this template just gives it the right slot.
 * Mobile/tablet: stacks left above right, both full-width.
 *
 * No card chrome of its own — each slot owns its background and frame
 * (LeftCard / RightCardPlaceholder / future chip sessions). Pure
 * layout + responsive breakpoints here.
 */

export interface TryLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export function TryLayout({ left, right, className }: TryLayoutProps) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[1180px]",
        "px-3 pt-3 pb-16 md:px-4 md:pt-4 md:pb-20",
        className,
      )}
    >
      <div
        className={clsx(
          "grid gap-3 md:gap-4",
          "grid-cols-1",
          "lg:grid-cols-[360px_minmax(0,1fr)]",
          "items-start",
        )}
      >
        {left}
        {right}
      </div>
    </div>
  );
}
