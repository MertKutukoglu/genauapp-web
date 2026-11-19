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
  if (!entry) return { title: "Kelime bulunamadı | GenauApp Sözlük" };
  const article = entry.noun?.article;
  const headline = article ? `${article} ${entry.german}` : entry.german;
  const translation = entry.translations.turkish;
  const typeLabel = pick(TYPE_LABEL[entry.type], "tr");
  return {
    // Root layout appends " · GenauApp"; drop the duplicate here.
    title: `${headline} · Almanca "${translation}" · ${typeLabel}`,
    description: entry.noun
      ? `${entry.german} (${article}, çoğulu ${entry.noun.plural ?? "yok"}) Türkçede "${translation}" demek. Artikel, çekim ve A1 ile B2 arası örnek cümleler.`
      : `${entry.german} Türkçede "${translation}" demek. ${typeLabel} grameri, çekim ve seviyeli örnek cümleler.`,
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
  const entry = await getEntryBySlug(slug);
  if (!entry) notFound();

  return (
    <TranslationLangProvider initialValue="tr">
      <main className="min-h-screen pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <Link
              href="/tr/sozluk"
              className="font-sans font-semibold text-[12px] uppercase text-fg-faint no-underline hover:text-fg transition-colors"
              style={{ letterSpacing: "0.6px" }}
            >
              Sözlük
            </Link>
            <TranslationLangToggle />
          </div>

          <DictionarySearch
            locale="tr"
            hrefPrefix="/tr/sozluk"
            initialQuery={entry.german}
          />

          <div className="mt-6 flex flex-col gap-5">
            <WordCard entry={entry} locale="tr" />
            <GrammarInfoDisclosure entry={entry} locale="tr" />
          </div>

          <footer className="mt-10 font-sans text-[12px] text-fg-faint text-center leading-relaxed">
            Gramer verilerinin bir kısmı{" "}
            <a
              href="https://de.wiktionary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-fg"
            >
              Wiktionary (DE)
            </a>
            {" / "}
            <a
              href="https://en.wiktionary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-fg"
            >
              Wiktionary (EN)
            </a>
            {" kaynağından "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-fg"
            >
              CC BY-SA 4.0
            </a>
            {" ile uyarlandı."}
          </footer>
        </div>
      </main>
    </TranslationLangProvider>
  );
}
