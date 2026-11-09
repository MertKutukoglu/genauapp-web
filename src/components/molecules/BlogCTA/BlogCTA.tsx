"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";

/**
 * BlogCTA — the end-of-post waitlist invite from
 * /blog/origins-of-genau.
 *
 * "Dein Deutsch, dein Workout." + a one-line body + email form.
 * Submit writes { email, source, at } to localStorage under
 * taste_email (same key the landing WaitlistForm uses) and fires
 * waitlist_submit + blog_cta_focus events to PostHog + Vercel.
 *
 * Supabase wiring lives in Phase 5 (the production blog posts to a
 * Supabase waitlist_emails table directly from the browser). For
 * now we persist locally and trust the analytics event so the
 * conversion is captured even before the DB is live.
 */

export interface BlogCTAProps {
  /** Passed into the analytics payload so dashboards can filter. */
  source?: string;
  className?: string;
}

type Status = "idle" | "submitting" | "success" | "error";
const STORAGE_KEY = "taste_email";

export function BlogCTA({ source = "origins_blog", className }: BlogCTAProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
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
        JSON.stringify({ email, source, at: new Date().toISOString() }),
      );
    } catch {
      /* ignore private-mode / quota */
    }
    if (typeof window !== "undefined") {
      try {
        window.__track?.("waitlist_submit", { source, status: "new" });
      } catch {
        /* no-op */
      }
    }
    setTimeout(() => setStatus("success"), 250);
  };

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

      {status === "success" ? (
        <p className="mt-5 inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-[color:var(--ok)]">
          <Icon name="check" className="h-5 w-5 text-[color:var(--ok)]" />
          You are in. We will let you know.
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
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className={clsx(
              "flex-1 min-w-0 rounded-full border border-border-strong bg-bg px-[18px] py-3 font-sans text-[15px] font-medium text-fg",
              "placeholder:text-fg-faint",
              "outline-none transition",
              "focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_16%,transparent)]",
              status === "error" && "border-accent",
            )}
            aria-invalid={status === "error" || undefined}
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className={clsx(
              "rounded-full bg-accent px-6 py-3 font-sans text-[15px] font-semibold text-white whitespace-nowrap",
              "transition hover:-translate-y-px hover:brightness-110",
              "disabled:cursor-default disabled:opacity-60 disabled:translate-y-0",
              "max-[480px]:w-full",
            )}
          >
            {status === "submitting" ? "…" : "Join"}
          </button>
        </form>
      )}

      {status === "error" ? (
        <p role="alert" className="mt-3 text-xs text-accent">
          That doesn&apos;t look like a valid email. Try again.
        </p>
      ) : null}

      <p className="mt-4 font-sans text-xs text-fg-faint">
        <a
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
        </a>
      </p>
    </div>
  );
}
