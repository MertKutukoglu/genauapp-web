import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";

/**
 * Mobile promo banner that slides under the topnav pill, pointing to the
 * origins blog post. Hidden on desktop — desktop uses NavOriginsLink in
 * the topnav itself.
 */

export interface OurStoryBannerProps {
  href?: string;
  className?: string;
}

export function OurStoryBanner({
  href = "/blog/origins-of-genau",
  className,
}: OurStoryBannerProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "md:hidden flex items-center justify-center gap-2 text-sm font-semibold",
        "px-4 py-3 border-y border-accent/30 text-fg",
        "bg-[color:color-mix(in_srgb,var(--accent)_8%,var(--surface-card))]",
        "transition hover:bg-[color:color-mix(in_srgb,var(--accent)_14%,var(--surface-card))]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="w-4 h-4 text-accent"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
      <span>Our story: how Genau started</span>
      <span aria-hidden className="text-accent">→</span>
    </Link>
  );
}
