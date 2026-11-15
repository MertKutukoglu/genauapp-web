"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * TryItButton, the primary header CTA pointing to /try.
 *
 * Filled cherry accent background with white text, pill radius. The
 * LeftCard on /try already carries a CTA, but it lives inside a
 * sticky left column that landing visitors can scroll past without
 * seeing. The header CTA is the standard SaaS pattern: always visible,
 * always primary, impossible to miss.
 *
 * Label is locale-aware: "Dene" (TR) / "Try it" (EN), with a trailing
 * arrow to signal forward motion.
 *
 * Shared across desktop (inside the right cluster) and mobile (inside
 * the compact glass pill). The desktop version carries a small inline
 * arrow; the mobile version drops the arrow to keep the pill tight.
 */

export interface TryItButtonProps {
  className?: string;
  /** "normal" (default) renders the full button with arrow for
   *  desktop. "compact" drops the arrow for the mobile glass pill
   *  so the button stays narrow next to the menu icon. */
  size?: "normal" | "compact";
}

export function TryItButton({ className, size = "normal" }: TryItButtonProps) {
  const { locale } = useLocale();
  const label = locale === "tr" ? "Dene" : "Try it";
  const href = locale === "tr" ? "/tr/try" : "/try";
  const isCompact = size === "compact";

  return (
    <Link
      href={href}
      aria-label={locale === "tr" ? "Dene, web demosunu aç" : "Try it, open the web demo"}
      className={clsx(
        "inline-flex items-center justify-center gap-1.5",
        "font-sans font-semibold whitespace-nowrap",
        "rounded-full",
        isCompact
          ? "px-3.5 h-[30px] text-[13px]"
          : "px-4 h-[34px] text-[13px]",
        "text-white",
        "transition-[background-color,transform] duration-150",
        "active:scale-[0.97]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        className,
      )}
      style={{
        background: "var(--accent)",
      }}
    >
      <span>{label}</span>
      {isCompact ? null : (
        <span aria-hidden className="text-[14px] leading-none">
          →
        </span>
      )}
    </Link>
  );
}
