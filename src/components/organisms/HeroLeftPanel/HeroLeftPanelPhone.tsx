"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { TryDemoCard } from "@/components/molecules/TryDemoCard/TryDemoCard";
import { PhoneStack } from "@/components/molecules/PhoneStack/PhoneStack";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * HeroLeftPanelPhone — phone-forward composition. Headline + subhead at
 * the top, a three-phone stack in the middle showing Home + Prepositions
 * + Word card, TryDemoCard pinned beneath.
 *
 * PhoneStack is full-card-width so the hero reads at scale; its own
 * bottom mask dissolves the phones into the TryDemoCard beneath.
 */

export interface HeroLeftPanelPhoneProps {
  className?: string;
}

export function HeroLeftPanelPhone({ className }: HeroLeftPanelPhoneProps) {
  const { strings } = useLocale();
  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col items-center gap-2 px-6 pt-6 pb-4 text-center md:pt-8",
        className,
      )}
    >
      <h1 className="font-display text-[26px] font-bold leading-[1.1] text-fg sm:text-[30px] lg:text-[34px] xl:text-[38px]">
        {strings.hero.h1Before}
        <br />
        <span className="text-accent">{strings.hero.h1Emphasis}</span>
      </h1>
      <p className="max-w-[440px] text-sm text-fg-muted md:text-base">
        {strings.hero.sub}
      </p>

      {/* Phone stack — full card width, soaks remaining vertical space.
          Images are object-contain so they shrink to fit; the stack's
          bottom-fade mask dissolves the phones into the TryDemoCard
          below. */}
      <div className="relative min-h-0 flex-1 w-full flex items-center justify-center py-2">
        <PhoneStack className="h-full max-w-[640px]" />
      </div>

      {/* Try-demo invitation pinned at the bottom, full card width.
          Negative margin + z-30 so it rides over the phone fade. */}
      <div className="relative z-30 -mt-10 w-full">
        <TryDemoCard variant="soft" />
      </div>
    </div>
  );
}
