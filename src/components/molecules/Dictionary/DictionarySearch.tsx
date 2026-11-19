"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import type { DictLocale } from "./types";
import { TYPE_LABEL, pick } from "./strings";

/**
 * DictionarySearch, the type-as-you-go search surface for /dictionary
 * and /tr/sozluk. Trilingual: a query can be a German headword, an
 * English translation, or a Turkish translation; matches are
 * served by /api/dict/search which calls public.dict_search on
 * Supabase.
 *
 * Why the API layer: the ranking logic (umlaut fold, bucketed
 * scoring, canonical dedup) lives once in SQL and is shared with
 * iOS. The client only handles input, debounce, keyboard nav and
 * rendering.
 *
 * Why client component: needs input state, debounce, keyboard
 * navigation. The landing page it sits on stays a server
 * component; this tree lives below.
 */

const SEARCH_PLACEHOLDER = {
  en: "Search in German, English or Turkish",
  tr: "Almanca, Türkçe veya İngilizce bir kelime yaz",
} as const;

const NOT_FOUND_TITLE = {
  en: "No match for",
  tr: "Şununla eşleşen bir sonuç yok:",
} as const;

const NOT_FOUND_BODY = {
  en: "We haven't added this word yet. Try a more general term, or clear the search and browse what's below.",
  tr: "Bu kelimeyi henüz eklemedik. Daha genel bir kelime dene, ya da aramayı temizleyip aşağıya bak.",
} as const;

const ARTICLE_COLOR: Record<string, string> = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
};

/** Shape returned by /api/dict/search (see route.ts + dict_search RPC). */
interface SearchHit {
  slug: string;
  german: string;
  type: string;
  level: string;
  article: string | null;
  translation_en: string | null;
  translation_tr: string | null;
  match_lang: "de" | "en" | "tr";
  match_text: string | null;
}

interface SearchResponse {
  results: SearchHit[];
  error?: string;
}

/** Split a string into [before, match, after] for in-DOM
 *  highlighting. Case-insensitive; returns the whole string
 *  unsplit when the query isn't a direct substring (umlaut-folded
 *  matches lose the highlight; the row still renders). */
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

export interface DictionarySearchProps {
  locale: DictLocale;
  /** URL path prefix for word hrefs. `/dictionary` or `/tr/sozluk`. */
  hrefPrefix: string;
  /** Replaces the default empty state. Landing passes its Browse
   *  surface; word pages leave this undefined and show nothing. */
  emptyState?: React.ReactNode;
  /** Prefill the input (word pages pass the current word).
   *  Results only appear when the user types something different
   *  from this value, so the bar reads as context, not as an
   *  auto-triggered query. */
  initialQuery?: string;
  className?: string;
}

export function DictionarySearch({
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
  const [hits, setHits] = React.useState<SearchHit[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const requestIdRef = React.useRef(0);

  React.useEffect(() => {
    if (raw.trim() === "") {
      setDebounced(raw);
      return;
    }
    const id = window.setTimeout(() => setDebounced(raw), 150);
    return () => window.clearTimeout(id);
  }, [raw]);

  // Treat the input as an active query only when the user typed
  // something distinct from the initial prefill. Word page lands
  // with raw === initialQuery, so no results fire for the page the
  // user is already reading.
  const isDifferentFromInitial =
    initialQuery === undefined || raw.trim() !== initialQuery.trim();
  const activeQuery = isDifferentFromInitial ? debounced.trim() : "";
  const hasQuery = activeQuery.length > 0;

  // Fetch results from the Route Handler whenever the active query
  // changes. Use a request id to drop stale responses (fast typers
  // can issue several in-flight requests; only the most recent is
  // allowed to write state).
  React.useEffect(() => {
    if (!hasQuery) {
      setHits([]);
      setLoading(false);
      return;
    }
    const myId = ++requestIdRef.current;
    setLoading(true);
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `/api/dict/search?q=${encodeURIComponent(activeQuery)}`,
          { signal: ctrl.signal },
        );
        const body = (await res.json()) as SearchResponse;
        if (myId !== requestIdRef.current) return;
        setHits(body.results ?? []);
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        if (myId !== requestIdRef.current) return;
        setHits([]);
      } finally {
        if (myId === requestIdRef.current) setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, [activeQuery, hasQuery]);

  React.useEffect(() => {
    setActiveIdx(0);
  }, [activeQuery]);

  const hasResults = hits.length > 0;
  const hideBrowse = focused || hasQuery;

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const hit = hits[activeIdx];
      if (hit) {
        e.preventDefault();
        router.push(`${hrefPrefix}/${hit.slug}`);
      }
    } else if (e.key === "Escape") {
      setRaw("");
      setDebounced("");
      inputRef.current?.blur();
      if (initialQuery !== undefined) {
        router.push(hrefPrefix);
      }
    }
  }

  return (
    <div className={clsx("w-full flex flex-col gap-6", className)}>
      {/* Search bar */}
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
              e.preventDefault();
            }}
            onClick={() => {
              setRaw("");
              setDebounced("");
              setHits([]);
              inputRef.current?.blur();
              if (initialQuery !== undefined) {
                router.push(hrefPrefix);
              }
            }}
            aria-label={locale === "tr" ? "Temizle" : "Clear"}
            className="inline-flex items-center justify-center text-fg-faint hover:text-fg transition-colors shrink-0"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        ) : null}
      </div>

      {/* Results panel */}
      {hasQuery ? (
        hasResults ? (
          <ResultList
            hits={hits}
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
            query={activeQuery}
            locale={locale}
            hrefPrefix={hrefPrefix}
          />
        ) : loading ? (
          <LoadingList />
        ) : (
          <NotFound query={activeQuery} locale={locale} />
        )
      ) : null}

      {/* Browse surface */}
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
  hits,
  activeIdx,
  setActiveIdx,
  query,
  locale,
  hrefPrefix,
}: {
  hits: SearchHit[];
  activeIdx: number;
  setActiveIdx: (i: number) => void;
  query: string;
  locale: DictLocale;
  hrefPrefix: string;
}) {
  return (
    <ul
      id="dict-results"
      role="listbox"
      className="flex flex-col m-0 p-0 list-none"
      style={{ border: "1px solid var(--border)", borderRadius: 16 }}
    >
      {hits.map((h, i) => {
        const isNoun = h.type === "noun" && !!h.article;
        const color = isNoun ? ARTICLE_COLOR[h.article!] : "var(--fg)";
        const isActive = activeIdx === i;
        const [before, match, after] = split(h.german, query);
        const typeLabel = pick(
          TYPE_LABEL[
            (["noun", "verb", "adjective", "adverb"] as const).includes(
              h.type as "noun",
            )
              ? (h.type as "noun" | "verb" | "adjective" | "adverb")
              : "other"
          ],
          locale,
        );
        return (
          <li
            key={h.slug}
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
              href={`${hrefPrefix}/${h.slug}`}
              className="flex items-start justify-between gap-3 px-4 py-3 no-underline"
            >
              <span className="flex flex-col min-w-0">
                <span
                  className="font-sans text-[16px] leading-tight"
                  style={{ color }}
                >
                  {isNoun ? (
                    <>
                      <span className="font-bold">{h.article}</span>{" "}
                    </>
                  ) : null}
                  <span>
                    {before}
                    <span className="font-bold">{match}</span>
                    {after}
                  </span>
                </span>
                {h.match_lang !== "de" && h.match_text ? (
                  <span className="font-sans text-[12px] text-fg-muted mt-0.5">
                    {h.match_text}
                    <span
                      className="inline-block ml-1.5 px-1.5 py-0.5 rounded font-sans text-[9px] font-semibold uppercase align-middle text-fg-faint"
                      style={{
                        background: "var(--surface-sunk)",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {h.match_lang}
                    </span>
                  </span>
                ) : null}
              </span>
              <span
                className="font-sans text-[13px] text-fg-muted shrink-0 pt-0.5"
                style={{ letterSpacing: "0.1px" }}
              >
                {typeLabel}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Loading placeholder ---------- */

function LoadingList() {
  return (
    <div
      className="flex flex-col"
      style={{ border: "1px solid var(--border)", borderRadius: 16 }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-3"
          style={{
            borderTop: i === 0 ? undefined : "1px solid var(--border)",
          }}
        >
          <div
            className="h-4 rounded"
            style={{
              width: 140 + i * 10,
              background: "var(--surface-sunk)",
            }}
          />
          <div
            className="h-3 rounded"
            style={{
              width: 44,
              background: "var(--surface-sunk)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ---------- Not found ---------- */

function NotFound({
  query,
  locale,
}: {
  query: string;
  locale: DictLocale;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
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
    </div>
  );
}
