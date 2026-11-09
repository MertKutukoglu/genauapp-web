import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "SOON",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "accent", "ok", "muted"],
    },
    size: {
      control: "inline-radio",
      options: ["xs", "sm"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { tone: "neutral" } };
export const Accent: Story = { args: { tone: "accent", children: "A1" } };
export const Ok: Story = { args: { tone: "ok", children: "Done" } };
export const Muted: Story = { args: { tone: "muted" } };

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="accent">A1</Badge>
      <Badge tone="ok">Done</Badge>
      <Badge tone="muted">Muted</Badge>
    </div>
  ),
};
