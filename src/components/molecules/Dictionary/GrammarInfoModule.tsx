import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import type { DictionaryEntry, DictLocale, CaseRow, ConjugationRow } from "./types";
import { STR, TYPE_LABEL, CASE_LABEL_TR, pick } from "./strings";
import { GrammarTagPill } from "./WordCard";

/**
 * GrammarInfoModule, the deeper info panel rendered inline under
 * WordCard. iOS presents this as a bottom sheet with `grammar
 * info →` button; web renders it inline so Google indexes the
 * tables and the user sees them with one scroll.
 *
 * Anatomy follows the iOS sheet: a flag card on top, a re-summary
 * row that re-identifies the word, then type-specific sections
 * (noun: details + declension; verb: präsens + präteritum +
 * perfekt + properties; adjective: comparison + declension), and
 * an example block at the foot.
 *
 * Any section whose data is missing collapses. The module never
 * renders empty scaffolding.
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
   *  already carries the title, so hide the inner header to avoid
   *  the "Grammar info · Grammar info" double title. */
  hideHeader?: boolean;
  className?: string;
}

export function GrammarInfoModule({
  entry,
  locale,
  hideHeader = false,
  className,
}: GrammarInfoModuleProps) {
  const isNoun = entry.type === "noun" && !!entry.noun;
  const isVerb = entry.type === "verb" && !!entry.verb;
  const isAdj = entry.type === "adjective" && !!entry.adjective;

  // Verify at least one section has data to render before mounting
  // the module. If nothing does, return null (the card already
  // carried everything we know).
  const hasNounSection = isNoun && (entry.noun!.plural || entry.noun!.declension);
  const hasVerbSection =
    isVerb &&
    (entry.verb!.present ||
      entry.verb!.praeteritum ||
      entry.verb!.auxiliary ||
      entry.verb!.perfektForm);
  const hasAdjSection =
    isAdj && (entry.adjective!.komparativ || entry.adjective!.superlativ);
  const hasTags = entry.tags.length > 0;
  const extraExamples = entry.leveledExamples.slice(1);
  const hasAnything =
    hasNounSection ||
    hasVerbSection ||
    hasAdjSection ||
    hasTags ||
    extraExamples.length > 0 ||
    (entry.collocations && entry.collocations.length > 0);

  if (!hasAnything) return null;

  return (
    <section
      aria-label={pick(STR.grammarInfo, locale)}
      className={clsx(
        "flex flex-col gap-6",
        // When wrapped in GrammarInfoDisclosure the outer surface is
        // the disclosure's own, so skip the card chrome here.
        hideHeader
          ? ""
          : "rounded-[24px] p-5 sm:p-6",
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
      {/* Section header: title + (muted) type on the right. Hidden
          when the module is wrapped in a disclosure (the trigger
          carries the title then). */}
      {hideHeader ? null : (
        <div className="flex items-baseline justify-between">
          <h2
            className="font-sans font-bold text-[18px] sm:text-[20px] text-fg m-0"
          >
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

      {/* Flag card. First item in the module, as in iOS. */}
      <FlagCard locale={locale} entry={entry} />

      {/* Re-summary row so a user scrolled this deep still sees
          which word they are reading about. */}
      <SummaryRow entry={entry} locale={locale} />

      {/* Noun sections */}
      {isNoun ? (
        <NounSections entry={entry} locale={locale} />
      ) : null}

      {/* Verb sections */}
      {isVerb ? (
        <VerbSections entry={entry} locale={locale} />
      ) : null}

      {/* Adjective sections */}
      {isAdj ? (
        <AdjSections entry={entry} locale={locale} />
      ) : null}

      {/* Grammar tags (nouns + any other type carrying case/aux
          tags). Verb's lead tag already sits on the card; the tag
          strip here is the full list with explanations. */}
      {hasTags ? (
        <SectionShell title={pick(STR.grammarTags, locale)}>
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((t) => (
              <GrammarTagPill key={t.key} tag={t} />
            ))}
          </div>
          <TagExplanations tags={entry.tags} />
        </SectionShell>
      ) : null}

      {/* Extra leveled examples (the lowest-level one already sits
          on the card). */}
      {extraExamples.length > 0 ? (
        <SectionShell title={pick(STR.sampleSentence, locale)}>
          <div className="flex flex-col gap-3">
            {extraExamples.map((ex, i) => (
              <div
                key={`ex-${i}`}
                className="rounded-xl p-3"
                style={{ background: "var(--surface-sunk)" }}
              >
                <div
                  className="font-sans text-[11px] uppercase text-fg-faint mb-1.5"
                  style={{ letterSpacing: "0.4px" }}
                >
                  {ex.level}
                </div>
                <p className="font-sans font-semibold text-[15px] text-fg m-0 leading-snug">
                  {ex.de}
                </p>
                {(ex[locale] || ex.en) ? (
                  <p className="font-sans text-[13px] text-fg-muted mt-1 m-0 leading-snug">
                    {ex[locale] ?? ex.en}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </SectionShell>
      ) : null}

      {/* Collocations */}
      {entry.collocations && entry.collocations.length > 0 ? (
        <SectionShell title={pick(STR.commonPhrases, locale)}>
          <ul className="flex flex-col gap-2 m-0 list-none p-0">
            {entry.collocations.map((c, i) => (
              <li key={`col-${i}`} className="flex flex-col gap-0.5 py-1">
                <span className="font-sans font-semibold text-[15px] text-fg">
                  {c.de}
                </span>
                {(c[locale] || c.en) ? (
                  <span className="font-sans text-[13px] text-fg-muted">
                    {c[locale] ?? c.en}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </SectionShell>
      ) : null}
    </section>
  );
}

/* ================================================================ *
 *  Flag card + Summary row                                         *
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
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
}) {
  const isNoun = entry.type === "noun" && !!entry.noun;
  const articleColor = isNoun
    ? ARTICLE_COLOR[entry.noun!.article]
    : undefined;
  const squareColor = articleColor ?? "var(--accent)";
  const primaryTranslation =
    locale === "tr"
      ? entry.translations.turkish ?? entry.translations.english
      : entry.translations.english ?? entry.translations.turkish;
  const secondaryTranslation =
    locale === "tr"
      ? entry.translations.turkish && entry.translations.english
        ? entry.translations.english
        : undefined
      : entry.translations.english && entry.translations.turkish
        ? entry.translations.turkish
        : undefined;
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
        {primaryTranslation ? (
          <span className="font-sans text-[13px] text-fg-muted truncate">
            {primaryTranslation}
            {secondaryTranslation ? (
              <span className="text-fg-faint"> · {secondaryTranslation}</span>
            ) : null}
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
 *  Section shell + tables                                          *
 * ================================================================ */

function SectionShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3
        className="font-sans font-semibold text-[11px] uppercase text-fg-faint m-0"
        style={{ letterSpacing: "0.5px" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Tile({
  label,
  value,
  valueColor,
  bold = true,
  outlined = false,
}: {
  label: string;
  value: string;
  valueColor?: string;
  bold?: boolean;
  outlined?: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl py-5 px-3 gap-1"
      style={{
        background: "var(--surface-sunk)",
        border: outlined && valueColor
          ? `1px solid color-mix(in srgb, ${valueColor} 40%, transparent)`
          : "1px solid var(--border)",
      }}
    >
      <div
        className={clsx(
          "font-sans leading-none",
          bold ? "font-bold" : "font-semibold",
          "text-[22px] sm:text-[24px]",
        )}
        style={{ color: valueColor ?? "var(--fg)" }}
      >
        {value}
      </div>
      <div
        className="font-sans text-[11px] uppercase text-fg-faint"
        style={{ letterSpacing: "0.4px" }}
      >
        {label}
      </div>
    </div>
  );
}

/* ================================================================ *
 *  Noun sections                                                   *
 * ================================================================ */

function NounSections({
  entry,
  locale,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
}) {
  const n = entry.noun!;
  const color = ARTICLE_COLOR[n.article];
  return (
    <>
      <SectionShell title={pick(STR.nounDetails, locale)}>
        <div className="grid grid-cols-2 gap-3">
          <Tile
            label={pick(STR.article, locale)}
            value={n.article}
            valueColor={color}
          />
          <Tile
            label={pick(STR.plural, locale)}
            value={n.plural ?? pick(STR.noPlural, locale)}
          />
        </div>
      </SectionShell>

      {n.declension && n.declension.length > 0 ? (
        <SectionShell title={pick(STR.declension, locale)}>
          <DeclensionTable
            rows={n.declension}
            articleColor={color}
            locale={locale}
          />
        </SectionShell>
      ) : null}

      {n.nDeclension ? (
        <div
          className="inline-flex self-start items-center px-3 py-1.5 rounded-full font-sans font-semibold text-[12px]"
          style={{
            color: "var(--accent)",
            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
            border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
          }}
        >
          {pick(STR.nDeclination, locale)}
        </div>
      ) : null}
    </>
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
      className="rounded-[14px] overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className={clsx(
          "grid",
          hasPluralCol
            ? "grid-cols-[1.1fr_1fr_1fr_1fr] md:grid-cols-[1.1fr_1fr_1fr_1fr]"
            : "grid-cols-[1.1fr_1fr_1fr]",
          "font-sans text-[12px] text-fg-muted",
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
              <span className="font-sans font-semibold text-[14px] text-fg">
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
              className="font-sans font-semibold text-[14px]"
              style={{ color: articleColor }}
            >
              {r.definite}
            </span>
          </BodyCell>
          <BodyCell>
            <span className="font-sans text-[14px] text-fg-muted">
              {r.indefinite}
            </span>
          </BodyCell>
          {hasPluralCol ? (
            <BodyCell>
              <span className="font-sans text-[14px] text-fg-muted">
                {r.plural ?? ""}
              </span>
            </BodyCell>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function HeadCell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 py-2.5 font-sans font-medium text-[12px] text-fg-muted"
      style={{ letterSpacing: "0.2px" }}
    >
      {children}
    </div>
  );
}

function BodyCell({ children }: { children: React.ReactNode }) {
  return <div className="px-3 py-2.5 flex items-center min-h-[46px]">{children}</div>;
}

/* ================================================================ *
 *  Verb sections                                                   *
 * ================================================================ */

function VerbSections({
  entry,
  locale,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
}) {
  const v = entry.verb!;
  return (
    <>
      {v.present && v.present.length > 0 ? (
        <SectionShell title={pick(STR.praesens, locale)}>
          <ConjugationTable rows={v.present} locale={locale} />
        </SectionShell>
      ) : null}
      {v.praeteritum && v.praeteritum.length > 0 ? (
        <SectionShell title={pick(STR.praeteritum, locale)}>
          <ConjugationTable rows={v.praeteritum} locale={locale} />
        </SectionShell>
      ) : null}
      {v.auxiliary || v.perfektForm ? (
        <SectionShell title={pick(STR.perfekt, locale)}>
          <div className="grid grid-cols-2 gap-3">
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
        </SectionShell>
      ) : null}
    </>
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
      className="rounded-[14px] overflow-hidden"
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
            <span className="font-sans text-[14px] text-fg-muted">
              {r.pronoun}
            </span>
          </BodyCell>
          <BodyCell>
            <span className="font-sans font-semibold text-[14px] text-fg">
              {r.form}
            </span>
          </BodyCell>
        </div>
      ))}
    </div>
  );
}

/* ================================================================ *
 *  Adjective sections                                              *
 * ================================================================ */

function AdjSections({
  entry,
  locale,
}: {
  entry: DictionaryEntry;
  locale: DictLocale;
}) {
  const a = entry.adjective!;
  return (
    <SectionShell title={pick(STR.comparison, locale)}>
      <div className="grid grid-cols-3 gap-3">
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
    </SectionShell>
  );
}

/* ================================================================ *
 *  Tag explanation list, rendered below the pill strip             *
 * ================================================================ */

function TagExplanations({ tags }: { tags: DictionaryEntry["tags"] }) {
  const withExplanations = tags.filter((t) => t.explanation);
  if (withExplanations.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 pt-1">
      {withExplanations.map((t) => (
        <div key={t.key} className="flex items-start gap-2">
          <span className="font-sans font-semibold text-[12px] text-fg shrink-0 mt-px">
            {t.label}
          </span>
          <span className="font-sans text-[13px] text-fg-muted leading-snug">
            {t.explanation}
          </span>
        </div>
      ))}
    </div>
  );
}
