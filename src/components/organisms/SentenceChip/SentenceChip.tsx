"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { ModeToggle, type WordsMode } from "@/components/molecules/ModeToggle/ModeToggle";
import { LearnCompletion } from "@/components/organisms/LearnCompletion/LearnCompletion";
import { SentenceFormulaCard } from "@/components/organisms/SentenceFormulaCard/SentenceFormulaCard";
import { useLocale } from "@/lib/i18n/LocaleContext";
import {
  localizeSentence,
  sentenceLearnAnchors,
  type SentenceQuestion,
} from "@/content/sentence-a1";

/**
 * SentenceChip — the right-card experience for the Sentence chip.
 * Sibling of WordsChip + GrammarChip, same shell (mode toggle,
 * Learn deck with Repeat / I-know, Exercise deck).
 *
 * v1 ships Learn only (the 6 formula anchors). Exercise mode flips
 * to a placeholder inviting the user back to Learn until the
 * word-chip sentence builder lands in the follow-up pass — same
 * pattern Grammar followed.
 *
 * Deck mechanics mirror Words / Grammar Learn: Repeat reinserts the
 * head card at a random later index; I know removes it and advances.
 * Counter math is `deckSize - remaining.length + 1`.
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
          <ExerciseStub />
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

function EmptyDeck({ label }: { label: string }) {
  return (
    <div className="bg-surface-card rounded-3xl p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <p className="font-sans text-fg-muted m-0">{label}</p>
    </div>
  );
}

/**
 * ExerciseStub — v1 placeholder for Exercise mode. The real
 * word-chip sentence builder lands in the next pass.
 */
function ExerciseStub() {
  const { locale } = useLocale();
  const title = locale === "tr" ? "Egzersiz yakında" : "Exercise coming next";
  const body =
    locale === "tr"
      ? "Cümle egzersizleri sıradaki adımda geliyor. Şimdilik Öğren tarafında formülleri gezebilirsin."
      : "Sentence drills land in the next pass. For now, walk the formulas in Learn.";
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
