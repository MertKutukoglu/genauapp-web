import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WordChip } from "./WordChip";

const meta: Meta<typeof WordChip> = {
  title: "Molecules/WordChip",
  component: WordChip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The tappable word button inside the Sentence Exercise builder. Four render states: idle (pool), placed (teal bg + white text), correct (green tint), wrong (red tint). `locked` disables clicks without changing visuals — used post-check.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof WordChip>;

export const Idle: Story = { args: { text: "Brot.", state: "idle" } };
export const Placed: Story = { args: { text: "Brot.", state: "placed" } };
export const Correct: Story = { args: { text: "Brot.", state: "correct", locked: true } };
export const Wrong: Story = { args: { text: "Brot.", state: "wrong", locked: true } };
export const LongWord: Story = {
  args: { text: "Haarschnitt?", state: "idle" },
};
