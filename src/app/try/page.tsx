import Link from "next/link";

/**
 * /try/ — the interactive taste demo.
 * Phase 1-2 placeholder. The real TasteApp (LevelPicker → WorkoutShell →
 * TasteSummary) lands in Phases 4-8.
 */
export default function TryPage() {
  return (
    <section className="mx-auto flex flex-1 max-w-2xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <h1 className="font-display text-4xl font-semibold text-fg">
        Taste demo coming here.
      </h1>
      <p className="text-fg-muted">
        Level picker, 4 workouts, skill rings, celebration — scaffold ready,
        implementation in Phase 4.
      </p>
      <Link href="/" className="text-accent underline underline-offset-4">
        ← Back home
      </Link>
    </section>
  );
}
