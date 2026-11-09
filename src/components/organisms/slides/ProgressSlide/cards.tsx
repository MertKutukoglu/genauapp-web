import * as React from "react";
import { clsx } from "@/lib/utils/clsx";

/**
 * Slide 3 — Your progress: four bottomsheet-section replicas.
 *
 * Verbatim port of `claude/GenauApp_Web_Landing_Slide3_Progress.md`.
 * Each card is a faithful mini-replica of a section from the app's
 * SkillDetailSheet.swift. Honest content: Grammar Topics shows one
 * ↑, one ↓, one → — the "things go down too" moment is intentional.
 */

const sectionCls =
  "flex w-[min(400px,94%)] flex-col gap-3.5 rounded-[22px] border border-border bg-surface-card px-4 pb-4 pt-[18px] shadow-[0_16px_40px_-22px_rgba(26,19,18,0.22)]";

function DpHead({ eyebrow, meta }: { eyebrow: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between px-1">
      <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-fg-muted">
        {eyebrow}
      </span>
      {meta ? (
        <span className="text-[10.5px] font-medium text-fg-faint">{meta}</span>
      ) : null}
    </div>
  );
}

/* ============================================================================
 * Card 1 — Vocabulary · Word Mastery grid
 * ========================================================================== */
export function WordMasteryCard() {
  const tiers = [
    { tone: "#10B981", label: "Strong",  count: 142, icon: CheckIcon },
    { tone: "#F59E0B", label: "Average", count: 38,  icon: InfoIcon },
    { tone: "#EF4444", label: "Weak",    count: 19,  icon: ReloadIcon },
  ];
  return (
    <div className={sectionCls}>
      <DpHead eyebrow="Word mastery" meta="199 total" />
      <div className="grid grid-cols-3 gap-2.5">
        {tiers.map(({ tone, label, count, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col gap-2 rounded-[16px] border border-border px-2.5 pb-2.5 pt-3"
            style={{
              background: `color-mix(in srgb, ${tone} 6%, var(--surface-card))`,
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="grid h-8 w-8 place-items-center rounded-[8px]"
                style={{
                  background: `color-mix(in srgb, ${tone} 18%, transparent)`,
                  color: tone,
                }}
              >
                <Icon />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold leading-[1.1] text-fg-muted">
                  {label}
                </span>
                <span className="text-[18px] font-bold leading-[1.1] text-fg">
                  {count}
                </span>
              </div>
            </div>
            <div
              className="text-[10.5px] font-bold tracking-[0.02em]"
              style={{ color: tone }}
            >
              View →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px]">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-[18px] w-[18px]">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 15h2v2h-2zm0-10h2v8h-2z" />
    </svg>
  );
}
function ReloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px]">
      <path d="M3 12a9 9 0 1 0 2.5-6.3M3 4v4h4" />
    </svg>
  );
}

/* ============================================================================
 * Card 2 — Vocabulary · Article Performance (der / die / das)
 * ========================================================================== */
export function ArticlePerformanceCard() {
  const articles = [
    { article: "der", tone: "#3B82F6", pct: "78%", ratio: "54 / 69" },
    { article: "die", tone: "#EC4899", pct: "65%", ratio: "42 / 65" },
    { article: "das", tone: "#10B981", pct: "54%", ratio: "29 / 54" },
  ];
  return (
    <div className={sectionCls}>
      <DpHead eyebrow="Article performance" meta="first-try" />
      <div className="grid grid-cols-3 gap-2.5">
        {articles.map(({ article, tone, pct, ratio }) => (
          <div
            key={article}
            className="flex min-h-[100px] flex-col items-center justify-center gap-0.5 rounded-[18px] px-2.5 pb-2.5 pt-3"
            style={{
              background: `color-mix(in srgb, ${tone} 10%, transparent)`,
              border: `1px solid color-mix(in srgb, ${tone} 25%, transparent)`,
            }}
          >
            <span className="font-sans text-base font-bold tracking-[-0.01em]" style={{ color: tone }}>
              {article}
            </span>
            <span className="font-sans text-[24px] font-bold leading-[1.1] tracking-[-0.02em] text-fg">
              {pct}
            </span>
            <span className="text-[11px] font-medium text-fg-muted">{ratio}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * Card 3 — Grammar · Topic list (mixed momentum)
 * ========================================================================== */
type Momentum = "up" | "down" | "flat";

export function GrammarTopicsCard() {
  const rows: Array<{
    mom: Momentum;
    name: string;
    level: string;
    tagline: string;
    statusLabel: string;
  }> = [
    { mom: "up",   name: "Modal verbs",         level: "A1", tagline: "wollen, können, müssen — the \"I want / can / must\" trio.", statusLabel: "In progress" },
    { mom: "down", name: "Dative prepositions", level: "A1", tagline: "mit, nach, bei, von, zu — always take dative.",               statusLabel: "Needs work" },
    { mom: "flat", name: "Separable verbs",     level: "A1", tagline: "aufstehen, einkaufen — the prefix flies to the end.",         statusLabel: "Learning" },
  ];
  return (
    <div className={sectionCls}>
      <DpHead eyebrow="Grammar topics" meta="3 practicing" />
      <div className="flex flex-col gap-2">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex flex-col gap-[5px] rounded-[14px] border border-border bg-bg px-3 pb-2.5 pt-[11px]"
          >
            <div className="flex items-center gap-2">
              <MomentumBadge mom={r.mom} />
              <span className="min-w-0 flex-1 truncate text-sm font-bold text-fg">
                {r.name}
              </span>
              <LevelPill level={r.level} />
            </div>
            <p className="text-[11.5px] leading-[1.35] text-fg-muted">{r.tagline}</p>
            <StatusDot mom={r.mom}>{r.statusLabel}</StatusDot>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * Card 4 — Grammar · single topic deep view (focus)
 * ========================================================================== */
export function GrammarFocusCard() {
  // Last 7 attempts per spec: 5 wrong, 2 right (positions matter).
  const bars: Array<"wrong" | "right"> = [
    "wrong", "right", "wrong", "wrong", "right", "wrong", "wrong",
  ];
  return (
    <div className={sectionCls}>
      <DpHead eyebrow="Topic in focus" meta="last 7 attempts" />
      <div className="flex flex-col gap-2 rounded-[16px] border border-border bg-bg px-3.5 py-3.5">
        <div className="flex items-center gap-2.5">
          <MomentumBadge mom="down" />
          <div className="flex flex-1 items-center gap-2">
            <span className="text-sm font-bold text-fg">Dative prepositions</span>
            <LevelPill level="A1" />
          </div>
        </div>
        <p className="text-[12.5px] leading-[1.4] text-fg-muted">
          mit, nach, bei, von, zu — always take dative.
        </p>
        <div aria-hidden className="mt-0.5 flex h-[18px] items-stretch gap-1">
          {bars.map((b, i) => (
            <span
              key={i}
              className="flex-1 rounded-[4px]"
              style={{
                background:
                  b === "right"
                    ? "color-mix(in srgb, #10B981 40%, transparent)"
                    : "color-mix(in srgb, #EF4444 40%, transparent)",
              }}
            />
          ))}
        </div>
        <div className="mt-0.5 flex items-center justify-between">
          <StatusDot mom="down">5 of last 7 missed</StatusDot>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------- */

function MomentumBadge({ mom }: { mom: Momentum }) {
  const styles =
    mom === "up"
      ? { bg: "color-mix(in srgb, #10B981 14%, transparent)", color: "#10B981" }
      : mom === "down"
        ? { bg: "color-mix(in srgb, #EF4444 14%, transparent)", color: "#EF4444" }
        : { bg: "color-mix(in srgb, var(--fg) 10%, transparent)", color: "var(--fg-muted)" };
  return (
    <span
      className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
      style={{ background: styles.bg, color: styles.color }}
      aria-hidden
    >
      {mom === "up" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[11px] w-[11px]">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      ) : mom === "down" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[11px] w-[11px]">
          <path d="M7 7L17 17M9 17h8v-8" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-[11px] w-[11px]">
          <path d="M5 12h14M15 7l5 5-5 5" />
        </svg>
      )}
    </span>
  );
}

function LevelPill({ level }: { level: string }) {
  return (
    <span
      className="rounded-full px-1.5 py-[2px] font-sans text-[10px] font-bold tracking-[0.02em] text-fg-muted"
      style={{ background: "color-mix(in srgb, var(--fg) 7%, transparent)" }}
    >
      {level}
    </span>
  );
}

function StatusDot({
  mom,
  children,
}: {
  mom: Momentum;
  children: React.ReactNode;
}) {
  const color =
    mom === "up" ? "#10B981" : mom === "down" ? "#EF4444" : "var(--fg-muted)";
  return (
    <span
      className={clsx(
        "mt-[2px] inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.01em]",
      )}
      style={{ color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} />
      {children}
    </span>
  );
}

/* ============================================================================
 * Card registry — cycled in order by the parent slide.
 * ========================================================================== */

export interface ProgressCardSpec {
  render: () => React.ReactNode;
}

export const PROGRESS_CARDS: ProgressCardSpec[] = [
  { render: () => <WordMasteryCard /> },
  { render: () => <ArticlePerformanceCard /> },
  { render: () => <GrammarTopicsCard /> },
  { render: () => <GrammarFocusCard /> },
];
