"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { readConsent, writeConsent, type ConsentState } from "@/lib/consent/consent";

/**
 * ChangeConsentButton — the GDPR "withdraw consent" affordance on the
 * Cookie Policy page. Clearing the stored value re-opens the banner
 * on the next render (the banner is bound to state === "unset").
 *
 * Also shows the current state so the user knows what they are about
 * to change.
 */

const LABEL: Record<ConsentState, string> = {
  accepted: "Analytics cookies: on",
  rejected: "Analytics cookies: off",
  unset: "No choice saved yet",
};

export function ChangeConsentButton() {
  const [state, setState] = React.useState<ConsentState>("unset");

  React.useEffect(() => {
    // Hydration sync: read consent state once on mount. Intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readConsent());
    const sync = () => setState(readConsent());
    window.addEventListener("genauapp:consent-change", sync);
    return () => window.removeEventListener("genauapp:consent-change", sync);
  }, []);

  return (
    <div className="my-4 flex flex-col gap-3 rounded-2xl border border-border-strong bg-surface-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-sans text-sm text-fg-muted">{LABEL[state]}</span>
      <button
        type="button"
        onClick={() => writeConsent("unset")}
        className={clsx(
          "self-start rounded-full border border-border-strong bg-transparent",
          "px-4 py-2 font-sans text-[13px] font-semibold text-fg",
          "transition hover:bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        Change settings
      </button>
    </div>
  );
}
