"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * SpeakerButton — 24×24 speaker icon that fires browser TTS on the
 * German word/sentence passed in. Shared across every card toolbar.
 *
 * Browser-native TTS (`SpeechSynthesisUtterance`) instead of audio
 * files — no download weight, works offline, supports every German
 * voice the OS already has. Quality is OS-dependent but fine for the
 * taste demo. Firebox / older Safari may not have a German voice; we
 * silently no-op rather than erroring.
 *
 * Idle: var(--fg-faint). Hover: var(--fg). While speaking: accent
 * (brief flash as cue the audio fired).
 */

export interface SpeakerButtonProps {
  /** German text to speak. If empty the button renders disabled. */
  text?: string;
  className?: string;
}

export function SpeakerButton({ text, className }: SpeakerButtonProps) {
  const [speaking, setSpeaking] = React.useState(false);

  const speak = React.useCallback(() => {
    if (typeof window === "undefined" || !text) return;
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "de-DE";
      u.rate = 0.95;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    } catch {
      /* no-op */
    }
  }, [text]);

  const disabled = !text;

  return (
    <button
      type="button"
      onClick={speak}
      disabled={disabled}
      aria-label="Play audio"
      aria-pressed={speaking}
      className={clsx(
        "inline-flex items-center justify-center rounded",
        "w-6 h-6 transition-colors",
        disabled ? "text-fg-faint opacity-40 cursor-not-allowed" : "text-fg-faint hover:text-fg",
        speaking && "!text-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className,
      )}
    >
      {/* SF Symbol speaker.wave.2 equivalent */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    </button>
  );
}
