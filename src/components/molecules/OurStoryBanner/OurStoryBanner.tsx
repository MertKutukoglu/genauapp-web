"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";

/**
 * Mobile promo banner pointing to the origins blog post. Rendered as
 * a rounded card below the topnav so it reads as a second stacked
 * item in the header stack (not a full-bleed strip). Dismissable —
 * the × stores { dismissedAt } under `genauapp-story-banner-dismissed`
 * in localStorage so it stays dismissed across sessions on that device.
 *
 * Hidden on desktop (lg:hidden) — desktop uses NavOriginsLink in the
 * topnav itself.
 *
 * The card itself is a <div> (not a <Link>) so the × click target is
 * independent and doesn't accidentally trigger navigation. The main
 * surface is a nested <Link> that fills the row.
 */

const STORAGE_KEY = "genauapp-story-banner-dismissed";

export interface OurStoryBannerProps {
  href?: string;
  className?: string;
}

export function OurStoryBanner({
  href = "/blog/origins-of-genau",
  className,
}: OurStoryBannerProps) {
  const [dismissed, setDismissed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Hydration sync: read dismissed state once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      if (localStorage.getItem(STORAGE_KEY)) setDismissed(true);
    } catch {
      /* ignore private mode */
    }
  }, []);

  if (!mounted || dismissed) return null;

  const onDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ dismissedAt: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    try {
      window.__track?.("story_banner_dismissed", {});
    } catch {
      /* no-op */
    }
  };

  const onOpen = () => {
    try {
      window.__track?.("story_banner_click", {});
    } catch {
      /* no-op */
    }
  };

  return (
    <div
      className={clsx(
        "md:hidden mx-3 mt-2",
        "flex items-stretch rounded-full overflow-hidden",
        "border border-accent/30 bg-[color:color-mix(in_srgb,var(--accent)_8%,var(--surface-card))]",
        "shadow-[0_4px_14px_-6px_rgba(0,0,0,0.3)]",
        className,
      )}
      role="region"
      aria-label="Blog promo"
    >
      <Link
        href={href}
        onClick={onOpen}
        className={clsx(
          "flex-1 flex items-center justify-center gap-2",
          "px-4 py-2.5 text-sm font-semibold text-fg",
          "transition hover:bg-[color:color-mix(in_srgb,var(--accent)_6%,transparent)]",
        )}
      >
        <Icon name="book" className="w-4 h-4 text-accent" />
        <span>Our story: how Genau started</span>
        <Icon name="arrow-right" className="w-4 h-4 text-accent" />
      </Link>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className={clsx(
          "flex items-center justify-center w-10 flex-shrink-0",
          "border-l border-accent/20 text-fg-muted",
          "transition hover:text-fg hover:bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
        )}
      >
        <Icon name="close" className="w-4 h-4" />
      </button>
    </div>
  );
}
