import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * Slide 2 — Practice: nine snippet components.
 *
 * Verbatim port of the production markup per
 * claude/GenauApp_Web_Landing_Slide2_Practice.md §1. Each snippet is a
 * small app-faithful mini-UI for the word "gehen" shown in a different
 * practice surface. One active at a time; cross-fade handled by the
 * parent via opacity + no layout shift.
 *
 * Caption color follows the surface's skill:
 *   Words        → vocab (pink)
 *   Reading      → reading (blue)
 *   Grammar      → grammar (purple)
 *   Story        → story (amber)
 *   Scrambled    → vocab (pink)
 *   Sentence B.  → sentence-green (writing)
 *   Word Details → vocab (pink)
 *   Pronunciation→ pronunciation (red)
 */

export type SnippetColor =
  | "vocab"
  | "reading"
  | "grammar"
  | "story"
  | "sentence"
  | "pronunciation";

const colorVar: Record<SnippetColor, string> = {
  vocab:         "var(--color-skill-vocab)",
  reading:       "var(--color-skill-reading)",
  grammar:       "var(--color-skill-grammar)",
  story:         "#F59E0B",
  sentence:      "#10B981",
  pronunciation: "#EF4444",
};

export function SnipCaption({
  children,
  color,
}: {
  children: React.ReactNode;
  color: SnippetColor;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
      style={{
        color: colorVar[color],
        background: `color-mix(in oklab, ${colorVar[color]} 14%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

// Shared card chrome used by most snippets.
const cardCls =
  "flex w-[min(360px,92%)] flex-col gap-3 rounded-[22px] border border-border bg-surface-card px-5 py-5 shadow-[0_16px_40px_-22px_rgba(26,19,18,0.22)]";

/* ============================================================================
 * Snippet 1 — Words translation MC
 * ========================================================================== */
export function WordsSnippet() {
  const opts = ["to drive", "to go", "to stay", "to run"];
  return (
    <div className={clsx(cardCls, "items-center")}>
      <div className="font-display text-[36px] font-medium leading-none tracking-[-0.015em] text-fg">
        gehen
      </div>
      <div className="text-[12px] font-semibold uppercase tracking-[0.04em] text-fg-faint">
        pick the English
      </div>
      <div className="mt-1.5 grid w-full grid-cols-2 gap-2">
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            className={clsx(
              "rounded-[14px] border-[1.5px] px-3 py-2.5 text-sm font-semibold transition",
              o === "to go"
                ? "border-accent text-accent bg-[color:color-mix(in_srgb,var(--accent)_10%,transparent)]"
                : "border-border-strong text-fg",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * Snippet 2 — Reading passage
 * ========================================================================== */
export function ReadingSnippet() {
  return (
    <div className={cardCls}>
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-fg-faint">
        Mein Wochenende · A1
      </span>
      <p className="m-0 font-display text-[18px] font-medium leading-[1.4] text-fg">
        Am Samstag <Mark>gehen</Mark> wir ins Kino. Danach <Mark>gehen</Mark> wir
        in ein kleines Café um die Ecke.
      </p>
    </div>
  );
}

function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark
      className="rounded-[4px] px-[3px] italic"
      style={{
        background: "color-mix(in srgb, var(--accent) 18%, transparent)",
        color: "var(--accent-ink)",
      }}
    >
      {children}
    </mark>
  );
}

/* ============================================================================
 * Snippet 3 — Grammar fill-blank (Präsens du-form)
 * ========================================================================== */
export function GrammarPresentSnippet() {
  return <GrammarFillSnippet eyebrow="Präsens · du-form" answer="gehst" prompt={PromptDu} options={["geht", "gehst", "gehen", "ging"]} />;
}
function PromptDu({ blank }: { blank: React.ReactNode }) {
  return (
    <>
      Du {blank} heute zur Schule.
    </>
  );
}

/* ============================================================================
 * Snippet 7 — Grammar fill-blank (Perfekt)
 * ========================================================================== */
export function GrammarPerfektSnippet() {
  return (
    <GrammarFillSnippet
      eyebrow="Perfekt · past tense"
      answer="gegangen"
      prompt={PromptPerfekt}
      options={["geht", "ging", "gegangen", "gehen"]}
    />
  );
}
function PromptPerfekt({ blank }: { blank: React.ReactNode }) {
  return (
    <>
      Gestern bin ich zur Arbeit {blank}.
    </>
  );
}

function GrammarFillSnippet({
  eyebrow,
  prompt: Prompt,
  answer,
  options,
}: {
  eyebrow: string;
  prompt: (p: { blank: React.ReactNode }) => React.ReactNode;
  answer: string;
  options: string[];
}) {
  const blank = (
    <span
      className="mx-0.5 inline-block rounded-[7px] px-2 py-[1px] italic"
      style={{
        background: "color-mix(in srgb, var(--accent) 14%, transparent)",
        color: "var(--accent-ink)",
      }}
    >
      {answer}
    </span>
  );
  return (
    <div className={clsx(cardCls, "max-w-[380px]")}>
      <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-fg-faint">
        {eyebrow}
      </span>
      <p className="m-0 font-display text-[20px] font-medium leading-[1.3] tracking-[-0.01em] text-fg">
        <Prompt blank={blank} />
      </p>
      <div className="mt-1 grid grid-cols-4 gap-[7px]">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={clsx(
              "rounded-[11px] border-[1.5px] px-1.5 py-2 text-[13px] font-semibold",
              o === answer
                ? "border-accent bg-[color:color-mix(in_srgb,var(--accent)_10%,transparent)] text-accent"
                : "border-border-strong text-fg",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * Snippet 4 — Story chat
 * ========================================================================== */
export function StorySnippet() {
  return (
    <div className="flex w-[min(360px,92%)] flex-col gap-2.5">
      <Row side="them" avatar="👩‍🦰">
        Wo <strong>gehst</strong> du heute?
      </Row>
      <Row side="you">
        Ich <strong>gehe</strong> zur Arbeit.
      </Row>
    </div>
  );
}

function Row({
  side,
  avatar,
  children,
}: {
  side: "them" | "you";
  avatar?: string;
  children: React.ReactNode;
}) {
  const isMine = side === "you";
  return (
    <div
      className={clsx(
        "flex items-end gap-2",
        isMine ? "justify-end" : "justify-start",
      )}
    >
      {!isMine && avatar ? (
        <span
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-full text-[18px]"
          style={{
            background: "color-mix(in srgb, var(--accent) 20%, var(--surface-card))",
          }}
        >
          {avatar}
        </span>
      ) : null}
      <span
        className={clsx(
          "max-w-[76%] px-3.5 py-2.5 text-[15px] leading-[1.35] shadow-[0_10px_24px_-18px_rgba(26,19,18,0.2)]",
          isMine
            ? "rounded-[18px_18px_4px_18px] bg-accent text-white"
            : "rounded-[18px_18px_18px_4px] border border-border bg-surface-card text-fg",
        )}
      >
        {children}
      </span>
    </div>
  );
}

/* ============================================================================
 * Snippet 5 — Scrambled letters
 * ========================================================================== */
export function ScrambledSnippet() {
  const slots = ["G", "E", "H", "S", ""];
  const tray: Array<{ letter: string; used: boolean }> = [
    { letter: "H", used: true },
    { letter: "T", used: false },
    { letter: "S", used: true },
    { letter: "E", used: true },
    { letter: "G", used: true },
  ];
  return (
    <div className={clsx(cardCls, "items-center")}>
      <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-fg-faint">
        Spell · du-form of &quot;to go&quot;
      </span>
      <div className="flex gap-2">
        {slots.map((s, i) => (
          <span
            key={i}
            className={clsx(
              "grid h-[46px] w-[42px] place-items-center rounded-[12px] font-sans text-[18px] font-bold",
              s
                ? "border-[1.5px] border-accent bg-[color:color-mix(in_srgb,var(--accent)_10%,transparent)] text-accent"
                : "border-[1.5px] border-dashed border-fg-muted/30 text-fg-muted",
            )}
          >
            {s || " "}
          </span>
        ))}
      </div>
      <div
        className="flex gap-2 rounded-[14px] px-2.5 py-2"
        style={{ background: "color-mix(in srgb, var(--fg) 4%, transparent)" }}
      >
        {tray.map((t, i) => (
          <span
            key={i}
            className={clsx(
              "grid h-10 w-9 place-items-center rounded-[10px] border-[1.5px] border-border-strong bg-surface-card font-sans text-base font-bold text-fg",
              t.used && "opacity-30",
            )}
          >
            {t.letter}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * Snippet 6 — Sentence Builder
 * ========================================================================== */
export function SentenceBuilderSnippet() {
  const tiles = [
    { label: "Ich", placed: true },
    { label: "gehe", placed: true },
    { label: "zur", placed: false },
    { label: "Arbeit", placed: false },
  ];
  return (
    <div className={clsx(cardCls, "items-center gap-4")}>
      <div className="font-display text-[20px] font-medium tracking-[-0.01em] text-fg">
        Ich gehe zur Arbeit.
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {tiles.map((t, i) => (
          <span
            key={i}
            className={clsx(
              "inline-flex items-center rounded-[12px] px-3.5 py-2.5 font-sans text-[15px] font-semibold",
              t.placed
                ? "border-[1.5px] border-accent bg-[color:color-mix(in_srgb,var(--accent)_10%,transparent)] text-accent"
                : "border-[1.5px] border-dashed border-fg-muted/25 text-fg",
            )}
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * Snippet 8 — Word Details anatomy
 * ========================================================================== */
export function WordDetailsSnippet() {
  const rows: Array<[string, React.ReactNode]> = [
    ["Auxiliary",  <>sein <span className="ml-1 text-[12.5px] font-medium text-fg-muted">(movement)</span></>],
    ["Präteritum", "ging"],
    ["Perfekt",    "ist gegangen"],
    ["Pattern",    "e → i → a"],
    ["Separable",  "no"],
  ];
  return (
    <div className={clsx(cardCls, "max-w-[380px] gap-3.5")}>
      <div className="flex flex-col gap-1 border-b border-border pb-2.5">
        <span className="font-display text-[28px] font-medium leading-none tracking-[-0.015em] text-fg">
          gehen
        </span>
        <span className="text-[12px] font-semibold tracking-[0.02em] text-fg-muted">
          verb · irregular (strong)
        </span>
      </div>
      <div className="flex flex-col gap-[7px]">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="grid grid-cols-[110px_1fr] gap-3.5 text-[13.5px] leading-[1.4]"
          >
            <span className="font-semibold tracking-[0.02em] text-fg-faint">{k}</span>
            <span className="font-semibold text-fg">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * Snippet 9 — Pronunciation
 * ========================================================================== */
export function PronunciationSnippet() {
  return (
    <div
      className={clsx(
        "flex w-[min(300px,92%)] flex-col items-center gap-2.5 rounded-[24px] border border-border bg-surface-card px-5 py-5 shadow-[0_16px_40px_-22px_rgba(26,19,18,0.22)]",
      )}
    >
      <button
        type="button"
        aria-label="Play"
        className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-[0_10px_24px_-14px_rgba(26,19,18,0.4)]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-[2px] h-[22px] w-[22px]">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="mt-0.5 font-display text-[28px] font-medium leading-none tracking-[-0.01em] text-fg">
        gehen
      </div>
      <div className="font-sans text-[13px] tracking-[0.02em] text-fg-muted">
        /ˈɡeːən/
      </div>
      <div
        aria-hidden
        className="mt-1 h-5 w-[60%] animate-pr-wave motion-reduce:animate-none"
        style={{
          background:
            "repeating-linear-gradient(to right, var(--accent) 0 3px, transparent 3px 7px)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 15%, #000 85%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, #000 15%, #000 85%, transparent 100%)",
          opacity: 0.75,
        }}
      />
    </div>
  );
}

/* ============================================================================
 * Snippet registry — cycled in order by the parent.
 * ========================================================================== */
export interface SnippetSpec {
  caption: string;
  color: SnippetColor;
  render: () => React.ReactNode;
}

export const SNIPPETS: SnippetSpec[] = [
  { caption: "In Words",            color: "vocab",         render: () => <WordsSnippet /> },
  { caption: "In Reading",          color: "reading",       render: () => <ReadingSnippet /> },
  { caption: "In Grammar",          color: "grammar",       render: () => <GrammarPresentSnippet /> },
  { caption: "In Story",            color: "story",         render: () => <StorySnippet /> },
  { caption: "In Scrambled",        color: "vocab",         render: () => <ScrambledSnippet /> },
  { caption: "In Sentence Builder", color: "sentence",      render: () => <SentenceBuilderSnippet /> },
  { caption: "In Grammar",          color: "grammar",       render: () => <GrammarPerfektSnippet /> },
  { caption: "In Word Details",     color: "vocab",         render: () => <WordDetailsSnippet /> },
  { caption: "In Pronunciation",    color: "pronunciation", render: () => <PronunciationSnippet /> },
];
