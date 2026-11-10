"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ModeToggle, type WordsMode } from "@/components/molecules/ModeToggle/ModeToggle";
import { LearnCompletion } from "@/components/organisms/LearnCompletion/LearnCompletion";
import { SentenceFormulaCard } from "@/components/organisms/SentenceFormulaCard/SentenceFormulaCard";
import { SentenceBuilderCard } from "@/components/organisms/SentenceBuilderCard/SentenceBuilderCard";
import { ExerciseCompletion } from "@/components/organisms/ExerciseCompletion/ExerciseCompletion";
import { computeSkillDeltas } from "@/lib/skills/map";
import { useSkillStore } from "@/stores/skillStore";
import { useChipStore, type ChipId } from "@/stores/chipStore";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { workoutCopy } from "@/lib/workout/strings";
import {
  localizeSentence,
  sentenceLearnAnchors,
  type SentenceQuestion,
} from "@/content/sentence-a1";

/**
 * SentenceChip — the right-card experience for the Sentence chip.
 * Sibling of WordsChip + GrammarChip. Owns:
 *   - mode (learn / exercise) via the shared ModeToggle
 *   - Learn deck: the 6 formula anchors, walked through the single
 *     SentenceFormulaCard layout; Repeat / I-know mechanics.
 *   - Exercise deck: all 12 scenes walked in authored order through
 *     SentenceBuilderCard; first-try scoring; completion with
 *     YOU-FED skill badges and the "Continue with X" CTA.
 *
 * Deck mechanics mirror WordsChip + GrammarChip byte-for-byte: a
 * learner builds one intuition in Words and carries it unchanged
 * across the other chips.
 */

export interface SentenceChipProps {
  /** The full A1 deck (12 items). Learn mode filters to the 6 anchors. */
  items: SentenceQuestion[];
  initialMode?: WordsMode;
  className?: string;
}

export function SentenceChip({
  items,
  initialMode = "learn",
  className,
}: SentenceChipProps) {
  const { locale } = useLocale();

  const localizedItems = React.useMemo(
    () => items.map((q) => localizeSentence(q, locale)),
    [items, locale],
  );
  const anchors = React.useMemo(
    () => sentenceLearnAnchors(localizedItems),
    [localizedItems],
  );

  const [mode, setMode] = React.useState<WordsMode>(initialMode);
  const itemsLabel = locale === "tr" ? "Kartlar" : "Cards";

  return (
    <div className={clsx("flex flex-col gap-4 min-h-0", className)}>
      <ModeToggle mode={mode} onChange={setMode} />

      <div className="lg:flex-1 lg:flex lg:flex-col [&>*]:lg:flex-1">
        {mode === "learn" ? (
          <LearnDeck
            anchors={anchors}
            itemsLabel={itemsLabel}
            onSwitchToExercise={() => setMode("exercise")}
          />
        ) : (
          <ExerciseDeck items={localizedItems} />
        )}
      </div>
    </div>
  );
}

function LearnDeck({
  anchors,
  itemsLabel,
  onSwitchToExercise,
}: {
  anchors: SentenceQuestion[];
  itemsLabel: string;
  onSwitchToExercise: () => void;
}) {
  const [remaining, setRemaining] = React.useState<SentenceQuestion[]>(anchors);
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
      window.__track?.("demo_learn_repeat", { chip: "sentence" });
    } catch {
      /* no-op */
    }
  }, []);
  const handleIKnow = React.useCallback(() => {
    setRemaining((r) => r.slice(1));
    try {
      window.__track?.("demo_learn_iknow", { chip: "sentence" });
    } catch {
      /* no-op */
    }
  }, []);
  const handleStartOver = React.useCallback(() => {
    setRemaining(anchors);
    setRepeatCount(0);
    try {
      window.__track?.("demo_learn_restart", { chip: "sentence" });
    } catch {
      /* no-op */
    }
  }, [anchors]);

  if (completed) {
    return (
      <LearnCompletion
        total={deckSize}
        repeats={repeatCount}
        itemsLabel={itemsLabel}
        onStartOver={handleStartOver}
        onSwitchToExercise={onSwitchToExercise}
      />
    );
  }
  if (!current) return <EmptyDeck label="No cards in this deck." />;
  if (!current.learn) return <EmptyDeck label="Missing learn block." />;
  return (
    <SentenceFormulaCard
      headline={current.learn.headline}
      english={current.learn.english}
      parts={current.learn.parts}
      examples={current.learn.examples}
      body={current.learn.body}
      current={currentIndex}
      total={deckSize}
      onRepeat={handleRepeat}
      onIKnow={handleIKnow}
    />
  );
}

/**
 * ExerciseDeck — walks all 12 Sentence scenes in authored order and
 * routes each one to the sentence builder.
 *
 * Deck mechanic matches Words / Grammar:
 *   - Correct → head leaves, counter advances
 *   - Incorrect → head reinserts at a random later index; counter
 *     does NOT advance. First-try scoring: a card missed once counts
 *     toward incorrect even if the retry eventually succeeds.
 *
 * On completion: writing primary, grammar + vocab fed (per
 * CHIP_SKILL_MAP). Stages the deltas to the skillStore (shown as
 * YOU FED badges), marks the sentence chip done, and emits the
 * finish PostHog event with flat delta_* props.
 */
function ExerciseDeck({ items }: { items: SentenceQuestion[] }) {
  const [remaining, setRemaining] = React.useState<SentenceQuestion[]>(items);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [incorrectCount, setIncorrectCount] = React.useState(0);
  const missedSetRef = React.useRef<Set<string>>(new Set());

  const itemsKey = React.useMemo(
    () => items.map((q) => `${q.topic}|${q.words.join(" ")}`).join("~"),
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

  const handleNext = React.useCallback(
    ({ correct }: { correct: boolean }) => {
      if (!current) return;
      const key = `${current.topic}|${current.words.join(" ")}`;
      if (correct) {
        if (!missedSetRef.current.has(key)) {
          setCorrectCount((c) => c + 1);
        }
        setRemaining((r) => r.slice(1));
        try {
          window.__track?.("demo_exercise_correct", {
            chip: "sentence",
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
          if (r.length <= 1) return r;
          const [head, ...rest] = r;
          const idx = 1 + Math.floor(Math.random() * rest.length);
          return [...rest.slice(0, idx), head, ...rest.slice(idx)];
        });
        try {
          window.__track?.("demo_exercise_wrong", {
            chip: "sentence",
            topic: current.topic,
          });
        } catch {
          /* no-op */
        }
      }
    },
    [current],
  );

  const stageSkillDeltas = useSkillStore((s) => s.stageDeltas);
  const completeChip = useChipStore((s) => s.completeChip);
  const chipProgress = useChipStore((s) => s.progress);
  const openChip = useChipStore((s) => s.openChip);
  const addStats = useChipStore((s) => s.addStats);
  const openSummary = useChipStore((s) => s.openSummary);
  const { locale } = useLocale();
  const summaryOpenLabel = workoutCopy(locale).openSummaryCta;

  const nextWorkout = React.useMemo(() => {
    const chipOrder: Array<{ id: ChipId; label: string }> = [
      { id: "words", label: "Words" },
      { id: "grammar", label: "Grammar" },
      { id: "sentence", label: "Sentence" },
      { id: "reading", label: "Reading" },
    ];
    const currentIdx = chipOrder.findIndex((c) => c.id === "sentence");
    for (let i = 1; i <= chipOrder.length - 1; i++) {
      const candidate = chipOrder[(currentIdx + i) % chipOrder.length];
      if (chipProgress[candidate.id] !== "done") return candidate;
    }
    return null;
  }, [chipProgress]);

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
      chip: "sentence",
      correct: correctCount,
      total: deckSize,
    });
    setSessionDeltas(d);
    stageSkillDeltas(d);
    addStats({ correct: correctCount, total: deckSize });
    completeChip("sentence");

    try {
      window.__track?.("demo_exercise_finish", {
        chip: "sentence",
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
        chip="sentence"
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

  // Key by topic + sentence so each advance remounts the builder
  // (resets slot state, shuffle seed, commit verdict).
  const key = `${current.topic}|${current.words.join(" ")}`;

  // Role-colored reveal segments come from the first example of an
  // anchor's `learn` block. Pack-themed drills (no `learn`) fall back
  // to plain fg rendering via the builder's internal CorrectReveal.
  const revealSegments = current.learn?.examples?.[0]?.segments;

  return (
    <SentenceBuilderCard
      key={key}
      topic={current.topic}
      words={current.words}
      revealSegments={revealSegments}
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
