import type { Metadata } from "next";
import {
  DictionarySearch,
  DictionaryStats,
  WordOfTheDay,
  PopularList,
  ComingSoonBanner,
  TranslationLangProvider,
  TranslationLangToggle,
} from "@/components/molecules/Dictionary";
import {
  getAllEntries,
  getDictionaryStats,
  getWordOfTheDay,
} from "@/lib/dictionary/data";

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

export const revalidate = 3600;

export default async function DictionaryLandingPage() {
  const [entries, stats, wotd] = await Promise.all([
    getAllEntries(),
    getDictionaryStats(),
    getWordOfTheDay(),
  ]);
  return (
    <TranslationLangProvider initialValue="en">
      <main className="min-h-screen pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h1
              className="font-sans font-semibold text-[12px] uppercase text-fg-faint m-0"
              style={{ letterSpacing: "0.6px" }}
            >
              Dictionary
            </h1>
            <TranslationLangToggle />
          </div>

          <DictionarySearch
            locale="en"
            hrefPrefix="/dictionary"
            emptyState={
              <div className="flex flex-col gap-8 mt-2">
                <DictionaryStats
                  wordCount={stats.wordCount}
                  exampleCount={stats.exampleCount}
                  ruleCount={stats.ruleCount}
                  locale="en"
                />
                {wotd ? (
                  <WordOfTheDay
                    entry={wotd}
                    locale="en"
                    hrefPrefix="/dictionary"
                  />
                ) : null}
                <PopularList
                  entries={entries}
                  locale="en"
                  hrefPrefix="/dictionary"
                />
                <ComingSoonBanner locale="en" />
              </div>
            }
          />
        </div>
      </main>
    </TranslationLangProvider>
  );
}
