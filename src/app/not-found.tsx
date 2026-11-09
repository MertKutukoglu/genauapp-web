import type { Metadata } from "next";
import Link from "next/link";

/**
 * /not-found — Next's App Router default handler for any URL that
 * doesn't match a route. Kept small and on-brand: cherry 404 mark,
 * one line of apology, link home. No topnav/footer chrome; the root
 * layout wraps this automatically.
 */

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex flex-1 max-w-xl flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p
        aria-hidden
        className="font-display text-7xl font-semibold leading-none text-accent"
      >
        404
      </p>
      <h1 className="font-display text-3xl font-semibold text-fg">
        This page took a wrong turn.
      </h1>
      <p className="max-w-md text-fg-muted">
        It might have moved, or it may have never existed. Either way, the
        rest of GenauApp is one click away.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-sans text-[15px] font-semibold text-white transition hover:brightness-110"
        >
          Back to GenauApp
        </Link>
        <Link
          href="/blog/origins-of-genau"
          className="inline-flex items-center rounded-full border border-border-strong bg-transparent px-6 py-3 font-sans text-[15px] font-semibold text-fg transition hover:bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]"
        >
          Read our story
        </Link>
      </div>
    </section>
  );
}
