"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import type {
  DictionaryEntry,
  DictLocale,
  CaseRow,
  ConjugationRow,
  LeveledExample,
  Collocation,
} from "./types";
import { STR, TYPE_LABEL, CASE_LABEL_TR, pick } from "./strings";
import { GrammarTagPill } from "./WordCard";
import { useTranslationLang } from "./TranslationLangContext";

/**
 * GrammarInfoModule, rebranded "Word Anatomy".
 *
 * The one long card is gone; the module composes a sequence of
 * tightly-packed sub-cards, each dedicated to a single part of the
 * word anatomy. Per type:
 *
 *   NOUN:    1. Grammar (article + plural tiles, declension table)
 *            2. Samples (level tabs, one sentence at a time)
 *            3. Phrases (collocations)
 *
 *   VERB:    1. Conjugation (Präsens / Präteritum swipe + tabs)
 *            2. Perfekt + tags (aux + perfekt form tiles, tag pills)
 *            3. Samples
 *            4. Phrases
 *
 *   ADJ:     1. Comparison (Positiv / Komparativ / Superlativ tiles,
 *               + tag pills)
 *            2. Samples
 *            3. Phrases
 *
 *   ADVERB / OTHER: Tags (if any), Samples, Phrases.
 *
 * Shared pieces up top: flag card, summary row (re-identifies the
 * word when the user scrolled deep). Each sub-card uses SubCard
 * for a consistent header + body shell; gap between sub-cards is
 * tight (8px) so the stack reads as one anatomy strip, not four
 * disconnected boxes.
 */

const ARTICLE_COLOR = {
  der: "var(--article-der)",
  die: "var(--article-die)",
  das: "var(--article-das)",
} as const;

export interface GrammarInfoModuleProps {
  entry: DictionaryEntry;
  locale: DictLocale;
  /** When wrapped in GrammarInfoDisclosure, the disclosure trigger
   *  already carries the title, so hide the inner header. */
  hideHeader?: boolean;
  className?: string;
}

export function GrammarInfoModule({
  entry,
  locale,
  hideHeader = false,
  className,
}: GrammarInfoModuleProps) {
  const tLang = useTranslationLang();
  const isNoun = entry.type === "noun" && !!entry.noun;
  const isVerb = entry.type === "verb" && !!entry.verb;
  const isAdj = entry.type === "adjective" && !!entry.adjective;

  const hasNounGrammar =
    isNoun && (!!entry.noun!.plural || !!entry.noun!.declension);
  const hasConjugation =
    isVerb &&
    ((entry.verb!.present && entry.verb!.present.length > 0) ||
      (entry.verb!.praeteritum && entry.verb!.praeteritum.length > 0));
  const hasPerfekt =
    isVerb &&
    (!!entry.verb!.auxiliary || !!entry.verb!.perfektForm);
  const hasComparison =
    isAdj &&
    (!!entry.adjective!.komparativ || !!entry.adjective!.superlativ);

  // Tags: skip noun gender pills (article already shows gender).
  // Keep the rest (n-Deklination, regular/irregular, separable,
  // case requirements, +sein).
  const tags = entry.tags.filter(
    (t) => !["masculine", "feminine", "neuter"].includes(t.key),
  );

  const allSamples = [...entry.leveledExamples].sort((a, b) =>
    a.level.localeCompare(b.level),
  );
  // The primary sample sits on the WordCard; the Samples sub-card
  // shows every level the word has, including the primary, so the
  // user can jump back to the one on the card.
  const hasSamples = allSamples.length > 0;
  const hasPhrases =
    !!entry.collocations && entry.collocations.length > 0;

  const anything =
    hasNounGrammar ||
    hasConjugation ||
    hasPerfekt ||
    hasComparison ||
    tags.length > 0 ||
    hasSamples ||
    hasPhrases;
  if (!anything) return null;

  return (
    <section
      aria-label={pick(STR.grammarInfo, locale)}
      className={clsx(
        // Flat stack: every piece (flag, summary, grammar, samples,
        // phrases) is a sibling card at the same level. No wrapper
        // card wraps them.
        "flex flex-col gap-2",
        hideHeader ? "" : "rounded-[24px] p-5 sm:p-6",
        className,
      )}
      style={
        hideHeader
          ? undefined
          : {
              background: "var(--surface-card)",
              border: "1px solid var(--border)",
            }
      }
    >
      {hideHeader ? null : (
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="font-sans font-bold text-[18px] sm:text-[20px] text-fg m-0">
            {pick(STR.grammarInfo, locale)}
          </h2>
          <span
            className="font-sans text-[11px] uppercase text-fg-faint"
            style={{ letterSpacing: "0.4px" }}
          >
            {pick(TYPE_LABEL[entry.type], locale)}
          </span>
        </div>
      )}

      <FlagCard entry={entry} locale={locale} />
      <SummaryRow entry={entry} locale={locale} tLang={tLang} />

      {hasNounGrammar ? (
        <NounGrammarCard entry={entry} locale={locale} />
      ) : null}

      {hasConjugation ? (
        <ConjugationCard entry={entry} locale={locale} />
      ) : null}

      {hasPerfekt || (isVerb && tags.length > 0) ? (
        <PerfektAndTagsCard entry={entry} locale={locale} tags={tags} />
      ) : null}

      {hasComparison ? (
        <AdjectiveCard entry={entry} locale={locale} tags={tags} />
      ) : null}

      {!isVerb &&
      !isAdj &&
      tags.length > 0 &&
      entry.type !== "noun" ? (
        <TagsOnlyCard tags={tags} locale={locale} />
      ) : null}

      {hasSamples ? (
        <SamplesCard
          samples={allSamples}
          locale={locale}
          tLang={tLang}
        />
      ) : null}

      {hasPhrases ? (
        <PhrasesCard
          collocations={entry.collocations!}
          locale={locale}
          tLang={tLang}
        />
      ) : null}
    </section>
  );
}

/* ================================================================ *
 *  Shared SubCard shell                                             *
 * ================================================================ */

function SubCard({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-4 flex flex-col gap-3",
        className,
      )}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border)",
      }}
    >
      {title || action ? (
        <div className="flex items-center justify-between gap-3">
          {title ? (
            <h3
              className="font-sans font-semibold text-[11px] uppercase text-fg-faint m-0"
              style={{ letterSpacing: "0.5px" }}
            >
              {title}
            </h3>
          ) : (
            <span />
          )}
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/* ================================================================ *
 *  Flag card + Summary row                                          *
 * ================================================================ */

function FlagCard({
  entry,
  locale,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
}) {
  const subject = encodeURIComponent(
    `Dictionary: ${entry.german} (${entry.slug})`,
  );
  return (
    <a
      href={`mailto:hello@genauapp.io?subject=${subject}`}
      className="flex items-start gap-3 rounded-xl p-3 no-underline hover:opacity-80 transition-opacity"
      style={{ background: "var(--surface-sunk)" }}
    >
      <span className="text-fg-muted mt-0.5" aria-hidden>
        <Icon name="flag" className="w-5 h-5" />
      </span>
      <span className="flex flex-col">
        <span className="font-sans font-semibold text-[14px] text-fg">
          {pick(STR.flagTitle, locale)}
        </span>
        <span className="font-sans text-[13px] text-fg-muted">
          {pick(STR.flagBody, locale)}
        </span>
      </span>
    </a>
  );
}

function SummaryRow({
  entry,
  locale,
  tLang,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
  tLang: DictLocale;
}) {
  const isNoun = entry.type === "noun" && !!entry.noun;
  const articleColor = isNoun
    ? ARTICLE_COLOR[entry.noun!.article]
    : undefined;
  const squareColor = articleColor ?? "var(--accent)";
  const translation =
    tLang === "tr"
      ? entry.translations.turkish ?? entry.translations.english
      : entry.translations.english ?? entry.translations.turkish;
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-3"
      style={{
        background: "var(--surface-sunk)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="inline-flex items-center justify-center shrink-0 rounded-lg"
        style={{
          width: 44,
          height: 44,
          background: `color-mix(in srgb, ${squareColor} 14%, transparent)`,
          border: `1px solid color-mix(in srgb, ${squareColor} 25%, transparent)`,
        }}
      >
        {isNoun ? (
          <span
            className="font-sans font-bold text-[16px]"
            style={{ color: squareColor }}
          >
            {entry.noun!.article}
          </span>
        ) : (
          <Icon
            name={entry.type === "verb" ? "sparkle" : "book"}
            className="w-5 h-5"
            style={{ color: squareColor }}
          />
        )}
      </span>
      <span className="flex flex-col min-w-0 flex-1">
        <span className="font-sans font-bold text-[18px] text-fg truncate">
          {entry.german}
        </span>
        {translation ? (
          <span className="font-sans text-[13px] text-fg-muted truncate">
            {translation}
          </span>
        ) : null}
      </span>
      <span
        className="inline-flex items-center justify-center shrink-0 px-2.5 py-1 rounded-full font-sans font-semibold text-[10px] uppercase"
        style={{
          color: squareColor,
          background: `color-mix(in srgb, ${squareColor} 12%, transparent)`,
          letterSpacing: "0.5px",
        }}
      >
        {pick(TYPE_LABEL[entry.type], locale)}
      </span>
    </div>
  );
}

/* ================================================================ *
 *  Noun grammar card                                                *
 * ================================================================ */

function NounGrammarCard({
  entry,
  locale,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
}) {
  const n = entry.noun!;
  const color = ARTICLE_COLOR[n.article];
  return (
    <SubCard
      title={pick(STR.nounDetails, locale)}
      action={
        n.nDeclension ? (
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full font-sans font-semibold text-[10px]"
            style={{
              color: "var(--accent)",
              background:
                "color-mix(in srgb, var(--accent) 10%, transparent)",
              border:
                "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
              letterSpacing: "0.3px",
            }}
          >
            {pick(STR.nDeclination, locale)}
          </span>
        ) : null
      }
    >
      <div className="grid grid-cols-2 gap-2">
        <Tile label={pick(STR.article, locale)} value={n.article} valueColor={color} />
        <Tile
          label={pick(STR.plural, locale)}
          value={n.plural ?? pick(STR.noPlural, locale)}
        />
      </div>

      {n.declension && n.declension.length > 0 ? (
        <>
          <div
            className="font-sans text-[11px] uppercase text-fg-faint mt-2"
            style={{ letterSpacing: "0.5px" }}
          >
            {pick(STR.declension, locale)}
          </div>
          <DeclensionTable
            rows={n.declension}
            articleColor={color}
            locale={locale}
          />
        </>
      ) : null}
    </SubCard>
  );
}

/* ================================================================ *
 *  Verb conjugation card (Präsens / Präteritum swipe)               *
 * ================================================================ */

function ConjugationCard({
  entry,
  locale,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
}) {
  const v = entry.verb!;
  type Tense = "present" | "praeteritum";
  const pages: Array<{
    key: Tense;
    title: string;
    rows: ConjugationRow[];
  }> = [];
  if (v.present && v.present.length > 0) {
    pages.push({
      key: "present",
      title: pick(STR.praesens, locale),
      rows: v.present,
    });
  }
  if (v.praeteritum && v.praeteritum.length > 0) {
    pages.push({
      key: "praeteritum",
      title: pick(STR.praeteritum, locale),
      rows: v.praeteritum,
    });
  }
  const [active, setActive] = React.useState(0);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const goto = React.useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * i, behavior: "smooth" });
    setActive(i);
  }, []);

  const onScroll = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const w = track.clientWidth;
    if (!w) return;
    const next = Math.round(track.scrollLeft / w);
    setActive((prev) => (prev === next ? prev : next));
  }, []);

  return (
    <SubCard>
      {/* Tab bar: tenses as segmented control. Also doubles as
          page indicator for the swipe track below. */}
      <div
        className="inline-flex p-1 rounded-full self-start"
        style={{
          background: "var(--surface-sunk)",
          border: "1px solid var(--border)",
        }}
      >
        {pages.map((p, i) => (
          <button
            key={p.key}
            type="button"
            onClick={() => goto(i)}
            aria-pressed={active === i}
            className="inline-flex items-center justify-center px-3 py-1 rounded-full font-sans font-semibold text-[12px] transition-colors"
            style={{
              color: active === i ? "var(--surface-card)" : "var(--fg-muted)",
              background: active === i ? "var(--fg)" : "transparent",
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="dict-conjug-track overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        <div className="flex">
          {pages.map((p) => (
            <div
              key={p.key}
              className="snap-start shrink-0 w-full"
            >
              <ConjugationTable rows={p.rows} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </SubCard>
  );
}

/* ================================================================ *
 *  Perfekt + tags card (verb)                                       *
 * ================================================================ */

function PerfektAndTagsCard({
  entry,
  locale,
  tags,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
  tags: DictionaryEntry["tags"];
}) {
  const v = entry.verb!;
  const hasPerfekt = !!v.auxiliary || !!v.perfektForm;
  return (
    <SubCard title={hasPerfekt ? pick(STR.perfekt, locale) : pick(STR.tags, locale)}>
      {hasPerfekt ? (
        <div className="grid grid-cols-2 gap-2">
          {v.auxiliary ? (
            <Tile
              label={pick(STR.auxiliary, locale)}
              value={v.auxiliary}
              valueColor={v.auxiliary === "haben" ? "#14B8A6" : "#E8A838"}
              outlined
            />
          ) : (
            <div />
          )}
          {v.perfektForm ? (
            <Tile
              label={pick(STR.perfektForm, locale)}
              value={v.perfektForm}
            />
          ) : (
            <div />
          )}
        </div>
      ) : null}

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <GrammarTagPill key={t.key} tag={t} />
          ))}
        </div>
      ) : null}
    </SubCard>
  );
}

/* ================================================================ *
 *  Adjective card                                                   *
 * ================================================================ */

function AdjectiveCard({
  entry,
  locale,
  tags,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
  tags: DictionaryEntry["tags"];
}) {
  const a = entry.adjective!;
  return (
    <SubCard title={pick(STR.comparison, locale)}>
      <div className="grid grid-cols-3 gap-2">
        <Tile label={pick(STR.positive, locale)} value={a.positive} />
        {a.komparativ ? (
          <Tile label={pick(STR.komparativ, locale)} value={a.komparativ} />
        ) : (
          <div />
        )}
        {a.superlativ ? (
          <Tile label={pick(STR.superlativ, locale)} value={a.superlativ} />
        ) : (
          <div />
        )}
      </div>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <GrammarTagPill key={t.key} tag={t} />
          ))}
        </div>
      ) : null}
    </SubCard>
  );
}

/* ================================================================ *
 *  Tags-only card (fallback for other types)                        *
 * ================================================================ */

function TagsOnlyCard({
  tags,
  locale,
}: {
  tags: DictionaryEntry["tags"];
  locale: DictLocale;
}) {
  return (
    <SubCard title={pick(STR.tags, locale)}>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <GrammarTagPill key={t.key} tag={t} />
        ))}
      </div>
    </SubCard>
  );
}

/* ================================================================ *
 *  Samples card (level tabs, one sentence at a time)                *
 * ================================================================ */

function SamplesCard({
  samples,
  locale,
  tLang,
}: {
  samples: LeveledExample[];
  locale: DictLocale;
  tLang: DictLocale;
}) {
  const levels = Array.from(
    new Set(samples.map((s) => s.level)),
  ).sort();
  const [activeLevel, setActiveLevel] = React.useState<string>(levels[0]);
  const active = samples.find((s) => s.level === activeLevel) ?? samples[0];
  const gloss =
    tLang === "tr" ? active.tr ?? active.en : active.en ?? active.tr;

  return (
    <SubCard
      title={pick(STR.sampleSentence, locale)}
      action={
        <div className="flex items-center gap-1">
          {levels.map((lvl) => {
            const isActive = lvl === activeLevel;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setActiveLevel(lvl)}
                aria-pressed={isActive}
                className="inline-flex items-center justify-center rounded-full font-sans font-bold text-[10px] transition-colors"
                style={{
                  width: 28,
                  height: 22,
                  color: isActive
                    ? "var(--surface-card)"
                    : "var(--fg-muted)",
                  background: isActive ? "var(--fg)" : "var(--surface-sunk)",
                  border: isActive
                    ? "1px solid var(--fg)"
                    : "1px solid var(--border)",
                  letterSpacing: "0.3px",
                }}
              >
                {lvl}
              </button>
            );
          })}
        </div>
      }
    >
      <div
        className="rounded-xl p-3"
        style={{ background: "var(--surface-sunk)" }}
      >
        <p className="font-sans font-semibold text-[15px] text-fg m-0 leading-snug">
          {active.de}
        </p>
        {gloss ? (
          <p className="font-sans text-[13px] text-fg-muted mt-1 m-0 leading-snug">
            {gloss}
          </p>
        ) : null}
      </div>
    </SubCard>
  );
}

/* ================================================================ *
 *  Phrases card (collocations, bigger font)                         *
 * ================================================================ */

function PhrasesCard({
  collocations,
  locale,
  tLang,
}: {
  collocations: Collocation[];
  locale: DictLocale;
  tLang: DictLocale;
}) {
  return (
    <SubCard title={pick(STR.commonPhrases, locale)}>
      <ul className="flex flex-col gap-2 m-0 list-none p-0">
        {collocations.map((c, i) => {
          const gloss =
            tLang === "tr" ? c.tr ?? c.en : c.en ?? c.tr;
          return (
            <li
              key={`col-${i}`}
              className="flex flex-col gap-0.5"
              style={{
                paddingTop: i === 0 ? 0 : 8,
                borderTop: i === 0 ? undefined : "1px solid var(--border)",
              }}
            >
              <span className="font-sans font-semibold text-[16px] text-fg leading-snug">
                {c.de}
              </span>
              {gloss ? (
                <span className="font-sans text-[14px] text-fg-muted leading-snug">
                  {gloss}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </SubCard>
  );
}

/* ================================================================ *
 *  Shared primitives: Tile, DeclensionTable, ConjugationTable       *
 * ================================================================ */

function Tile({
  label,
  value,
  valueColor,
  outlined = false,
}: {
  label: string;
  value: string;
  valueColor?: string;
  outlined?: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl py-3 px-3 gap-0.5"
      style={{
        background: "var(--surface-sunk)",
        border:
          outlined && valueColor
            ? `1px solid color-mix(in srgb, ${valueColor} 40%, transparent)`
            : "1px solid var(--border)",
      }}
    >
      <div
        className="font-sans font-bold leading-none text-[18px] sm:text-[20px]"
        style={{ color: valueColor ?? "var(--fg)" }}
      >
        {value}
      </div>
      <div
        className="font-sans text-[10px] uppercase text-fg-faint"
        style={{ letterSpacing: "0.4px" }}
      >
        {label}
      </div>
    </div>
  );
}

function DeclensionTable({
  rows,
  articleColor,
  locale,
}: {
  rows: CaseRow[];
  articleColor: string;
  locale: DictLocale;
}) {
  const hasPluralCol = rows.some((r) => r.plural);
  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      <div
        className={clsx(
          "grid",
          hasPluralCol
            ? "grid-cols-[1.1fr_1fr_1fr_1fr]"
            : "grid-cols-[1.1fr_1fr_1fr]",
        )}
        style={{ background: "var(--surface-sunk)" }}
      >
        <HeadCell>{pick(STR.case, locale)}</HeadCell>
        <HeadCell>{pick(STR.definite, locale)}</HeadCell>
        <HeadCell>{pick(STR.indefinite, locale)}</HeadCell>
        {hasPluralCol ? <HeadCell>{pick(STR.pluralCol, locale)}</HeadCell> : null}
      </div>
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={clsx(
            "grid",
            hasPluralCol
              ? "grid-cols-[1.1fr_1fr_1fr_1fr]"
              : "grid-cols-[1.1fr_1fr_1fr]",
          )}
          style={{
            borderTop: i === 0 ? undefined : "1px solid var(--border)",
          }}
        >
          <BodyCell>
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-[13px] text-fg">
                {r.label}
              </span>
              <span className="font-sans text-[11px] text-fg-faint">
                {locale === "tr" && CASE_LABEL_TR[r.label]
                  ? `${CASE_LABEL_TR[r.label]} · ${r.question}`
                  : r.question}
              </span>
            </div>
          </BodyCell>
          <BodyCell>
            <span
              className="font-sans font-semibold text-[13px]"
              style={{ color: articleColor }}
            >
              {r.definite}
            </span>
          </BodyCell>
          <BodyCell>
            <span className="font-sans text-[13px] text-fg-muted">
              {r.indefinite}
            </span>
          </BodyCell>
          {hasPluralCol ? (
            <BodyCell>
              <span className="font-sans text-[13px] text-fg-muted">
                {r.plural ?? ""}
              </span>
            </BodyCell>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ConjugationTable({
  rows,
  locale,
}: {
  rows: ConjugationRow[];
  locale: DictLocale;
}) {
  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      <div
        className="grid grid-cols-[1fr_2fr]"
        style={{ background: "var(--surface-sunk)" }}
      >
        <HeadCell>{pick(STR.pronoun, locale)}</HeadCell>
        <HeadCell>{pick(STR.form, locale)}</HeadCell>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.pronoun}
          className="grid grid-cols-[1fr_2fr]"
          style={{
            borderTop: i === 0 ? undefined : "1px solid var(--border)",
          }}
        >
          <BodyCell>
            <span className="font-sans text-[13px] text-fg-muted">
              {r.pronoun}
            </span>
          </BodyCell>
          <BodyCell>
            <span className="font-sans font-semibold text-[13px] text-fg">
              {r.form}
            </span>
          </BodyCell>
        </div>
      ))}
    </div>
  );
}

function HeadCell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 py-2 font-sans font-medium text-[11px] text-fg-muted"
      style={{ letterSpacing: "0.2px" }}
    >
      {children}
    </div>
  );
}

function BodyCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 flex items-center min-h-[40px]">
      {children}
    </div>
  );
}
