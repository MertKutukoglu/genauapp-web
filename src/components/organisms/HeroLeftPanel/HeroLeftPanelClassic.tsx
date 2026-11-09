import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { SkillRingArc } from "@/components/molecules/SkillRingArc/SkillRingArc";
import { NodeGraph } from "@/components/molecules/NodeGraph/NodeGraph";
import { WaitlistForm } from "@/components/molecules/WaitlistForm/WaitlistForm";

/**
 * HeroLeftPanelClassic — the original left-column treatment:
 * SkillRingArc on top, NodeGraph beneath it with thin feed lines,
 * Fraunces headline in the center, subhead, then WaitlistForm pinned
 * to the bottom.
 *
 * Kept alongside HeroLeftPanelPhone so the two can be compared in
 * Storybook before the landing page picks one.
 */

export interface HeroLeftPanelClassicProps {
  className?: string;
}

export function HeroLeftPanelClassic({ className }: HeroLeftPanelClassicProps) {
  return (
    <div
      className={clsx(
        "relative flex h-full w-full flex-col items-center gap-6 px-6 py-10 text-center md:gap-8 md:px-10 md:py-12",
        className,
      )}
    >
      <div className="relative w-full max-w-[560px]">
        <SkillRingArc size="md" />
        <div className="pointer-events-none absolute inset-x-0 top-[72%] -z-0 opacity-60">
          <NodeGraph />
        </div>
      </div>

      <h1 className="relative z-10 mt-6 font-display text-[40px] font-semibold leading-[1.05] text-fg sm:text-[52px]">
        You keep learning German.
        <br />
        <span className="text-accent italic">We keep it from fading.</span>
      </h1>
      <p className="relative z-10 max-w-[440px] text-base text-fg-muted md:text-lg">
        A sharp, honest companion for active learners.
      </p>

      <div className="relative z-10 mt-auto w-full max-w-[460px]">
        <WaitlistForm />
      </div>
    </div>
  );
}
