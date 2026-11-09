import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Wordmark } from "@/components/atoms/Wordmark/Wordmark";
import { IOSBetaPill } from "@/components/atoms/IOSBetaPill/IOSBetaPill";
import { ThemeToggle } from "@/components/atoms/ThemeToggle/ThemeToggle";
import { NavOriginsLink } from "@/components/atoms/NavOriginsLink/NavOriginsLink";

/**
 * Topnav — the site header shared by landing and /try/.
 *
 * Desktop (≥ 641px): full-width horizontal bar. Wordmark on the left;
 * "Read our story" + iOS beta pill + theme toggle, right-clustered.
 *
 * Mobile (≤ 640px): compact "sexy glass pill" — accent-tinted gradient
 * with backdrop blur, rounded-full, sitting at the top with safe-area
 * respect. The "Our story" link is dropped (lives in OurStoryBanner
 * beneath this component instead) and the iOS pill swaps to its
 * rotator-text variant to save horizontal space.
 */

export interface TopnavProps {
  className?: string;
}

export function Topnav({ className }: TopnavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={clsx(
        // Shared
        "w-full flex items-center",
        // Desktop — space between for a left wordmark + right cluster
        "md:justify-between md:px-6 md:py-[18px]",
        // Mobile pill — glass surface, blurred, rounded-full
        "max-md:gap-1 max-md:mx-2.5 max-md:mt-2.5 max-md:pl-3.5 max-md:pr-1.5 max-md:py-1.5",
        "max-md:rounded-full max-md:border max-md:border-[color:color-mix(in_srgb,var(--fg)_10%,var(--border))]",
        "max-md:bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_8%,var(--surface-card))_0%,var(--surface-card)_55%,color-mix(in_srgb,var(--accent)_7%,var(--surface-card))_100%)]",
        "max-md:backdrop-blur-md max-md:backdrop-saturate-150",
        "max-md:shadow-[0_10px_30px_-16px_rgba(26,19,18,0.28)]",
        "max-md:w-auto",
        // Safe-area insets on all breakpoints.
        "[padding-inline:max(0.75rem,env(safe-area-inset-left))_max(0.75rem,env(safe-area-inset-right))] md:[padding-inline:1.5rem]",
        className,
      )}
    >
      <Wordmark variant="topnav" className="max-md:shrink-0 max-md:[&_svg]:h-5 max-md:[&_.beta-pill]:hidden" />

      {/* Right cluster — pushed to the right on desktop via the space-between above,
          and on mobile via ml-auto on the first right-side child. */}
      <NavOriginsLink />
      <IOSBetaPill className="max-md:ml-auto" />
      <ThemeToggle className="md:ml-2" />
    </nav>
  );
}
