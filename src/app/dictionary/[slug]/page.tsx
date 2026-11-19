import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  WordCard,
  GrammarInfoDisclosure,
  DictionarySearch,
  TranslationLangProvider,
  TranslationLangToggle,
} from "@/components/molecules/Dictionary";
import { getAllSlugs, getEntryBySlug } from "@/lib/dictionary/data";
import { TYPE_LABEL, pick } from "@/components/molecules/Dictionary/strings";

/**
 * /dictionary/[slug], the English dictionary word page.
 *
 * Static per published entry (slugs come from dict_entries at
 * build) + ISR so a late-published word doesn't need a redeploy
 * to acquire its own URL.
 */

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);
  if (!entry) return { title: "Word not found | GenauApp Dictionary" };
  const article = entry.noun?.article;
  const headline = article ? `${article} ${entry.german}` : entry.german;
  const translation = entry.translations.english;
  const typeLabel = pick(TYPE_LABEL[entry.type], "en");
  return {
    title: `${headline} · "${translation}" in German | ${typeLabel} | GenauApp`,
    description: entry.noun
      ? `${entry.german} (${article}, plural ${entry.noun.plural ?? "none"}) means "${translation}" in English. Article, declension, example sentences and pronunciation on GenauApp.`
      : `${entry.german} means "${translation}" in English. Grammar info, conjugation and example sentences on GenauApp.`,
    alternates: {
      canonical: `/dictionary/${slug}`,
      languages: {
        en: `/dictionary/${slug}`,
        tr: `/tr/sozluk/${slug}`,
        "x-default": `/dictionary/${slug}`,
      },
    },
    openGraph: {
      title: `${headline} · ${translation}`,
      description: `German dictionary entry for ${headline}. See article, declension, example sentences.`,
      type: "article",
    },
  };
}

export default async function DictionaryWordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);
  if (!entry) notFound();

  return (
    <TranslationLangProvider initialValue="en">
      <main className="min-h-screen pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <Link
              href="/dictionary"
              className="font-sans font-semibold text-[12px] uppercase text-fg-faint no-underline hover:text-fg transition-colors"
              style={{ letterSpacing: "0.6px" }}
            >
              Dictionary
            </Link>
            <TranslationLangToggle />
          </div>

          <DictionarySearch
            locale="en"
            hrefPrefix="/dictionary"
            initialQuery={entry.german}
          />

          <div className="mt-6 flex flex-col gap-5">
            <WordCard entry={entry} locale="en" />
            <GrammarInfoDisclosure entry={entry} locale="en" />
          </div>

          <footer className="mt-10 font-sans text-[12px] text-fg-faint text-center">
            Some grammatical data adapted from Wiktionary (CC BY-SA 4.0).
          </footer>
        </div>
      </main>
    </TranslationLangProvider>
  );
}
