"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * TryDemoCard — the hero-level invitation to the /try taste demo.
 *
 * Horizontal row layout: [icon] [heading + body (stacked)] [CTA button],
 * with a small centered footnote below. Compact vertical height so the
 * phone-stack hero above has more room to breathe.
 *
 * On narrow widths (< md) the row collapses: icon + text stack vertically
 * on one row, CTA goes full-width beneath, footnote stays centered under.
 *
 * `variant` lets callers pick the grain:
 *   - "soft"  (default) — surface-card bg with a cherry 6% wash.
 *   - "solid" — full cherry fill with a white pill CTA.
 */

type Variant = "soft" | "solid";

export interface TryDemoCardProps {
  href?: string;
  variant?: Variant;
  heading?: React.ReactNode;
  body?: React.ReactNode;
  ctaLabel?: React.ReactNode;
  /** Reassurance line beneath the row. Set to null to drop it. */
  footnote?: React.ReactNode | null;
  className?: string;
}

export function TryDemoCard({
  // ?level forces the /try gateway to re-show the LevelPicker even when
  // a level is already persisted from a previous visit. Progress is
  // preserved — only selectedLevel gets cleared. Deep links to plain
  // /try keep the resume-last-level behavior.
  href = "/try?level",
  variant = "soft",
  heading,
  body,
  ctaLabel,
  footnote = null,
  className,
}: TryDemoCardProps) {
  const { strings } = useLocale();
  const isSolid = variant === "solid";
  // Fall back to locale strings when the caller didn't override.
  const resolvedHeading = heading ?? strings.tryDemoCard.heading;
  const resolvedBody = body ?? strings.tryDemoCard.body;
  const resolvedCta = ctaLabel ?? strings.tryDemoCard.cta;

  return (
    <aside
      className={clsx(
        "relative w-full rounded-[22px] px-5 py-4 md:px-6 md:py-5",
        isSolid
          ? "bg-accent text-white shadow-[0_16px_40px_-22px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
          : "border border-[color:color-mix(in_srgb,var(--accent)_28%,var(--border))] bg-[color:color-mix(in_srgb,var(--accent)_6%,var(--surface-card))] text-fg shadow-[0_16px_40px_-22px_rgba(26,19,18,0.18)]",
        className,
      )}
    >
      {/* Row: icon + text block + CTA. Stacks on narrow widths. */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <span
          aria-hidden
          className={clsx(
            "grid h-10 w-10 shrink-0 place-items-center rounded-full self-start md:self-center",
            isSolid ? "bg-white/15 text-white" : "bg-accent text-white",
          )}
        >
          <Icon name="sparkle" className="h-5 w-5" />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
          <h3
            className={clsx(
              "font-display text-[18px] font-semibold leading-tight tracking-[-0.01em] md:text-[20px]",
              isSolid ? "text-white" : "text-fg",
            )}
          >
            {resolvedHeading}
          </h3>
          <p
            className={clsx(
              "text-[13.5px] leading-[1.45] md:text-sm",
              isSolid ? "text-white/85" : "text-fg-muted",
            )}
          >
            {resolvedBody}
          </p>
        </div>

        <Link
          href={href}
          className={clsx(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition whitespace-nowrap",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            "max-md:w-full",
            isSolid
              ? "bg-white text-accent hover:bg-white/95 focus-visible:ring-white"
              : "bg-accent text-white hover:brightness-110 focus-visible:ring-accent",
          )}
        >
          <span>{resolvedCta}</span>
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>

      {footnote ? (
        <p
          className={clsx(
            "mt-2.5 text-center text-xs",
            isSolid ? "text-white/70" : "text-fg-faint",
          )}
        >
          {footnote}
        </p>
      ) : null}
    </aside>
  );
}
