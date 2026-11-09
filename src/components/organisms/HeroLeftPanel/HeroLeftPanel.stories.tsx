import type { Meta } from "@storybook/nextjs-vite";
import { HeroLeftPanelClassic } from "./HeroLeftPanelClassic";
import { HeroLeftPanelPhone } from "./HeroLeftPanelPhone";

/**
 * Two left-column variants for the landing hero.
 *
 * Classic — the original composition built in Phase 3.2 (SkillRingArc +
 * NodeGraph + headline + waitlist). Kept available for comparison.
 *
 * Phone  — new treatment: big Fraunces headline centered, PhoneFrame
 * wrapping a live AppHomeMockup in the middle, waitlist pinned below.
 * Content string identical to the classic variant.
 */

const meta: Meta = {
  title: "Organisms/HeroLeftPanel",
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
};
export default meta;

const halfWidth =
  "mx-auto flex min-h-[920px] w-[min(640px,50vw)] flex-col rounded-3xl border border-border bg-bg";

export const Classic = {
  render: () => (
    <div className={halfWidth}>
      <HeroLeftPanelClassic />
    </div>
  ),
};

export const Phone = {
  render: () => (
    <div className={halfWidth}>
      <HeroLeftPanelPhone />
    </div>
  ),
};

export const SideBySide = {
  name: "Side by side",
  parameters: { viewport: { defaultViewport: "desktopWide" } },
  render: () => (
    <div className="mx-auto grid min-h-[920px] max-w-[1440px] grid-cols-2 gap-6 p-6">
      <div className="flex flex-col rounded-3xl border border-border bg-bg">
        <p className="px-6 pt-4 text-xs uppercase tracking-wider text-fg-faint">Classic</p>
        <HeroLeftPanelClassic />
      </div>
      <div className="flex flex-col rounded-3xl border border-border bg-bg">
        <p className="px-6 pt-4 text-xs uppercase tracking-wider text-fg-faint">Phone</p>
        <HeroLeftPanelPhone />
      </div>
    </div>
  ),
};
