"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import {
  useGrammarAnswersStore,
  computeTopicStats,
  momentum,
  weakestTopic,
  grammarTier,
  countByTier,
  type TopicStat,
  type Momentum,
  type GrammarTier,
} from "@/stores/grammarAnswersStore";
import { useSkillStore } from "@/stores/skillStore";
import { useChipStore } from "@/stores/chipStore";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { tierLabel } from "@/stores/wordAnswersStore";
import { describeGrammarTopic } from "@/content/grammar-topic-descriptions";
import { SkillSheet, SkillSheetSection } from "./SkillSheet";

/**
 * SkillSheetGrammar, Grammar (purple) skill sheet.
 *
 * Reuses the shell from SkillSheet.tsx; ships two live sections +
 * the shared app-only teaser:
 *
 *   1. Grammar topics list, one row per topic the user has
 *      touched. Topic name + confidence-weighted purple progress
 *      bar + whole-number % + honest momentum arrow (up / down /
 *      stable /, if insufficient data). Row click updates the
 *      Topic Focus below. Row ordering: most-practiced first.
 *
 *   2. Topic Focus, big ring, Last-10 strip (green/red/muted
 *      slots), and a purple "Practice X →" CTA that closes the
 *      sheet and routes to the Grammar chip. Defaults to the
 *      weakest topic (≥ 2 attempts) on open; row tap in section 1
 *      swaps the focus.
 *
 *   3. App-only teaser, same 4-mock-card pattern as Vocab, with
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
  const { strings, locale } = useLocale();
  const t = strings.try.skillSheet.grammar;
  const closeLabel = strings.try.skillSheet.close;
  const answers = useGrammarAnswersStore((s) => s.answers);
  const progress = useSkillStore((s) => s.progress.grammar ?? 0);
  const openChip = useChipStore((s) => s.openChip);
  const focusRef = React.useRef<HTMLDivElement | null>(null);

  const stats = React.useMemo(() => computeTopicStats(answers), [answers]);
  const counts = React.useMemo(() => countByTier(stats), [stats]);
  const defaultFocus = React.useMemo(() => weakestTopic(stats), [stats]);

  // iOS parity: tier filter defaults to Practicing (the biggest
  // bucket, and the one the user usually came to the sheet for,
  // "what should I keep working on?"). Falls through to whichever
  // bucket has rows if Practicing is empty.
  const [tierFilter, setTierFilter] = React.useState<GrammarTier>("practicing");
  React.useEffect(() => {
    if (!open) return;
    if (counts.practicing > 0) setTierFilter("practicing");
    else if (counts.needsWork > 0) setTierFilter("needsWork");
    else if (counts.strong > 0) setTierFilter("strong");
  }, [open, counts.practicing, counts.needsWork, counts.strong]);

  const filteredStats = React.useMemo(
    () =>
      stats
        .filter((s) => grammarTier(s) === tierFilter)
        .sort((a, b) => {
          // Within a tier: lowest accuracy first (so "needs work"
          // and "practicing" surface the ugliest numbers up top), but
          // Strong sorts highest-first (victory lap).
          const dir = tierFilter === "strong" ? -1 : 1;
          return dir * (a.accuracy - b.accuracy);
        }),
    [stats, tierFilter],
  );

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
          {/* Section 1, Topic Focus (now top-of-sheet).
              The weakest-topic focus used to sit under the topics
              list, but Mert wanted the "here's what to work on next"
              answer front-and-centre, you open the sheet, you see
              the call-to-action. Topic performance moved below. */}
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
                  appOnlyLabel={t.mockPill}
                  lowDataHint={t.lowDataHint}
                  legendCorrect={t.legendCorrect}
                  legendWrong={t.legendWrong}
                  legendNoData={t.legendNoData}
                  onPractice={handlePracticeTopic}
                />
              ) : null}
            </SkillSheetSection>
          </div>

          {/* Section 2, Topic performance (iOS parity) */}
          <SkillSheetSection label={t.topicsLabel}>
            <TierFilterRow
              active={tierFilter}
              onChange={setTierFilter}
              counts={counts}
              labels={{
                strong: t.tierStrong,
                practicing: t.tierPracticing,
                needsWork: t.tierNeedsWork,
              }}
            />
            {filteredStats.length === 0 ? (
              <p className="mt-4 font-sans text-[13px] text-fg-muted text-center m-0">
                {t.tierEmpty}
              </p>
            ) : (
              <div className="mt-3 flex flex-col gap-2.5">
                {filteredStats.map((s) => (
                  <TopicCard
                    key={s.topic}
                    stat={s}
                    description={describeGrammarTopic(s.topic, locale)}
                    selected={s.topic === focusTopic}
                    tierPillLabel={
                      {
                        strong: t.tierStrong,
                        practicing: t.tierPracticing,
                        needsWork: t.tierNeedsWork,
                      }[grammarTier(s)]
                    }
                    onClick={() => handleRowClick(s.topic)}
                  />
                ))}
              </div>
            )}
          </SkillSheetSection>
        </>
      )}

      {/* Section 3, App-only teaser (Grammar variant) */}
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
        </div>
      </SkillSheetSection>
    </SkillSheet>
  );
}

/* ---------- Section 1: Tier filter + Topic cards ---------------- */

/**
 * Tier filter chips, Strong / Practicing / Needs work, each with
 * its count. iOS parity: active chip is purple (chip-grammar), the
 * rest are neutral. Horizontally scrollable on narrow mobile so the
 * three never wrap.
 */
function TierFilterRow({
  active,
  onChange,
  counts,
  labels,
}: {
  active: GrammarTier;
  onChange: (tier: GrammarTier) => void;
  counts: Record<GrammarTier, number>;
  labels: Record<GrammarTier, string>;
}) {
  const order: GrammarTier[] = ["strong", "practicing", "needsWork"];
  return (
    <div
      role="tablist"
      aria-label="Topic performance tier"
      className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-1 px-1"
    >
      {order.map((tier) => {
        const isActive = tier === active;
        return (
          <button
            key={tier}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tier)}
            className={clsx(
              "shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-full",
              "font-sans font-semibold text-[13px]",
              "transition-[background-color,color] duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-grammar-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
            style={
              isActive
                ? {
                    background:
                      "color-mix(in srgb, var(--chip-grammar-color) 14%, transparent)",
                    color: "var(--chip-grammar-color)",
                  }
                : {
                    background:
                      "color-mix(in srgb, var(--fg) 5%, transparent)",
                    color: "var(--fg)",
                  }
            }
          >
            <span>{labels[tier]}</span>
            <span
              className="font-sans font-semibold text-[12px] tabular-nums"
              style={{
                color: isActive ? "var(--chip-grammar-color)" : "var(--fg-faint)",
              }}
            >
              {counts[tier]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * TopicCard, iOS parity. Momentum badge in a tinted circle on the
 * left, topic name + description in the middle, CEFR level pill on
 * the right, status pill at the bottom.
 */
function TopicCard({
  stat,
  description,
  selected,
  tierPillLabel,
  onClick,
}: {
  stat: TopicStat;
  description: string;
  selected: boolean;
  tierPillLabel: string;
  onClick: () => void;
}) {
  const m = momentum(stat);
  const tier = grammarTier(stat);
  // Status pill color, green for Strong, amber for Practicing,
  // cherry for Needs work. Matches the Practice-words tier colors
  // in the Vocab sheet so the two sheets stay visually aligned.
  const pillColor =
    tier === "strong"
      ? "var(--ok)"
      : tier === "needsWork"
        ? "var(--accent)"
        : "#D97706"; // amber-ish for practicing

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "w-full text-left rounded-2xl p-4 cursor-pointer",
        "bg-surface-card",
        "transition-[border-color,box-shadow] duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-grammar-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      )}
      style={{
        border: selected
          ? "1px solid color-mix(in srgb, var(--chip-grammar-color) 40%, transparent)"
          : "1px solid color-mix(in srgb, var(--fg) 10%, transparent)",
        boxShadow: selected
          ? "0 0 0 3px color-mix(in srgb, var(--chip-grammar-color) 10%, transparent)"
          : undefined,
      }}
    >
      {/* Row 1, momentum badge + topic + CEFR */}
      <div className="flex items-start gap-3">
        <MomentumBadge m={m} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-sans font-bold text-[16px] text-fg m-0 leading-tight">
              {stat.topic}
            </h4>
            <span
              className="shrink-0 inline-flex items-center h-6 px-2 rounded-full font-sans font-semibold text-[11px]"
              style={{
                background: "color-mix(in srgb, var(--fg) 5%, transparent)",
                color: "var(--fg-muted)",
              }}
            >
              {stat.latestLevel}
            </span>
          </div>
          {description ? (
            <p className="mt-1 font-sans text-[13px] text-fg-muted leading-snug m-0">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      {/* Row 2, status pill (colored dot + tier label) */}
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: pillColor }}
          aria-hidden
        />
        <span
          className="font-sans font-semibold text-[13px]"
          style={{ color: pillColor }}
        >
          {tierPillLabel}
        </span>
      </div>
    </button>
  );
}

/**
 * MomentumBadge, circle wrapper with a diagonal arrow for up/down,
 * a horizontal right-arrow for stable, and a muted dash when there
 * isn't enough data yet. iOS parity, same color coding as the
 * MomentumGlyph we had on the old row.
 */
function MomentumBadge({ m }: { m: Momentum }) {
  const color =
    m === "up"
      ? "var(--ok)"
      : m === "down"
        ? "var(--accent)"
        : "var(--fg-faint)";
  const tint = m === null ? "var(--fg)" : color;
  return (
    <span
      className="shrink-0 w-8 h-8 rounded-full inline-flex items-center justify-center"
      style={{
        background: `color-mix(in srgb, ${tint} 12%, transparent)`,
      }}
      aria-hidden
    >
      {m === null ? (
        <span
          className="font-sans font-bold text-[14px]"
          style={{ color: "var(--fg-faint)" }}
        >
         ,
        </span>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path
            d={
              m === "up"
                ? // diagonal up-right
                  "M7 17L17 7M9 7h8v8"
                : m === "down"
                  ? // diagonal down-right
                    "M7 7l10 10M17 9v8H9"
                  : // horizontal right
                    "M5 12h14M13 6l6 6-6 6"
            }
          />
        </svg>
      )}
    </span>
  );
}

/* ---------- Section 2: Topic Focus ------------------------------ */

function TopicFocusCard({
  stat,
  practiceLabel,
  appOnlyLabel,
  lowDataHint,
  legendCorrect,
  legendWrong,
  legendNoData,
  onPractice,
}: {
  stat: TopicStat;
  practiceLabel: string;
  appOnlyLabel: string;
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

      {/* Practice CTA, carries an "App only" badge: topic-level
          drilling (practice just this one topic, skipping the rest
          of the deck) lives in the app. On web the button still
          reopens the Grammar workout, but the badge is the honest
          signal that it isn't the full topic-focused drill. */}
      <button
        type="button"
        onClick={onPractice}
        className={clsx(
          "relative h-11 rounded-xl px-4",
          "flex items-center justify-center gap-2",
          "font-sans font-bold text-[14px] text-white",
          "bg-[var(--chip-grammar-color)] hover:brightness-110 active:scale-[0.99]",
          "transition-[filter,transform] duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--chip-grammar-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        )}
      >
        <span>{practiceLabel} →</span>
        <span
          className="font-sans font-bold text-[10px] uppercase px-1.5 py-0.5 rounded-full"
          style={{
            letterSpacing: "0.4px",
            background: "rgba(255,255,255,0.22)",
            color: "#fff",
          }}
        >
          {appOnlyLabel}
        </span>
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
