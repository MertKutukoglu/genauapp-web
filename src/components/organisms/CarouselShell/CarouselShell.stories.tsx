import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CarouselShell } from "./CarouselShell";
import { WorkoutSlide } from "@/components/organisms/slides/WorkoutSlide/WorkoutSlide";
import { PracticeSlide } from "@/components/organisms/slides/PracticeSlide/PracticeSlide";

const meta: Meta<typeof CarouselShell> = {
  title: "Organisms/CarouselShell",
  component: CarouselShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
};
export default meta;
type Story = StoryObj<typeof CarouselShell>;

/**
 * Slides 1 (Workout) and 2 (Practice) are live. Slides 3-4 land in the
 * next passes and show dashed placeholders until then.
 *
 * Dwell times match the inner cyclers:
 *   Workout  → 6 chips × 2.6s = 15.6s
 *   Practice → 9 snippets × 2.8s = 25.2s
 */
export const WorkoutAndPractice: Story = {
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
            dwellMs: 6000,
            render: () => <Placeholder label="Your Progress — next pass" />,
          },
          {
            id: "packs",
            dwellMs: 6000,
            render: () => <Placeholder label="Packs — next pass" />,
          },
        ]}
      />
    </div>
  ),
};

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full min-h-[520px] items-center justify-center rounded-3xl border border-dashed border-border bg-surface-card text-center text-fg-faint">
      <p className="font-display text-xl">{label}</p>
    </div>
  );
}
