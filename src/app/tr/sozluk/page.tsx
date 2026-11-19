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
  // Root layout appends " · GenauApp" via the title template.
  title: "Almanca Sözlük · Artikel, çekim, örnek cümle",
  description:
    "Almanca öğrenenler için sözlük: artikel, çekim, konjugasyon, örnek cümle. Almanca, Türkçe veya İngilizce yaz, kelime kartını gör.",
  alternates: {
    canonical: "/tr/sozluk",
    languages: {
      en: "/dictionary",
      tr: "/tr/sozluk",
      "x-default": "/dictionary",
    },
  },
};

export const revalidate = 3600;

export default async function SozlukLandingPage() {
  const [entries, stats, wotd] = await Promise.all([
    getAllEntries(),
    getDictionaryStats(),
    getWordOfTheDay(),
  ]);
  return (
    <TranslationLangProvider initialValue="tr">
      <main className="min-h-screen pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h1
              className="font-sans font-semibold text-[12px] uppercase text-fg-faint m-0"
              style={{ letterSpacing: "0.6px" }}
            >
              Sözlük
            </h1>
            <TranslationLangToggle />
          </div>

          <DictionarySearch
            locale="tr"
            hrefPrefix="/tr/sozluk"
            emptyState={
              <div className="flex flex-col gap-8">
                <DictionaryStats
                  className="-mt-3"
                  wordCount={stats.wordCount}
                  exampleCount={stats.exampleCount}
                  ruleCount={stats.ruleCount}
                  locale="tr"
                />
                {wotd ? (
                  <WordOfTheDay
                    entry={wotd}
                    locale="tr"
                    hrefPrefix="/tr/sozluk"
                  />
                ) : null}
                <PopularList
                  entries={entries}
                  locale="tr"
                  hrefPrefix="/tr/sozluk"
                />
                <ComingSoonBanner locale="tr" />
              </div>
            }
          />
        </div>
      </main>
    </TranslationLangProvider>
  );
}
