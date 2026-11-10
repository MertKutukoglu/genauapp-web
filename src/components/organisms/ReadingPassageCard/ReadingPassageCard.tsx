"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * ReadingPassageCard — the Reading chip's Read-mode card. One
 * passage, prose on the card surface, cherry "Try the questions →"
 * CTA at the bottom.
 *
 * Brief §3 design rule (non-negotiable): the passage renders as a
 * plain `<p>` directly on the card. No sunk container, no border,
 * no padding beyond the card's own 20. Wrapping prose in an inner
 * surface reads as a quote-pull, which the passage is not.
 *
 * The toolbar's counter pill is hidden here — Reading has one
 * passage, so there's no "card N of total" to show. The
 * CardToolbar molecule accepts undefined current/total and
 * collapses the pill accordingly.
 */

export interface ReadingPassageCardProps {
  title: string;
  subtitle: string;
  /** Full German text. `\n\n` splits paragraphs (A1 is one paragraph). */
  passage: string;
  onStartExercise?: () => void;
  className?: string;
}

export function ReadingPassageCard({
  title,
  subtitle,
  passage,
  onStartExercise,
  className,
}: ReadingPassageCardProps) {
  const { locale } = useLocale();
  const ctaLabel =
    locale === "tr" ? "Soruları dene →" : "Try the questions →";

  const paragraphs = React.useMemo(() => passage.split("\n\n"), [passage]);

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-5",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-5",
        className,
      )}
    >
      {/* No counter pill — one passage, no deck position. The speaker
          target is the full passage (TTS-friendly German with
          lang='de-DE' inside SpeakerButton). */}
      <CardToolbar speakText={passage} />

      {/* Header — title + subtitle, centered. */}
      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="font-sans font-bold text-[24px] text-fg leading-tight">
          {title}
        </div>
        <div
          className="font-sans font-normal text-[13px] text-fg-muted leading-snug"
          style={{ letterSpacing: "0.3px" }}
        >
          {subtitle}
        </div>
      </div>

      {/* Passage — plain prose, directly on the card. No sunk
          container, no border. 16/1.7 for breathing room. */}
      <div className="flex flex-col gap-3 flex-1">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="font-sans font-normal text-base text-fg m-0"
            style={{ lineHeight: 1.7 }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* CTA — cherry primary, bottom-pinned via the `flex-1` on the
          passage block above. */}
      <button
        type="button"
        onClick={onStartExercise}
        className={clsx(
          "h-[52px] rounded-2xl w-full",
          "font-sans font-bold text-base text-white",
          "transition-colors cursor-pointer hover:brightness-105",
        )}
        style={{ background: "var(--accent)" }}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
