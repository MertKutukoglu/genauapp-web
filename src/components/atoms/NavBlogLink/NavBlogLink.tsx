"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * "Blog" chip in the topnav right cluster.
 *
 * Replaces the original NavOriginsLink in the Topnav header now that
 * the blog has more than one post. It points at `/blog` (the hub)
 * rather than a single post, so the header reads as a conventional
 * site nav. NavOriginsLink stays in place on the OurStoryBanner
 * molecule, which specifically pitches the Origins post.
 *
 * Locale-aware: label from `nav.blog`, href flips `/blog` ↔
 * `/tr/blog`. Visual language matches NavOriginsLink so the right
 * cluster stays homogeneous.
 */

const TR_BLOG_HREF = "/tr/blog";
const EN_BLOG_HREF = "/blog";

export interface NavBlogLinkProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function NavBlogLink({ href, className, children }: NavBlogLinkProps) {
  const { locale, strings } = useLocale();
  const resolvedHref = href ?? (locale === "tr" ? TR_BLOG_HREF : EN_BLOG_HREF);
  const label = children ?? strings.nav.blog;
  return (
    <Link
      href={resolvedHref}
      className={clsx(
        "inline-flex items-center gap-[7px]",
        "whitespace-nowrap rounded-full border border-border-strong bg-surface-card text-fg font-semibold",
        "pl-[11px] pr-[14px] py-[6px] text-[13px] leading-none",
        "transition hover:text-accent hover:border-accent hover:bg-[color:color-mix(in_srgb,var(--accent)_6%,var(--surface-card))]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className,
      )}
    >
      <Icon name="book" className="w-[15px] h-[15px] text-accent" />
      <span>{label}</span>
    </Link>
  );
}
