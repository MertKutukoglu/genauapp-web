import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * SlideHead — the eyebrow + headline + sub block shared by every
 * carousel slide (and reusable in the mobile scroll-snap variant).
 *
 * `headline` should contain an <em> for the italic cherry emphasis
 * phrase. Example:
 *   <SlideHead
 *     eyebrow="Workout"
 *     headline={<>Built from your <em>last performance.</em></>}
 *     sub="Yesterday's misses come back today. …"
 *   />
 *
 * CSS pins <em> to italic + accent color so callers never style it.
 */

export interface SlideHeadProps {
  eyebrow: string;
  headline: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
}

export function SlideHead({ eyebrow, headline, sub, className }: SlideHeadProps) {
  return (
    <header className={clsx("flex flex-col gap-3", className)}>
      <p className="font-semibold uppercase tracking-[0.14em] text-[13px] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-[28px] font-semibold leading-[1.1] text-fg md:text-[36px] [&_em]:italic [&_em]:text-accent">
        {headline}
      </h2>
      {sub ? (
        <p className="max-w-[520px] text-[15px] leading-[1.55] text-fg-muted">
          {sub}
        </p>
      ) : null}
    </header>
  );
}
