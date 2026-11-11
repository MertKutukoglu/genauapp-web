"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ModeToggle, type WordsMode } from "@/components/molecules/ModeToggle/ModeToggle";
import { NormalLearnCard } from "@/components/organisms/NormalLearnCard/NormalLearnCard";
import { AssemblyLearnCard } from "@/components/organisms/AssemblyLearnCard/AssemblyLearnCard";
import { LearnCompletion } from "@/components/organisms/LearnCompletion/LearnCompletion";
import {
  ExerciseArticlePicker,
  type ArticleOption,
} from "@/components/organisms/ExerciseArticlePicker/ExerciseArticlePicker";
import { ExerciseTranslationMC } from "@/components/organisms/ExerciseTranslationMC/ExerciseTranslationMC";
import { ExerciseTyping } from "@/components/organisms/ExerciseTyping/ExerciseTyping";
import { ExerciseCompletion } from "@/components/organisms/ExerciseCompletion/ExerciseCompletion";
import { pickLearnCardType, type LearnCardVariant } from "@/lib/words/pickLearnCardType";
import { computeSkillDeltas } from "@/lib/skills/map";
import { useSkillStore } from "@/stores/skillStore";
import { useChipStore, type ChipId } from "@/stores/chipStore";
import { localizeWord, type WordItem } from "@/content/words-a1";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { workoutCopy } from "@/lib/workout/strings";

/**
 * WordsChip — the right-card experience when the user picks the Words
 * chip. Owns:
 *   - mode (learn / exercise) via the ModeToggle at the top
 *   - the Learn deck's remaining-items state + Repeat/I-know mechanics
 *   - Learn-variant routing per card (normal / scrambled / chunkCompose)
 *     via pickLearnCardType, random per card per spec §3.1
 *   - routing between Learn card / Learn completion / Exercise stub
 *
 * Deck mechanics (spec §8):
 *   - I know  → head card removed; deck shrinks
 *   - Repeat  → head card removed + reinserted at a random later index
 *               (not back at position 0); deck size unchanged
 *   - Counter: `currentIndex = deckSize - remainingCount + 1`
 *     Repeat does NOT advance the counter; I-know does.
 *
 * The Learn variant is picked when the current card changes (via
 * remainingKey). Same word on Repeat gets a fresh pick, which keeps
 * the walk visually fresh. ChunkCompose only enters the pool when the
 * word's chunks have ≥ 2 elements; single-chunk words fall back to
 * [normal, scrambled].
 *
 * Exercise mode in this round is a placeholder — the Exercise cards
 * land in their own spec'd round.
 */

export interface WordsChipProps {
  /** The full Learn+Exercise deck (20 items for the A1 taste demo). */
  words: WordItem[];
  /** Initial mode when the chip mounts. Defaults to 'learn'. */
  initialMode?: WordsMode;
  className?: string;
}

export function WordsChip({
  words,
  initialMode = "learn",
  className,
}: WordsChipProps) {
  // Locale shapes the English-side copy: gloss, rule, sample
  // translation, hint, MC options, explanation. The German data
  // (word, article, sample.de, chunks, grammar tags) stays
  // locale-agnostic. Memoized on words + locale so Repeat/I-know
  // re-renders don't re-walk the deck.
  const { locale } = useLocale();
  const localizedWords = React.useMemo(
    () => words.map((w) => localizeWord(w, locale)),
    [words, locale],
  );

  const [mode, setMode] = React.useState<WordsMode>(initialMode);
  const [remaining, setRemaining] = React.useState<WordItem[]>(localizedWords);

  // Re-seed the deck whenever the input words array changes OR the
  // locale flips (TR ↔ EN re-materializes every string on the cards,
  // so the deck state must point at the freshly localized items).
  const wordsKey = React.useMemo(
    () => `${locale}:${localizedWords.map((w) => w.learn.word).join("|")}`,
    [localizedWords, locale],
  );
  React.useEffect(() => {
    // Intentional state-from-external-input sync: new deck or locale
    // flip → reseed with the freshly localized deck. Dep is wordsKey
    // (not words) so identity-only changes don't fire.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(localizedWords);
    // wordsKey = `${locale}:${content hash}`, which covers both axes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsKey]);

  const deckSize = localizedWords.length;
  const remainingCount = remaining.length;
  const currentIndex = deckSize - remainingCount + 1;
  const current = remaining[0];
  const learnCompleted = remainingCount === 0 && deckSize > 0;

  // Pick a Learn variant for the current card. Keyed on the card's
  // word so Repeat on the same card gets a fresh variant; different
  // deck entirely also triggers a fresh pick.
  const currentWord = current?.learn.word;
  const currentChunks = current?.chunks;
  const variant: LearnCardVariant = React.useMemo(() => {
    if (!currentChunks) return "normal";
    return pickLearnCardType({ chunks: currentChunks });
    // currentWord re-keys the variant when a new card advances.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord, currentChunks]);

  // Track total repeats across the session so the completion card
  // can show the stat. Repeats come from two sources: the Normal
  // card's Repeat button and incorrect Assembly attempts that route
  // through onRepeat via AnswerFeedback's Continue.
  const [repeatCount, setRepeatCount] = React.useState(0);

  const handleRepeat = React.useCallback(() => {
    setRemaining((r) => {
      if (r.length === 0) return r;
      if (r.length === 1) return r;
      const [head, ...rest] = r;
      const idx = 1 + Math.floor(Math.random() * rest.length);
      return [...rest.slice(0, idx), head, ...rest.slice(idx)];
    });
    setRepeatCount((c) => c + 1);
    try {
      window.__track?.("demo_learn_repeat", { chip: "words" });
    } catch {
      /* no-op */
    }
  }, []);

  const handleIKnow = React.useCallback(() => {
    setRemaining((r) => r.slice(1));
    try {
      window.__track?.("demo_learn_iknow", { chip: "words" });
    } catch {
      /* no-op */
    }
  }, []);

  const handleStartOver = React.useCallback(() => {
    setRemaining(localizedWords);
    setRepeatCount(0);
    setMode("learn");
    try {
      window.__track?.("demo_learn_restart", { chip: "words" });
    } catch {
      /* no-op */
    }
  }, [localizedWords]);

  return (
    <div className={clsx("flex flex-col gap-4 min-h-0", className)}>
      <ModeToggle mode={mode} onChange={setMode} />

      {/* The active card wrapper. `lg:flex-1` lets the card grow to
          match the LeftCard's row height on desktop when its content is
          shorter; `flex` + `*:flex-1` passes the stretch down so the
          inner surface-card actually fills. */}
      <div className="lg:flex-1 lg:flex lg:flex-col [&>*]:lg:flex-1">
        {mode === "learn" ? (
          learnCompleted ? (
            <LearnCompletion
              onStartOver={handleStartOver}
              onSwitchToExercise={() => setMode("exercise")}
            />
          ) : current ? (
            <LearnCardSwitch
              key={current.learn.word}
              variant={variant}
              word={current}
              current={currentIndex}
              total={deckSize}
              onRepeat={handleRepeat}
              onIKnow={handleIKnow}
            />
          ) : (
            <EmptyDeck />
          )
        ) : (
          <ExerciseDeck words={localizedWords} />
        )}
      </div>
    </div>
  );
}

interface LearnCardSwitchProps {
  variant: LearnCardVariant;
  word: WordItem;
  current: number;
  total: number;
  onRepeat?: () => void;
  onIKnow?: () => void;
}

function LearnCardSwitch({
  variant,
  word,
  current,
  total,
  onRepeat,
  onIKnow,
}: LearnCardSwitchProps) {
  if (variant === "normal") {
    // Verbs carry case info in grammarTags (akkusativ / dativ) so the
    // extra RuleCard underneath repeats information the pills already
    // show. Hide the rule for verbs; keep it for nouns + other
    // kinds where the rule carries article / plural info the pills
    // can't.
    const isVerb = word.learn.wordKind === "verb";
    return (
      <NormalLearnCard
        topic={word.topic}
        german={word.learn.word}
        english={word.learn.english}
        article={word.learn.article}
        grammarTags={word.grammarTags}
        example={word.learn.sample.de}
        exampleTranslation={word.learn.sample.en}
        rule={isVerb ? undefined : word.learn.rule}
        current={current}
        total={total}
        onRepeat={onRepeat}
        onIKnow={onIKnow}
      />
    );
  }

  // Assembly variants: no sample / rule / Repeat per Mert's iOS reference.
  // Correct → onIKnow (card leaves the deck via the auto-advance).
  // Incorrect → onRepeat (Continue sends the card back into the deck
  // at a random later index, matching the Normal card's Repeat).
  return (
    <AssemblyLearnCard
      mode={variant === "scrambled" ? "scrambled" : "chunkCompose"}
      topic={word.topic}
      word={word.learn.word}
      english={word.learn.english}
      article={word.learn.article}
      chunks={word.chunks}
      current={current}
      total={total}
      onIKnow={onIKnow}
      onRepeat={onRepeat}
    />
  );
}

function EmptyDeck() {
  return (
    <div className="bg-surface-card rounded-3xl p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <p className="font-sans text-fg-muted m-0">No words in this deck yet.</p>
    </div>
  );
}

/**
 * ExerciseDeck — owns the Exercise-mode deck state and routes each
 * current word to the variant its `exerciseType` asks for.
 *
 * Deck mechanic matches Learn (per Mert):
 *   - Correct → head card leaves the deck, counter advances
 *   - Incorrect → head card reinserted at a random later index
 *     (deck size unchanged, counter does NOT advance)
 *
 * We also tally first-try correct + incorrect separately for the
 * ExerciseCompletion summary. "First-try correct" means the word was
 * answered correctly on its first appearance; a word that came back
 * after a miss and got the right answer the second time still counts
 * toward incorrect (the original miss) only — the second attempt is
 * not re-tallied, so the two counts always sum to `words.length`.
 */
interface ExerciseDeckProps {
  words: WordItem[];
}

function ExerciseDeck({ words }: ExerciseDeckProps) {
  const [remaining, setRemaining] = React.useState<WordItem[]>(words);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [incorrectCount, setIncorrectCount] = React.useState(0);
  /** Set of word keys that have been missed at least once. */
  const missedSetRef = React.useRef<Set<string>>(new Set());

  // Re-seed when the words input content changes.
  const wordsKey = React.useMemo(
    () => words.map((w) => w.learn.word).join("|"),
    [words],
  );
  React.useEffect(() => {
    // Reset on deck content change — new words array → fresh run.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(words);
    setCorrectCount(0);
    setIncorrectCount(0);
    missedSetRef.current = new Set();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsKey]);

  const deckSize = words.length;
  const remainingCount = remaining.length;
  const currentIndex = deckSize - remainingCount + 1;
  const current = remaining[0];
  const done = remainingCount === 0 && deckSize > 0;

  const handleNext = React.useCallback(
    ({ correct }: { correct: boolean }) => {
      if (!current) return;
      const key = current.learn.word;
      if (correct) {
        // First-try scoring: only count toward `correct` if this word
        // hasn't been missed before.
        if (!missedSetRef.current.has(key)) {
          setCorrectCount((c) => c + 1);
        } else {
          // Already in the miss tally from its first appearance; the
          // retry success doesn't double-count.
        }
        setRemaining((r) => r.slice(1));
        try {
          window.__track?.("demo_exercise_correct", {
            chip: "words",
            type: current.exerciseType,
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
            chip: "words",
            type: current.exerciseType,
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

  // Pick the next workout to suggest on the completion CTA. We walk
  // the fixed chip order (words → grammar → sentence → reading),
  // starting right after the current chip and skipping any that are
  // already done. When every other chip is done the CTA is omitted
  // and the user falls back to the LeftCard picker.
  const nextWorkout = React.useMemo(() => {
    const chipOrder: Array<{ id: ChipId; label: string }> = [
      { id: "words", label: "Words" },
      { id: "grammar", label: "Grammar" },
      { id: "sentence", label: "Sentence" },
      { id: "reading", label: "Reading" },
    ];
    const currentIdx = chipOrder.findIndex((c) => c.id === "words");
    for (let i = 1; i <= chipOrder.length - 1; i++) {
      const candidate = chipOrder[(currentIdx + i) % chipOrder.length];
      if (chipProgress[candidate.id] !== "done") return candidate;
    }
    return null;
  }, [chipProgress]);

  // Compute deltas once, the moment the deck empties. We stash them
  // in local state so the ExerciseCompletion screen always shows the
  // same numbers that got staged — recomputing on each render could
  // drift if the deck is reset mid-session.
  const [sessionDeltas, setSessionDeltas] = React.useState<ReturnType<
    typeof computeSkillDeltas
  > | null>(null);
  const deltasStagedRef = React.useRef(false);

  React.useEffect(() => {
    if (!done) {
      // Reset the staging gate on any re-entry to the deck.
      deltasStagedRef.current = false;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSessionDeltas(null);
      return;
    }
    if (deltasStagedRef.current) return;
    deltasStagedRef.current = true;

    const d = computeSkillDeltas({
      chip: "words",
      correct: correctCount,
      total: deckSize,
    });
    setSessionDeltas(d);
    stageSkillDeltas(d);
    // Running first-try stats for the demo-complete summary screen.
    // Idempotent for a single completion thanks to deltasStagedRef.
    addStats({ correct: correctCount, total: deckSize });
    // Mark the Words chip done so the LeftCard's WorkoutCounter
    // ticks up and the chip visual flips to its done state.
    // Idempotent in the store — re-runs are safe.
    completeChip("words");

    try {
      window.__track?.("demo_exercise_finish", {
        chip: "words",
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
        chip="words"
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

  if (!current) return <EmptyDeck />;

  // Variant router. Key by word so each advance remounts the variant
  // (clears local state like text input / picked option).
  const key = current.learn.word;

  if (current.exerciseType === "articlePicker") {
    const article = current.learn.article;
    // Guard: articlePicker only makes sense with an article-bearing noun.
    if (!article) return <EmptyDeck />;
    return (
      <ExerciseArticlePicker
        key={key}
        noun={current.noun ?? current.learn.word}
        english={current.hint ?? current.learn.english}
        correctArticle={article as ArticleOption}
        explanation={current.explanation}
        current={currentIndex}
        total={deckSize}
        onNext={handleNext}
      />
    );
  }

  if (current.exerciseType === "translationMC") {
    if (
      !current.options ||
      current.options.length === 0 ||
      typeof current.correctIndex !== "number"
    ) {
      return <EmptyDeck />;
    }
    return (
      <ExerciseTranslationMC
        key={key}
        prompt={current.prompt}
        speakText={current.learn.word}
        options={current.options}
        correctIndex={current.correctIndex}
        explanation={current.explanation}
        current={currentIndex}
        total={deckSize}
        onNext={handleNext}
      />
    );
  }

  // typing
  if (!current.answer) return <EmptyDeck />;
  return (
    <ExerciseTyping
      key={key}
      prompt={current.prompt}
      answer={current.answer}
      speakText={current.learn.word}
      explanation={current.explanation}
      current={currentIndex}
      total={deckSize}
      onNext={handleNext}
    />
  );
}
