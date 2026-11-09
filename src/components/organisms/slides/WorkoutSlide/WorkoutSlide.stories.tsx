import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkoutSlide } from "./WorkoutSlide";

const meta: Meta<typeof WorkoutSlide> = {
  title: "Organisms/Slides/WorkoutSlide",
  component: WorkoutSlide,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
  argTypes: {
    cycleMs: { control: { type: "range", min: 600, max: 4000, step: 200 } },
    streakDays: { control: { type: "number", min: 0, max: 365 } },
  },
  args: { cycleMs: 1600, streakDays: 7 },
};
export default meta;
type Story = StoryObj<typeof WorkoutSlide>;

export const Playground: Story = {
  render: (args) => (
    <div className="mx-auto w-[min(100%,560px)] p-6">
      <WorkoutSlide {...args} />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div className="mx-auto w-[min(100%,420px)] p-3">
      <WorkoutSlide {...args} />
    </div>
  ),
};
