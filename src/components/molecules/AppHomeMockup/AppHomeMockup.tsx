import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import { Icon } from "@/components/atoms/Icon/Icon";
import { SkillRing } from "@/components/atoms/SkillRing/SkillRing";
import { StreakPill } from "@/components/atoms/StreakPill/StreakPill";

/**
 * AppHomeMockup — a scaled-down replica of the iOS app Home screen,
 * built in HTML + CSS from the design system's own atoms (SkillRing,
 * StreakPill, Icon). Lives inside PhoneFrame on the landing hero.
 *
 * Deliberately NOT an image — if the token system changes, this mock
 * moves with it. Content mirrors the real app's top-of-home: level
 * badge + chrome icons + Skills row (Vocab/Gram/Read) + "Your Workout"
 * card with a chip strip and a start CTA.
 */

export interface AppHomeMockupProps {
  className?: string;
}

export function AppHomeMockup({ className }: AppHomeMockupProps) {
  return (
    <div
      className={clsx(
        "flex h-full w-full flex-col gap-3 bg-white px-3 pt-8 text-[#141112]",
        className,
      )}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-1 text-[8px] font-semibold text-[#141112]/80">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 20 10" className="h-2 w-5 fill-current"><path d="M1 6h2v2H1zM5 4h2v4H5zM9 2h2v6H9zM13 0h2v8h-2z"/></svg>
          <svg viewBox="0 0 24 24" className="h-2 w-2.5 fill-current"><path d="M12 2L5 9l1.5 1.5L10 7v15h4V7l3.5 3.5L19 9z" transform="rotate(45 12 12)"/></svg>
          <svg viewBox="0 0 24 10" className="h-2 w-4"><rect x="1" y="1" width="20" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1"/><rect x="3" y="3" width="16" height="4" rx="0.5" fill="currentColor"/></svg>
        </div>
      </div>

      {/* Top row: A1 pill + icons */}
      <div className="flex items-center justify-between px-0.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#E54959] px-1.5 py-0.5 text-[9px] font-bold text-white">
          <Icon name="sparkle" className="h-2 w-2" />
          A1
        </span>
        <div className="flex items-center gap-1.5 text-[#141112]/70">
          <Icon name="search" className="h-3 w-3" />
          <Icon name="bell" className="h-3 w-3" />
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#E5D4C3] text-[8px] font-bold text-[#8A4A20]">
            M
          </span>
        </div>
      </div>

      {/* Skills section */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between px-0.5">
          <h4 className="text-[11px] font-bold text-[#141112]">Skills</h4>
          <span className="text-[8px] font-semibold text-[#141112]/50">View more</span>
        </div>
        <div className="flex items-end justify-around gap-1">
          {(["vocab", "grammar", "reading"] as const).map((s) => (
            <div key={s} className="scale-[0.72] origin-top">
              <SkillRing skill={s} progress={0.6} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Your Workout card */}
      <div className="flex flex-col gap-1.5 rounded-xl border border-black/5 bg-[#FAF8F5] p-2 shadow-sm">
        <div className="flex items-center justify-between">
          <h5 className="text-[10px] font-bold text-[#141112]">Your Workout</h5>
          <StreakPill days={2} className="!h-4 !px-1.5 !text-[8px]" />
        </div>
        {/* Chip strip — simple colored squares */}
        <div className="grid grid-cols-5 gap-1">
          {CHIP_SPECS.map((c, i) => (
            <div
              key={c.k}
              className="grid aspect-square place-items-center rounded-[6px]"
              style={{
                background: c.bg,
                color: c.fg,
                boxShadow: i === 0 ? `inset 0 0 0 1.5px ${c.fg}` : undefined,
              }}
            >
              <ChipGlyph kind={c.k} />
            </div>
          ))}
        </div>
        {/* Section title + task list */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[9px] font-semibold text-[#141112]">Words</span>
          <span className="text-[8px] text-[#141112]/50">12 · 5 min</span>
        </div>
        <div className="flex items-center gap-1 text-[8px]">
          <span className="grid h-2 w-2 place-items-center rounded-full bg-[#10B981] text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="h-1.5 w-1.5">
              <path d="M5 12l4 4 10-10" />
            </svg>
          </span>
          <span className="text-[#141112]/50 line-through">Daily Life · Nouns Deck 1</span>
        </div>
        <div className="flex items-center gap-1 text-[8px]">
          <span className="h-2 w-2 rounded-full border border-[#141112]/30" />
          <span className="text-[#141112]">Daily Life · Verbs Deck 1</span>
        </div>
        {/* Cherry CTA */}
        <button
          type="button"
          className="mt-0.5 flex w-full items-center justify-between rounded-full bg-[#E54959] px-2.5 py-1 text-[9px] font-bold text-white"
        >
          <span>Start · Daily Life · Verbs</span>
          <Icon name="arrow-right" className="h-2 w-2" />
        </button>
      </div>

      {/* Bottom tab bar */}
      <div className="mt-auto flex items-center justify-around border-t border-black/10 pt-1.5 pb-1 text-[#141112]/60">
        <div className="flex flex-col items-center gap-0.5 text-[#E54959]">
          <Icon name="flame" className="h-3 w-3" />
          <span className="text-[7px] font-semibold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Icon name="chip-grammar" className="h-3 w-3" />
          <span className="text-[7px] font-semibold">Grammar</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Icon name="book" className="h-3 w-3" />
          <span className="text-[7px] font-semibold">Reading</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Icon name="user" className="h-3 w-3" />
          <span className="text-[7px] font-semibold">You</span>
        </div>
      </div>
    </div>
  );
}

/* -------- Mini chip strip inside the mock Workout card -------- */

const CHIP_SPECS = [
  { k: "words",         bg: "rgba(236, 72, 153, 0.18)", fg: "#EC4899" },
  { k: "grammar",       bg: "rgba(139, 92, 246, 0.18)", fg: "#8B5CF6" },
  { k: "story",         bg: "rgba(245, 158, 11, 0.18)", fg: "#F59E0B" },
  { k: "sentence",      bg: "rgba(16, 185, 129, 0.18)", fg: "#10B981" },
  { k: "pronunciation", bg: "rgba(239, 68, 68, 0.18)",  fg: "#EF4444" },
] as const;

function ChipGlyph({ kind }: { kind: typeof CHIP_SPECS[number]["k"] }) {
  const common = { className: "h-2.5 w-2.5", fill: "currentColor" } as const;
  switch (kind) {
    case "words":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <path d="M6 2.5A1.5 1.5 0 0 0 4.5 4v16A1.5 1.5 0 0 0 6 21.5h13V18H6a.5.5 0 0 1 0-1h13V2.5H6z" />
        </svg>
      );
    case "grammar":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <path d="M16.24 3.56a1.5 1.5 0 0 1 2.12 0l2.08 2.08a1.5 1.5 0 0 1 0 2.12l-1.1 1.1-4.2-4.2 1.1-1.1zm-2.16 2.16 4.2 4.2L8.3 20.9H4.1v-4.2L14.08 5.72z" />
        </svg>
      );
    case "story":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <path d="M4 4h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9.5L5 20v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "sentence":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <rect x="3" y="5" width="18" height="2.4" rx="1.2" />
          <rect x="3" y="10.8" width="12" height="2.4" rx="1.2" />
          <rect x="3" y="16.6" width="15" height="2.4" rx="1.2" />
        </svg>
      );
    case "pronunciation":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden>
          <rect x="2" y="10" width="2" height="4" rx="1" />
          <rect x="6" y="7" width="2" height="10" rx="1" />
          <rect x="10" y="4" width="2" height="16" rx="1" />
          <rect x="14" y="7" width="2" height="10" rx="1" />
          <rect x="18" y="9" width="2" height="6" rx="1" />
        </svg>
      );
  }
}
