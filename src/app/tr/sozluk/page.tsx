import type { Metadata } from "next";
import { DictionarySearch } from "@/components/molecules/Dictionary";
import { DICT_ENTRIES } from "@/content/dictionary/entries";

/**
 * /tr/sozluk, Turkish dictionary landing page. Search-first mirror
 * of /dictionary; trilingual matching covers queries typed in TR,
 * EN or DE so the same search UI serves both audiences.
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14">
        <header className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-10">
          <h1 className="font-display font-bold text-[32px] sm:text-[44px] text-fg leading-tight m-0">
            Almanca Sözlük
          </h1>
          <p className="font-sans text-[15px] sm:text-[17px] text-fg-muted m-0 max-w-lg leading-relaxed">
            Almanca bir kelime ara, artikelini, kurallarını, çekimini
            ve örnek cümlelerini gör.
          </p>
        </header>

        <DictionarySearch
          entries={DICT_ENTRIES}
          locale="tr"
          hrefPrefix="/tr/sozluk"
        />
      </div>
    </main>
  );
}
