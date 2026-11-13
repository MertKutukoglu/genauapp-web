"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { useRouter, usePathname } from "next/navigation";
import {
  useGrammarAnswersStore,
  computeTopicStats,
  momentum,
  progressFill,
  weakestTopic,
  orderTopicsForList,
  type TopicStat,
  type Momentum,
} from "@/stores/grammarAnswersStore";
import { useSkillStore } from "@/stores/skillStore";
import { useChipStore } from "@/stores/chipStore";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { tierLabel } from "@/stores/wordAnswersStore";
import { SkillSheet, SkillSheetSection } from "./SkillSheet";

/**
 * SkillSheetGrammar — Grammar (purple) skill sheet.
 *
 * Reuses the shell from SkillSheet.tsx; ships two live sections +
 * the shared app-only teaser:
 *
 *   1. Grammar topics list — one row per topic the user has
 *      touched. Topic name + confidence-weighted purple progress
 *      bar + whole-number % + honest momentum arrow (up / down /
 *      stable / — if insufficient data). Row click updates the
 *      Topic Focus below. Row ordering: most-practiced first.
 *
 *   2. Topic Focus — big ring, Last-10 strip (green/red/muted
 *      slots), and a purple "Practice X →" CTA that closes the
 *      sheet and routes to the Grammar chip. Defaults to the
 *      weakest topic (≥ 2 attempts) on open; row tap in section 1
 *      swaps the focus.
 *
 *   3. App-only teaser — same 4-mock-card pattern as Vocab, with
 *      Grammar-specific features (weak-topics queue, mastery
 *      tree, per-pack progress, writing-vs-MC accuracy split).
 *
 * Empty state replaces sections 1 + 2 with a "Start Grammar →"
 * card; the teaser still renders beneath.
 */

export interface SkillSheetGrammarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillSheetGrammar({
  open,
  onOpenChange,
}: SkillSheetGrammarProps) {
  const { strings } = useLocale();
  const t = strings.try.skillSheet.grammar;
  const closeLabel = strings.try.skillSheet.close;
  const answers = useGrammarAnswersStore((s) => s.answers);
  const progress = useSkillStore((s) => s.progress.grammar ?? 0);
  const openChip = useChipStore((s) => s.openChip);
  const router = useRouter();
  const pathname = usePathname() ?? "/try";

  const focusRef = React.useRef<HTMLDivElement | null>(null);

  const stats = React.useMemo(() => computeTopicStats(answers), [answers]);
  const orderedForList = React.useMemo(
    () => orderTopicsForList(stats),
    [stats],
  );
  const defaultFocus = React.useMemo(() => weakestTopic(stats), [stats]);

  // Selected topic for Section 2; resets to the default whenever
  // the store updates (new attempts can change who the weakest is).
  const [focusTopic, setFocusTopic] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!open) return;
    setFocusTopic(defaultFocus?.topic ?? null);
  }, [open, defaultFocus?.topic]);

  const focusStat =
    focusTopic != null ? stats.find((s) => s.topic === focusTopic) ?? null : null;

  const tierKey = tierLabel(progress).toLowerCase() as keyof typeof t.tiers;

  const isEmpty = stats.length === 0;

  const handleStartGrammar = () => {
    onOpenChange(false);
    openChip("grammar");
  };
  const handlePracticeTopic = () => {
    onOpenChange(false);
    openChip("grammar");
  };
  const handleTryApp = () => {
    onOpenChange(false);
    const prefix = pathname.startsWith("/tr") ? "/tr" : "";
    router.push(`${prefix}/#waitlist`);
  };

  const handleRowClick = (topic: string) => {
    setFocusTopic(topic);
    // Smooth-scroll the Topic Focus into view so the user sees the
    // update land, matching §6.2 of the spec.
    requestAnimationFrame(() => {
      focusRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <SkillSheet
      open={open}
      onOpenChange={onOpenChange}
      skill="grammar"
      title={t.title}
      tier={t.tiers[tierKey]}
      progress={progress}
      closeLabel={closeLabel}
    >
      {isEmpty ? (
        <EmptyState
          body={t.emptyBody}
          cta={t.emptyCta}
          onCta={handleStartGrammar}
        />
      ) : (
        <>
          {/* Section 1 — Grammar topics list */}
          <SkillSheetSection
            label={t.topicsLabel}
            meta={t.topicsMeta.replace(
              "{count}",
              String(orderedForList.length),
            )}
          >
            <div className="flex flex-col">
              {orderedForList.map((s, i) => (
                <TopicRow
                  key={s.topic}
                  stat={s}
                  isLast={i === orderedForList.length - 1}
                  selected={s.topic === focusTopic}
                  onClick={() => handleRowClick(s.topic)}
                />
              ))}
            </div>
          </SkillSheetSection>

          {/* Section 2 — Topic Focus */}
          <div ref={focusRef}>
            <SkillSheetSection
              label={t.focusLabel.replace(
                "{topic}",
                focusStat?.topic ?? "",
              )}
            >
              {focusStat ? (
                <TopicFocusCard
                  stat={focusStat}
                  practiceLabel={t.practice.replace(
                    "{topic}",
                    focusStat.topic,
                  )}
                  lowDataHint={t.lowDataHint}
                  legendCorrect={t.legendCorrect}
                  legendWrong={t.legendWrong}
                  legendNoData={t.legendNoData}
                  onPractice={handlePracticeTopic}
                />
              ) : null}
            </SkillSheetSection>
          </div>
        </>
      )}

      {/* Section 3 — App-only teaser (Grammar variant) */}
      <SkillSheetSection
        label={t.teaserLabel}
        meta={<LockIcon className="w-4 h-4 text-accent" />}
      >
        <div
          className="rounded-2xl p-4 flex flex-col gap-3"
          style={{
            background:
              "color-mix(in srgb, var(--accent) 5%, var(--surface-card))",
            border:
              "1px dashed color-mix(in srgb, var(--accent) 24%, transparent)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <MockWeakTopicsQueue
              label={t.mockWeakTitle}
              pill={t.mockPill}
            />
            <MockMasteryTree label={t.mockMasteryTitle} pill={t.mockPill} />
            <MockPackProgress label={t.mockPackTitle} pill={t.mockPill} />
            <MockWritingSplit
              label={t.mockWritingTitle}
              pill={t.mockPill}
            />
          </div>
          <button
            type="button"
            onClick={handleTryApp}
            className={clsx(
              "mt-1 h-11 rounded-xl",
              "font-sans font-bold text-[14px] text-white",
              "bg-accent hover:brightness-110 active:scale-[0.99]",
              "transition-[filter,transform] duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
          >
            {t.teaserCta}
          </button>
        </div>
      </SkillSheetSection>
    </SkillSheet>
  );
}

/* ---------- Section 1: Topic row -------------------------------- */

function TopicRow({
  stat,
  isLast,
  selected,
  onClick,
}: {
  stat: TopicStat;
  isLast: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  const fill = progressFill(stat);
  const pct = Math.round(stat.accuracy * 100);
  const m = momentum(stat);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "flex items-center gap-3 py-2.5 text-left w-full bg-transparent border-0 cursor-pointer",
        "transition-colors duration-150",
        selected
          ? "bg-[color-mix(in_srgb,var(--chip-grammar-color)_6%,transparent)] rounded-md px-2 -mx-2"
          : "hover:bg-[color-mix(in_srgb,var(--fg)_3%,transparent)] rounded-md px-2 -mx-2",
      )}
      style={
        !isLast
          ? {
              borderBottom:
                "1px solid color-mix(in srgb, var(--fg) 8%, transparent)",
            }
          : undefined
      }
    >
      {/* Topic name */}
      <span className="font-sans font-semibold text-[14px] text-fg min-w-0 truncate max-w-[40%]">
        {stat.topic}
      </span>
      {/* Progress bar — grows into the remaining space */}
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{
          background:
            "color-mix(in srgb, var(--fg) 6%, transparent)",
        }}
        aria-hidden
      >
        <div
          className="h-full rounded-full transition-[width] duration-[400ms] ease-out"
          style={{
            width: `${fill * 100}%`,
            background: "var(--chip-grammar-color)",
          }}
        />
      </div>
      {/* Percent */}
      <span className="font-sans font-semibold text-[13px] text-fg min-w-[32px] text-right">
        {pct}%
      </span>
      {/* Momentum arrow */}
      <MomentumGlyph m={m} />
    </button>
  );
}

function MomentumGlyph({ m }: { m: Momentum }) {
  if (m === null) {
    return (
      <span
        className="font-sans text-[14px] w-4 text-center shrink-0"
        style={{ color: "var(--fg-faint)" }}
        aria-label="not enough data"
      >
        —
      </span>
    );
  }
  const color =
    m === "up"
      ? "var(--ok)"
      : m === "down"
        ? "var(--accent)"
        : "var(--fg-faint)";
  const path =
    m === "up"
      ? "M12 5v14M5 12l7-7 7 7"
      : m === "down"
        ? "M12 19V5M5 12l7 7 7-7"
        : "M5 12h14M13 6l6 6-6 6";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 shrink-0"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

/* ---------- Section 2: Topic Focus ------------------------------ */

function TopicFocusCard({
  stat,
  practiceLabel,
  lowDataHint,
  legendCorrect,
  legendWrong,
  legendNoData,
  onPractice,
}: {
  stat: TopicStat;
  practiceLabel: string;
  lowDataHint: string;
  legendCorrect: string;
  legendWrong: string;
  legendNoData: string;
  onPractice: () => void;
}) {
  const pct = Math.round(stat.accuracy * 100);
  const slots: Array<"correct" | "wrong" | "empty"> = React.useMemo(() => {
    const out: Array<"correct" | "wrong" | "empty"> = [];
    for (let i = 0; i < 10; i++) {
      const v = stat.lastN[i];
      if (v === undefined) out.push("empty");
      else if (v) out.push("correct");
      else out.push("wrong");
    }
    return out;
  }, [stat.lastN]);
  const correctCount = slots.filter((x) => x === "correct").length;
  const wrongCount = slots.filter((x) => x === "wrong").length;
  const emptyCount = slots.filter((x) => x === "empty").length;

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-4"
      style={{ background: "var(--surface-sunk)" }}
    >
      {/* Ring + percent */}
      <div className="flex flex-col items-center gap-1 text-center">
        <FocusRing percent={pct} />
        <div className="font-sans font-bold text-[18px] text-fg leading-tight -mt-1">
          {pct}%
        </div>
      </div>

      {/* Last-10 strip */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 justify-center">
          {slots.map((s, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background:
                  s === "correct"
                    ? "var(--ok)"
                    : s === "wrong"
                      ? "var(--accent)"
                      : "color-mix(in srgb, var(--fg) 10%, transparent)",
              }}
              aria-hidden
            />
          ))}
        </div>
        <div className="font-sans font-normal text-[12px] text-fg-muted text-center">
          {correctCount} {legendCorrect} · {wrongCount} {legendWrong} ·{" "}
          {emptyCount} {legendNoData}
        </div>
        {stat.attempts < 3 ? (
          <div className="font-sans font-normal text-[12px] text-fg-faint text-center italic">
            {lowDataHint}
          </div>
        ) : null}
      </div>

      {/* Practice CTA */}
      <button
        type="button"
        onClick={onPractice}
        className={clsx(
          "h-11 rounded-xl",
          "font-sans font-bold text-[14px] text-white",
          "bg-[var(--chip-grammar-color)] hover:brightness-110 active:scale-[0.99]",
          "transition-[filter,transform] duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-grammar-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        {practiceLabel} →
      </button>
    </div>
  );
}

function FocusRing({ percent }: { percent: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const fill = Math.max(0, Math.min(1, percent / 100));
  const dashOffset = c * (1 - fill);
  return (
    <svg viewBox="0 0 72 72" className="w-[72px] h-[72px]" aria-hidden>
      <circle
        cx="36"
        cy="36"
        r={r}
        stroke="color-mix(in srgb, var(--fg) 10%, transparent)"
        strokeWidth="6"
        fill="none"
      />
      <circle
        cx="36"
        cy="36"
        r={r}
        stroke="var(--chip-grammar-color)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={dashOffset}
        style={{ transform: "rotate(-90deg)", transformOrigin: "36px 36px" }}
      />
    </svg>
  );
}

/* ---------- Empty state ---------------------------------------- */

function EmptyState({
  body,
  cta,
  onCta,
}: {
  body: string;
  cta: string;
  onCta: () => void;
}) {
  return (
    <div
      className="mt-5 rounded-2xl p-6 flex flex-col items-center gap-4 text-center"
      style={{ background: "var(--surface-sunk)" }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background:
            "color-mix(in srgb, var(--chip-grammar-color) 12%, transparent)",
          border:
            "1.5px solid color-mix(in srgb, var(--chip-grammar-color) 28%, transparent)",
        }}
        aria-hidden
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background:
              "color-mix(in srgb, var(--chip-grammar-color) 55%, transparent)",
          }}
        />
      </div>
      <p className="font-sans text-[15px] text-fg-muted m-0 leading-snug max-w-[280px]">
        {body}
      </p>
      <button
        type="button"
        onClick={onCta}
        className={clsx(
          "h-11 px-6 rounded-xl",
          "font-sans font-bold text-[14px] text-white",
          "bg-accent hover:brightness-110 active:scale-[0.99]",
          "transition-[filter,transform] duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        {cta}
      </button>
    </div>
  );
}

/* ---------- App-only mini-mock cards --------------------------- */

function MockCardFrame({
  title,
  icon,
  pill,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  pill: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative rounded-xl p-3 flex flex-col gap-2 overflow-hidden"
      style={{
        background: "var(--surface-card)",
        border:
          "1px solid color-mix(in srgb, var(--fg) 8%, transparent)",
      }}
    >
      <div className="flex items-center gap-1.5 min-w-0 pr-16">
        <span className="text-fg-muted shrink-0">{icon}</span>
        <span className="font-sans font-semibold text-[12px] text-fg-muted uppercase tracking-wide truncate">
          {title}
        </span>
      </div>
      <div
        className="absolute top-2.5 right-2.5 font-sans font-bold text-[10px] uppercase px-1.5 py-0.5 rounded-full"
        style={{
          letterSpacing: "0.4px",
          background:
            "color-mix(in srgb, var(--accent) 14%, transparent)",
          color: "var(--accent)",
        }}
      >
        {pill}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function MockWeakTopicsQueue({ label, pill }: { label: string; pill: string }) {
  const rows: Array<[string, string]> = [
    ["Perfekt", "3 drills"],
    ["Dativ-Artikel", "2 drills"],
    ["Konjunktiv II", "4 drills"],
  ];
  return (
    <MockCardFrame
      title={label}
      pill={pill}
      icon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
          aria-hidden
        >
          <path d="M3 6h18M3 12h18M3 18h12" />
        </svg>
      }
    >
      {rows.map(([topic, drills]) => (
        <div
          key={topic}
          className="flex items-center justify-between gap-2 text-[13px]"
        >
          <span className="font-sans font-semibold text-fg truncate">
            {topic}
          </span>
          <span
            className="font-sans font-normal shrink-0"
            style={{ color: "var(--chip-grammar-color)" }}
          >
            {drills}
          </span>
        </div>
      ))}
    </MockCardFrame>
  );
}

function MockMasteryTree({ label, pill }: { label: string; pill: string }) {
  // Mini ASCII-feel mastery tree: unlocked + locked nodes.
  const nodes: Array<{ name: string; state: "done" | "active" | "locked" }> = [
    { name: "sein", state: "done" },
    { name: "haben", state: "done" },
    { name: "Perfekt", state: "active" },
    { name: "Konj. II", state: "locked" },
  ];
  return (
    <MockCardFrame
      title={label}
      pill={pill}
      icon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
          aria-hidden
        >
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <path d="M6 8v4a4 4 0 004 4h4a4 4 0 004-4V8" />
        </svg>
      }
    >
      {nodes.map((n) => {
        const dotBg =
          n.state === "done"
            ? "var(--ok)"
            : n.state === "active"
              ? "var(--chip-grammar-color)"
              : "color-mix(in srgb, var(--fg) 20%, transparent)";
        return (
          <div key={n.name} className="flex items-center gap-2 text-[13px]">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: dotBg }}
              aria-hidden
            />
            <span
              className={clsx(
                "font-sans truncate",
                n.state === "locked"
                  ? "text-fg-faint font-normal"
                  : "text-fg font-semibold",
              )}
            >
              {n.name}
            </span>
          </div>
        );
      })}
    </MockCardFrame>
  );
}

function MockPackProgress({ label, pill }: { label: string; pill: string }) {
  const rows: Array<[string, number]> = [
    ["Travel", 0.75],
    ["Office", 0.5],
    ["Weekend", 0.3],
  ];
  return (
    <MockCardFrame
      title={label}
      pill={pill}
      icon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
          aria-hidden
        >
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <path d="M3.3 7L12 12l8.7-5" />
          <path d="M12 22V12" />
        </svg>
      }
    >
      {rows.map(([pack, p]) => (
        <div key={pack} className="flex items-center gap-2 text-[12px]">
          <span className="font-sans font-semibold text-fg min-w-[56px]">
            {pack}
          </span>
          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{
              background: "color-mix(in srgb, var(--fg) 10%, transparent)",
            }}
            aria-hidden
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.round(p * 100)}%`,
                background: "var(--chip-grammar-color)",
              }}
            />
          </div>
          <span className="font-sans font-normal text-fg-muted shrink-0 w-7 text-right">
            {Math.round(p * 100)}%
          </span>
        </div>
      ))}
    </MockCardFrame>
  );
}

function MockWritingSplit({ label, pill }: { label: string; pill: string }) {
  // Side-by-side bars for MC vs Writing accuracy split.
  const rows: Array<[string, number]> = [
    ["Multiple choice", 0.82],
    ["Fill blank", 0.61],
  ];
  return (
    <MockCardFrame
      title={label}
      pill={pill}
      icon={
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
          aria-hidden
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />
        </svg>
      }
    >
      {rows.map(([kind, p]) => (
        <div key={kind} className="flex flex-col gap-1 text-[12px]">
          <div className="flex items-center justify-between">
            <span className="font-sans font-semibold text-fg truncate">
              {kind}
            </span>
            <span className="font-sans font-normal text-fg-muted shrink-0">
              {Math.round(p * 100)}%
            </span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{
              background: "color-mix(in srgb, var(--fg) 10%, transparent)",
            }}
            aria-hidden
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.round(p * 100)}%`,
                background: "var(--chip-grammar-color)",
              }}
            />
          </div>
        </div>
      ))}
    </MockCardFrame>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 118 0v4" />
    </svg>
  );
}
