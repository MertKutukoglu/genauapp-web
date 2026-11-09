import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CarouselShell } from "./CarouselShell";
import { WorkoutSlide } from "@/components/organisms/slides/WorkoutSlide/WorkoutSlide";
import { PracticeSlide } from "@/components/organisms/slides/PracticeSlide/PracticeSlide";
import { ProgressSlide } from "@/components/organisms/slides/ProgressSlide/ProgressSlide";
import { PacksSlide } from "@/components/organisms/slides/PacksSlide/PacksSlide";

const meta: Meta<typeof CarouselShell> = {
  title: "Organisms/CarouselShell",
  component: CarouselShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
};
export default meta;
type Story = StoryObj<typeof CarouselShell>;

/**
 * All four slides live:
 *   1. Workout  (6 chips × 2.6s  = 15.6s)
 *   2. Practice (9 snippets × 2.8s = 25.2s)
 *   3. Progress (4 cards × 2.5s   = 10.0s)
 *   4. Packs    (one marquee loop  ≈ 22s)
 *
 * Packs is static — dwell is one full marquee loop so the carousel
 * advances just after the second grid has visually replaced the first.
 */
export const AllSlides: Story = {
  render: () => (
    <div className="mx-auto w-[min(100%,680px)] p-6">
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
    </div>
  ),
};
