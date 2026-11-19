"use client";

import * as React from "react";
import { clsx } from "@/lib/utils/clsx";
import type { DictLocale } from "./types";
import { useTranslationLangControls } from "./TranslationLangContext";

/**
 * TranslationLangToggle, the compact two-option switch that
 * controls the translation language across the dictionary surface.
 * A sliding black pill moves between the two options with a
 * smooth 220ms ease, each option wears a small flag glyph +
 * two-letter language code.
 *
 * Fixed width inner columns via grid-cols-2 so the sliding pill
 * can translate by exactly 100% of its own width and land flush
 * on the opposite side (no sub-pixel drift between TR and EN).
 *
 * Styling respects dark mode: the active fill uses --fg (dark in
 * light theme, soft white in dark theme) and the active label
 * text uses --surface-card (inverted contrast). The flag SVGs
 * stay in their brand colours, never inverted.
 */

export interface TranslationLangToggleProps {
  className?: string;
}

export function TranslationLangToggle({
  className,
}: TranslationLangToggleProps) {
  const { lang, setLang } = useTranslationLangControls();
  return (
    <div
      role="group"
      aria-label="Translation language"
      className={clsx(
        "relative inline-grid grid-cols-2 p-1 rounded-full",
        className,
      )}
      style={{
        background: "var(--surface-sunk)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Sliding selector pill. Translates by 100% of its own
          width to land flush on the right column when EN is
          active. */}
      <div
        aria-hidden
        className="absolute top-1 bottom-1 left-1 rounded-full"
        style={{
          width: "calc(50% - 4px)",
          background: "var(--fg)",
          transform: lang === "tr" ? "translateX(0)" : "translateX(100%)",
          transition:
            "transform 220ms cubic-bezier(0.4, 0, 0.2, 1), background-color 160ms ease",
        }}
      />
      <ToggleButton
        active={lang === "tr"}
        onClick={() => setLang("tr")}
        aria-label="Çevirileri Türkçe göster"
      >
        <FlagTr className="w-[18px] h-[13px]" />
        <span>TR</span>
      </ToggleButton>
      <ToggleButton
        active={lang === "en"}
        onClick={() => setLang("en")}
        aria-label="Show translations in English"
      >
        <FlagEn className="w-[18px] h-[13px]" />
        <span>EN</span>
      </ToggleButton>
    </div>
  );
}

/* ---------- Button cell ---------- */

function ToggleButton({
  active,
  onClick,
  children,
  "aria-label": ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  "aria-label": string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={clsx(
        "relative z-10 inline-flex items-center justify-center gap-1.5",
        "px-3.5 py-1.5 rounded-full",
        "font-sans font-bold text-[12px]",
        "transition-colors duration-200",
        "outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
      )}
      style={{
        color: active ? "var(--surface-card)" : "var(--fg-muted)",
        // Slight letter spacing on the 2-letter label so it reads
        // as a label, not shouting.
        letterSpacing: "0.3px",
      }}
    >
      {children}
    </button>
  );
}

/* ---------- Flag SVGs ---------- */

/** Turkish flag, simplified crescent + 5-point star on red. */
function FlagTr({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={clsx("inline-block shrink-0 rounded-[2px]", className)}
      style={{
        boxShadow: "0 0 0 0.5px color-mix(in srgb, var(--fg) 20%, transparent)",
      }}
      aria-hidden
    >
      <rect width="60" height="40" fill="#E30A17" />
      {/* Crescent: outer white disc minus inner red disc offset
          slightly to the right. */}
      <circle cx="21" cy="20" r="8.5" fill="#FFFFFF" />
      <circle cx="24" cy="20" r="6.8" fill="#E30A17" />
      {/* Five-point star centred around (34, 20) with outer ~5,
          inner ~2. */}
      <polygon
        points="34,15 35.6,18.8 39.8,18.8 36.4,21.2 37.6,25 34,22.6 30.4,25 31.6,21.2 28.2,18.8 32.4,18.8"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/** Union Jack, simplified Scottish saltire + Irish diagonals +
 *  St. George cross. Doesn't aim for strict heraldic accuracy
 *  at 18x13; reads as "UK flag" at a glance, which is what the
 *  toggle needs. */
function FlagEn({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={clsx("inline-block shrink-0 rounded-[2px]", className)}
      style={{
        boxShadow: "0 0 0 0.5px color-mix(in srgb, var(--fg) 20%, transparent)",
      }}
      aria-hidden
    >
      {/* Clip everything to the flag rect so diagonals don't
          bleed over the rounded corners. */}
      <defs>
        <clipPath id="flag-en-clip">
          <rect width="60" height="40" rx="2" ry="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-en-clip)">
        <rect width="60" height="40" fill="#012169" />
        {/* White saltire (diagonals). */}
        <path
          d="M0 0 L60 40 M60 0 L0 40"
          stroke="#FFFFFF"
          strokeWidth="8"
        />
        {/* Red diagonals on top of the white saltire. */}
        <path
          d="M0 0 L60 40 M60 0 L0 40"
          stroke="#C8102E"
          strokeWidth="3.5"
        />
        {/* White cross (vertical + horizontal). */}
        <path
          d="M30 0 L30 40 M0 20 L60 20"
          stroke="#FFFFFF"
          strokeWidth="11"
        />
        {/* Red cross on top. */}
        <path
          d="M30 0 L30 40 M0 20 L60 20"
          stroke="#C8102E"
          strokeWidth="6"
        />
      </g>
    </svg>
  );
}
