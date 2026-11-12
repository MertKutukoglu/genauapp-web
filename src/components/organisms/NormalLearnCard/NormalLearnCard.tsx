import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { tryCardSurface } from "@/lib/ui/cardChrome";
import { CardToolbar } from "@/components/molecules/CardToolbar/CardToolbar";
import { WordSection, type ArticleColor } from "@/components/molecules/WordSection/WordSection";
import { GrammarTagPills, type GrammarTag } from "@/components/molecules/GrammarTagPills/GrammarTagPills";
import { SampleSentence } from "@/components/molecules/SampleSentence/SampleSentence";
import { RuleCard } from "@/components/molecules/RuleCard/RuleCard";
import { LearnActions } from "@/components/molecules/LearnActions/LearnActions";

/**
 * NormalLearnCard — the canonical Learn-mode card for the Words chip.
 *
 * Composes the six spec blocks top-to-bottom:
 *   1. CardToolbar (speaker + counter)
 *   2. WordSection (DE + EN)
 *   3. GrammarTagPills (verb only, optional)
 *   4. SampleSentence (optional)
 *   5. RuleCard (optional)
 *   6. LearnActions (Repeat / I know)
 *
 * Every optional block renders only when its data is present. Missing
 * blocks collapse cleanly — the card's padding + shadow still make it
 * feel complete.
 *
 * Spec: claude/GenauApp_Web_Try_Words_Learn_Card.md §2–§7.
 *
 * Only the `normal` variant ships in v1. The scrambled + chunkCompose
 * variants need word-specific content prep and can land in v2 if
 * demo retention asks for more friction.
 */

export interface NormalLearnCardProps {
  german: string;
  english: string;
  article?: ArticleColor;
  grammarTags?: GrammarTag[];
  example?: string;
  /**
   * Translation of `example` in the UI locale (English on /try,
   * Turkish on /tr/try). Rendered muted under the German line so
   * learners get the gist without losing focus on the German.
   */
  exampleTranslation?: string;
  rule?: string;
  /** Small uppercase eyebrow above the toolbar (e.g. "Food"). */
  topic?: string;
  /** Deck position for the counter pill. */
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
  className?: string;
}

export function NormalLearnCard({
  german,
  english,
  article,
  grammarTags,
  example,
  exampleTranslation,
  rule,
  topic,
  current,
  total,
  onRepeat,
  onIKnow,
  className,
}: NormalLearnCardProps) {
  // Speaker reads the full display form (`das Brot`, not just `Brot`)
  // so the article gets its own TTS pronunciation.
  const speakText = article ? `${article} ${german}` : german;

  return (
    <div
      className={clsx(
        tryCardSurface,
        "rounded-3xl p-5",
        "flex flex-col gap-5",
        className,
      )}
    >
      <CardToolbar speakText={speakText} current={current} total={total} />
      {topic ? (
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.1em] text-fg-faint -mt-1">
          {topic}
        </div>
      ) : null}
      <WordSection german={german} english={english} article={article} />
      {grammarTags && grammarTags.length > 0 ? (
        <GrammarTagPills tags={grammarTags} />
      ) : null}
      {example ? (
        <SampleSentence sentence={example} translation={exampleTranslation} />
      ) : null}
      {rule ? <RuleCard article={article} body={rule} /> : null}
      {/* mt-auto pins the action row to the card's bottom edge when the
          card stretches (desktop `lg:flex-1` passes a fixed row height
          down). This stops the Repeat / I-know buttons from jumping
          vertically between cards that have or don't have a rule
          block / grammar pills above them. */}
      <LearnActions
        onRepeat={onRepeat}
        onIKnow={onIKnow}
        className="mt-auto"
      />
    </div>
  );
}
