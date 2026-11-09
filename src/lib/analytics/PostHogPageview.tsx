"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * PostHogPageview — fires a $pageview capture on every App Router
 * route change.
 *
 * Why: posthog.init({ capture_pageview: true }) only fires on the
 * initial hard load. Next's client-side navigation doesn't trigger a
 * new one, so without this hook /blog → / → /try all count as a
 * single pageview and the funnel is unusable.
 *
 * We set capture_pageview: false in the provider's init and own all
 * pageview captures from here instead, including the first one, so
 * there's exactly one event per visible route.
 *
 * Gated on window.__posthogReady — users who rejected analytics
 * never get captured.
 */

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.__posthogReady || !window.posthog) return;

    const query = searchParams?.toString();
    const url = pathname + (query ? `?${query}` : "");
    if (url === lastUrl.current) return;
    lastUrl.current = url;

    try {
      window.posthog.capture("$pageview", {
        $current_url: window.location.href,
        $pathname: pathname,
      });
    } catch {
      /* no-op */
    }
  }, [pathname, searchParams]);

  // Also fire when consent is accepted mid-session: __posthogReady
  // flips from false → true, but the pathname effect above has
  // already run and lastUrl holds the current path. Listen for the
  // consent event and send the first pageview.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onConsent = (e: Event) => {
      const state = (e as CustomEvent<string>).detail;
      if (state !== "accepted") return;
      // Give the provider a tick to run its init() before we capture.
      setTimeout(() => {
        if (!window.__posthogReady || !window.posthog) return;
        try {
          window.posthog.capture("$pageview", {
            $current_url: window.location.href,
            $pathname: window.location.pathname,
          });
          lastUrl.current =
            window.location.pathname + window.location.search;
        } catch {
          /* no-op */
        }
      }, 50);
    };
    window.addEventListener("genauapp:consent-change", onConsent);
    return () =>
      window.removeEventListener("genauapp:consent-change", onConsent);
  }, []);

  return null;
}
