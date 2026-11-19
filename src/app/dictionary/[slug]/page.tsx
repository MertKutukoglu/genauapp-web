import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  WordCard,
  GrammarInfoDisclosure,
} from "@/components/molecules/Dictionary";
import { getAllSlugs, getEntry } from "@/content/dictionary/entries";
import { Icon } from "@/components/atoms/Icon/Icon";
import { TYPE_LABEL, pick } from "@/components/molecules/Dictionary/strings";

/**
 * /dictionary/[slug], the English dictionary word page.
 *
 * Static per published entry (generateStaticParams), inline
 * primary card + Grammar Info module. Mobile-first stacked layout;
 * on desktop (>= 1024px) the card sticks on the left and the info
 * module scrolls on the right.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
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
  const entry = getEntry(slug);
  if (!entry) notFound();

  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Breadcrumb back to search. Rose/accent link. */}
        <Link
          href="/dictionary"
          className="inline-flex items-center gap-1 font-sans font-semibold text-[14px] text-[color:var(--accent)] no-underline hover:opacity-80"
        >
          <Icon name="chevron-left" className="w-4 h-4" />
          Dictionary
        </Link>

        <div className="mt-6 flex flex-col gap-5">
          <WordCard entry={entry} locale="en" />
          <GrammarInfoDisclosure entry={entry} locale="en" />
        </div>

        <footer className="mt-10 font-sans text-[12px] text-fg-faint text-center">
          Some grammatical data adapted from Wiktionary (CC BY-SA 4.0).
        </footer>
      </div>
    </main>
  );
}
