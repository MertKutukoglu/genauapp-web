import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RuleCard } from "./RuleCard";

const meta: Meta<typeof RuleCard> = {
  title: "Molecules/RuleCard",
  component: RuleCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Article-tinted rule explanation with lightbulb. Shared across Words / Sentence / Grammar chips. Verbs fall back to the cherry accent tint.",
      },
    },
  },
  argTypes: {
    article: { control: "select", options: [null, "der", "die", "das"] },
  },
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof RuleCard>;

export const Das: Story = {
  args: { article: "das", body: "Nouns ending in -brot are neuter. → das Brot." },
};
export const Der: Story = {
  args: { article: "der", body: "Most male animals take der. → der Hund." },
};
export const Die: Story = {
  args: { article: "die", body: "Nouns ending in -e are usually die. → die Katze." },
};
export const Verb: Story = {
  args: { body: "Movement verbs use sein as auxiliary in Perfekt." },
  parameters: {
    docs: {
      description: {
        story: "No article → falls back to the cherry accent tint for verbs/adj/adv.",
      },
    },
  },
};
export const LongRule: Story = {
  args: {
    article: "die",
    body: "Nouns ending in -ung, -heit, -keit, -schaft are feminine. The word wraps across lines and the lightbulb stays pinned to the right.",
  },
};
