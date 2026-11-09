import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkoutSlide } from "./WorkoutSlide";

const meta: Meta<typeof WorkoutSlide> = {
  title: "Organisms/Slides/WorkoutSlide",
  component: WorkoutSlide,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
  argTypes: {
    cycleMs: { control: { type: "range", min: 600, max: 5000, step: 200 } },
    isActiveSlide: { control: "boolean" },
  },
  args: { cycleMs: 2600, isActiveSlide: true },
};
export default meta;
type Story = StoryObj<typeof WorkoutSlide>;

export const Playground: Story = {
  render: (args) => (
    <div className="mx-auto w-[min(100%,620px)] bg-bg p-6">
      <WorkoutSlide {...args} />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div className="mx-auto w-[min(100%,420px)] bg-bg p-3">
      <WorkoutSlide {...args} />
    </div>
  ),
};

export const Paused: Story = {
  args: { isActiveSlide: false },
  render: (args) => (
    <div className="mx-auto w-[min(100%,620px)] bg-bg p-6">
      <WorkoutSlide {...args} />
      <p className="mt-4 text-center text-sm text-fg-muted">
        Cycling is paused — this story simulates when the slide isn&apos;t the
        active carousel slide. Click any chip to jump manually.
      </p>
    </div>
  ),
};
