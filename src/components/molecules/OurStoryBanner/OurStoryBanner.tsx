import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";

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
      <Icon name="book" className="w-4 h-4 text-accent" />
      <span>Our story: how Genau started</span>
      <Icon name="arrow-right" className="w-4 h-4 text-accent" />
    </Link>
  );
}
