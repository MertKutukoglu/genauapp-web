import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NodeGraph } from "./NodeGraph";

const meta: Meta<typeof NodeGraph> = {
  title: "Molecules/NodeGraph",
  component: NodeGraph,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "desktop" },
  },
  argTypes: {
    activeSkill: {
      control: "inline-radio",
      options: [undefined, "vocab", "grammar", "reading", "writing", "listening"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof NodeGraph>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto w-[600px] bg-bg p-6">
      <NodeGraph {...args} />
    </div>
  ),
};

export const HighlightReading: Story = {
  args: { activeSkill: "reading" },
  render: (args) => (
    <div className="mx-auto w-[600px] bg-bg p-6">
      <NodeGraph {...args} />
    </div>
  ),
};
