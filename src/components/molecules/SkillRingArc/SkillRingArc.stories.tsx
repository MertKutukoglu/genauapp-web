import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SkillRingArc } from "./SkillRingArc";

const meta: Meta<typeof SkillRingArc> = {
  title: "Molecules/SkillRingArc",
  component: SkillRingArc,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "desktop" },
  },
};
export default meta;
type Story = StoryObj<typeof SkillRingArc>;

export const Default: Story = {
  render: () => (
    <div className="bg-bg p-10">
      <SkillRingArc />
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="bg-bg p-10">
      <SkillRingArc size="sm" />
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div className="bg-bg p-10">
      <SkillRingArc size="lg" />
    </div>
  ),
};
