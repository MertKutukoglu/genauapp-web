import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WordSection } from "./WordSection";

const meta: Meta<typeof WordSection> = {
  title: "Molecules/WordSection",
  component: WordSection,
  parameters: { layout: "centered" },
  argTypes: {
    article: { control: "select", options: [null, "der", "die", "das"] },
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof WordSection>;

/* Placeholder A1 words — Mert will swap for the curated demo deck. */

export const NounDas: Story = {
  args: { german: "Brot", english: "bread", article: "das" },
};
export const NounDer: Story = {
  args: { german: "Hund", english: "dog", article: "der" },
};
export const NounDie: Story = {
  args: { german: "Katze", english: "cat", article: "die" },
};
export const Verb: Story = {
  args: { german: "gehen", english: "to go (on foot)" },
};
export const LongGerman: Story = {
  args: {
    german: "Geschwindigkeitsbegrenzung",
    english: "speed limit",
    article: "die",
  },
  parameters: {
    docs: {
      description: {
        story: "Long compound noun (>15 chars) drops DE size to 24px.",
      },
    },
  },
};
export const LongEnglish: Story = {
  args: {
    german: "Entscheidung",
    english: "the act of deciding something formally",
    article: "die",
  },
  parameters: {
    docs: {
      description: {
        story: "Long English (>25 chars) drops EN size to 14px.",
      },
    },
  },
};
