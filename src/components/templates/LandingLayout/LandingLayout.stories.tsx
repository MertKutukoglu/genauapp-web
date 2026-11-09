import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingLayout } from "./LandingLayout";
import { HeroLeftPanelPhone } from "@/components/organisms/HeroLeftPanel/HeroLeftPanelPhone";
import { CarouselShell } from "@/components/organisms/CarouselShell/CarouselShell";
import { WorkoutSlide } from "@/components/organisms/slides/WorkoutSlide/WorkoutSlide";
import { PracticeSlide } from "@/components/organisms/slides/PracticeSlide/PracticeSlide";
import { ProgressSlide } from "@/components/organisms/slides/ProgressSlide/ProgressSlide";
import { PacksSlide } from "@/components/organisms/slides/PacksSlide/PacksSlide";

const meta: Meta = {
  title: "Templates/LandingLayout",
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktopWide" } },
};
export default meta;
type Story = StoryObj;

/** The full home page as it ships at `/` (minus the global topnav + footer). */
export const Landing: Story = {
  render: () => (
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
  ),
};

export const LandingMobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
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
  ),
};
