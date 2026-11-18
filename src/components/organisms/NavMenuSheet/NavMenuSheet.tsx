"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "@/lib/utils/clsx";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { LanguagePicker } from "@/components/atoms/LanguagePicker/LanguagePicker";
import { ThemeToggle } from "@/components/atoms/ThemeToggle/ThemeToggle";
import { NavBlogLink } from "@/components/atoms/NavBlogLink/NavBlogLink";
import { IOSBetaPill } from "@/components/atoms/IOSBetaPill/IOSBetaPill";

/**
 * NavMenuSheet, mobile-only hamburger button that opens a bottom
 * sheet carrying the header items we hide on narrow viewports.
 *
 * Problem this solves: the mobile glass pill already fit Wordmark +
 * utility items tightly. Adding the primary "Try it" CTA to the pill
 * means we have to demote the utility items (Origins link, iOS Beta
 * status, Language picker, Theme toggle) somewhere, but we can't
 * drop them entirely. The sheet gives them a home while keeping the
 * mobile pill to three primary items.
 *
 * Only renders on `max-md`. On desktop the trigger stays hidden and
 * the right cluster in Topnav carries these items inline.
 *
 * Shares the Radix Dialog pattern with SkillSheet (bottom slide-up
 * on mobile, centered modal on desktop). Since the trigger itself is
 * mobile-only, in practice this always renders as a bottom sheet;
 * the desktop branch is kept so the sheet degrades gracefully if the
 * trigger ever ends up visible on a wider viewport.
 */

export interface NavMenuSheetProps {
  className?: string;
}

export function NavMenuSheet({ className }: NavMenuSheetProps) {
  const { locale } = useLocale();
  const [open, setOpen] = React.useState(false);

  const openLabel = locale === "tr" ? "Menüyü aç" : "Open menu";
  const closeLabel = locale === "tr" ? "Kapat" : "Close";
  const sheetTitle = locale === "tr" ? "Menü" : "Menu";
  const langGroupLabel = locale === "tr" ? "Dil" : "Language";
  const themeGroupLabel = locale === "tr" ? "Tema" : "Theme";
  const moreGroupLabel = locale === "tr" ? "Daha fazla" : "More";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={openLabel}
          className={clsx(
            "inline-flex items-center justify-center shrink-0",
            "w-9 h-9 rounded-full",
            "text-fg-muted hover:text-fg",
            "transition-colors duration-150",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
            className,
          )}
        >
          <MenuIcon />
        </button>
      </Dialog.Trigger>
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
            "inset-x-0 bottom-0",
            "h-auto max-h-[70vh]",
            "rounded-t-[20px]",
            "flex flex-col overflow-hidden",
            "bg-surface-card",
            "shadow-[0_-12px_32px_-12px_rgba(0,0,0,0.25)]",
            "md:inset-0 md:m-auto",
            "md:w-full md:max-w-[400px]",
            "md:h-fit md:max-h-[85vh]",
            "md:rounded-[24px]",
            "md:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.3)]",
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

          <header className="flex items-center justify-between gap-3 px-5 pt-4 pb-3">
            <Dialog.Title className="font-sans font-bold text-[20px] text-fg m-0">
              {sheetTitle}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={closeLabel}
                className={clsx(
                  "inline-flex items-center justify-center",
                  "w-8 h-8 rounded-full",
                  "text-fg-muted hover:text-fg",
                  "transition-colors duration-150",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                )}
              >
                <CloseIcon />
              </button>
            </Dialog.Close>
          </header>

          <div className="flex flex-col gap-5 px-5 pb-6">
            {/* Language picker row */}
            <section className="flex flex-col gap-2">
              <GroupLabel>{langGroupLabel}</GroupLabel>
              <LanguagePicker />
            </section>

            {/* Theme toggle row */}
            <section className="flex items-center justify-between gap-3">
              <GroupLabel>{themeGroupLabel}</GroupLabel>
              <ThemeToggle />
            </section>

            {/* More: Origins link + iOS Beta status */}
            <section className="flex flex-col gap-3">
              <GroupLabel>{moreGroupLabel}</GroupLabel>
              <div className="flex items-center gap-3 flex-wrap">
                <NavBlogLink />
                <IOSBetaPill narrow="static" />
              </div>
            </section>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Small uppercase label used above each sheet group. Keeps the sheet
 *  scannable without heavy section dividers. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-sans font-semibold text-[11px] uppercase text-fg-faint"
      style={{ letterSpacing: "0.4px" }}
    >
      {children}
    </div>
  );
}

/** 3-line hamburger icon, matches the stroke style of ChevronRight /
 *  CheckIcon used elsewhere in the app (2px currentColor). */
function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5h14M3 10h14M3 15h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Close X, same stroke family as MenuIcon. */
function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
