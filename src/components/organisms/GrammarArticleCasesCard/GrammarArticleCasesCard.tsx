import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";
import { GrammarSampleSentence } from "@/components/molecules/GrammarSampleSentence/GrammarSampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import type { ArticleCaseForm } from "@/content/grammar-a1";

/**
 * GrammarArticleCasesCard — the A2 `articleCards` layout. Three
 * cards side by side (der · die · das), each showing Nominativ +
 * Akkusativ forms. The masculine card is flagged `change: true`
 * and gets a visible "changes" cue, since `der → den` is the only
 * article shift the learner has to internalize at A2.
 *
 * Drives the Akkusativ-Artikel anchor.
 *
 * Mobile (≤ 640px): stacks vertically.
 */

const ARTICLE_COLORS: Record<ArticleCaseForm["article"], string> = {
  der: "var(--color-article-der)",
  die: "var(--color-article-die)",
  das: "var(--color-article-das)",
};

/**
 * Colour the plural card uses for its hero. `die` on a plural
 * card reads as feminine without this — plural pronouns are
 * taught as a distinct bucket, so the card gets the neutral
 * chip-grammar purple instead of one of the three gender tints.
 */
const PLURAL_COLOR = "var(--chip-grammar-color)";

export interface GrammarArticleCasesCardProps {
  headline: string;
  english: string;
  note?: string;
  articles: ArticleCaseForm[];
  sample: { de: string; en: string; highlight: string };
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function GrammarArticleCasesCard({
  headline,
  english,
  note,
  articles,
  sample,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: GrammarArticleCasesCardProps) {
  const { locale, strings } = useLocale();
  const changesLabel = locale === "tr" ? "değişir!" : "changes!";

  return (
    <div
      className={clsx(
        "bg-surface-card rounded-3xl p-5",
        "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        "[html[data-theme=dark]_&]:shadow-[0_4px_12px_rgba(0,0,0,0.45)]",
        "flex flex-col gap-5",
        className,
      )}
    >
      <CardToolbar speakText={sample.de} current={current} total={total} />

      <div className="flex flex-col items-center gap-1 text-center py-1">
        <div className="font-sans font-bold text-[32px] text-fg leading-tight">
          {headline}
        </div>
        <div className="font-sans font-normal text-base text-fg-muted leading-snug">
          {english}
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 gap-3",
          articles.length === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : "sm:grid-cols-3",
        )}
      >
        {articles.map((a, cardIdx) => {
          // Plural card borrows chip-grammar purple so it reads as
          // its own bucket, not another feminine die card.
          const isPluralCard = a.role === "plural" || a.pluralNoteN === true;
          const color = isPluralCard
            ? PLURAL_COLOR
            : ARTICLE_COLORS[a.article];
          return (
            <div
              key={`${a.article}-${cardIdx}`}
              className="flex flex-col items-center gap-1.5 rounded-2xl p-3.5"
              style={{
                background: "var(--surface-sunk)",
                border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
              }}
            >
              <div
                className="font-sans font-bold text-[28px] leading-none"
                style={{ color }}
              >
                {a.article}
              </div>
              <div
                className="font-sans font-normal text-[12px] text-fg-muted uppercase text-center"
                style={{ letterSpacing: "0.6px" }}
              >
                {a.role}
              </div>
              <div className="mt-2 flex flex-col gap-1 self-stretch">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans font-normal text-[11px] text-fg-faint uppercase">
                    Nom:
                  </span>
                  <span className="font-sans font-semibold text-[14px] text-fg">
                    {a.nom.de}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-sans font-normal text-[11px] uppercase"
                    style={{
                      color:
                        a.akk.de !== a.nom.de
                          ? color
                          : "var(--fg-faint)",
                    }}
                  >
                    Akk:
                  </span>
                  <span
                    className={clsx(
                      "font-sans text-[14px]",
                      a.akk.de !== a.nom.de
                        ? "font-bold"
                        : "font-semibold text-fg",
                    )}
                    style={a.akk.de !== a.nom.de ? { color } : undefined}
                  >
                    {a.akk.de}
                  </span>
                </div>
                {a.dat ? (
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-sans font-normal text-[11px] uppercase"
                      style={{ color }}
                    >
                      Dat:
                    </span>
                    <span
                      className="font-sans font-bold text-[14px]"
                      style={{ color }}
                    >
                      {a.dat.de}
                    </span>
                  </div>
                ) : null}
              </div>
              {a.pluralNoteN ? (
                <div
                  className="font-sans font-normal text-[11px] mt-1 text-center leading-snug"
                  style={{ color: "var(--fg-muted)" }}
                >
                  * plural noun adds -n
                </div>
              ) : a.change && !a.dat ? (
                <div
                  className="font-sans font-semibold text-[11px] mt-1 uppercase"
                  style={{ color, letterSpacing: "0.3px" }}
                >
                  ↑ {changesLabel}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {note ? (
        <RuleCard
          tint="var(--chip-grammar-color)"
          body={note}
          label={strings.try.learnCard.ruleLabel}
        />
      ) : null}

      <GrammarSampleSentence
        sentence={sample.de}
        highlight={sample.highlight}
        translation={sample.en}
      />

      <LearnActions
        onRepeat={onRepeat}
        onIKnow={onIKnow}
        className="mt-auto"
      />
    </div>
  );
}
