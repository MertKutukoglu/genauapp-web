"use client";

import * as React from "react";
import { trackDict } from "@/lib/analytics/dict";
import type { DictLocale } from "./types";

/**
 * TranslationLangContext, the user's choice of which language to
 * see translations in across the dictionary surface.
 *
 * Deliberately separate from the URL locale:
 *   - URL locale (`/dictionary` vs `/tr/sozluk`) drives the site
 *     chrome: eyebrows, type labels, "Grammar info" vs "Gramer
 *     bilgisi". Changed via the topnav LanguagePicker.
 *   - Translation lang (this context) drives the translation line
 *     in WordCard, result rows, popular cards and the Grammar Info
 *     summary row. Changed via <TranslationLangToggle /> next to
 *     the search bar.
 *
 * Why: a Turkish visitor landing on /dictionary from Google should
 * be able to see Turkish translations without flipping the whole
 * site locale.
 *
 * Persistence: both cookie and localStorage are written on change.
 * The cookie lets the server render the correct value on the first
 * paint (no hydration flash); localStorage is the human-readable
 * fallback. Provider accepts an `initialValue` that the server
 * resolves by reading the cookie.
 */

export const TRANSLATION_LANG_COOKIE = "dict.translationLang";

type Ctx = {
  lang: DictLocale;
  setLang: (next: DictLocale) => void;
};

const noopCtx: Ctx = { lang: "en", setLang: () => undefined };
const Context = React.createContext<Ctx>(noopCtx);

export interface TranslationLangProviderProps {
  /** Server-resolved initial value (from cookie or URL locale). */
  initialValue: DictLocale;
  children: React.ReactNode;
}

export function TranslationLangProvider({
  initialValue,
  children,
}: TranslationLangProviderProps) {
  const [lang, setLangState] = React.useState<DictLocale>(initialValue);

  // On mount, cross-check with localStorage in case a different
  // tab changed it after the server snapshot but before mount.
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(TRANSLATION_LANG_COOKIE);
      if (stored === "tr" || stored === "en") {
        if (stored !== lang) setLangState(stored);
      }
    } catch {
      /* private mode / disabled storage, ignore */
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = React.useCallback(
    (next: DictLocale) => {
      setLangState((prev) => {
        if (prev !== next) {
          trackDict("dict_translation_lang_toggled", {
            from: prev,
            to: next,
          });
        }
        return next;
      });
      try {
        window.localStorage.setItem(TRANSLATION_LANG_COOKIE, next);
      } catch {
        /* ignore */
      }
      // One-year cookie, Lax so navigations within the site carry it.
      document.cookie = `${TRANSLATION_LANG_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    },
    [],
  );

  const value = React.useMemo<Ctx>(
    () => ({ lang, setLang }),
    [lang, setLang],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

/** Read the current translation language. Returns the context
 *  default ("en") when used outside a provider, which lets stories
 *  render without wiring the provider. */
export function useTranslationLang(): DictLocale {
  return React.useContext(Context).lang;
}

/** Read + write the current translation language. */
export function useTranslationLangControls(): Ctx {
  return React.useContext(Context);
}
