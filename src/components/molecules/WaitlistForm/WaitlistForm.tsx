"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { EmailInput } from "@/components/atoms/EmailInput/EmailInput";
import { Button } from "@/components/atoms/Button/Button";
import { useLocale } from "@/lib/i18n/LocaleContext";
import {
  useWaitlistSubmit,
  type WaitlistLevel,
} from "@/lib/waitlist/useWaitlistSubmit";

/**
 * WaitlistForm — email + submit for the landing hero and taste-summary
 * CTAs. Writes to public.waitlist_emails in Supabase through
 * useWaitlistSubmit, which also captures UTM + referrer + landing_url
 * and fires the waitlist_submit_* PostHog event family.
 *
 * `demo_waitlist_email` is still fired when `level` is set, for the
 * taste-flow funnel; it is independent of waitlist_submit_* and
 * existing dashboards keep working either way.
 */

export interface WaitlistFormProps {
  /** Shown above the input. Omit for just the field. */
  heading?: React.ReactNode;
  /** Shown between heading and input. */
  sub?: React.ReactNode;
  /** CEFR level (A1/A2/B1/B2) when the form is submitted from the demo. */
  level?: WaitlistLevel;
  /** Analytics tag, e.g. "landing-hero" or "try-summary". Required. */
  source?: string;
  className?: string;
}

export function WaitlistForm({
  heading,
  sub,
  level,
  source = "landing-hero",
  className,
}: WaitlistFormProps) {
  const { strings } = useLocale();
  const w = strings.waitlist;
  const [email, setEmail] = React.useState("");
  const { state, submit } = useWaitlistSubmit();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submit({ email, source, level });

    // Demo-flow analytics stay on their original event name so the
    // try-flow funnel keeps working alongside the generic waitlist
    // metrics.
    if (level && (result === "success" || result === "duplicate")) {
      try {
        window.__track?.("demo_waitlist_email", { level });
      } catch {
        /* no-op */
      }
    }
  };

  const isDone = state === "success" || state === "duplicate";

  if (isDone) {
    return (
      <div
        className={clsx(
          "flex flex-col items-center gap-2 rounded-2xl border border-ok/30 bg-[color:color-mix(in_oklab,var(--ok)_8%,var(--surface-card))] px-5 py-6 text-center",
          className,
        )}
      >
        <p className="font-display text-lg font-semibold text-fg">
          {state === "duplicate" ? w.duplicateHeading : w.successHeading}
        </p>
        <p className="text-sm text-fg-muted">{w.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={clsx("flex flex-col gap-3", className)}
      data-source={source}
      noValidate
    >
      {heading ? (
        <h2 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
          {heading}
        </h2>
      ) : null}
      {sub ? <p className="text-fg-muted">{sub}</p> : null}

      <div className="relative flex items-center gap-2 rounded-full bg-surface-sunk p-1.5 pl-3 sm:pl-5">
        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={w.emailPlaceholder}
          className="!h-11 flex-1 !bg-transparent !px-0"
          required
          aria-invalid={state === "error" || undefined}
        />
        <Button
          type="submit"
          tone="primary"
          size="sm"
          disabled={state === "loading"}
        >
          {state === "loading" ? w.loading : w.button}
        </Button>
      </div>

      {state === "error" ? (
        <p role="alert" className="text-sm text-accent">
          {w.error}
        </p>
      ) : (
        <p className="text-xs text-fg-faint">{w.reassurance}</p>
      )}
    </form>
  );
}
