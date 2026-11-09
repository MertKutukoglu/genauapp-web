import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PracticeSlide } from "./PracticeSlide";

const meta: Meta<typeof PracticeSlide> = {
  title: "Organisms/CarouselShell/Practice",
  component: PracticeSlide,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
  argTypes: {
    cycleMs: { control: { type: "range", min: 600, max: 6000, step: 200 } },
    isActiveSlide: { control: "boolean" },
  },
  args: { cycleMs: 2800, isActiveSlide: true },
};
export default meta;
type Story = StoryObj<typeof PracticeSlide>;

export const Playground: Story = {
  render: (args) => (
    <div className="mx-auto w-[min(100%,620px)] bg-bg p-6">
      <PracticeSlide {...args} />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => (
    <div className="mx-auto w-[min(100%,420px)] bg-bg p-3">
      <PracticeSlide {...args} />
    </div>
  ),
};

export const Paused: Story = {
  args: { isActiveSlide: false },
  render: (args) => (
    <div className="mx-auto w-[min(100%,620px)] bg-bg p-6">
      <PracticeSlide {...args} />
      <p className="mt-4 text-center text-sm text-fg-muted">
        Paused — this story simulates when the slide isn&apos;t the carousel&apos;s active one.
      </p>
    </div>
  ),
};
