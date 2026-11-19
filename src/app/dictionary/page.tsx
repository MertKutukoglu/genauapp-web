import type { Metadata } from "next";
import {
  DictionarySearch,
  ArticleTiles,
  PopularGrid,
  LevelStrip,
} from "@/components/molecules/Dictionary";
import { DICT_ENTRIES } from "@/content/dictionary/entries";

/**
 * /dictionary, the English dictionary landing page.
 *
 * Layout principles for this pass:
 *   - Eyebrow, not hero. The search bar is the hero; a tall
 *     "German dictionary" title + subtitle above it ate the fold.
 *   - Browse-first empty state. Three article tiles (der/die/das
 *     in brand colors) anchor the page; a two-column popular grid
 *     underneath mixes layout density; a quiet level strip closes.
 *   - Typing a query replaces the browse surface with results
 *     inline. No route change, no modal.
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Compact eyebrow. H1 for SEO, but visually muted. */}
        <h1
          className="font-sans font-semibold text-[12px] uppercase text-fg-faint m-0 mb-4"
          style={{ letterSpacing: "0.6px" }}
        >
          Dictionary
        </h1>

        <DictionarySearch
          entries={DICT_ENTRIES}
          locale="en"
          hrefPrefix="/dictionary"
          emptyState={
            <div className="flex flex-col gap-8 mt-2">
              <ArticleTiles
                entries={DICT_ENTRIES}
                locale="en"
                hrefPrefix="/dictionary"
              />
              <PopularGrid
                entries={DICT_ENTRIES}
                locale="en"
                hrefPrefix="/dictionary"
              />
              <LevelStrip entries={DICT_ENTRIES} locale="en" />
            </div>
          }
        />
      </div>
    </main>
  );
}
