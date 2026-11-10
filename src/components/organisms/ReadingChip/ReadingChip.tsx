"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ModeToggle, type WordsMode } from "@/components/molecules/ModeToggle/ModeToggle";
import { ReadingPassageCard } from "@/components/organisms/ReadingPassageCard/ReadingPassageCard";
import { ReadingExerciseMC } from "@/components/organisms/ReadingExerciseMC/ReadingExerciseMC";
import { ExerciseCompletion } from "@/components/organisms/ExerciseCompletion/ExerciseCompletion";
import { computeSkillDeltas } from "@/lib/skills/map";
import { useSkillStore } from "@/stores/skillStore";
import { useChipStore, type ChipId } from "@/stores/chipStore";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { localizeReading, type ReadingContent } from "@/content/reading-a1";

/**
 * ReadingChip — the Reading chip's right-card experience. Different
 * from the other three chips in two ways:
 *
 *   1. The mode toggle reads "Read / Exercise" (via `labels`) rather
 *      than "Learn / Exercise". Reading is the only chip where the
 *      left tab isn't a learn mode.
 *   2. The Read mode shows the full passage (title + subtitle + prose
 *      + CTA). There's no deck to walk; one passage, one CTA, one
 *      exit to Exercise.
 *
 * Mode-switch rule (brief §5):
 *   - Read → Exercise resets qIdx to 0
 *   - Exercise → Read PRESERVES qIdx so mid-quiz re-reads come back
 *     to the same question
 *
 * Completion: reading primary + vocab + grammar fed (per the
 * CHIP_SKILL_MAP), staged to the skill store, chip marked done,
 * ExerciseCompletion carries a "Continue with X" CTA — in practice
 * there's no next chip after Reading in the canonical order, so the
 * CTA falls back to null and the user lands on the LeftCard picker.
 */

export interface ReadingChipProps {
  content: ReadingContent;
  initialMode?: WordsMode;
  className?: string;
}

export function ReadingChip({
  content,
  initialMode = "learn",
  className,
}: ReadingChipProps) {
  const { locale } = useLocale();

  const localized = React.useMemo(
    () => localizeReading(content, locale),
    [content, locale],
  );

  const [mode, setMode] = React.useState<WordsMode>(initialMode);
  const [qIdx, setQIdx] = React.useState(0);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [incorrectCount, setIncorrectCount] = React.useState(0);
  // First-try scoring: a question wrong once stays counted as wrong
  // even if a retry gets it right later.
  const missedSetRef = React.useRef<Set<number>>(new Set());

  // Reset the Exercise side when the content itself changes (level
  // swap in the future).
  const contentKey = localized.title;
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQIdx(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    missedSetRef.current = new Set();
  }, [contentKey]);

  const labels = React.useMemo(
    () =>
      ({ learn: locale === "tr" ? "Oku" : "Read" }) satisfies Partial<
        Record<WordsMode, string>
      >,
    [locale],
  );

  // Switching from Read → Exercise resets qIdx. Exercise → Read
  // preserves it. The other chips reset on every toggle; Reading
  // diverges because Read mode has no deck to restart.
  const handleModeChange = React.useCallback(
    (next: WordsMode) => {
      if (next === mode) return;
      if (mode === "learn" && next === "exercise") {
        // User just finished reading and tapped Exercise — start fresh.
        setQIdx(0);
        setCorrectCount(0);
        setIncorrectCount(0);
        missedSetRef.current = new Set();
      }
      setMode(next);
    },
    [mode],
  );

  const total = localized.questions.length;
  const current = localized.questions[qIdx];
  const done = qIdx >= total && total > 0;

  const handleNext = React.useCallback(
    ({ correct, qType }: { correct: boolean; qType?: string }) => {
      if (!current) return;
      const key = qIdx;
      try {
        window.__track?.("demo_question_answered", {
          chip: "reading",
          qType,
          correct,
        });
      } catch {
        /* no-op */
      }
      if (correct) {
        if (!missedSetRef.current.has(key)) {
          setCorrectCount((c) => c + 1);
        }
      } else {
        if (!missedSetRef.current.has(key)) {
          missedSetRef.current.add(key);
          setIncorrectCount((c) => c + 1);
        }
      }
      setQIdx((i) => i + 1);
    },
    [current, qIdx],
  );

  const stageSkillDeltas = useSkillStore((s) => s.stageDeltas);
  const completeChip = useChipStore((s) => s.completeChip);
  const chipProgress = useChipStore((s) => s.progress);
  const openChip = useChipStore((s) => s.openChip);

  // Fixed chip order; Reading is last so the "Continue with X" CTA
  // picks the first non-done chip earlier in the cycle, falling back
  // to null when nothing's left.
  const nextWorkout = React.useMemo(() => {
    const chipOrder: Array<{ id: ChipId; label: string }> = [
      { id: "words", label: "Words" },
      { id: "grammar", label: "Grammar" },
      { id: "sentence", label: "Sentence" },
      { id: "reading", label: "Reading" },
    ];
    const currentIdx = chipOrder.findIndex((c) => c.id === "reading");
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
      chip: "reading",
      correct: correctCount,
      total,
    });
    setSessionDeltas(d);
    stageSkillDeltas(d);
    completeChip("reading");
    try {
      window.__track?.("demo_exercise_finish", {
        chip: "reading",
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
  }, [done, correctCount, incorrectCount, total, stageSkillDeltas, completeChip]);

  return (
    <div className={clsx("flex flex-col gap-4 min-h-0", className)}>
      <ModeToggle mode={mode} onChange={handleModeChange} labels={labels} />

      <div className="lg:flex-1 lg:flex lg:flex-col [&>*]:lg:flex-1">
        {mode === "learn" ? (
          <ReadingPassageCard
            title={localized.title}
            subtitle={localized.subtitle}
            passage={localized.passage}
            onStartExercise={() => handleModeChange("exercise")}
          />
        ) : done ? (
          <ExerciseCompletion
            chip="reading"
            correct={correctCount}
            total={total}
            deltas={sessionDeltas ?? {}}
            nextWorkout={
              nextWorkout
                ? {
                    label: nextWorkout.label,
                    onContinue: () => openChip(nextWorkout.id),
                  }
                : undefined
            }
          />
        ) : current ? (
          <ReadingExerciseMC
            key={qIdx}
            topic={current.topic}
            prompt={current.prompt}
            options={current.options}
            correctIndex={current.correctIndex}
            explanation={current.explanation}
            qType={current.qType}
            current={qIdx + 1}
            total={total}
            onNext={handleNext}
          />
        ) : (
          <EmptyDeck label="No exercises in this deck." />
        )}
      </div>
    </div>
  );
}

function EmptyDeck({ label }: { label: string }) {
  return (
    <div className="bg-surface-card rounded-3xl p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <p className="font-sans text-fg-muted m-0">{label}</p>
    </div>
  );
}
