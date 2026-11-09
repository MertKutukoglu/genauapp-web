import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CarouselShell } from "./CarouselShell";
import { WorkoutSlide } from "@/components/organisms/slides/WorkoutSlide/WorkoutSlide";

const meta: Meta<typeof CarouselShell> = {
  title: "Organisms/CarouselShell",
  component: CarouselShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
};
export default meta;
type Story = StoryObj<typeof CarouselShell>;

/**
 * Only Slide 1 (Workout) is wired in this phase. Slides 2-4 land in 3.3b-d.
 * The pager still renders four bars so the shell behavior is testable —
 * pressing them jumps to a blank "coming soon" slide.
 *
 * Dwell time for Workout is 15.6s (6 chips × 2.6s cycle) so each tick of
 * the inner chip cycler completes once before the carousel advances.
 */
export const Phase3_3a: Story = {
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
            dwellMs: 6000,
            render: () => <Placeholder label="Practice — Phase 3.3b" />,
          },
          {
            id: "progress",
            dwellMs: 6000,
            render: () => <Placeholder label="Your Progress — Phase 3.3c" />,
          },
          {
            id: "packs",
            dwellMs: 6000,
            render: () => <Placeholder label="Packs — Phase 3.3d" />,
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
