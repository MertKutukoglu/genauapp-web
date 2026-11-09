import { Button } from "@/components/atoms/Button/Button";

/**
 * Landing placeholder — Phase 2 scope ships the topnav + footer via
 * layout.tsx. The real hero / skill rings / scene pager land in Phase 3.
 */
export default function LandingPage() {
  return (
    <section className="mx-auto flex flex-1 max-w-2xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
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
      <Button tone="primary" size="lg">
        Try it in your browser →
      </Button>
      <p className="mt-10 text-xs text-fg-faint">
        Phase 2 shipped. Phase 3 lands the real hero + scene pager.
      </p>
    </section>
  );
}
