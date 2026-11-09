"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SlideHead } from "@/components/molecules/SlideHead/SlideHead";
import { PROGRESS_CARDS } from "./cards";

/**
 * Slide 3 — Your progress. Verbatim port of the production slide
 * (claude/GenauApp_Web_Landing_Slide3_Progress.md).
 *
 * Four SkillDetailSheet-replica cards cycling on a 2500ms interval:
 *   1. Word Mastery grid (Strong / Average / Weak)
 *   2. Article Performance (der / die / das)
 *   3. Grammar Topics list (3 rows, mixed up/down/flat momentum)
 *   4. Grammar Topic Focus (last-7 bars for Dative prepositions)
 *
 * All cards absolutely stacked; cross-fade between swaps so height
 * never shifts. Pauses when the slide isn't the carousel's active
 * one; resets to card 0 on re-activation.
 */

export interface ProgressSlideProps {
  isActiveSlide?: boolean;
  cycleMs?: number;
  className?: string;
}

export function ProgressSlide({
  isActiveSlide = true,
  cycleMs = 2500,
  className,
}: ProgressSlideProps) {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (!isActiveSlide) return;
    // Reset the inner cycler when this slide re-activates (per spec).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setI(0);
    const id = window.setInterval(
      () => setI((idx) => (idx + 1) % PROGRESS_CARDS.length),
      cycleMs,
    );
    return () => window.clearInterval(id);
  }, [isActiveSlide, cycleMs]);

  return (
    <div className={clsx("flex flex-col gap-6 md:gap-8", className)}>
      <SlideHead
        eyebrow="Your progress"
        headline={
          <>
            You see where you stand. <em>Honestly</em>.
          </>
        }
        sub="A real score per skill. Up when you earn it. Down when you miss it. Every time, we tell you what moved."
      />

      <div
        className="relative mx-auto grid w-full max-w-[420px] [grid-template-areas:'stack'] place-items-center"
        aria-live="polite"
        aria-atomic="true"
      >
        {PROGRESS_CARDS.map((c, idx) => {
          const active = idx === i;
          return (
            <div
              key={idx}
              className={clsx(
                "flex w-full flex-col items-center [grid-area:stack]",
                "transition-[opacity,transform] duration-500 ease-out",
                active
                  ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
                  : "pointer-events-none opacity-0 translate-y-2.5 scale-[0.98]",
              )}
              aria-hidden={!active}
            >
              {c.render()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
