import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CounterPill } from "./CounterPill";

const meta: Meta<typeof CounterPill> = {
  title: "Atoms/CounterPill",
  component: CounterPill,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof CounterPill>;

export const Start: Story = { args: { current: 1, total: 5 } };
export const Mid: Story = { args: { current: 3, total: 5 } };
export const Last: Story = { args: { current: 5, total: 5 } };
