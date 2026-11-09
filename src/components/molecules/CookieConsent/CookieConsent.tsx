"use client";

import * as React from "react";
import Link from "next/link";
import { clsx } from "@/lib/utils/clsx";
import {
  CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent/consent";

/**
 * CookieConsent — the GDPR consent banner.
 *
 * Renders bottom-fixed on first visit (and whenever consent has been
 * reset from the Cookie Policy page). Accept / Reject are both
 * explicit buttons, matching Berlin's reading of Art. 6(1)(a) GDPR:
 * no "X to dismiss = accept" pattern, no pre-checked analytics, no
 * cookie wall.
 *
 * Writes the choice through src/lib/consent/consent.ts which also
 * fires a window event the PostHog provider listens for, so an
 * accept-click turns on analytics in the same session without a
 * reload.
 *
 * The banner itself sets no cookie — only localStorage, which is
 * strictly necessary ("remember you already answered this prompt")
 * and doesn't need consent under ePrivacy.
 */

export interface CookieConsentProps {
  className?: string;
}

export function CookieConsent({ className }: CookieConsentProps) {
  const [state, setState] = React.useState<ConsentState>("unset");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Hydration sync: read consent state once on mount. Intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setState(readConsent());
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<ConsentState>).detail;
      setState(next);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // Render nothing server-side (consent is client-only) and nothing
  // once the user has already answered.
  if (!mounted || state !== "unset") return null;

  const accept = () => {
    writeConsent("accepted");
    try {
      window.__track?.("consent_accepted", {});
    } catch {
      /* no-op */
    }
  };
  const reject = () => {
    writeConsent("rejected");
    // Don't call __track here — rejecting means no PostHog.
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className={clsx(
        "fixed inset-x-3 bottom-3 z-50 md:inset-x-auto md:right-6 md:left-6 md:bottom-6",
        "mx-auto max-w-[920px]",
        "rounded-2xl border border-border-strong bg-surface-card text-fg",
        "shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)]",
        "backdrop-blur-sm",
        "p-4 md:p-5",
        "animate-[consent-rise_240ms_ease-out_both]",
        className,
      )}
      style={{
        // Lightweight entrance keyframe so we don't need a globals.css edit.
        ["--_tw-keyframes" as string]: "unset",
      }}
    >
      <style
        // The entrance keyframe. Scoped by being set on the dialog so it
        // doesn't leak into globals; fine to inline for a single banner.
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes consent-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}",
        }}
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-5">
        <div className="min-w-0">
          <p className="font-sans text-sm font-semibold text-fg">
            We use analytics cookies.
          </p>
          <p className="mt-1 font-sans text-[13px] leading-relaxed text-fg-muted">
            To understand how people use GenauApp we use{" "}
            <span className="whitespace-nowrap">PostHog</span> (EU-hosted). You
            can accept, or reject and we&apos;ll only run cookieless usage
            counts. Details in our{" "}
            <Link
              href="/cookie-policy"
              className="text-fg underline decoration-fg-faint underline-offset-4 hover:decoration-fg"
            >
              Cookie Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex gap-2 md:flex-shrink-0">
          <button
            type="button"
            onClick={reject}
            className={clsx(
              "flex-1 md:flex-none rounded-full border border-border-strong bg-transparent",
              "px-5 py-2.5 font-sans text-[13px] font-semibold text-fg",
              "transition hover:bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={accept}
            className={clsx(
              "flex-1 md:flex-none rounded-full bg-accent",
              "px-5 py-2.5 font-sans text-[13px] font-semibold text-white",
              "transition hover:brightness-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
