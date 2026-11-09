import * as React from "react";
import type { Skill } from "./SkillRing";

/**
 * SkillBadgeArt — the per-skill illustration drawn at the center of a
 * SegmentedSkillRing. Ported verbatim from
 * `claude/GenauApp_Web_SkillBadges_SVG.md`, which itself mirrors the
 * iOS *TierBadge.swift files.
 *
 * All art lives inside an 86x86 viewBox and is translated to the center
 * (43, 43) with its native tilt. Drop into a parent <svg viewBox="0 0 86 86">.
 */

export function SkillBadgeArt({ skill }: { skill: Skill }) {
  switch (skill) {
    case "vocab":
      // VocabLernerBadge — closed book, pink cover, -5° tilt
      return (
        <g transform="translate(43 43) rotate(-5)">
          <ellipse cx="0" cy="22" rx="12" ry="1.5" fill="rgba(0,0,0,0.15)" />
          <rect x="-9" y="-19" width="20" height="38" rx="1" fill="#FAF7F0" />
          <rect x="-10" y="-19" width="18" height="38" rx="1" fill="#EC4899" />
          <rect x="6.5" y="-19" width="1.5" height="38" fill="#BE185D" fillOpacity="0.4" />
          <rect x="-7.5" y="-12.9" width="13" height="1.8" fill="white" fillOpacity="0.9" />
          <rect x="-7.5" y="-8.6" width="9" height="1.2" fill="white" fillOpacity="0.7" />
          <rect x="-7.5" y="9.6" width="6" height="0.8" fill="white" fillOpacity="0.5" />
        </g>
      );
    case "grammar":
      // GrammarLernerBadge — hollow purple set-square, hatch marks, -6°
      return (
        <g transform="translate(43 43) rotate(-6)">
          <polygon points="-18,18 18,18 -18,-18" fill="#8B5CF6" />
          <polygon points="-16,16 4,16 -16,-4" fill="#EDE9FE" fillOpacity="0.6" />
          {[-11, -7.5, -4, -0.5, 3, 6.5, 10].map((p, i) => (
            <g key={i} transform={`translate(${p} ${p}) rotate(45)`}>
              <rect x="-1" y="-0.3" width="2" height="0.6" fill="white" fillOpacity="0.85" />
            </g>
          ))}
          {[-14.3, -10.3, -6.3, -2.3, 1.7, 5.7].map((x, i) => (
            <rect key={i} x={x} y="14.4" width="0.6" height="2.2" fill="white" fillOpacity="0.85" />
          ))}
        </g>
      );
    case "reading":
      // ReadLernerBadge — unfolded newspaper, blue palette, -4° tilt
      return (
        <g transform="translate(43 43) rotate(-4)">
          <rect x="-14.5" y="-17.5" width="32" height="38" rx="0.5" fill="black" fillOpacity="0.12" />
          <rect x="-16" y="-19" width="32" height="38" rx="0.5" fill="#FAF7F0" />
          <rect x="-16" y="-0.3" width="32" height="0.6" fill="#C9BA9E" fillOpacity="0.6" />
          <rect x="-12" y="-16.5" width="24" height="3" fill="#1E40AF" />
          <rect x="-7" y="-11.95" width="14" height="0.9" fill="#3B82F6" fillOpacity="0.7" />
          <rect x="-13" y="-8.9" width="26" height="1.8" fill="#1E40AF" />
          <g fill="#3B82F6" fillOpacity="0.55">
            {[-0.3, 1.3, 2.9, 4.5, 6.1, 7.7].flatMap((y) =>
              [-12.5, -3.5, 5.5].map((x) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="7" height="0.6" />
              )),
            )}
          </g>
          <rect x="-13" y="9" width="10" height="6" fill="#3B82F6" fillOpacity="0.3" />
        </g>
      );
    case "writing":
      // WritingAnfangerBadge — short worn pencil, -28° tilt
      return (
        <g transform="translate(43 43) rotate(-28)">
          <rect x="-8" y="-18" width="16" height="4" rx="1.5" fill="#E8A7B5" />
          <rect x="-8" y="-13" width="16" height="2.5" fill="#B8B8B8" />
          <rect x="-8" y="-8.5" width="16" height="14" fill="#C9956F" />
          <rect x="-4.3" y="-8.5" width="0.6" height="14" fill="#A67A52" fillOpacity="0.4" />
          <rect x="1.7" y="-8.5" width="0.6" height="14" fill="#A67A52" fillOpacity="0.4" />
          <polygon points="-8,5.5 8,5.5 0,13.5" fill="#E8C998" />
          <polygon points="-4,13.5 4,13.5 0,17.5" fill="#2A2A2A" />
        </g>
      );
    case "listening":
      // Listening is excluded from the demo per handoff; render a muted stand-in.
      return (
        <g transform="translate(43 43)">
          <circle r="14" fill="#F59E0B" fillOpacity="0.25" />
          <path
            d="M-10 -2a10 10 0 0 1 20 0v4"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x="-12" y="-2" width="5" height="10" rx="2" fill="#F59E0B" />
          <rect x="7" y="-2" width="5" height="10" rx="2" fill="#F59E0B" />
        </g>
      );
  }
}
