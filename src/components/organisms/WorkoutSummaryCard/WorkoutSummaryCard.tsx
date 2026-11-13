"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { workoutCopy } from "@/lib/workout/strings";
import { useWaitlistSubmit } from "@/lib/waitlist/useWaitlistSubmit";

/**
 * WorkoutSummaryCard — the first screen of the demo-complete flow.
 *
 * Shape (top → bottom):
 *   1. Heading + subheading (small win, continuity line)
 *   2. First-try stats tile (correct / total summed across the four
 *      chip sessions the caller tracked)
 *   3. Content preview — A1 scope under the taste demo, 4 bullets,
 *     with a one-line footnote about higher levels
 *   4. Email capture — single input + submit button; dismiss link
 *     underneath that routes the parent to the feedback screen
 *
 * Supabase submit goes through `useWaitlistSubmit` with
 * `source: "demo_complete"` so the row joins the same
 * `public.waitlist_emails` table the landing already writes to.
 * Duplicate (409) counts as success for the user (we don't leak
 * whether they signed up before).
 *
 * On success the card delegates to its parent via `onSuccess` —
 * the WorkoutCompleteFlow swaps in the Done card. On explicit
 * dismiss it fires `onDismiss` and the parent swaps in Feedback.
 */

export interface WorkoutSummaryCardProps {
  /** First-try correct across the whole 4-chip workout. */
  correct: number;
  /** Total question/item count across the whole 4-chip workout. */
  total: number;
  onSuccess: () => void;
  onDismiss: () => void;
  className?: string;
}

export function WorkoutSummaryCard({
  correct,
  total,
  onSuccess,
  onDismiss,
  className,
}: WorkoutSummaryCardProps) {
  const { locale } = useLocale();
  const copy = workoutCopy(locale).summary;
  const errors = workoutCopy(locale).errors;

  const [email, setEmail] = React.useState("");
  const { state, submit } = useWaitlistSubmit();

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (state === "loading") return;
      const next = await submit({ email, source: "demo_complete" });
      // Treat duplicate like success — the user has already opted in,
      // so moving them forward is the honest path.
      if (next === "success" || next === "duplicate") {
        onSuccess();
      }
    },
    [email, state, submit, onSuccess],
  );

  const errorLabel =
    state === "error"
      ? email.trim().length > 0
        ? errors.submit
        : errors.invalidEmail
      : null;

  const disabled = state === "loading" || email.trim().length === 0;

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-6",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-6",
        className,
      )}
    >
      {/* Heading */}
      <div className="flex flex-col gap-1.5 text-center">
        <h2 className="font-display font-semibold text-[26px] text-fg leading-tight m-0">
          {copy.heading}
        </h2>
        <p className="font-sans text-[15px] text-fg-muted m-0 leading-snug">
          {copy.sub}
        </p>
      </div>

      {/* Stats tile */}
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-1">
          <div className="font-display font-semibold text-[42px] text-fg leading-none">
            {correct}
            <span className="text-fg-muted">/</span>
            {total}
          </div>
          <div
            className="font-sans text-[11px] text-fg-faint uppercase"
            style={{ letterSpacing: "0.1em" }}
          >
            {copy.statsLabel}
          </div>
        </div>
      </div>

      {/* Content preview */}
      <div className="flex flex-col gap-2 rounded-2xl p-4 bg-surface-sunk">
        <div
          className="font-sans font-semibold text-[13px] text-fg-muted uppercase"
          style={{ letterSpacing: "0.3px" }}
        >
          {copy.contentHeading}
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-1">
          {copy.contentBullets.map((b, i) => (
            <li
              key={i}
              className="font-sans text-[14px] text-fg leading-snug"
            >
              · {b}
            </li>
          ))}
        </ul>
        <div className="font-sans text-[13px] text-fg-muted leading-snug mt-1">
          {copy.contentFootnote}
        </div>
      </div>

      {/* Email form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-sans font-semibold text-base text-fg m-0">
            {copy.emailHeading}
          </h3>
          <p className="font-sans text-[14px] text-fg-muted m-0 leading-snug">
            {copy.emailBody}
          </p>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.emailPlaceholder}
          autoComplete="email"
          disabled={state === "loading"}
          className={clsx(
            "h-[52px] rounded-2xl px-4 w-full",
            "font-sans font-semibold text-[16px] text-fg",
            "placeholder:font-normal placeholder:text-fg-faint",
            "outline-none focus:ring-2 focus:ring-accent/40",
          )}
          style={{
            background: "color-mix(in srgb, var(--fg) 6%, transparent)",
          }}
        />

        {errorLabel ? (
          <div className="font-sans text-[13px] text-[#EA3C3C] leading-snug">
            {errorLabel}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={disabled}
          className={clsx(
            "h-[52px] rounded-2xl w-full",
            "font-sans font-bold text-base text-white",
            "transition-colors",
            disabled
              ? "cursor-not-allowed"
              : "cursor-pointer hover:brightness-105",
          )}
          style={{
            background: disabled
              ? "color-mix(in srgb, var(--fg) 30%, transparent)"
              : "var(--accent)",
          }}
        >
          {state === "loading" ? copy.submittingCta : copy.submitCta}
        </button>

        <button
          type="button"
          onClick={onDismiss}
          className="font-sans text-[14px] text-fg-muted underline underline-offset-2 self-center mt-1 bg-transparent border-0 cursor-pointer hover:text-fg"
        >
          {copy.dismissLink}
        </button>
      </form>
    </div>
  );
}
