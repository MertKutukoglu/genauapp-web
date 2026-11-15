"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ModeToggle, type WordsMode } from "@/components/molecules/ModeToggle/ModeToggle";
import { LearnCompletion } from "@/components/organisms/LearnCompletion/LearnCompletion";
import { GrammarVerbParadigmCard } from "@/components/organisms/GrammarVerbParadigmCard/GrammarVerbParadigmCard";
import { GrammarPronounChartCard } from "@/components/organisms/GrammarPronounChartCard/GrammarPronounChartCard";
import { GrammarArticleCard } from "@/components/organisms/GrammarArticleCard/GrammarArticleCard";
import { GrammarVerbConjugationCard } from "@/components/organisms/GrammarVerbConjugationCard/GrammarVerbConjugationCard";
import { GrammarParticipleParadigmCard } from "@/components/organisms/GrammarParticipleParadigmCard/GrammarParticipleParadigmCard";
import { GrammarVerbCardsCard } from "@/components/organisms/GrammarVerbCardsCard/GrammarVerbCardsCard";
import { GrammarArticleCasesCard } from "@/components/organisms/GrammarArticleCasesCard/GrammarArticleCasesCard";
import { GrammarActivePassiveCard } from "@/components/organisms/GrammarActivePassiveCard/GrammarActivePassiveCard";
import { GrammarRelativePronounCard } from "@/components/organisms/GrammarRelativePronounCard/GrammarRelativePronounCard";
import { GrammarConnectorCardsCard } from "@/components/organisms/GrammarConnectorCardsCard/GrammarConnectorCardsCard";
import { GrammarComparisonTableCard } from "@/components/organisms/GrammarComparisonTableCard/GrammarComparisonTableCard";
import { GrammarConnectorCarouselCard } from "@/components/organisms/GrammarConnectorCarouselCard/GrammarConnectorCarouselCard";
import { GrammarExerciseMC } from "@/components/organisms/GrammarExerciseMC/GrammarExerciseMC";
import { GrammarExerciseFillBlank } from "@/components/organisms/GrammarExerciseFillBlank/GrammarExerciseFillBlank";
import { ExerciseCompletion } from "@/components/organisms/ExerciseCompletion/ExerciseCompletion";
import { ExercisePartsPicker } from "@/components/organisms/ExercisePartsPicker/ExercisePartsPicker";
import { computeSkillDeltas } from "@/lib/skills/map";
import { useSkillStore } from "@/stores/skillStore";
import { useChipStore, type ChipId } from "@/stores/chipStore";
import { useGrammarAnswersStore } from "@/stores/grammarAnswersStore";
import type { CEFRLabel } from "@/stores/wordAnswersStore";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { workoutCopy } from "@/lib/workout/strings";
import {
  grammarLearnAnchors,
  localizeGrammar,
  type GrammarQuestion,
  type ParadigmForm,
  type PronounForm,
  type PronounCaseForm,
  type ConjugationForm,
  type ParticipleForm,
} from "@/content/grammar-a1";

/**
 * GrammarChip — the Grammar chip's right-card experience. Sibling of
 * WordsChip, owning:
 *   - mode (learn / exercise) via the shared ModeToggle
 *   - Learn deck: 5-7 anchors (whichever carry a `learn` block),
 *     dispatched by `learn.layout`, Repeat/I-know mechanics mirror
 *     Words Learn verbatim.
 *   - Exercise deck: all 20+ items in authored order; correct
 *     advances, wrong reinserts at a random later index; first-try
 *     scoring; completion screen with YOU-FED skill badges and a
 *     Continue CTA for the next workout.
 *   - Chip-done + skill-delta staging on Exercise completion.
 *
 * Deck mechanics mirror WordsChip verbatim for consistency across
 * chips: the learner builds the same Repeat/I-know/correct/wrong
 * intuition in Words and carries it into Grammar unchanged.
 */

export interface GrammarChipProps {
  /** The full A1 deck. Learn mode filters to the anchor questions. */
  items: GrammarQuestion[];
  initialMode?: WordsMode;
  className?: string;
}

export function GrammarChip({
  items,
  initialMode = "learn",
  className,
}: GrammarChipProps) {
  const { locale } = useLocale();

  // Localize the whole deck once per locale change.
  const localizedItems = React.useMemo(
    () => items.map((q) => localizeGrammar(q, locale)),
    [items, locale],
  );
  const anchors = React.useMemo(
    () => grammarLearnAnchors(localizedItems),
    [localizedItems],
  );

  const [mode, setMode] = React.useState<WordsMode>(initialMode);

  // Exercise-parts picker state (B1 Grammar at 40 items is the
  // current trigger). `exercisePartIdx === null` means the picker is
  // on screen; a number means that part's slice is running inside
  // the normal ExerciseDeck. `parts === null` means the deck is small
  // enough to run in one sitting and the picker is skipped entirely.
  const [exercisePartIdx, setExercisePartIdx] = React.useState<
    number | null
  >(null);

  const parts = React.useMemo(() => {
    const EXERCISE_PART_THRESHOLD = 30;
    const CHUNK = 15;
    if (localizedItems.length <= EXERCISE_PART_THRESHOLD) return null;
    const result: GrammarQuestion[][] = [];
    for (let i = 0; i < localizedItems.length; i += CHUNK) {
      result.push(localizedItems.slice(i, i + CHUNK));
    }
    return result;
  }, [localizedItems]);

  // Localized stat label on the Learn completion — "Cards" / "Kartlar"
  // reads right when the Learn deck is a handful of anchors rather
  // than a long word list.
  const itemsLabel = locale === "tr" ? "Kartlar" : "Cards";

  const handleModeChange = React.useCallback((m: WordsMode) => {
    setMode(m);
    // Reset part selection whenever the user flips modes so re-entry
    // to Exercise always shows the picker again (if applicable).
    setExercisePartIdx(null);
  }, []);

  const renderExerciseArea = () => {
    if (!parts) {
      return <ExerciseDeck items={localizedItems} />;
    }
    if (exercisePartIdx === null) {
      return (
        <ExercisePartsPicker
          parts={parts.map((slice) => ({
            topics: distinctTopics(slice),
            count: slice.length,
          }))}
          onSelect={setExercisePartIdx}
        />
      );
    }
    const activeSlice = parts[exercisePartIdx];
    return (
      <div className="flex flex-col gap-3 min-h-0 lg:flex-1 lg:[&>*:last-child]:flex-1">
        <PartsBreadcrumb
          currentIdx={exercisePartIdx}
          total={parts.length}
          onBack={() => setExercisePartIdx(null)}
        />
        <ExerciseDeck
          key={`part-${exercisePartIdx}`}
          items={activeSlice}
        />
      </div>
    );
  };

  return (
    <div className={clsx("flex flex-col gap-4 min-h-0", className)}>
      <ModeToggle mode={mode} onChange={handleModeChange} />

      <div className="lg:flex-1 lg:flex lg:flex-col [&>*]:lg:flex-1">
        {mode === "learn" ? (
          <LearnDeck
            anchors={anchors}
            itemsLabel={itemsLabel}
            onSwitchToExercise={() => setMode("exercise")}
          />
        ) : (
          renderExerciseArea()
        )}
      </div>
    </div>
  );
}

/** Distinct topics from a slice, preserving first-appearance order.
 *  The picker uses these for its per-part preview line. */
function distinctTopics(items: GrammarQuestion[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const q of items) {
    if (!seen.has(q.topic)) {
      seen.add(q.topic);
      out.push(q.topic);
    }
  }
  return out;
}

/** Tiny breadcrumb shown above ExerciseDeck when a part is active,
 *  so the learner can bail back to the picker at any point —
 *  including after completion, since ExerciseCompletion renders in
 *  place of the deck and this row stays visible above it. */
function PartsBreadcrumb({
  currentIdx,
  total,
  onBack,
}: {
  currentIdx: number;
  total: number;
  onBack: () => void;
}) {
  const { locale } = useLocale();
  const backLabel = locale === "tr" ? "← Bölümler" : "← Parts";
  const positionLabel =
    locale === "tr"
      ? `Bölüm ${currentIdx + 1} / ${total}`
      : `Part ${currentIdx + 1} of ${total}`;
  return (
    <div className="flex items-center justify-between gap-3 px-1">
      <button
        type="button"
        onClick={onBack}
        className={clsx(
          "font-sans font-semibold text-[12px] uppercase tracking-wide",
          "text-fg-muted hover:text-fg",
          "transition-colors duration-150",
          "focus:outline-none focus-visible:underline",
        )}
        style={{ letterSpacing: "0.4px" }}
      >
        {backLabel}
      </button>
      <div
        className="font-sans font-semibold text-[12px] uppercase tracking-wide text-fg-faint"
        style={{ letterSpacing: "0.4px" }}
      >
        {positionLabel}
      </div>
    </div>
  );
}

/**
 * LearnDeck — walks the anchors as cards. Carried over from the
 * first Grammar pass so the Exercise work could land without
 * touching the Learn shape.
 */
function LearnDeck({
  anchors,
  itemsLabel,
  onSwitchToExercise,
}: {
  anchors: GrammarQuestion[];
  itemsLabel: string;
  onSwitchToExercise: () => void;
}) {
  const [remaining, setRemaining] = React.useState<GrammarQuestion[]>(anchors);
  const [repeatCount, setRepeatCount] = React.useState(0);

  const deckKey = React.useMemo(
    () => anchors.map((q) => q.topic).join("|"),
    [anchors],
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
  const completed = remainingCount === 0 && deckSize > 0;

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
    try {
      window.__track?.("demo_learn_restart", { chip: "grammar" });
    } catch {
      /* no-op */
    }
  }, [anchors]);

  if (completed) {
    return (
      <LearnCompletion
        onStartOver={handleStartOver}
        onSwitchToExercise={onSwitchToExercise}
      />
    );
  }
  if (!current) {
    return <EmptyDeck label="No cards in this deck." />;
  }

  return (
    <LearnCardSwitch
      item={current}
      current={currentIndex}
      total={deckSize}
      onRepeat={handleRepeat}
      onIKnow={handleIKnow}
    />
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
          chipLabel={item.topic}
          forms={(learn.forms as ParadigmForm[]) ?? []}
          sample={learn.sample}
          variants={learn.variants}
          note={learn.note}
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
          forms={
            (learn.forms as PronounForm[] | PronounCaseForm[]) ?? []
          }
          columns={learn.columns}
          note={learn.note}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "articleSingle":
      if (!learn.article || !learn.patterns || !learn.role) {
        return <EmptyDeck label="Missing article data." />;
      }
      return (
        <GrammarArticleCard
          article={learn.article}
          role={learn.role}
          chipLabel={item.topic}
          patterns={learn.patterns}
          rule={learn.rule}
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
          chipLabel={item.topic}
          note={learn.note}
          forms={(learn.forms as ConjugationForm[]) ?? []}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "participleParadigm":
      return (
        <GrammarParticipleParadigmCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          note={learn.note}
          forms={(learn.forms as ParticipleForm[]) ?? []}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "verbCards":
      if (!learn.prefixes || learn.prefixes.length === 0) {
        return <EmptyDeck label="Missing prefixes data." />;
      }
      return (
        <GrammarVerbCardsCard
          english={learn.english ?? ""}
          chipLabel={item.topic}
          prefixes={learn.prefixes}
          tint={learn.tint}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "articleCards":
      if (!learn.articles) {
        return <EmptyDeck label="Missing articles data." />;
      }
      return (
        <GrammarArticleCasesCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          note={learn.note}
          articles={learn.articles}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "activePassiveComparison":
      if (!learn.pairs || learn.pairs.length === 0) {
        return <EmptyDeck label="Missing pairs data." />;
      }
      // Normalise B1's aktiv/passiv keys to the card's generic
      // left/right shape. labels stays unset so the card falls back
      // to "Aktiv" / "Passiv".
      return (
        <GrammarActivePassiveCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          note={learn.note}
          pairs={learn.pairs.map((p) => ({ left: p.aktiv, right: p.passiv }))}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "styleComparison":
      if (!learn.stylePairs || learn.stylePairs.length === 0) {
        return <EmptyDeck label="Missing style-pairs data." />;
      }
      // Same card as activePassiveComparison, generalised with
      // caller-supplied column labels + generic left/right pairs.
      // Drives the B2 Nominalstil anchor.
      return (
        <GrammarActivePassiveCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          note={learn.note}
          pairs={learn.stylePairs}
          labels={learn.labels}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "relativePronounGrid":
      if (!learn.rows || !learn.columns) {
        return <EmptyDeck label="Missing relative-pronoun data." />;
      }
      return (
        <GrammarRelativePronounCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          note={learn.note}
          columns={learn.columns}
          rows={learn.rows}
          examples={learn.examples}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "connectorCards":
      if (!learn.connectors || learn.connectors.length === 0) {
        return <EmptyDeck label="Missing connectors data." />;
      }
      return (
        <GrammarConnectorCardsCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          note={learn.note}
          connectors={learn.connectors}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "comparisonTable":
      if (!learn.comparisons || learn.comparisons.length === 0) {
        return <EmptyDeck label="Missing comparisons data." />;
      }
      return (
        <GrammarComparisonTableCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          note={learn.note}
          comparisons={learn.comparisons}
          sample={learn.sample}
          current={current}
          total={total}
          onRepeat={onRepeat}
          onIKnow={onIKnow}
        />
      );
    case "connectorCarousel":
      if (!learn.connectors || learn.connectors.length === 0) {
        return <EmptyDeck label="Missing connectors data." />;
      }
      return (
        <GrammarConnectorCarouselCard
          headline={learn.headline ?? ""}
          english={learn.english ?? ""}
          note={learn.note}
          connectors={learn.connectors}
          sample={learn.sample}
          showFormula={learn.showFormula}
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

/**
 * ExerciseDeck — walks every GrammarQuestion in authored order and
 * dispatches by `exerciseType` to the MC or fillBlank organism.
 *
 * Deck mechanic matches Words Exercise:
 *   - Correct → head leaves, counter advances
 *   - Incorrect → head reinserts at a random later index, counter
 *     does NOT advance. First-try scoring: a card missed once is
 *     counted toward incorrect even if the retry eventually succeeds;
 *     the retry success is not re-tallied, so first-try correct +
 *     incorrect = deckSize at the end.
 *
 * On completion: compute skill deltas (grammar primary + writing +
 * vocab fed, per CHIP_SKILL_MAP), stage them to the skillStore (shown
 * as YOU FED badges on the completion card), mark the grammar chip
 * done so the LeftCard's workout counter ticks, and emit the finish
 * PostHog event with flat delta_* props (never the nested object —
 * the analytics SDK rejects those).
 */
function ExerciseDeck({ items }: { items: GrammarQuestion[] }) {
  const [remaining, setRemaining] = React.useState<GrammarQuestion[]>(items);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [incorrectCount, setIncorrectCount] = React.useState(0);
  const missedSetRef = React.useRef<Set<string>>(new Set());

  const itemsKey = React.useMemo(
    () => items.map((q) => `${q.topic}|${q.prompt}`).join("~"),
    [items],
  );
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(items);
    setCorrectCount(0);
    setIncorrectCount(0);
    missedSetRef.current = new Set();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey]);

  const deckSize = items.length;
  const remainingCount = remaining.length;
  const currentIndex = deckSize - remainingCount + 1;
  const current = remaining[0];
  const done = remainingCount === 0 && deckSize > 0;

  const appendGrammarAnswer = useGrammarAnswersStore((s) => s.append);
  const currentLevel = useChipStore((s) => s.selectedLevel);

  const handleNext = React.useCallback(
    ({ correct }: { correct: boolean }) => {
      if (!current) return;
      const key = `${current.topic}|${current.prompt}`;
      // Log the answer for the Grammar skill sheet. `isAnchor` tells
      // downstream views whether the question was one of the 5-7
      // anchor questions (with a `learn` block) or a drill — the
      // sheet doesn't surface it yet, but it's worth keeping so a
      // future per-section split (anchor vs drill accuracy) has the
      // data it needs.
      try {
        appendGrammarAnswer({
          topic: current.topic,
          exerciseType: current.exerciseType,
          correct,
          timestamp: Date.now(),
          level: (currentLevel ?? "A1") as CEFRLabel,
          isAnchor: Boolean(current.learn),
        });
      } catch {
        /* localStorage may be disabled; the ring + sheet still work */
      }
      if (correct) {
        if (!missedSetRef.current.has(key)) {
          setCorrectCount((c) => c + 1);
        }
        setRemaining((r) => r.slice(1));
        try {
          window.__track?.("demo_exercise_correct", {
            chip: "grammar",
            type: current.exerciseType,
            topic: current.topic,
          });
        } catch {
          /* no-op */
        }
      } else {
        if (!missedSetRef.current.has(key)) {
          missedSetRef.current.add(key);
          setIncorrectCount((c) => c + 1);
        }
        setRemaining((r) => {
          // On the very last question: ending the deck is the only
          // way forward. Returning `r` unchanged used to leave the
          // user stuck on the "Incorrect" banner — they'd already
          // seen the correct answer, but Next did nothing because
          // the item at index 0 didn't change, so the exercise card
          // stayed mounted with the answered state. Slice it off
          // instead and roll into the completion screen.
          if (r.length <= 1) return r.slice(1);
          const [head, ...rest] = r;
          const idx = 1 + Math.floor(Math.random() * rest.length);
          return [...rest.slice(0, idx), head, ...rest.slice(idx)];
        });
        try {
          window.__track?.("demo_exercise_wrong", {
            chip: "grammar",
            type: current.exerciseType,
            topic: current.topic,
          });
        } catch {
          /* no-op */
        }
      }
    },
    [current, appendGrammarAnswer, currentLevel],
  );

  const stageSkillDeltas = useSkillStore((s) => s.stageDeltas);
  const completeChip = useChipStore((s) => s.completeChip);
  const chipProgress = useChipStore((s) => s.progress);
  const openChip = useChipStore((s) => s.openChip);
  const addStats = useChipStore((s) => s.addStats);
  const openSummary = useChipStore((s) => s.openSummary);
  const { locale } = useLocale();
  const summaryOpenLabel = workoutCopy(locale).openSummaryCta;

  // Next-workout CTA on the completion screen: walk the fixed chip
  // order (words → grammar → sentence → reading), starting right
  // after grammar, and pick the first chip that isn't done. When all
  // other chips are done, return null and let the LeftCard picker
  // take over.
  const nextWorkout = React.useMemo(() => {
    const chipOrder: Array<{ id: ChipId; label: string }> = [
      { id: "words", label: "Words" },
      { id: "grammar", label: "Grammar" },
      { id: "sentence", label: "Sentence" },
      { id: "reading", label: "Reading" },
    ];
    const currentIdx = chipOrder.findIndex((c) => c.id === "grammar");
    for (let i = 1; i <= chipOrder.length - 1; i++) {
      const candidate = chipOrder[(currentIdx + i) % chipOrder.length];
      if (chipProgress[candidate.id] !== "done") return candidate;
    }
    return null;
  }, [chipProgress]);

  // Stage deltas once on completion; stash in local state so the
  // completion screen shows the same numbers across re-renders.
  const [sessionDeltas, setSessionDeltas] = React.useState<ReturnType<
    typeof computeSkillDeltas
  > | null>(null);
  const deltasStagedRef = React.useRef(false);

  React.useEffect(() => {
    if (!done) {
      deltasStagedRef.current = false;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSessionDeltas(null);
      return;
    }
    if (deltasStagedRef.current) return;
    deltasStagedRef.current = true;

    const d = computeSkillDeltas({
      chip: "grammar",
      correct: correctCount,
      total: deckSize,
    });
    setSessionDeltas(d);
    stageSkillDeltas(d);
    addStats({ correct: correctCount, total: deckSize });
    completeChip("grammar");

    try {
      window.__track?.("demo_exercise_finish", {
        chip: "grammar",
        correct: correctCount,
        incorrect: incorrectCount,
        delta_vocab: d.vocab ?? 0,
        delta_grammar: d.grammar ?? 0,
        delta_writing: d.writing ?? 0,
        delta_reading: d.reading ?? 0,
      });
    } catch {
      /* no-op */
    }
  }, [done, correctCount, incorrectCount, deckSize, stageSkillDeltas, completeChip, addStats]);

  if (done) {
    return (
      <ExerciseCompletion
        chip="grammar"
        correct={correctCount}
        total={deckSize}
        deltas={sessionDeltas ?? {}}
        nextWorkout={
          nextWorkout
            ? {
                label: nextWorkout.label,
                onContinue: () => openChip(nextWorkout.id),
              }
            : undefined
        }
        summaryCta={
          !nextWorkout
            ? { label: summaryOpenLabel, onContinue: openSummary }
            : undefined
        }
      />
    );
  }

  if (!current) return <EmptyDeck label="No exercises in this deck." />;

  // Variant router. Key by topic+prompt so each advance remounts the
  // underlying organism (clears local state like typed input or
  // picked option).
  const key = `${current.topic}|${current.prompt}`;

  if (current.exerciseType === "multipleChoice") {
    if (
      !current.options ||
      current.options.length === 0 ||
      typeof current.correctIndex !== "number"
    ) {
      return <EmptyDeck label="Missing MC options." />;
    }
    return (
      <GrammarExerciseMC
        key={key}
        topic={current.topic}
        prompt={current.prompt}
        hint={current.hint}
        options={current.options}
        correctIndex={current.correctIndex}
        explanation={current.explanation}
        current={currentIndex}
        total={deckSize}
        onNext={handleNext}
      />
    );
  }

  // fillBlank
  if (!current.answer) return <EmptyDeck label="Missing fillBlank answer." />;
  return (
    <GrammarExerciseFillBlank
      key={key}
      topic={current.topic}
      prompt={current.prompt}
      hint={current.hint}
      answer={current.answer}
      explanation={current.explanation}
      current={currentIndex}
      total={deckSize}
      onNext={handleNext}
    />
  );
}

function EmptyDeck({ label }: { label: string }) {
  return (
    <div className="bg-surface-card rounded-3xl p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <p className="font-sans text-fg-muted m-0">{label}</p>
    </div>
  );
}
