# GenauApp Web

Marketing landing (`/`) + 5-minute interactive taste demo (`/try`) for
[GenauApp](https://genauapp.com) — the iOS SwiftUI companion for refreshing
existing German.

## Stack

- **Next.js 16** (App Router, React Server Components where static, Client
  Components for interactive).
- **TypeScript strict**.
- **Tailwind CSS v4** with `@theme` for design tokens (see
  `src/app/globals.css`).
- **Zustand** with persistence middleware for the demo state.
- **Motion** (Framer Motion v12) for all motion.
- **MDX** for blog posts.
- **PostHog EU** + **Vercel Web Analytics** (both stay — existing
  dashboards depend on event names).
- **Deploy**: Vercel, custom domain `genauapp.com`.

## Getting started

```bash
cp .env.local.example .env.local   # then fill in real values
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    layout.tsx         Root layout, fonts, theme-toggle script, analytics
    page.tsx           Landing (Phase 3)
    globals.css        Design tokens (@theme)
    try/
      page.tsx         Taste demo entry (Phase 4+)
  lib/
    analytics/
      posthog-provider.tsx   Client-side PostHog boot + window.__track
      track.ts               Typed event wrapper
  store/
    taste-store.ts     Zustand store for the demo
content/
  exercises/           a1.json, a2.json, b1.json, b2.json — handoff §6
```

## Phased rebuild

See `claude/GenauApp_Web_Rebuild_Handoff.md` in the GenauApp Claude
project for the full plan. We are in **Phase 1 — Scaffold**.

| Phase | Description |
|---|---|
| 1 | Scaffold ✓ |
| 2 | Shared layout (topnav, footer, theme toggle, level badge) |
| 3 | Landing (hero, skill rings, pack cards, blog scaffold, legal) |
| 4 | Demo shell (LevelPicker, WorkoutShell, scene switching) |
| 5 | Learn layouts (WordCard, SentenceFormula, VerbParadigm, …) |
| 6 | Exercise types (ArticlePicker, Typing, FillBlank, MC, Builder) |
| 7 | Done flows (ChipDone, TasteSummary, collect motion) |
| 8 | Reading mode (Read tab + Exercise tab) |
| 9 | Content port (`content/exercises/a1.json` et al.) |
| 10 | Cutover (DNS + retire `_landing-deploy`) |

## Hard rules

Lifted from the rebuild handoff. Everything new must follow:

- **Commit before every significant change** — even "WIP: refactoring X".
- **No raw HTML string concatenation** for UI — JSX only.
- **No inline `<style>` blocks** — Tailwind + CSS Modules only.
- **Tokens are the ONLY source for color/space/radius/shadow/motion** —
  never a literal hex in a component.
- **No em-dashes (—)** in user-facing content. CI lints for this.
- **One dispatcher per domain** (`exerciseType` / `layout` switch), no
  inline per-case branches.
- **Design review before merge** — each component screenshotted against
  its iOS Swift reference view.

## Event catalog (PostHog + Vercel)

All 16 taste-demo event names — see
`src/lib/analytics/track.ts`. Rename nothing: existing dashboards depend
on them exactly.
