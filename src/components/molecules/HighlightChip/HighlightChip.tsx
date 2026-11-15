"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import type { ReadingHighlight } from "@/content/reading-a1";
import { useLocale } from "@/lib/i18n/LocaleContext";

/**
 * HighlightChip — the tap-to-translate overlay that ReadingPassageCard
 * pins to the top of its scroll area when a learner taps an
 * underlined word in the passage.
 *
 * Shape (both platforms):
 *   ┌──────────────────────────────────────────────────┐
 *   │  [🔊] [🔖·App only]   die Lehrerin  ·  teacher [×] │
 *   └──────────────────────────────────────────────────┘
 *
 *   - Left group: two round icon buttons — audio (speak the lemma)
 *     and bookmark (feature lives in the app; a small pill badge
 *     says so). The buttons sit together on their own chip surface.
 *   - Right group: a separate chip surface holding the German
 *     lemma + article (or infinitive for verbs), a thin divider,
 *     then the EN or TR translation. On the far right, a close
 *     button.
 *
 * The chip is uncontrolled visually — the parent manages which
 * highlight is active via the `highlight` prop. `null` renders
 * nothing. Switching from one highlight to another is a simple
 * prop swap: no enter/exit animation needed, just a quick fade on
 * the content inside so the reader's eye catches the change.
 *
 * Bookmark is purely a teaser here. Tapping it shows the "App only"
 * pill as a brief tooltip (not a modal), so we don't pretend the
 * action completed. Audio uses the Web Speech API in German —
 * same approach as SpeakerButton, but spoken locally since the
 * chip doesn't own a full toolbar.
 */

export interface HighlightChipProps {
  /** Active highlight, or null to hide the chip. */
  highlight: ReadingHighlight | null;
  onClose: () => void;
  className?: string;
}

/** Pick the lemma-shaped label shown in the chip header. */
function headerText(h: ReadingHighlight): string {
  if (h.kind === "noun" && h.article) {
    return `${h.article} ${h.lemma ?? h.surface}`;
  }
  if (h.kind === "verb-separable" && h.companion) {
    // Show the full separable infinitive so the pair reads as one
    // verb (lemma preferred, else reconstruct from companion+surface).
    return h.lemma ?? `${h.companion}${h.surface}`;
  }
  return h.lemma ?? h.surface;
}

export function HighlightChip({
  highlight,
  onClose,
  className,
}: HighlightChipProps) {
  const { locale } = useLocale();
  const [showAppOnly, setShowAppOnly] = React.useState(false);

  // Clear the "App only" badge whenever the highlight swaps so a
  // teaser stuck on one word doesn't carry over to the next.
  React.useEffect(() => {
    setShowAppOnly(false);
  }, [highlight?.surface, highlight?.lemma]);

  if (!highlight) return null;

  const translation = locale === "tr" ? highlight.tr : highlight.en;
  const header = headerText(highlight);

  const audioLabel = locale === "tr" ? "Seslendir" : "Pronounce";
  const bookmarkLabel = locale === "tr" ? "Yer imi" : "Bookmark";
  const closeLabel = locale === "tr" ? "Kapat" : "Close";
  const appOnlyLabel = locale === "tr" ? "Uygulamada" : "App only";

  const handleSpeak = () => {
    try {
      if (typeof window === "undefined") return;
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new window.SpeechSynthesisUtterance(highlight.lemma ?? highlight.surface);
      u.lang = "de-DE";
      u.rate = 0.95;
      synth.speak(u);
    } catch {
      /* no-op — speech synthesis unavailable */
    }
  };

  const handleBookmark = () => {
    setShowAppOnly(true);
    window.setTimeout(() => setShowAppOnly(false), 1600);
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-2 w-full min-w-0",
        className,
      )}
      role="region"
      aria-label={header}
    >
      {/* Left chip — audio + bookmark */}
      <div
        className={clsx(
          "flex items-center gap-1 shrink-0 rounded-full",
          "px-1.5 py-1",
        )}
        style={{
          background: "var(--surface-sunk)",
        }}
      >
        <button
          type="button"
          onClick={handleSpeak}
          aria-label={audioLabel}
          className={clsx(
            "inline-flex items-center justify-center w-8 h-8 rounded-full",
            "text-fg-muted hover:text-fg",
            "transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          )}
        >
          <AudioIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleBookmark}
          aria-label={bookmarkLabel}
          className={clsx(
            "relative inline-flex items-center justify-center w-8 h-8 rounded-full",
            "text-fg-muted hover:text-fg",
            "transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          )}
        >
          <BookmarkIcon className="w-4 h-4" />
          {showAppOnly ? (
            <span
              className={clsx(
                "absolute left-1/2 -translate-x-1/2 -bottom-7",
                "font-sans font-bold text-[10px] uppercase whitespace-nowrap",
                "px-1.5 py-0.5 rounded-full",
                "pointer-events-none",
              )}
              style={{
                letterSpacing: "0.4px",
                background:
                  "color-mix(in srgb, var(--accent) 14%, transparent)",
                color: "var(--accent)",
              }}
              role="status"
            >
              {appOnlyLabel}
            </span>
          ) : null}
        </button>
      </div>

      {/* Right chip — lemma + translation + close */}
      <div
        className={clsx(
          "flex items-center gap-2 flex-1 min-w-0 rounded-full",
          "pl-3 pr-1 py-1",
        )}
        style={{
          background: "var(--surface-sunk)",
        }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span
            className="font-sans font-bold text-[14px] text-fg truncate"
            lang="de"
          >
            {header}
          </span>
          <span
            className="shrink-0 w-px h-4"
            style={{
              background: "color-mix(in srgb, var(--fg) 15%, transparent)",
            }}
            aria-hidden
          />
          <span
            className="font-sans text-[14px] text-fg-muted truncate"
            lang={locale}
          >
            {translation}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className={clsx(
            "shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full",
            "text-fg-muted hover:text-fg",
            "transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          )}
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* --- Icons ------------------------------------------------------- */

function AudioIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 010 7" />
      <path d="M18.5 5.5a9 9 0 010 13" />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
