import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";

/**
 * "Read our story" chip in the desktop topnav.
 *
 * Hidden below 768px (the live site shows the OurStoryBanner molecule
 * under the topnav instead on mobile). The little book icon flutters
 * on a gentle 6s cycle via the `nav-origins-icon-nudge` keyframes.
 */

export interface NavOriginsLinkProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function NavOriginsLink({
  href = "/blog/origins-of-genau",
  className,
  children = "Read our story",
}: NavOriginsLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "hidden md:inline-flex items-center gap-[7px]",
        "whitespace-nowrap rounded-full border border-border-strong bg-surface-card text-fg font-semibold",
        "pl-[11px] pr-[14px] py-[6px] text-[13px] leading-none",
        "transition hover:text-accent hover:border-accent hover:bg-[color:color-mix(in_srgb,var(--accent)_6%,var(--surface-card))]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "group",
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
        className="w-[15px] h-[15px] shrink-0 text-accent origin-[20%_80%] animate-nav-origins-nudge group-hover:[animation:none] group-hover:[transform:rotate(-4deg)]"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
      <span>{children}</span>
    </Link>
  );
}
