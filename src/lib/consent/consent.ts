/**
 * Cookie consent — the single source of truth for whether the user has
 * agreed to analytics. PostHog gates its init on this; Vercel Web
 * Analytics is cookieless and runs regardless.
 *
 * Shape:
 *   - localStorage['genauapp-consent'] = 'accepted' | 'rejected' | (missing)
 *   - window dispatches a 'genauapp:consent-change' CustomEvent whenever
 *     the value changes, carrying the new ConsentState in detail. The
 *     PostHog provider listens for this so an accept-click lights up
 *     tracking immediately, without a page reload.
 *
 * The banner molecule writes here; the Cookie Policy page's "Change
 * your settings" button also writes (clears) here to re-open the banner.
 */

export const CONSENT_KEY = "genauapp-consent";
export const CONSENT_EVENT = "genauapp:consent-change";

export type ConsentState = "accepted" | "rejected" | "unset";

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch {
    /* private mode / blocked */
  }
  return "unset";
}

export function writeConsent(next: ConsentState): void {
  if (typeof window === "undefined") return;
  try {
    if (next === "unset") {
      localStorage.removeItem(CONSENT_KEY);
    } else {
      localStorage.setItem(CONSENT_KEY, next);
    }
  } catch {
    /* ignore */
  }
  try {
    window.dispatchEvent(
      new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: next }),
    );
  } catch {
    /* no CustomEvent in jsdom etc. */
  }
}
