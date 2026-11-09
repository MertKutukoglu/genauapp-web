"use client";

import { useCallback, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * useWaitlistSubmit — the one entry point every waitlist form uses to
 * record a signup. Writes to public.waitlist_emails via anon POST,
 * captures UTM + referrer + landing_url, and keeps PostHog event
 * names identical to what the current landing emits so existing
 * dashboards keep working.
 *
 * Behavior matches the legacy script verbatim where it matters:
 *   - 201 inserted → success
 *   - 409 duplicate email → ALSO treated as success for the user
 *     (we don't leak whether they were already signed up), but
 *     reports as `waitlist_submit_duplicate` to PostHog
 *   - Anything else → error, retryable
 *
 * Email is trimmed + lowercased before insert so the UNIQUE
 * constraint dedupes correctly across casing.
 *
 * PostHog identify is called on success/duplicate so every event
 * (past + future) in this browser links to the email. UTMs are
 * carried as `initial_utm_*` person properties for cohort filtering.
 */

export type WaitlistState =
  | "idle"
  | "loading"
  | "success"
  | "duplicate"
  | "error";

export type WaitlistLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface WaitlistSubmitOptions {
  email: string;
  source: string;
  level?: WaitlistLevel;
}

interface UtmParams {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function readUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: UtmParams = {};
  for (const k of UTM_KEYS) {
    const v = p.get(k);
    if (v) out[k] = v.slice(0, 200);
  }
  return out;
}

function identifyInPostHog(email: string, source: string) {
  if (typeof window === "undefined") return;
  try {
    const ph = window.posthog;
    if (!ph || !window.__posthogReady) return;
    const utm = readUtm();
    const personProps: Record<string, unknown> = {
      email,
      waitlist_source: source,
      waitlist_signed_up_at: new Date().toISOString(),
    };
    for (const k of UTM_KEYS) {
      const v = utm[k];
      if (v) personProps[`initial_${k}`] = v;
    }
    ph.identify?.(email, personProps);
  } catch {
    /* identify is best-effort — never block the UX */
  }
}

export interface UseWaitlistSubmit {
  state: WaitlistState;
  submit: (opts: WaitlistSubmitOptions) => Promise<WaitlistState>;
  reset: () => void;
}

export function useWaitlistSubmit(): UseWaitlistSubmit {
  const [state, setState] = useState<WaitlistState>("idle");

  const reset = useCallback(() => setState("idle"), []);

  const submit = useCallback(
    async ({ email, source, level }: WaitlistSubmitOptions): Promise<WaitlistState> => {
      const clean = email.trim().toLowerCase();
      if (!clean || !clean.includes("@") || !clean.includes(".")) {
        setState("error");
        return "error";
      }

      setState("loading");
      try {
        window.__track?.("waitlist_submit_attempt", { source });
      } catch {
        /* no-op */
      }

      // Env not wired — fail soft so local dev still works, but tell
      // the user clearly and surface the miss in PostHog.
      if (!isSupabaseConfigured()) {
        setState("error");
        try {
          window.__track?.("waitlist_submit_error", {
            source,
            kind: "unconfigured",
          });
        } catch {
          /* no-op */
        }
        return "error";
      }

      const supabase = getSupabase();
      if (!supabase) {
        setState("error");
        return "error";
      }

      const payload: Record<string, unknown> = {
        email: clean,
        source,
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent : null,
        referrer:
          typeof document !== "undefined" ? document.referrer || null : null,
        landing_url:
          typeof window !== "undefined"
            ? window.location.origin +
              window.location.pathname +
              window.location.search
            : null,
        ...readUtm(),
      };
      if (level) payload.level = level;

      const { error, status } = await supabase
        .from("waitlist_emails")
        .insert(payload);

      // 409 = duplicate email (unique constraint). We treat it as
      // success for the user but report it distinctly to PostHog.
      if (error && status === 409) {
        setState("duplicate");
        try {
          window.__track?.("waitlist_submit_duplicate", { source, status });
        } catch {
          /* no-op */
        }
        identifyInPostHog(clean, source);
        return "duplicate";
      }

      if (error) {
        setState("error");
        try {
          window.__track?.("waitlist_submit_error", {
            source,
            status,
            kind: "http",
            message: error.message,
          });
        } catch {
          /* no-op */
        }
        return "error";
      }

      setState("success");
      try {
        window.__track?.("waitlist_submit_success", { source, status });
      } catch {
        /* no-op */
      }
      identifyInPostHog(clean, source);
      return "success";
    },
    [],
  );

  return { state, submit, reset };
}
