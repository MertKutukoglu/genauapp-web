import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { WaitlistForm } from "@/components/molecules/WaitlistForm/WaitlistForm";

/**
 * HeroLeftPanelPhone — phone-forward composition. Big Fraunces headline
 * on top, a real iOS screenshot of the GenauApp Home screen (with the
 * iPhone frame already baked into the image) in the middle, WaitlistForm
 * pinned beneath.
 *
 * Content string matches the classic variant verbatim per user request.
 *
 * Image assets:
 *   public/app-home-light.png — cream Home screen for light theme
 *   public/app-home-dark.png  — warm-dark Home screen for dark theme
 * Visibility swapped by the .theme-light-only / .theme-dark-only utilities
 * in globals.css, which read `[data-theme="dark"]` on <html>.
 */

export interface HeroLeftPanelPhoneProps {
  className?: string;
}

export function HeroLeftPanelPhone({ className }: HeroLeftPanelPhoneProps) {
  return (
    <div
      className={clsx(
        "relative flex h-full w-full flex-col items-center gap-6 px-6 py-10 text-center md:px-10 md:py-12",
        className,
      )}
    >
      {/* Headline */}
      <h1 className="font-display text-[40px] font-semibold leading-[1.05] text-fg sm:text-[52px]">
        You keep learning German.
        <br />
        <span className="text-accent italic">We keep it from fading.</span>
      </h1>
      <p className="max-w-[440px] text-base text-fg-muted md:text-lg">
        A sharp, honest companion for active learners.
      </p>

      {/* Phone mockup — real iOS screenshot per theme */}
      <div className="relative my-4 md:my-6 w-[min(280px,70%)]">
        {/* Soft cherry glow behind the phone */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-6 scale-110 rounded-[50%] blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
          }}
        />
        {/* Light-theme screenshot. Both <img>s share the same slot. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/app-home-light.png"
          alt="GenauApp Home screen on iPhone"
          width={400}
          height={820}
          className="theme-light-only h-auto w-full"
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
          className="theme-dark-only h-auto w-full"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Waitlist pinned at the bottom */}
      <div className="mt-auto w-full max-w-[460px]">
        <WaitlistForm />
      </div>
    </div>
  );
}
