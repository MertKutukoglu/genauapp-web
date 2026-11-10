"use client";

import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";
import { HeroLeftPanelPhone } from "@/components/organisms/HeroLeftPanel/HeroLeftPanelPhone";
import { CarouselShell } from "@/components/organisms/CarouselShell/CarouselShell";
import { WorkoutSlide } from "@/components/organisms/slides/WorkoutSlide/WorkoutSlide";
import { PracticeSlide } from "@/components/organisms/slides/PracticeSlide/PracticeSlide";
import { ProgressSlide } from "@/components/organisms/slides/ProgressSlide/ProgressSlide";
import { PacksSlide } from "@/components/organisms/slides/PacksSlide/PacksSlide";

/**
 * TrLandingClient — the TR landing's interactive body.
 *
 * Mirrors the EN `app/page.tsx` composition exactly: same layout, same
 * hero, same carousel with the same four slides and dwell timings. The
 * slides + chrome read their copy from the i18n dictionary via
 * `useLocale`; the pathname being `/tr` is all they need to pick up
 * the Turkish strings, which is why no `locale` prop is threaded here.
 *
 * Kept as a thin split from `page.tsx` so the server page can own
 * metadata (locale-specific title, description, OG URL) without
 * crossing the "use client" boundary.
 */

export function TrLandingClient() {
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
