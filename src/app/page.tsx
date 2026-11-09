/**
 * Landing placeholder — Phase 1 scaffold only.
 * Real hero / skill rings / pack cards land in Phase 3.
 */
export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="font-display text-sm uppercase tracking-[0.2em] text-fg-faint">
        GenauApp
      </p>
      <h1 className="font-display text-5xl font-semibold text-fg sm:text-6xl">
        Refresh your German,
        <br />
        <span className="text-accent">without starting over.</span>
      </h1>
      <p className="max-w-lg text-pretty text-lg text-fg-muted">
        A 5-minute browser taste of the iOS app that lives at your pace. Ships
        Q1 2027.
      </p>
      <a
        href="/try"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-md transition hover:-translate-y-px hover:shadow-lg"
      >
        Try it in your browser
        <span aria-hidden>→</span>
      </a>
      <p className="mt-10 text-xs text-fg-faint">
        Phase 1 scaffold. Full landing lands in Phase 3.
      </p>
    </main>
  );
}
