import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Wordmark } from "@/components/atoms/Wordmark/Wordmark";
import { IOSBetaPill } from "@/components/atoms/IOSBetaPill/IOSBetaPill";
import { ThemeToggle } from "@/components/atoms/ThemeToggle/ThemeToggle";
import { NavOriginsLink } from "@/components/atoms/NavOriginsLink/NavOriginsLink";
import { LanguagePicker } from "@/components/atoms/LanguagePicker/LanguagePicker";
import { TryItButton } from "@/components/atoms/TryItButton/TryItButton";
import { NavMenuSheet } from "@/components/organisms/NavMenuSheet/NavMenuSheet";

/**
 * Topnav, site header shared by landing and /try.
 *
 * Desktop (≥ 641px): Wordmark on the left; a RIGHT CLUSTER holding
 * NavOriginsLink + IOSBetaPill + TryItButton + LanguagePicker +
 * ThemeToggle in a 10px flex row. TryItButton sits between the info
 * items and the utility controls so it reads as the primary action
 * without being isolated at either edge, matching the standard SaaS
 * right-cluster pattern.
 *
 * Mobile (≤ 640px): compact "glass pill" surface. Only three items
 * fit: Wordmark on the left, compact TryItButton as the primary CTA,
 * and a hamburger NavMenuSheet trigger on the right. The utility
 * items (Origins, iOS Beta, LanguagePicker, ThemeToggle) move into a
 * bottom-sheet menu so the primary CTA stays prominent.
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
        // Desktop, wordmark left, cluster right.
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

      {/* Desktop right cluster. Hidden on mobile (`max-md:hidden`)
          so the mobile pill can run its own compact layout below.
          Order: info items → primary CTA → user prefs. TryItButton
          sits between IOSBetaPill and LanguagePicker so it's the
          visual anchor of the cluster without floating at an edge. */}
      <div className="hidden md:flex items-center gap-2.5">
        <NavOriginsLink />
        <IOSBetaPill />
        <TryItButton />
        <LanguagePicker />
        <ThemeToggle />
      </div>

      {/* Mobile cluster, only shown on narrow viewports. Three items:
          Try it CTA (compact), then the hamburger menu which opens a
          bottom sheet with the hidden utility items. ml-auto pulls
          the cluster to the right of the Wordmark. */}
      <div className="flex items-center gap-2 ml-auto md:hidden">
        <TryItButton size="compact" />
        <NavMenuSheet />
      </div>
    </nav>
  );
}
