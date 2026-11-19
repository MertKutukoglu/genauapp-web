import type { Metadata } from "next";
import Link from "next/link";
import { DICT_ENTRIES } from "@/content/dictionary/entries";

/**
 * /dictionary, the English dictionary landing page.
 *
 * V0: hand index of the published prototype entries, plus a hero.
 * V1 will add the live search box, hubs by level / article / theme,
 * and a trending words strip. For now this is the gateway that
 * exists so word pages have a sensible breadcrumb target and the
 * sitemap has a root to point at.
 */
export const metadata: Metadata = {
  title: "Dictionary | Learn German one word at a time | GenauApp",
  description:
    "German dictionary for learners: articles, declension, conjugation, example sentences. Browse a growing set of entries with articles, plurals, and grammar tags.",
  alternates: {
    canonical: "/dictionary",
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

export default function DictionaryLandingPage() {
  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16">
        <h1 className="font-display font-bold text-[32px] sm:text-[44px] text-fg leading-tight m-0">
          German dictionary
        </h1>
        <p className="font-sans text-[16px] sm:text-[18px] text-fg-muted mt-3 mb-0 leading-relaxed">
          Look up a German word and see its article, grammar rules,
          declension, and example sentences. Every entry mirrors the
          GenauApp word card.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DICT_ENTRIES.map((e) => {
            const article = e.noun?.article;
            const color = article ? ARTICLE_COLOR[article] : "var(--fg)";
            return (
              <Link
                key={e.slug}
                href={`/dictionary/${e.slug}`}
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
                  {e.translations.english}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
