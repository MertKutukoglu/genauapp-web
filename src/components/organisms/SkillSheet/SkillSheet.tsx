"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "@/lib/utils/clsx";
import { SkillRing, type Skill } from "@/components/atoms/SkillRing/SkillRing";

/**
 * SkillSheet — the shared shell behind each skill-ring detail
 * popup. Bottom sheet on mobile, centered modal on desktop.
 *
 * Radix Dialog handles focus trap, scroll lock, Portal, Escape
 * and backdrop click for us; here we add the responsive frame
 * (max-w-640 centered desktop vs. full-width slide-up-from-
 * bottom mobile), the shared header (icon ring + title + tier
 * label + current ring percentage on the right), and the shared
 * Close footer. Per-skill content (Word Mastery, Article
 * Performance, …) slots in via `children`.
 *
 * Mirrors claude/GenauApp_Web_Try_SkillSheet_Vocab.md §4 verbatim,
 * with the typography register adjusted to Nunito (the doc
 * mentions Open Sans — we've since moved the whole site onto
 * Nunito; rounded sans reads cleaner on the condensed sheet
 * tiles anyway).
 */

export interface SkillSheetProps {
  /** Null = closed. Setting a skill opens the sheet for it. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: Skill;
  /** Skill name shown in the header. */
  title: string;
  /** "Starting" / "Building" / "Growing" / "Strong" / "Mastery". */
  tier: string;
  /** 0..1 — fills the mini header ring; also displayed as a %. */
  progress: number;
  closeLabel: string;
  children: React.ReactNode;
}

/**
 * Shared section header — thin top divider + eyebrow label + optional
 * right-aligned meta. Every skill-sheet section uses this.
 */
export function SkillSheetSection({
  label,
  meta,
  children,
  className,
}: {
  label: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("mt-6 first:mt-5", className)}>
      <div
        className="h-px w-full mb-3"
        style={{
          background: "color-mix(in srgb, var(--fg) 8%, transparent)",
        }}
        aria-hidden
      />
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h3
          className="font-sans font-normal text-[13px] uppercase m-0"
          style={{ letterSpacing: "0.5px", color: "var(--fg-faint)" }}
        >
          {label}
        </h3>
        {meta ? (
          <div className="font-sans font-semibold text-[13px] text-fg-muted">
            {meta}
          </div>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function SkillSheet({
  open,
  onOpenChange,
  skill,
  title,
  tier,
  progress,
  closeLabel,
  children,
}: SkillSheetProps) {
  const pct = Math.round(Math.max(0, Math.min(1, progress)) * 100);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={clsx(
            "fixed inset-0 z-[100]",
            "bg-black/50",
            "animate-[sheet-fade-in_200ms_ease-out]",
          )}
        />
        <Dialog.Content
          aria-describedby={undefined}
          className={clsx(
            "fixed z-[101]",
            // Mobile — bottom sheet
            "inset-x-0 bottom-0",
            "h-[92vh] max-h-[92vh]",
            "rounded-t-[20px]",
            "flex flex-col overflow-hidden",
            "bg-surface-card",
            "shadow-[0_-12px_32px_-12px_rgba(0,0,0,0.25)]",
            // Desktop — centered modal
            "md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2",
            "md:-translate-x-1/2 md:-translate-y-1/2",
            "md:w-full md:max-w-[640px]",
            "md:h-auto md:max-h-[85vh]",
            "md:rounded-[24px]",
            "md:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.3)]",
            // Animations — mobile slides up from the bottom edge,
            // desktop drops in from 16px above; backdrop fades in.
            "animate-[sheet-slide-up_280ms_cubic-bezier(0.22,0.61,0.36,1)]",
            "md:animate-[sheet-drop-in_260ms_ease-out]",
          )}
        >
          {/* Mobile drag handle */}
          <div
            className="flex justify-center pt-3 md:hidden"
            aria-hidden
          >
            <div
              className="h-1 w-10 rounded-full"
              style={{
                background: "color-mix(in srgb, var(--fg) 20%, transparent)",
              }}
            />
          </div>

          {/* Scroll container — only the body scrolls. */}
          <div className="flex-1 overflow-y-auto px-5 pt-5 pb-5 md:pt-6">
            {/* Header */}
            <header className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0">
                  <SkillRing skill={skill} size="sm" progress={progress} />
                </div>
                <div className="min-w-0">
                  <Dialog.Title asChild>
                    <h2 className="font-sans font-bold text-[22px] text-fg m-0 truncate">
                      {title}
                    </h2>
                  </Dialog.Title>
                  <div className="font-sans text-[14px] text-fg-muted leading-tight">
                    {tier}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-sans font-bold text-[18px] text-fg leading-tight">
                  {pct}%
                </div>
              </div>
            </header>

            {children}
          </div>

          {/* Footer — ghost Close button pinned bottom */}
          <div className="border-t border-[color:color-mix(in_srgb,var(--fg)_8%,transparent)] px-5 py-4 bg-surface-card">
            <Dialog.Close asChild>
              <button
                type="button"
                className={clsx(
                  "w-full h-11 rounded-xl",
                  "font-sans font-semibold text-[15px] text-fg",
                  "bg-[color:color-mix(in_srgb,var(--fg)_6%,transparent)]",
                  "hover:bg-[color:color-mix(in_srgb,var(--fg)_10%,transparent)]",
                  "active:scale-[0.99]",
                  "transition-[background-color,transform] duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                )}
              >
                {closeLabel}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
