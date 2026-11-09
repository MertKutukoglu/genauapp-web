"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SlideHead } from "@/components/molecules/SlideHead/SlideHead";
import { SNIPPETS, SnipCaption } from "./snippets";

/**
 * Slide 2 — Practice. Verbatim port of the production slide
 * (claude/GenauApp_Web_Landing_Slide2_Practice.md).
 *
 * The same word, "gehen", shown across 9 practice surfaces. One
 * snippet visible at a time; 2800ms interval; crossfade between
 * swaps; absolutely stacked so height never changes.
 *
 * Pauses when the slide isn't the carousel's active one; resets to
 * snippet 0 on re-activation — matches the production behaviour.
 */

export interface PracticeSlideProps {
  isActiveSlide?: boolean;
  /** Override the 2800ms cycle (test harness). */
  cycleMs?: number;
  className?: string;
}

export function PracticeSlide({
  isActiveSlide = true,
  cycleMs = 2800,
  className,
}: PracticeSlideProps) {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (!isActiveSlide) return;
    setI(0);
    const id = window.setInterval(
      () => setI((idx) => (idx + 1) % SNIPPETS.length),
      cycleMs,
    );
    return () => window.clearInterval(id);
  }, [isActiveSlide, cycleMs]);

  return (
    <div className={clsx("flex flex-col gap-6 md:gap-8", className)}>
      <SlideHead
        eyebrow="Practice"
        headline={
          <>
            The same word, <em>in every room you enter</em>.
          </>
        }
        sub="Pick it up in Words, meet it again in a Reading passage, hear it in a Story, build a sentence with it. Each time it sticks a little deeper."
      />

      {/* Module stage: grid-stack so all snippets share one cell. */}
      <div
        className="relative mx-auto grid w-full max-w-[420px] [grid-template-areas:'stack'] place-items-center"
        aria-live="polite"
        aria-atomic="true"
      >
        {SNIPPETS.map((s, idx) => {
          const active = idx === i;
          return (
            <div
              key={idx}
              className={clsx(
                "flex w-full flex-col items-center gap-3.5 [grid-area:stack]",
                "transition-[opacity,transform] duration-500 ease-out",
                active
                  ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
                  : "pointer-events-none opacity-0 translate-y-2.5 scale-[0.98]",
              )}
              aria-hidden={!active}
            >
              <SnipCaption color={s.color}>{s.caption}</SnipCaption>
              {s.render()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
