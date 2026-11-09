import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { TryDemoCard } from "@/components/molecules/TryDemoCard/TryDemoCard";

/**
 * HeroLeftPanelPhone — phone-forward composition. Headline + subhead at
 * the top, a real iOS Home screenshot (iPhone frame already baked into
 * the image) in the middle, TryDemoCard pinned beneath.
 *
 * Headline is sized to hold its two intended one-line reads on a
 * half-column desktop ("You keep learning German." / "We keep it from
 * fading."). The <br/>s are explicit so the lines stay broken at any
 * narrow width — never a wrap mid-phrase.
 *
 * Image swap by theme uses .theme-light-only / .theme-dark-only from
 * globals.css (no client JS, no flicker).
 */

export interface HeroLeftPanelPhoneProps {
  className?: string;
}

export function HeroLeftPanelPhone({ className }: HeroLeftPanelPhoneProps) {
  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col items-center gap-3 px-6 py-6 text-center md:px-8 md:py-8",
        className,
      )}
    >
      <h1 className="font-display text-[26px] font-semibold leading-[1.1] text-fg sm:text-[30px] lg:text-[34px] xl:text-[38px]">
        You keep learning German.
        <br />
        <span className="text-accent italic">We keep it from fading.</span>
      </h1>
      <p className="max-w-[440px] text-sm text-fg-muted md:text-base">
        A sharp, honest companion for active learners.
      </p>

      {/* Phone mockup — real iOS screenshot per theme. Flex-1 lets it
          soak up remaining vertical space, min-h-0 so it can shrink. */}
      <div className="relative min-h-0 flex-1 w-full flex items-center justify-center my-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/app-home-light.png"
          alt="GenauApp Home screen on iPhone"
          width={400}
          height={820}
          className="theme-light-only h-full max-h-full w-auto max-w-full object-contain"
          loading="eager"
          decoding="async"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/app-home-dark.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={820}
          className="theme-dark-only h-full max-h-full w-auto max-w-full object-contain"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Try-demo invitation pinned at the bottom */}
      <div className="w-full max-w-[440px]">
        <TryDemoCard variant="soft" />
      </div>
    </div>
  );
}
