import type { Metadata } from "next";
import {
  DictionarySearch,
  ArticleTiles,
  PopularGrid,
  LevelStrip,
} from "@/components/molecules/Dictionary";
import { DICT_ENTRIES } from "@/content/dictionary/entries";

/**
 * /tr/sozluk, Turkish dictionary landing page. Same browse-first
 * shape as the EN sibling (eyebrow + search + article tiles +
 * popular grid + level strip). Search is trilingual so TR users
 * can type in TR, EN or DE and get the same results.
 */
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

export default function SozlukLandingPage() {
  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <h1
          className="font-sans font-semibold text-[12px] uppercase text-fg-faint m-0 mb-4"
          style={{ letterSpacing: "0.6px" }}
        >
          Sözlük
        </h1>

        <DictionarySearch
          entries={DICT_ENTRIES}
          locale="tr"
          hrefPrefix="/tr/sozluk"
          emptyState={
            <div className="flex flex-col gap-8 mt-2">
              <ArticleTiles
                entries={DICT_ENTRIES}
                locale="tr"
                hrefPrefix="/tr/sozluk"
              />
              <PopularGrid
                entries={DICT_ENTRIES}
                locale="tr"
                hrefPrefix="/tr/sozluk"
              />
              <LevelStrip entries={DICT_ENTRIES} locale="tr" />
            </div>
          }
        />
      </div>
    </main>
  );
}
