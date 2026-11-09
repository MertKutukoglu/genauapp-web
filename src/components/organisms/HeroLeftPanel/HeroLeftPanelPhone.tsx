import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { PhoneFrame } from "@/components/atoms/PhoneFrame/PhoneFrame";
import { AppHomeMockup } from "@/components/molecules/AppHomeMockup/AppHomeMockup";
import { WaitlistForm } from "@/components/molecules/WaitlistForm/WaitlistForm";

/**
 * HeroLeftPanelPhone — phone-forward composition. Big Fraunces headline
 * on top, PhoneFrame with AppHomeMockup in the center (so it reads "this
 * is an app, here's what it looks like"), WaitlistForm pinned beneath.
 *
 * Content string matches the classic variant verbatim per user request.
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

      {/* Phone mockup — the "see, it's an app" moment */}
      <div className="relative my-4 md:my-6">
        {/* Soft cherry glow behind the phone */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 translate-y-6 scale-110 rounded-[50%] blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
          }}
        />
        <PhoneFrame width={260}>
          <AppHomeMockup />
        </PhoneFrame>
      </div>

      {/* Waitlist pinned at the bottom */}
      <div className="mt-auto w-full max-w-[460px]">
        <WaitlistForm />
      </div>
    </div>
  );
}
