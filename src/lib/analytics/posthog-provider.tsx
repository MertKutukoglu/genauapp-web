"use client";

/**
 * PostHog EU client — initialized lazily, ONLY after the user accepts
 * analytics cookies. Consent lives in localStorage under
 * `genauapp-consent` (see src/lib/consent/consent.ts); this provider
 * listens for the `genauapp:consent-change` event so an accept click
 * lights up tracking in the same session without a reload.
 *
 * Vercel Web Analytics is cookieless and runs regardless.
 *
 * `window.__track(name, props)` is always installed (idempotent). When
 * consent is not yet granted, it fans out to Vercel only and no-ops
 * on PostHog, so the rest of the site can call it without caring
 * about consent state.
 */
import { useEffect, type ReactNode } from "react";
import posthog from "posthog-js";
import { track as vercelTrack } from "@vercel/analytics";
import { CONSENT_EVENT, readConsent, type ConsentState } from "@/lib/consent/consent";

declare global {
  interface Window {
    __track?: (name: string, props?: Record<string, unknown>) => void;
    posthog?: typeof posthog;
    __posthogReady?: boolean;
  }
}

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

function initPostHog() {
  if (typeof window === "undefined") return;
  if (!POSTHOG_KEY) return;
  if (window.__posthogReady) return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
  });
  window.posthog = posthog;
  window.__posthogReady = true;
}

function teardownPostHog() {
  if (typeof window === "undefined") return;
  try {
    // posthog-js exposes opt_out_capturing which also wipes its cookies.
    window.posthog?.opt_out_capturing?.();
  } catch {
    /* no-op */
  }
  window.__posthogReady = false;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Install the tracker shim once. It is safe before PostHog is ready —
    // window.posthog is undefined until init, so the capture call no-ops.
    window.__track = (name, props = {}) => {
      try {
        vercelTrack(
          name,
          props as Record<string, string | number | boolean | null>,
        );
      } catch {
        /* no-op */
      }
      try {
        if (window.__posthogReady) {
          window.posthog?.capture?.(name, props);
        }
      } catch {
        /* no-op */
      }
    };

    // Honor whatever consent was stored on the user's last visit.
    if (readConsent() === "accepted") {
      initPostHog();
    }

    // React to in-session changes (banner Accept / Reject click, or a
    // "Change settings" click on the Cookie Policy page).
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<ConsentState>).detail;
      if (next === "accepted") {
        initPostHog();
      } else {
        teardownPostHog();
      }
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return <>{children}</>;
}
