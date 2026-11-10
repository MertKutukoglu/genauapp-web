"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * "Read our story" chip in the desktop topnav.
 *
 * Hidden below 768px (the live site shows the OurStoryBanner molecule
 * under the topnav instead on mobile). The little book icon flutters
 * on a gentle 6s cycle via the `animate-nav-origins-nudge` keyframes.
 *
 * Locale-aware: label comes from the i18n dict (`nav.origins`) and the
 * href flips to `/tr/blog/kokenler` on the TR tree. Props still take
 * precedence so callers (e.g. an alternate CTA) can override either.
 */

const TR_BLOG_HREF = "/tr/blog/kokenler";
const EN_BLOG_HREF = "/blog/origins-of-genau";

export interface NavOriginsLinkProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function NavOriginsLink({
  href,
  className,
  children,
}: NavOriginsLinkProps) {
  const { locale, strings } = useLocale();
  const resolvedHref = href ?? (locale === "tr" ? TR_BLOG_HREF : EN_BLOG_HREF);
  const label = children ?? strings.nav.origins;
  return (
    <Link
      href={resolvedHref}
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
      <Icon
        name="book"
        className="w-[15px] h-[15px] text-accent origin-[20%_80%] animate-nav-origins-nudge group-hover:[animation:none] group-hover:[transform:rotate(-4deg)]"
      />
      <span>{label}</span>
    </Link>
  );
}
