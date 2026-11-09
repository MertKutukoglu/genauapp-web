"use client";

import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";
import { HeroLeftPanelPhone } from "@/components/organisms/HeroLeftPanel/HeroLeftPanelPhone";
import { CarouselShell } from "@/components/organisms/CarouselShell/CarouselShell";
import { WorkoutSlide } from "@/components/organisms/slides/WorkoutSlide/WorkoutSlide";
import { PracticeSlide } from "@/components/organisms/slides/PracticeSlide/PracticeSlide";
import { ProgressSlide } from "@/components/organisms/slides/ProgressSlide/ProgressSlide";
import { PacksSlide } from "@/components/organisms/slides/PacksSlide/PacksSlide";

/**
 * Landing page — the public home.
 *
 * Two-column desktop split (phone-forward hero on the left, auto-
 * advancing carousel on the right) that collapses to a single-column
 * stack on narrow viewports. Topnav, OurStoryBanner, and Footer are
 * provided by src/app/layout.tsx so this page only concerns itself
 * with the hero body.
 */
export default function LandingPage() {
  return (
    <LandingLayout
      left={<HeroLeftPanelPhone />}
      right={
        <CarouselShell
          slides={[
            {
              id: "workout",
              dwellMs: 6 * 2600,
              render: ({ isActive }) => <WorkoutSlide isActiveSlide={isActive} />,
            },
            {
              id: "practice",
              dwellMs: 9 * 2800,
              render: ({ isActive }) => <PracticeSlide isActiveSlide={isActive} />,
            },
            {
              id: "progress",
              dwellMs: 4 * 2500,
              render: ({ isActive }) => <ProgressSlide isActiveSlide={isActive} />,
            },
            {
              id: "packs",
              dwellMs: 22000,
              render: () => <PacksSlide />,
            },
          ]}
        />
      }
    />
  );
}
