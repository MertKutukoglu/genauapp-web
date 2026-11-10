"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { workoutCopy } from "@/lib/workout/strings";

/**
 * WorkoutDoneCard — confirmation shown after a successful email
 * submit on the Summary card.
 *
 * Per Mert's call: a primary cherry CTA offering to look at the
 * blog, with a muted link back home if the user's done reading
 * demos for today. The blog target is the Origins post on each
 * locale (`/blog/origins-of-genau` → `/tr/blog/kokenler`); any
 * unknown locale falls back to the EN slug so the link never 404s.
 */

export interface WorkoutDoneCardProps {
  className?: string;
}

export function WorkoutDoneCard({ className }: WorkoutDoneCardProps) {
  const { locale } = useLocale();
  const copy = workoutCopy(locale).done;
  const blogHref =
    locale === "tr" ? "/tr/blog/kokenler" : "/blog/origins-of-genau";
  const homeHref = locale === "tr" ? "/tr" : "/";

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-6",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-6 items-center text-center",
        className,
      )}
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display italic font-semibold text-[26px] text-fg leading-tight m-0">
          {copy.heading}
        </h2>
        <p className="font-sans text-[15px] text-fg-muted m-0 leading-snug">
          {copy.sub}
        </p>
      </div>

      <Link
        href={blogHref}
        onClick={() => {
          try {
            window.__track?.("demo_workout_done_blog_click");
          } catch {
            /* no-op */
          }
        }}
        className={clsx(
          "h-[52px] rounded-2xl w-full",
          "font-sans font-bold text-base text-white",
          "inline-flex items-center justify-center",
          "transition-colors cursor-pointer hover:brightness-105",
          "no-underline",
        )}
        style={{ background: "var(--accent)" }}
      >
        {copy.blogCta}
      </Link>

      <Link
        href={homeHref}
        onClick={() => {
          try {
            window.__track?.("demo_workout_done_home_click");
          } catch {
            /* no-op */
          }
        }}
        className="font-sans text-[14px] text-fg-muted underline underline-offset-2 hover:text-fg"
      >
        {copy.homeLink}
      </Link>
    </div>
  );
}
