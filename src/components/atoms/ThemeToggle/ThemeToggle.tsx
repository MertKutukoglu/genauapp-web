"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { track } from "@/lib/analytics/track";

/**
 * ThemeToggle — sun/moon round button.
 *
 * Reads/writes the same localStorage key as the live landing
 * ("genauapp-landing-theme") so user preference carries across the
 * domain cutover. Toggling fires the "theme_toggle" analytics event
 * (not in the DemoEvent union because it isn't a demo event, hence
 * the raw window.__track call).
 */

type Theme = "light" | "dark";
const STORAGE_KEY = "genauapp-landing-theme";

function readCurrent(): Theme {
  if (typeof document === "undefined") return "light";
  return (
    (document.documentElement.getAttribute("data-theme") as Theme | null) ??
    "light"
  );
}

export interface ThemeToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ThemeToggle({ className, ...rest }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<Theme>("light");

  // Sync to whatever the inline bootstrap script set on <html>.
  React.useEffect(() => {
    setTheme(readCurrent());
  }, []);

  const handleToggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / private-mode errors */
    }
    setTheme(next);
    // Fire-and-forget; typed `track()` only knows demo events.
    if (typeof window !== "undefined") {
      try {
        window.__track?.("theme_toggle", { to: next, from: theme });
      } catch {
        /* no-op */
      }
    }
    // Silence the unused-import warning while keeping the helper handy.
    void track;
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={clsx(
        "inline-grid place-items-center rounded-full border border-border bg-surface-card text-fg-muted transition",
        "hover:text-fg hover:border-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "w-9 h-9 max-[640px]:w-8 max-[640px]:h-8",
        className,
      )}
      {...rest}
    >
      {isDark ? (
        // Sun — shown on dark theme to signal "click for light"
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="w-4 h-4"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="w-4 h-4"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
