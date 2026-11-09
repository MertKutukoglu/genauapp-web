import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * A single visual page that prints every semantic token the design system
 * exposes. This is the reference surface for "does my work match the
 * system?" — if you reach for a hex, find the matching token here first.
 */

const meta: Meta = {
  title: "Foundations/Design tokens",
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "desktop" },
  },
};
export default meta;

type Row = { name: string; cssVar: string };

const warmPrimitives: Row[] = [
  "--color-warm-50",
  "--color-warm-100",
  "--color-warm-200",
  "--color-warm-300",
  "--color-warm-500",
  "--color-warm-600",
  "--color-warm-800",
  "--color-warm-900",
  "--color-warmdk-50",
  "--color-warmdk-300",
  "--color-warmdk-500",
  "--color-warmdk-700",
  "--color-warmdk-800",
  "--color-warmdk-900",
].map((v) => ({ name: v.replace("--color-", ""), cssVar: v }));

const brand: Row[] = [
  "--color-rose-300",
  "--color-rose-400",
  "--color-rose-500",
  "--color-rose-600",
  "--color-green-500",
  "--color-green-600",
].map((v) => ({ name: v.replace("--color-", ""), cssVar: v }));

const skills: Row[] = [
  "--color-skill-vocab",
  "--color-skill-grammar",
  "--color-skill-reading",
  "--color-skill-writing",
  "--color-skill-listening",
].map((v) => ({ name: v.replace("--color-skill-", ""), cssVar: v }));

const semantics: Row[] = [
  "--bg",
  "--fg",
  "--fg-muted",
  "--fg-faint",
  "--surface-card",
  "--surface-sunk",
  "--accent",
  "--accent-ink",
  "--border",
  "--border-strong",
  "--ok",
  "--article-der",
  "--article-die",
  "--article-das",
  "--chip-words-color",
  "--chip-grammar-color",
  "--chip-sentence-color",
  "--chip-reading-color",
].map((v) => ({ name: v.replace("--", ""), cssVar: v }));

function Swatch({ row }: { row: Row }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-card p-3">
      <div
        className="h-10 w-10 rounded-md border border-border-strong"
        style={{ background: `var(${row.cssVar})` }}
      />
      <div className="flex flex-col">
        <code className="text-xs text-fg">{row.cssVar}</code>
        <span className="text-[11px] text-fg-muted">{row.name}</span>
      </div>
    </div>
  );
}

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-display text-xl font-semibold text-fg">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rows.map((r) => (
          <Swatch key={r.cssVar} row={r} />
        ))}
      </div>
    </section>
  );
}

export const Palette: StoryObj = {
  render: () => (
    <div className="p-6">
      <h1 className="mb-1 font-display text-3xl font-semibold text-fg">
        Design tokens
      </h1>
      <p className="mb-8 text-fg-muted">
        Every color a component uses is one of these. Primitives never change;
        semantics swap under <code>data-theme=&quot;dark&quot;</code>.
      </p>
      <Section title="Semantics (theme-aware)" rows={semantics} />
      <Section title="Brand &amp; status" rows={brand} />
      <Section title="Skills" rows={skills} />
      <Section title="Warm neutrals (primitives)" rows={warmPrimitives} />
    </div>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <div className="p-6 space-y-6">
      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-fg-faint">
          Display · Fraunces
        </p>
        <p className="font-display text-5xl font-semibold text-fg">
          Refresh your German
        </p>
        <p className="font-display text-3xl font-medium text-fg">
          Workout headings
        </p>
      </div>
      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-fg-faint">
          Body · Open Sans
        </p>
        <p className="text-lg text-fg">
          Body large — hero subheads and primary paragraph copy.
        </p>
        <p className="text-base text-fg">
          Body — the default reading size.
        </p>
        <p className="text-sm text-fg-muted">
          Body small — captions, helper text.
        </p>
      </div>
    </div>
  ),
};

export const RadiiAndSpacing: StoryObj = {
  render: () => (
    <div className="p-6 space-y-6">
      <section>
        <h2 className="mb-3 font-display text-xl font-semibold text-fg">
          Radii
        </h2>
        <div className="flex flex-wrap gap-4">
          {["xs", "sm", "md", "lg", "xl", "2xl", "full"].map((r) => (
            <div key={r} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 bg-accent"
                style={{ borderRadius: `var(--radius-${r})` }}
              />
              <code className="text-xs text-fg-muted">{r}</code>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 font-display text-xl font-semibold text-fg">
          Spacing scale (Tailwind)
        </h2>
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <code className="w-8 text-xs text-fg-muted">{s}</code>
              <div className="h-2 bg-accent" style={{ width: `${s * 4}px` }} />
              <span className="text-xs text-fg-faint">{s * 4}px</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
