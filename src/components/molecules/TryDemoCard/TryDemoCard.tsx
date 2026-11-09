import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";

/**
 * TryDemoCard — the hero-level invitation to the /try taste demo.
 *
 * Replaces the waitlist email form on the left card: before asking for
 * an email we invite the viewer to actually feel the app. One cherry
 * CTA routes to /try, with a short reassurance line underneath so the
 * ask feels low-stakes.
 *
 * `variant` lets callers pick the grain:
 *   - "soft"  (default) — rounded card with surface-card background,
 *     accent-tinted border + a subtle cherry wash on the left edge.
 *     Fits inside the hero left card without stealing the eye from
 *     the headline above.
 *   - "solid" — full cherry fill, white type. Louder; use when the
 *     card sits on an off-white surface and the CTA needs to anchor.
 */

type Variant = "soft" | "solid";

export interface TryDemoCardProps {
  href?: string;
  variant?: Variant;
  heading?: React.ReactNode;
  body?: React.ReactNode;
  ctaLabel?: React.ReactNode;
  /** Reassurance line beneath the CTA. Set to null to drop it. */
  footnote?: React.ReactNode | null;
  className?: string;
}

export function TryDemoCard({
  href = "/try",
  variant = "soft",
  heading = "Not sure yet? Try it first.",
  body = "Five minutes in your browser. Four workouts, zero signup.",
  ctaLabel = "Try it in your browser",
  footnote = "No email, no account. Just the app.",
  className,
}: TryDemoCardProps) {
  const isSolid = variant === "solid";

  return (
    <aside
      className={clsx(
        "relative flex w-full flex-col gap-3 rounded-[22px] p-5 text-left",
        "md:gap-4 md:p-6",
        isSolid
          ? "bg-accent text-white shadow-[0_16px_40px_-22px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
          : [
              "border border-[color:color-mix(in_srgb,var(--accent)_28%,var(--border))]",
              "bg-[color:color-mix(in_srgb,var(--accent)_6%,var(--surface-card))]",
              "text-fg shadow-[0_16px_40px_-22px_rgba(26,19,18,0.18)]",
            ],
        className,
      )}
    >
      {/* Accent flag on the left edge for the soft variant */}
      {!isSolid ? (
        <span
          aria-hidden
          className="absolute inset-y-4 left-0 w-[3px] rounded-r-full bg-accent"
        />
      ) : null}

      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={clsx(
            "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full",
            isSolid
              ? "bg-white/15 text-white"
              : "bg-accent text-white",
          )}
        >
          <Icon name="sparkle" className="h-4 w-4" />
        </span>
        <div className="flex flex-col gap-1">
          <h3
            className={clsx(
              "font-display text-[22px] font-semibold leading-tight tracking-[-0.01em] md:text-[26px]",
              isSolid ? "text-white" : "text-fg",
            )}
          >
            {heading}
          </h3>
          <p
            className={clsx(
              "text-[15px] leading-[1.5]",
              isSolid ? "text-white/85" : "text-fg-muted",
            )}
          >
            {body}
          </p>
        </div>
      </div>

      <Link
        href={href}
        className={clsx(
          "mt-1 inline-flex w-full items-center justify-between gap-3 rounded-full px-5 py-3 font-semibold transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          isSolid
            ? "bg-white text-accent hover:bg-white/95 focus-visible:ring-white"
            : "bg-accent text-white hover:brightness-110 focus-visible:ring-accent",
        )}
      >
        <span>{ctaLabel}</span>
        <Icon name="arrow-right" className="h-4 w-4" />
      </Link>

      {footnote ? (
        <p
          className={clsx(
            "text-center text-xs",
            isSolid ? "text-white/70" : "text-fg-faint",
          )}
        >
          {footnote}
        </p>
      ) : null}
    </aside>
  );
}
