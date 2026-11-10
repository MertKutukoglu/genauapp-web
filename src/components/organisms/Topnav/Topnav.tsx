import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Wordmark } from "@/components/atoms/Wordmark/Wordmark";
import { IOSBetaPill } from "@/components/atoms/IOSBetaPill/IOSBetaPill";
import { ThemeToggle } from "@/components/atoms/ThemeToggle/ThemeToggle";
import { NavOriginsLink } from "@/components/atoms/NavOriginsLink/NavOriginsLink";
import { LanguagePicker } from "@/components/atoms/LanguagePicker/LanguagePicker";

/**
 * Topnav — site header shared by landing and /try.
 *
 * Desktop (≥ 641px): Wordmark on the left; a RIGHT CLUSTER holding
 * NavOriginsLink + IOSBetaPill + ThemeToggle together in a 10px flex
 * row. They read as one group pulled to the right, not as three items
 * sprayed across the nav by space-between.
 *
 * Mobile (≤ 640px): compact "glass pill" surface — accent-tinted
 * gradient, backdrop blur, rounded-full. Wordmark + rotator pill +
 * theme toggle in a tight row.
 */

export interface TopnavProps {
  className?: string;
}

export function Topnav({ className }: TopnavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={clsx(
        "w-full flex items-center",
        // Desktop — wordmark left, cluster right.
        "md:justify-between md:px-6 md:py-[14px]",
        // Mobile glass pill.
        "max-md:gap-1 max-md:mx-2.5 max-md:mt-2.5 max-md:pl-3.5 max-md:pr-1.5 max-md:py-1.5",
        "max-md:rounded-full max-md:border max-md:border-[color:color-mix(in_srgb,var(--fg)_10%,var(--border))]",
        "max-md:bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_8%,var(--surface-card))_0%,var(--surface-card)_55%,color-mix(in_srgb,var(--accent)_7%,var(--surface-card))_100%)]",
        "max-md:backdrop-blur-md max-md:backdrop-saturate-150",
        "max-md:shadow-[0_10px_30px_-16px_rgba(26,19,18,0.28)]",
        "max-md:w-auto",
        "[padding-inline:max(0.75rem,env(safe-area-inset-left))_max(0.75rem,env(safe-area-inset-right))] md:[padding-inline:1.5rem]",
        className,
      )}
    >
      <Wordmark variant="topnav" />

      {/* Right cluster — one flex group, right-aligned, tight gap.
          LanguagePicker sits just before ThemeToggle so the two
          user-preference controls read as a pair. */}
      <div className="flex items-center gap-2.5 max-md:ml-auto">
        <NavOriginsLink />
        <IOSBetaPill />
        <LanguagePicker />
        <ThemeToggle />
      </div>
    </nav>
  );
}
