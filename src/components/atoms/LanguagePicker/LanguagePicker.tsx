"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "@/lib/utils/clsx";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_LABELS,
  getEquivalentPath,
  getLocaleFromPath,
  type Locale,
} from "@/lib/i18n/config";
import { getStrings } from "@/lib/i18n/strings";

/**
 * LanguagePicker — compact "EN · TR" toggle that lives in the topnav's
 * right cluster.
 *
 * The active locale is derived from the pathname (`/tr/...` → tr,
 * everything else → en), not from a prop, so the control stays in sync
 * with whichever page just rendered. Clicking the inactive side:
 *   1. writes `genauapp_lang` cookie so future bare-URL visits land on
 *      the chosen locale (used by the middleware or future hint logic)
 *   2. navigates to the equivalent path in the target locale via the
 *      EN↔TR path map in config; falls back to that locale's root
 *      when the current path isn't mapped yet.
 *
 * No flags. Two 2-letter labels, a middle dot, equal weight — reads
 * as a control, not a flag chooser. Accessible via a pair of buttons
 * with `aria-pressed` on the active one.
 */

export interface LanguagePickerProps {
  className?: string;
}

export function LanguagePicker({ className }: LanguagePickerProps) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const active = getLocaleFromPath(pathname);
  const strings = getStrings(active);

  const setLocale = React.useCallback(
    (target: Locale) => {
      if (target === active) return;

      // Persist the choice. `SameSite=Lax` is enough; this isn't
      // security-sensitive. `max-age` + an explicit path keep the
      // cookie scoped to this site.
      if (typeof document !== "undefined") {
        document.cookie = [
          `${LOCALE_COOKIE}=${target}`,
          `path=/`,
          `max-age=${LOCALE_COOKIE_MAX_AGE}`,
          `SameSite=Lax`,
        ].join("; ");
      }

      const next = getEquivalentPath(pathname, target);
      router.push(next);
    },
    [active, pathname, router],
  );

  return (
    <div
      role="group"
      aria-label={strings.languagePicker.ariaLabel}
      className={clsx(
        "inline-flex items-center gap-1",
        "whitespace-nowrap rounded-full border border-border-strong bg-surface-card",
        "px-2 py-[6px] text-[12px] font-semibold leading-none",
        className,
      )}
    >
      {LOCALES.map((loc, i) => {
        const isActive = loc === active;
        return (
          <React.Fragment key={loc}>
            {i > 0 ? (
              <span
                aria-hidden
                className="text-fg-faint select-none"
                style={{ fontSize: 10 }}
              >
                ·
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => setLocale(loc)}
              aria-pressed={isActive}
              aria-label={`${LOCALE_LABELS[loc]}${isActive ? " (current)" : ""}`}
              className={clsx(
                "px-1.5 py-0.5 rounded-full transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                isActive
                  ? "text-fg"
                  : "text-fg-muted hover:text-accent",
              )}
            >
              {LOCALE_LABELS[loc]}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Export a default-locale const for SSR callers that need it without
// pulling the full config.
export { DEFAULT_LOCALE };
