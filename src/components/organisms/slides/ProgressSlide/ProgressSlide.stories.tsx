import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressSlide } from "./ProgressSlide";

const meta: Meta<typeof ProgressSlide> = {
  title: "Organisms/Slides/ProgressSlide",
  component: ProgressSlide,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
  argTypes: {
    cycleMs: { control: { type: "range", min: 600, max: 6000, step: 200 } },
    isActiveSlide: { control: "boolean" },
  },
  args: { cycleMs: 2500, isActiveSlide: true },
};
export default meta;
type Story = StoryObj<typeof ProgressSlide>;

export const Playground: Story = {
  render: (args) => (
    <div className="mx-auto w-[min(100%,620px)] bg-bg p-6">
      <ProgressSlide {...args} />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div className="mx-auto w-[min(100%,420px)] bg-bg p-3">
      <ProgressSlide {...args} />
    </div>
  ),
};

export const Paused: Story = {
  args: { isActiveSlide: false },
  render: (args) => (
    <div className="mx-auto w-[min(100%,620px)] bg-bg p-6">
      <ProgressSlide {...args} />
    </div>
  ),
};
