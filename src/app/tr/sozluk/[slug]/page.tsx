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
 * /tr/sozluk/[slug], the Turkish dictionary word page. Mirror of
 * /dictionary/[slug] with locale="tr" passed into the molecules.
 * Slugs are shared across locales so a search in either language
 * lands on the same entry.
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
  if (!entry) return { title: "Kelime bulunamadı | GenauApp Sözlük" };
  const article = entry.noun?.article;
  const headline = article ? `${article} ${entry.german}` : entry.german;
  const translation = entry.translations.turkish;
  const typeLabel = pick(TYPE_LABEL[entry.type], "tr");
  return {
    title: `${headline} · Almanca "${translation}" | ${typeLabel} | GenauApp Sözlük`,
    description: entry.noun
      ? `${entry.german} (${article}, çoğulu ${entry.noun.plural ?? "yok"}) Türkçede "${translation}" demek. Artikel, çekim, örnek cümle ve telaffuz GenauApp'te.`
      : `${entry.german} Türkçede "${translation}" demek. Gramer bilgisi, çekim ve örnek cümleler GenauApp Sözlük'te.`,
    alternates: {
      canonical: `/tr/sozluk/${slug}`,
      languages: {
        en: `/dictionary/${slug}`,
        tr: `/tr/sozluk/${slug}`,
        "x-default": `/dictionary/${slug}`,
      },
    },
    openGraph: {
      title: `${headline} · ${translation}`,
      description: `${headline} için Almanca sözlük girdisi. Artikel, çekim ve örnek cümleler.`,
      type: "article",
    },
  };
}

export default async function SozlukWordPage({
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
        <Link
          href="/tr/sozluk"
          className="inline-flex items-center gap-1 font-sans font-semibold text-[14px] text-[color:var(--accent)] no-underline hover:opacity-80"
        >
          <Icon name="chevron-left" className="w-4 h-4" />
          Sözlük
        </Link>

        <div className="mt-6 flex flex-col gap-5">
          <WordCard entry={entry} locale="tr" />
          <GrammarInfoDisclosure entry={entry} locale="tr" />
        </div>

        <footer className="mt-10 font-sans text-[12px] text-fg-faint text-center">
          Gramer verilerinin bir kısmı Wiktionary'den uyarlandı (CC BY-SA 4.0).
        </footer>
      </div>
    </main>
  );
}
