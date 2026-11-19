"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import type { DictionaryEntry, DictLocale } from "./types";
import { STR, TYPE_LABEL, pick } from "./strings";
import { useTranslationLang } from "./TranslationLangContext";

/**
 * DictionarySearch, the type-as-you-go search surface for /dictionary
 * and /tr/sozluk. Trilingual: a query can be a German headword, an
 * English translation, or a Turkish translation; matches from any of
 * the three come back together, ranked by exactness, substring hit,
 * and finally translation match.
 *
 * V0 matches against an in-memory entries list. When the Supabase
 * `dict_search` RPC lands, the matching call becomes a Route Handler
 * fetch with the same shape, and the keyboard + rendering stay
 * unchanged.
 *
 * Why client: needs input state, debounce, keyboard navigation. The
 * landing page it sits on stays a server component; the component
 * tree lives below it.
 */

const ARTICLE_COLOR = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
} as const;

const SEARCH_PLACEHOLDER = {
  en: "Search in German, English or Turkish",
  tr: "Almanca, Türkçe veya İngilizce bir kelime yaz",
} as const;

const POPULAR_LABEL = {
  en: "Popular",
  tr: "Sık aranan",
} as const;

const NOT_FOUND_TITLE = {
  en: "No match for",
  tr: "Şununla eşleşen bir sonuç yok:",
} as const;

const NOT_FOUND_BODY = {
  en: "We haven't added this word yet. Try a more general term, or browse the popular words below.",
  tr: "Bu kelimeyi henüz eklemedik. Daha genel bir kelime dene, ya da aşağıdaki sık aranan kelimelere bak.",
} as const;

/* ---------- Matching ---------- */

/** Fold umlauts (ä → ae etc.) and lowercase, so "mude" matches
 *  "müde" and "Ubung" matches "Übung". */
function fold(input: string): string {
  return input
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    // Turkish dotless-i fold keeps TR queries forgiving.
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

type MatchLang = "de" | "en" | "tr";

interface SearchHit {
  entry: DictionaryEntry;
  score: number;
  matchLang: MatchLang;
  matchText: string;
}

function scoreEntry(
  entry: DictionaryEntry,
  qf: string,
): SearchHit | null {
  if (!qf) return null;

  const gf = fold(entry.german);
  // German headword match (strongest)
  if (gf === qf)
    return { entry, score: 100, matchLang: "de", matchText: entry.german };
  if (gf.startsWith(qf))
    return { entry, score: 85, matchLang: "de", matchText: entry.german };
  if (gf.includes(qf))
    return { entry, score: 65, matchLang: "de", matchText: entry.german };

  // English translation
  const en = entry.translations.english;
  if (en) {
    // Strip "to " prefix so "go" matches "to go".
    const ef = fold(en).replace(/^to\s+/, "");
    const qStripped = qf.replace(/^to\s+/, "");
    if (ef === qStripped)
      return { entry, score: 75, matchLang: "en", matchText: en };
    if (ef.startsWith(qStripped))
      return { entry, score: 55, matchLang: "en", matchText: en };
    if (ef.includes(qStripped))
      return { entry, score: 40, matchLang: "en", matchText: en };
  }

  // Turkish translation
  const tr = entry.translations.turkish;
  if (tr) {
    const tf = fold(tr);
    if (tf === qf)
      return { entry, score: 75, matchLang: "tr", matchText: tr };
    if (tf.startsWith(qf))
      return { entry, score: 55, matchLang: "tr", matchText: tr };
    if (tf.includes(qf))
      return { entry, score: 40, matchLang: "tr", matchText: tr };
  }

  return null;
}

function search(
  entries: DictionaryEntry[],
  query: string,
  limit = 20,
): SearchHit[] {
  const qf = fold(query);
  if (!qf) return [];
  const hits: SearchHit[] = [];
  for (const e of entries) {
    const h = scoreEntry(e, qf);
    if (h) hits.push(h);
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

/** Split a string into [before, match, after] for in-DOM
 *  highlighting. Case-insensitive; returns the whole string
 *  unsplit when the query isn't a direct substring (umlaut
 *  folded matches lose the highlight on purpose, the row still
 *  renders). */
function split(original: string, query: string): [string, string, string] {
  if (!query) return [original, "", ""];
  const lo = original.toLowerCase();
  const q = query.toLowerCase();
  const idx = lo.indexOf(q);
  if (idx < 0) return [original, "", ""];
  return [
    original.slice(0, idx),
    original.slice(idx, idx + q.length),
    original.slice(idx + q.length),
  ];
}

/* ---------- Component ---------- */

export interface DictionarySearchProps {
  entries: DictionaryEntry[];
  locale: DictLocale;
  /** URL path prefix for word hrefs. `/dictionary` or `/tr/sozluk`. */
  hrefPrefix: string;
  /** Replaces the component's built-in empty state. Pass the page's
   *  own browse surfaces (article tiles, popular grid, level chips)
   *  so the landing doesn't look like a templated widget. When
   *  omitted the component falls back to a minimal popular-strip. */
  emptyState?: React.ReactNode;
  /** Prefill the input (used on word pages: the bar shows the word
   *  the user is reading, with X to clear and start a fresh search).
   *  Results only appear when the user types something different
   *  from this value, so the bar reads as context, not as an auto-
   *  triggered query. */
  initialQuery?: string;
  className?: string;
}

export function DictionarySearch({
  entries,
  locale,
  hrefPrefix,
  emptyState,
  initialQuery,
  className,
}: DictionarySearchProps) {
  const [raw, setRaw] = React.useState(initialQuery ?? "");
  const [debounced, setDebounced] = React.useState(initialQuery ?? "");
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [focused, setFocused] = React.useState(false);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const id = window.setTimeout(() => setDebounced(raw), 150);
    return () => window.clearTimeout(id);
  }, [raw]);

  // Only treat the input as an active query when the user typed
  // something that differs from the initial prefill. Lets us show
  // the current word on a word page without auto-triggering a
  // result row for the page the user is already reading.
  const isDifferentFromInitial =
    initialQuery === undefined || raw.trim() !== initialQuery.trim();
  const activeQuery = isDifferentFromInitial ? debounced : "";

  const results = React.useMemo(
    () => search(entries, activeQuery),
    [entries, activeQuery],
  );

  // Reset the active row whenever the result list changes.
  React.useEffect(() => {
    setActiveIdx(0);
  }, [activeQuery]);

  const hasQuery = activeQuery.trim().length > 0;
  const hasResults = results.length > 0;
  // Hide the browse surface the moment the user focuses the input,
  // even before they type: the focus is now the search, so the rest
  // should get out of the way.
  const hideBrowse = focused || hasQuery;

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!hasResults) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const hit = results[activeIdx];
      if (hit) {
        e.preventDefault();
        router.push(`${hrefPrefix}/${hit.entry.slug}`);
      }
    } else if (e.key === "Escape") {
      setRaw("");
    }
  }

  return (
    <div className={clsx("w-full flex flex-col gap-6", className)}>
      {/* Search bar. Cleaner surface than a plain sunken pill, with
          a cherry focus ring so the control reads as the hero of
          the page. */}
      <div
        className={clsx(
          "dict-search-bar",
          "flex items-center gap-3 rounded-2xl px-4",
          "transition-shadow",
        )}
        style={{
          height: 56,
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          boxShadow:
            "0 2px 10px color-mix(in srgb, var(--fg) 5%, transparent)",
        }}
      >
        <Icon
          name="search"
          className={clsx(
            "w-[22px] h-[22px] shrink-0 transition-colors",
            hasQuery ? "text-[color:var(--accent)]" : "text-fg-muted",
          )}
        />
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          placeholder={SEARCH_PLACEHOLDER[locale]}
          aria-label={SEARCH_PLACEHOLDER[locale]}
          aria-autocomplete="list"
          aria-controls="dict-results"
          className="dict-search-input flex-1 min-w-0 bg-transparent outline-none border-none font-sans text-[16px] text-fg placeholder:text-fg-faint"
        />
        {raw.length > 0 ? (
          <button
            type="button"
            onMouseDown={(e) => {
              // mousedown so the input doesn't blur first (which
              // would collapse the results panel for a frame).
              e.preventDefault();
            }}
            onClick={() => {
              setRaw("");
              inputRef.current?.focus();
            }}
            aria-label={locale === "tr" ? "Temizle" : "Clear"}
            className="inline-flex items-center justify-center text-fg-faint hover:text-fg transition-colors shrink-0"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        ) : null}
      </div>

      {/* Results panel: appears only when the user typed something
          distinct from the initial prefill. */}
      {hasQuery ? (
        hasResults ? (
          <ResultList
            results={results}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
            query={activeQuery}
            locale={locale}
            hrefPrefix={hrefPrefix}
          />
        ) : (
          <NotFound
            query={activeQuery}
            locale={locale}
            entries={entries}
            hrefPrefix={hrefPrefix}
          />
        )
      ) : null}

      {/* Browse surface: collapses with a grid-rows + opacity
          transition the moment the input receives focus (or any
          query lands). The grid-template-rows trick animates
          height-to-auto smoothly without JS measurement. */}
      {emptyState !== undefined ? (
        <div
          aria-hidden={hideBrowse}
          className={clsx(
            "dict-browse-collapse",
            hideBrowse ? "is-collapsed" : "",
          )}
        >
          <div className="dict-browse-inner">{emptyState}</div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Result list ---------- */

function ResultList({
  results,
  activeIdx,
  setActiveIdx,
  query,
  locale,
  hrefPrefix,
}: {
  results: SearchHit[];
  activeIdx: number;
  setActiveIdx: (i: number) => void;
  query: string;
  locale: DictLocale;
  hrefPrefix: string;
}) {
  const tLang = useTranslationLang();
  return (
    <ul
      id="dict-results"
      role="listbox"
      className="flex flex-col m-0 p-0 list-none"
      style={{ border: "1px solid var(--border)", borderRadius: 16 }}
    >
      {results.map((hit, i) => {
        const e = hit.entry;
        const isNoun = e.type === "noun" && !!e.noun;
        const color = isNoun ? ARTICLE_COLOR[e.noun!.article] : "var(--fg)";
        const isActive = activeIdx === i;
        const [before, match, after] = split(e.german, query);

        // Direct German match: show the translation in the user's
        // chosen translation language (the toggle). When the match
        // itself came from a translation, keep the "matched text +
        // language tag" shape so the signal of which language
        // caught the match stays visible.
        const translation =
          tLang === "tr"
            ? e.translations.turkish ?? e.translations.english
            : e.translations.english ?? e.translations.turkish;
        return (
          <li
            key={e.slug}
            role="option"
            aria-selected={isActive}
            onMouseEnter={() => setActiveIdx(i)}
            style={{
              borderTop: i === 0 ? undefined : "1px solid var(--border)",
              background: isActive
                ? "color-mix(in srgb, var(--fg) 4%, transparent)"
                : undefined,
            }}
          >
            <Link
              href={`${hrefPrefix}/${e.slug}`}
              className="flex items-start justify-between gap-3 px-4 py-3 no-underline"
            >
              <span className="flex flex-col min-w-0">
                <span
                  className="font-sans text-[16px] leading-tight"
                  style={{ color }}
                >
                  {isNoun ? (
                    <>
                      <span className="font-bold">{e.noun!.article}</span>{" "}
                    </>
                  ) : null}
                  <span>
                    {before}
                    <span className="font-bold">{match}</span>
                    {after}
                  </span>
                </span>
                {hit.matchLang !== "de" ? (
                  <span className="font-sans text-[12px] text-fg-muted mt-0.5">
                    {hit.matchText}
                    <span
                      className="inline-block ml-1.5 px-1.5 py-0.5 rounded font-sans text-[9px] font-semibold uppercase align-middle text-fg-faint"
                      style={{
                        background: "var(--surface-sunk)",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {hit.matchLang}
                    </span>
                  </span>
                ) : translation ? (
                  <span className="font-sans text-[12px] text-fg-muted mt-0.5 truncate">
                    {translation}
                  </span>
                ) : null}
              </span>
              <span
                className="font-sans text-[13px] text-fg-muted shrink-0 pt-0.5"
                style={{ letterSpacing: "0.1px" }}
              >
                {pick(TYPE_LABEL[e.type], locale)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Popular words strip ---------- */

function PopularStrip({
  entries,
  locale,
  hrefPrefix,
}: {
  entries: DictionaryEntry[];
  locale: DictLocale;
  hrefPrefix: string;
}) {
  if (entries.length === 0) return null;
  return (
    <div className="flex flex-col items-center gap-3 w-full mt-2">
      <div
        className="font-sans text-[11px] uppercase text-fg-faint"
        style={{ letterSpacing: "0.4px" }}
      >
        {POPULAR_LABEL[locale]}
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-2 m-0 p-0 list-none">
        {entries.slice(0, 12).map((e) => {
          const isNoun = e.type === "noun" && !!e.noun;
          const color = isNoun ? ARTICLE_COLOR[e.noun!.article] : "var(--fg)";
          return (
            <li key={e.slug}>
              <Link
                href={`${hrefPrefix}/${e.slug}`}
                className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-full no-underline font-sans font-semibold text-[14px]"
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border)",
                  color,
                }}
              >
                {isNoun ? <span>{e.noun!.article}</span> : null}
                <span>{e.german}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Not found ---------- */

function NotFound({
  query,
  locale,
  entries,
  hrefPrefix,
}: {
  query: string;
  locale: DictLocale;
  entries: DictionaryEntry[];
  hrefPrefix: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5 py-8 text-center">
      <div
        className="inline-flex items-center justify-center rounded-2xl"
        style={{
          width: 64,
          height: 64,
          background: "color-mix(in srgb, var(--accent) 8%, transparent)",
          color: "var(--accent)",
        }}
      >
        <Icon name="search" className="w-8 h-8" />
      </div>
      <div className="flex flex-col items-center gap-1 max-w-md">
        <p className="font-sans text-[15px] text-fg-muted m-0">
          {NOT_FOUND_TITLE[locale]}
        </p>
        <p className="font-sans font-bold text-[20px] text-fg m-0">
          {`"${query}"`}
        </p>
      </div>
      <p className="font-sans text-[14px] text-fg-muted max-w-md m-0 leading-relaxed">
        {NOT_FOUND_BODY[locale]}
      </p>
      <PopularStrip entries={entries} locale={locale} hrefPrefix={hrefPrefix} />
    </div>
  );
}
