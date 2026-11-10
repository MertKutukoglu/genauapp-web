"use client";

import * as React from "react";
import { WorkoutSummaryCard } from "@/components/organisms/WorkoutSummaryCard/WorkoutSummaryCard";
import { WorkoutFeedbackCard } from "@/components/organisms/WorkoutFeedbackCard/WorkoutFeedbackCard";
import { WorkoutDoneCard } from "@/components/organisms/WorkoutDoneCard/WorkoutDoneCard";
import { useChipStore } from "@/stores/chipStore";

/**
 * WorkoutCompleteFlow — the three-view state machine shown after
 * the user finishes all 4 chip sessions and taps the summary CTA.
 *
 *   summary → (submit) → done
 *   summary → (dismiss) → feedback → (send | skip) → close
 *
 * The flow owns its view state locally; closing the Feedback card
 * flips `chipStore.showSummary` back to false and the right card
 * returns to the normal chip view (ExerciseCompletion for whichever
 * chip the user had open). Stats come from `chipStore.workoutStats`
 * which the four ExerciseDecks push their correct+total into.
 */

export interface WorkoutCompleteFlowProps {
  className?: string;
}

type View = "summary" | "feedback" | "done";

export function WorkoutCompleteFlow({ className }: WorkoutCompleteFlowProps) {
  const [view, setView] = React.useState<View>("summary");
  const stats = useChipStore((s) => s.workoutStats);
  const closeSummary = useChipStore((s) => s.closeSummary);

  if (view === "done") {
    return <WorkoutDoneCard className={className} />;
  }
  if (view === "feedback") {
    return (
      <WorkoutFeedbackCard
        className={className}
        onDone={() => {
          // Close the overlay entirely — the user is done.
          closeSummary();
        }}
      />
    );
  }
  return (
    <WorkoutSummaryCard
      className={className}
      correct={stats.correct}
      total={stats.total}
      onSuccess={() => setView("done")}
      onDismiss={() => setView("feedback")}
    />
  );
}
