import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SampleSentence } from "./SampleSentence";

const meta: Meta<typeof SampleSentence> = {
  title: "Molecules/SampleSentence",
  component: SampleSentence,
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SampleSentence>;

export const Short: Story = { args: { sentence: "Ich esse Brot zum Frühstück." } };
export const Longer: Story = {
  args: {
    sentence:
      "Am Montagmorgen gehe ich immer zu Fuß zur Arbeit, auch wenn es regnet.",
  },
};
export const CustomLabel: Story = {
  args: {
    label: "Beispiel",
    sentence: "Die Katze schläft auf dem Sofa.",
  },
};
