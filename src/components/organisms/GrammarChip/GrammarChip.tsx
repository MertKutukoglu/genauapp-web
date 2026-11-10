"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ModeToggle, type WordsMode } from "@/components/molecules/ModeToggle/ModeToggle";
import { LearnCompletion } from "@/components/organisms/LearnCompletion/LearnCompletion";
import { GrammarVerbParadigmCard } from "@/components/organisms/GrammarVerbParadigmCard/GrammarVerbParadigmCard";
import { GrammarPronounChartCard } from "@/components/organisms/GrammarPronounChartCard/GrammarPronounChartCard";
import { GrammarArticleCardsCard } from "@/components/organisms/GrammarArticleCardsCard/GrammarArticleCardsCard";
import { GrammarVerbConjugationCard } from "@/components/organisms/GrammarVerbConjugationCard/GrammarVerbConjugationCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import {
  grammarLearnAnchors,
  localizeGrammar,
  type GrammarQuestion,
  type ParadigmForm,
  type PronounForm,
  type ConjugationForm,
} from "@/content/grammar-a1";

/**
 * GrammarChip — the Grammar chip's right-card experience. Sibling of
 * WordsChip, owning:
 *   - mode (learn / exercise) via the shared ModeToggle
 *   - the Learn deck's remaining-items state + Repeat / I-know
 *   - layout dispatch by `learn.layout`
 *   - routing between Learn card / Learn completion / Exercise stub
 *
 * In v1 we ship Learn only. Exercise flips to a short placeholder
 * stub until the Exercise cards land in a follow-up pass per Mert's
 * plan ("önce Learn, sonra Exercise").
 *
 * Deck mechanics mirror WordsChip Learn verbatim: Repeat reinserts
 * the head card at a random later index without advancing the
 * counter; I know removes it and advances. The counter formula is
 * `currentIndex = deckSize - remaining.length + 1`.
 *
 * Source items are filtered to the 5 anchors (`learn !== undefined`);
 * the remaining 15 are exercise-only drills and don't belong in Learn.
 */

export interface GrammarChipProps {
  /** The full 20-item A1 deck. Learn mode filters to the 5 anchors. */
  items: GrammarQuestion[];
  initialMode?: WordsMode;
  className?: string;
}

export function GrammarChip({
  items,
  initialMode = "learn",
  className,
}: GrammarChipProps) {
  const { locale, strings } = useLocale();

  // Localize the whole deck once per locale change, then drop to the
  // 5 anchors for the Learn deck. Exercise (when it lands) will walk
  // the full localized list.
  const localizedItems = React.useMemo(
    () => items.map((q) => localizeGrammar(q, locale)),
    [items, locale],
  );
  const anchors = React.useMemo(
    () => grammarLearnAnchors(localizedItems),
    [localizedItems],
  );

  const [mode, setMode] = React.useState<WordsMode>(initialMode);
  const [remaining, setRemaining] = React.useState<GrammarQuestion[]>(anchors);
  const [repeatCount, setRepeatCount] = React.useState(0);

  // Re-seed the Learn deck when anchors array OR locale changes.
  const deckKey = React.useMemo(
    () => `${locale}:${anchors.map((q) => q.topic).join("|")}`,
    [anchors, locale],
  );
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(anchors);
    setRepeatCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckKey]);

  const deckSize = anchors.length;
  const remainingCount = remaining.length;
  const currentIndex = deckSize - remainingCount + 1;
  const current = remaining[0];
  const learnCompleted = remainingCount === 0 && deckSize > 0;

  const handleRepeat = React.useCallback(() => {
    setRemaining((r) => {
      if (r.length <= 1) return r;
      const [head, ...rest] = r;
      const idx = 1 + Math.floor(Math.random() * rest.length);
      return [...rest.slice(0, idx), head, ...rest.slice(idx)];
    });
    setRepeatCount((c) => c + 1);
    try {
      window.__track?.("demo_learn_repeat", { chip: "grammar" });
    } catch {
      /* no-op */
    }
  }, []);

  const handleIKnow = React.useCallback(() => {
    setRemaining((r) => r.slice(1));
    try {
      window.__track?.("demo_learn_iknow", { chip: "grammar" });
    } catch {
      /* no-op */
    }
  }, []);

  const handleStartOver = React.useCallback(() => {
    setRemaining(anchors);
    setRepeatCount(0);
    setMode("learn");
    try {
      window.__track?.("demo_learn_restart", { chip: "grammar" });
    } catch {
      /* no-op */
    }
  }, [anchors]);

  // Localized stat label on the Learn completion — "Cards" / "Kartlar"
  // reads right when the Learn deck is 5 anchors, not 20 items. Takes
  // the Grammar chip's own i18n copy; falls back to the generic.
  const itemsLabel = locale === "tr" ? "Kartlar" : "Cards";

  return (
    <div className={clsx("flex flex-col gap-4 min-h-0", className)}>
      <ModeToggle mode={mode} onChange={setMode} />

      <div className="lg:flex-1 lg:flex lg:flex-col [&>*]:lg:flex-1">
        {mode === "learn" ? (
          learnCompleted ? (
            <LearnCompletion
              total={deckSize}
              repeats={repeatCount}
              itemsLabel={itemsLabel}
              onStartOver={handleStartOver}
              onSwitchToExercise={() => setMode("exercise")}
            />
          ) : current ? (
            <LearnCardSwitch
              item={current}
              current={currentIndex}
              total={deckSize}
              onRepeat={handleRepeat}
              onIKnow={handleIKnow}
            />
          ) : (
            <EmptyDeck label={strings.try.rightPlaceholder.idleBody} />
          )
        ) : (
          <ExerciseStub />
        )}
      </div>
    </div>
  );
}

/**
 * LearnCardSwitch — dispatch a question's `learn.layout` to the right
 * card organism. Unknown layouts fall back to an empty card rather
 * than throw: a content-only mistake shouldn't crash the UI.
 */
interface LearnCardSwitchProps {
  item: GrammarQuestion;
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
}
function LearnCardSwitch({
  item,
  current,
  total,
  onRepeat,
  onIKnow,
}: LearnCardSwitchProps) {
  const learn = item.learn;
  if (!learn) return <EmptyDeck label="Missing learn block." />;

  switch (learn.layout) {
    case "verbParadigm":
      return (
        <GrammarVerbParadigmCard
          verb={learn.verb ?? ""}
          english={learn.english ?? ""}
          forms={(learn.forms as ParadigmForm[]) ?? []}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "pronounChart":
      return (
        <GrammarPronounChartCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          forms={(learn.forms as PronounForm[]) ?? []}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "articleCards":
      return (
        <GrammarArticleCardsCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          articles={learn.articles ?? []}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "verbConjugation":
      return (
        <GrammarVerbConjugationCard
          verb={learn.verb ?? ""}
          english={learn.english ?? ""}
          note={learn.note}
          forms={(learn.forms as ConjugationForm[]) ?? []}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    default:
      return <EmptyDeck label="Unknown learn layout." />;
  }
}

function EmptyDeck({ label }: { label: string }) {
  return (
    <div className="bg-surface-card rounded-3xl p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <p className="font-sans text-fg-muted m-0">{label}</p>
    </div>
  );
}

/**
 * ExerciseStub — v1 placeholder for Exercise mode. The real Exercise
 * deck (12 MC + 8 fillBlank) lands in the follow-up pass; for now
 * switching to Exercise shows a short hint inviting the user back to
 * Learn, so the toggle doesn't look broken.
 */
function ExerciseStub() {
  const { locale } = useLocale();
  const title = locale === "tr" ? "Egzersiz yakında" : "Exercise coming next";
  const body =
    locale === "tr"
      ? "Gramer egzersizleri sıradaki adımda geliyor. Şimdilik Öğren tarafında paradigmaları gezebilirsin."
      : "Grammar drills land in the next pass. For now, walk the paradigms in Learn.";
  return (
    <div className="bg-surface-card rounded-3xl p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex flex-col gap-3">
      <h3 className="font-display italic font-semibold text-xl text-fg m-0">
        {title}
      </h3>
      <p className="font-sans text-[15px] text-fg-muted m-0 leading-relaxed">
        {body}
      </p>
    </div>
  );
}
