"use client";

/**
 * PostHog EU client — initialized once on first client render.
 * Also exposes `window.__track(name, props)` as a unified helper that fans
 * out to BOTH PostHog and Vercel Web Analytics, matching the handoff spec.
 */
import { useEffect, type ReactNode } from "react";
import posthog from "posthog-js";
import { track as vercelTrack } from "@vercel/analytics";

declare global {
  interface Window {
    __track?: (name: string, props?: Record<string, unknown>) => void;
    posthog?: typeof posthog;
  }
}

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (POSTHOG_KEY) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: true,
        capture_pageleave: true,
      });
      window.posthog = posthog;
    }

    window.__track = (name, props = {}) => {
      try {
        // Vercel Web Analytics — allowed-value types match what we send.
        vercelTrack(name, props as Record<string, string | number | boolean | null>);
      } catch {
        /* no-op */
      }
      try {
        window.posthog?.capture?.(name, props);
      } catch {
        /* no-op */
      }
    };
  }, []);

  return <>{children}</>;
}
