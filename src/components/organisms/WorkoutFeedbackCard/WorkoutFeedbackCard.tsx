"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { workoutCopy } from "@/lib/workout/strings";

/**
 * WorkoutFeedbackCard — the "soft intercept" shown when the user
 * dismisses the Summary's email ask. One textarea, one send, one
 * skip. We fire PostHog events on either exit; nothing is written
 * to Supabase (feedback text isn't a waitlist signup, and we don't
 * want to leak free-form prose into a signups table).
 *
 * The parent closes the flow either way via `onDone` — this card is
 * strictly a last-breath data pull before the user leaves the demo.
 */

export interface WorkoutFeedbackCardProps {
  /** Fired whichever way the user exits — Send or Skip. */
  onDone: () => void;
  className?: string;
}

export function WorkoutFeedbackCard({
  onDone,
  className,
}: WorkoutFeedbackCardProps) {
  const { locale } = useLocale();
  const copy = workoutCopy(locale).feedback;
  const [text, setText] = React.useState("");

  const handleSend = React.useCallback(() => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    try {
      window.__track?.("demo_workout_feedback_submitted", {
        // Clip to a sane bound before firing — PostHog charges per
        // property and a runaway paste shouldn't become a bill.
        text: trimmed.slice(0, 2000),
        length: trimmed.length,
      });
    } catch {
      /* no-op */
    }
    onDone();
  }, [text, onDone]);

  const handleSkip = React.useCallback(() => {
    try {
      window.__track?.("demo_workout_feedback_skipped");
    } catch {
      /* no-op */
    }
    onDone();
  }, [onDone]);

  const canSend = text.trim().length > 0;

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-6",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-5",
        className,
      )}
    >
      <div className="flex flex-col gap-1.5 text-center">
        <h2 className="font-display font-semibold text-[22px] text-fg leading-tight m-0">
          {copy.heading}
        </h2>
        <p className="font-sans text-[15px] text-fg-muted m-0 leading-snug">
          {copy.sub}
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={copy.textareaPlaceholder}
        rows={4}
        maxLength={2000}
        className={clsx(
          "rounded-2xl p-4 w-full resize-none",
          "font-sans text-[15px] text-fg leading-snug",
          "placeholder:font-normal placeholder:text-fg-faint",
          "outline-none focus:ring-2 focus:ring-accent/40",
        )}
        style={{
          background: "color-mix(in srgb, var(--fg) 6%, transparent)",
        }}
      />

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className={clsx(
            "h-[52px] rounded-2xl w-full",
            "font-sans font-bold text-base text-white",
            "transition-colors",
            canSend
              ? "cursor-pointer hover:brightness-105"
              : "cursor-not-allowed",
          )}
          style={{
            background: canSend
              ? "var(--accent)"
              : "color-mix(in srgb, var(--fg) 30%, transparent)",
          }}
        >
          {copy.submitCta}
        </button>
        <button
          type="button"
          onClick={handleSkip}
          className="font-sans text-[14px] text-fg-muted underline underline-offset-2 self-center bg-transparent border-0 cursor-pointer hover:text-fg"
        >
          {copy.skipLink}
        </button>
      </div>
    </div>
  );
}
