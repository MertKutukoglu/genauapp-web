import type { Metadata } from "next";
import {
  DictionarySearch,
  ArticleTiles,
  PopularGrid,
  LevelStrip,
  TranslationLangProvider,
  TranslationLangToggle,
} from "@/components/molecules/Dictionary";
import { getAllEntries } from "@/lib/dictionary/data";

export const metadata: Metadata = {
  title: "Almanca Sözlük | Artikel, çekim, örnek cümle | GenauApp",
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
  const entries = await getAllEntries();
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
              <div className="flex flex-col gap-8 mt-2">
                <ArticleTiles
                  entries={entries}
                  locale="tr"
                  hrefPrefix="/tr/sozluk"
                />
                <PopularGrid
                  entries={entries}
                  locale="tr"
                  hrefPrefix="/tr/sozluk"
                />
                <LevelStrip entries={entries} locale="tr" />
              </div>
            }
          />
        </div>
      </main>
    </TranslationLangProvider>
  );
}
