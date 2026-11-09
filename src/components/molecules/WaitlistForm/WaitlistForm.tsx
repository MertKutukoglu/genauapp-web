"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { EmailInput } from "@/components/atoms/EmailInput/EmailInput";
import { Button } from "@/components/atoms/Button/Button";

/**
 * WaitlistForm — email + submit, with idle / submitting / success states.
 *
 * Writes `taste_email` to localStorage and fires the
 * `demo_waitlist_email` analytics event — both to match the handoff
 * (handoff §10 catalog entry, §11 storage key). Supabase wiring lands
 * in Phase 5; right now it's localStorage + analytics only.
 */

type Status = "idle" | "submitting" | "success" | "error";
const STORAGE_KEY = "taste_email";

export interface WaitlistFormProps {
  /** Shown above the input. Omit for just the field. */
  heading?: React.ReactNode;
  /** Shown between heading and input. */
  sub?: React.ReactNode;
  /** Optional context ("waitlist"/"summary") passed to the analytics event. */
  level?: string;
  className?: string;
}

export function WaitlistForm({
  heading,
  sub,
  level,
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ email, at: new Date().toISOString() }),
      );
    } catch {
      /* ignore quota / private-mode */
    }
    if (typeof window !== "undefined") {
      try {
        window.__track?.("demo_waitlist_email", level ? { level } : {});
      } catch {
        /* no-op */
      }
    }
    // Simulate async for a hint of feedback; Supabase wiring in Phase 5.
    setTimeout(() => setStatus("success"), 250);
  };

  if (status === "success") {
    return (
      <div
        className={clsx(
          "flex flex-col items-center gap-2 rounded-2xl border border-ok/30 bg-[color:color-mix(in_oklab,var(--ok)_8%,var(--surface-card))] px-5 py-6 text-center",
          className,
        )}
      >
        <p className="font-display text-lg font-semibold text-fg">
          You&apos;re on the list.
        </p>
        <p className="text-sm text-fg-muted">
          We&apos;ll mail you the moment the iOS beta drops.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={clsx("flex flex-col gap-3", className)}
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
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="your@email.com"
          className="!h-11 flex-1 !bg-transparent !px-0"
          required
          aria-invalid={status === "error" || undefined}
        />
        <Button
          type="submit"
          tone="primary"
          size="sm"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Joining…" : "Join waitlist"}
        </Button>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-accent">
          That doesn&apos;t look like a valid email. Try again.
        </p>
      ) : (
        <p className="text-xs text-fg-faint">
          One email when the iOS beta drops. No spam, ever.
        </p>
      )}
    </form>
  );
}
