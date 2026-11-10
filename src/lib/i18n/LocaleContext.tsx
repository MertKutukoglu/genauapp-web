"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_LOCALE,
  getLocaleFromPath,
  type Locale,
} from "./config";
import { getStrings, type Strings } from "./strings";

/**
 * useLocale — the one hook all localized client components call.
 *
 * Primary source is the live pathname: `/tr/*` → "tr", anything else
 * → "en". That means shared chrome rendered in the root layout
 * (Topnav, Footer) picks up the right locale even though those nodes
 * sit outside the per-route layout tree. No locale prop needs to
 * thread through the component graph; the URL is the single source
 * of truth.
 *
 * Optional override: `<LocaleOverride locale="tr">` wraps a subtree
 * with an explicit locale, used by Storybook stories and tests that
 * want to render a component in a locale without faking a URL. In the
 * app itself the override is never used — the pathname decides.
 */

const LocaleOverrideContext = React.createContext<Locale | null>(null);

export interface LocaleOverrideProps {
  locale: Locale;
  children: React.ReactNode;
}

/** Storybook / test only: force a locale for descendants. */
export function LocaleOverride({ locale, children }: LocaleOverrideProps) {
  return (
    <LocaleOverrideContext.Provider value={locale}>
      {children}
    </LocaleOverrideContext.Provider>
  );
}

export interface UseLocaleReturn {
  locale: Locale;
  strings: Strings;
}

export function useLocale(): UseLocaleReturn {
  const override = React.useContext(LocaleOverrideContext);
  const pathname = usePathname();
  const locale =
    override ?? (pathname ? getLocaleFromPath(pathname) : DEFAULT_LOCALE);
  return { locale, strings: getStrings(locale) };
}
