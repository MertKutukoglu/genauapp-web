"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useWaitlistSubmit } from "@/lib/waitlist/useWaitlistSubmit";

/**
 * BlogCTA — the end-of-post waitlist invite from /blog/*.
 *
 * "Dein Deutsch, dein Workout." + a one-line body + email form.
 * Submit writes to public.waitlist_emails in Supabase through
 * useWaitlistSubmit (anon POST, UTM + referrer + landing_url
 * captured, waitlist_submit_* PostHog events fired with the same
 * names the legacy landing uses). 409 duplicate counts as success
 * for the reader.
 *
 * blog_cta_focus (one-shot, on first focus of the email input) and
 * blog_back_to_landing_click are the blog-specific events.
 */

export interface BlogCTAProps {
  /** Passed into the Supabase row + analytics source tag. */
  source?: string;
  className?: string;
}

export function BlogCTA({ source = "origins_blog", className }: BlogCTAProps) {
  const [email, setEmail] = React.useState("");
  const { state, submit } = useWaitlistSubmit();
  const firstFocusFired = React.useRef(false);

  const onFocus = () => {
    if (firstFocusFired.current) return;
    firstFocusFired.current = true;
    if (typeof window !== "undefined") {
      try {
        window.__track?.("blog_cta_focus", { slug: source });
      } catch {
        /* no-op */
      }
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({ email, source });
  };

  const isDone = state === "success" || state === "duplicate";

  return (
    <div
      id="blogCta"
      className={clsx(
        "my-12 rounded-[20px] border border-border bg-surface-card px-7 py-8 text-center",
        className,
      )}
    >
      <p className="font-sans text-xl font-bold leading-tight tracking-[-0.01em] text-fg">
        Dein Deutsch, dein Workout.
      </p>
      <p className="mt-1.5 font-sans text-sm text-fg-muted">
        Join the waitlist. We will let you know when GenauApp launches.
      </p>

      {isDone ? (
        <p className="mt-5 inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-[color:var(--ok)]">
          <Icon name="check" className="h-5 w-5 text-[color:var(--ok)]" />
          {state === "duplicate"
            ? "You're already on the list. We'll let you know."
            : "You are in. We will let you know."}
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          data-source={source}
          className="mx-auto mt-5 flex max-w-[420px] items-stretch gap-2 max-[480px]:flex-col max-[480px]:gap-2.5"
          noValidate
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            aria-label="Email"
            autoComplete="email"
            spellCheck={false}
            value={email}
            onFocus={onFocus}
            onChange={(e) => setEmail(e.target.value)}
            className={clsx(
              "flex-1 min-w-0 rounded-full border border-border-strong bg-bg px-[18px] py-3 font-sans text-[15px] font-medium text-fg",
              "placeholder:text-fg-faint",
              "outline-none transition",
              "focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_16%,transparent)]",
              state === "error" && "border-accent",
            )}
            aria-invalid={state === "error" || undefined}
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className={clsx(
              "rounded-full bg-accent px-6 py-3 font-sans text-[15px] font-semibold text-white whitespace-nowrap",
              "transition hover:-translate-y-px hover:brightness-110",
              "disabled:cursor-default disabled:opacity-60 disabled:translate-y-0",
              "max-[480px]:w-full",
            )}
          >
            {state === "loading" ? "…" : "Join"}
          </button>
        </form>
      )}

      {state === "error" ? (
        <p role="alert" className="mt-3 text-xs text-accent">
          Something went wrong. Try again?
        </p>
      ) : null}

      <p className="mt-4 font-sans text-xs text-fg-faint">
        <Link
          href="/"
          className="text-fg-muted transition hover:text-fg"
          onClick={() => {
            if (typeof window !== "undefined") {
              try {
                window.__track?.("blog_back_to_landing_click", { slug: source });
              } catch {
                /* no-op */
              }
            }
          }}
        >
          Back to GenauApp →
        </Link>
      </p>
    </div>
  );
}
