import type { Metadata } from "next";
import Link from "next/link";
import { DICT_ENTRIES } from "@/content/dictionary/entries";

/**
 * /tr/sozluk, Turkish dictionary landing page. V0 index, matches
 * /dictionary's role.
 */
export const metadata: Metadata = {
  title: "Almanca Sözlük | Kelime, artikel, çekim | GenauApp",
  description:
    "Almanca öğrenenler için sözlük: artikel, çekim, konjugasyon, örnek cümle. Her girdi GenauApp kelime kartının web halini gösterir.",
  alternates: {
    canonical: "/tr/sozluk",
    languages: {
      en: "/dictionary",
      tr: "/tr/sozluk",
      "x-default": "/dictionary",
    },
  },
};

const ARTICLE_COLOR = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
} as const;

export default function SozlukLandingPage() {
  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16">
        <h1 className="font-display font-bold text-[32px] sm:text-[44px] text-fg leading-tight m-0">
          Almanca Sözlük
        </h1>
        <p className="font-sans text-[16px] sm:text-[18px] text-fg-muted mt-3 mb-0 leading-relaxed">
          Almanca bir kelime ara, artikelini, kurallarını, çekimini ve
          örnek cümlelerini gör. Her girdi GenauApp kelime kartının
          birebir web hali.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DICT_ENTRIES.map((e) => {
            const article = e.noun?.article;
            const color = article ? ARTICLE_COLOR[article] : "var(--fg)";
            return (
              <Link
                key={e.slug}
                href={`/tr/sozluk/${e.slug}`}
                className="rounded-2xl p-4 no-underline flex flex-col gap-1 transition-colors"
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-baseline gap-2">
                  {article ? (
                    <span
                      className="font-sans font-bold text-[20px]"
                      style={{ color }}
                    >
                      {article}
                    </span>
                  ) : null}
                  <span
                    className="font-sans font-bold text-[20px]"
                    style={{ color }}
                  >
                    {e.german}
                  </span>
                </div>
                <div className="font-sans text-[14px] text-fg-muted">
                  {e.translations.turkish}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
