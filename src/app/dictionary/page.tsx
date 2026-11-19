import type { Metadata } from "next";
import { DictionarySearch } from "@/components/molecules/Dictionary";
import { DICT_ENTRIES } from "@/content/dictionary/entries";

/**
 * /dictionary, the English dictionary landing page.
 *
 * Search-first: hero + type-as-you-go search box + empty state
 * (feature bullets + popular words strip) directly on landing.
 * As the user types, results replace the empty state inline. No
 * dedicated search URL; the input state lives in the component.
 * Switching to Turkish is handled by the site-wide LanguagePicker
 * in the topnav (which now swaps /dictionary/x ↔ /tr/sozluk/x
 * via the prefix map).
 */
export const metadata: Metadata = {
  title: "German Dictionary | Articles, grammar, examples | GenauApp",
  description:
    "German dictionary for learners: articles, declension, conjugation, example sentences. Type in German, English or Turkish and get the word card.",
  alternates: {
    canonical: "/dictionary",
    languages: {
      en: "/dictionary",
      tr: "/tr/sozluk",
      "x-default": "/dictionary",
    },
  },
};

export default function DictionaryLandingPage() {
  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14">
        <header className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10">
          <h1 className="font-display font-bold text-[32px] sm:text-[44px] text-fg leading-tight m-0">
            German dictionary
          </h1>
          <p className="font-sans text-[15px] sm:text-[17px] text-fg-muted m-0 max-w-lg leading-relaxed">
            Look up a German word and see its article, grammar rules,
            declension, and example sentences.
          </p>
        </header>

        <DictionarySearch
          entries={DICT_ENTRIES}
          locale="en"
          hrefPrefix="/dictionary"
        />
      </div>
    </main>
  );
}
