import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NormalLearnCard } from "./NormalLearnCard";

const meta: Meta<typeof NormalLearnCard> = {
  title: "Organisms/NormalLearnCard",
  component: NormalLearnCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The full Words-chip Learn card. Six blocks: toolbar · word · (verb tags) · (sample) · (rule) · actions. Optional blocks collapse cleanly when their data is missing.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof NormalLearnCard>;

/* Placeholder A1 words — Mert will swap for the curated demo deck. */

export const NounDas: Story = {
  args: {
    german: "Brot",
    english: "bread",
    article: "das",
    rule: "Nouns ending in -brot are neuter. → das Brot.",
    example: "Ich esse Brot zum Frühstück.",
    current: 1,
    total: 5,
  },
};

export const NounDer: Story = {
  args: {
    german: "Hund",
    english: "dog",
    article: "der",
    rule: "Most male animals take der. → der Hund.",
    example: "Der Hund schläft im Garten.",
    current: 2,
    total: 5,
  },
};

export const NounDie: Story = {
  args: {
    german: "Katze",
    english: "cat",
    article: "die",
    rule: "Nouns ending in -e are usually die. → die Katze.",
    example: "Die Katze trinkt Milch.",
    current: 3,
    total: 5,
  },
};

export const VerbWithTag: Story = {
  args: {
    german: "gehen",
    english: "to go (on foot)",
    grammarTags: ["aux-sein"],
    rule: "Movement verbs use sein as auxiliary in Perfekt.",
    example: "Ich gehe zur Arbeit.",
    current: 4,
    total: 5,
  },
};

export const VerbReflexive: Story = {
  args: {
    german: "sich freuen",
    english: "to be happy",
    grammarTags: ["reflexive"],
    rule: "sich freuen is reflexive. It always needs sich.",
    example: "Ich freue mich auf das Wochenende.",
    current: 5,
    total: 5,
  },
};

export const Minimal: Story = {
  args: {
    german: "Brot",
    english: "bread",
    article: "das",
    current: 1,
    total: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Word with no rule, no example, no tags — just the required blocks. Shows the card doesn't need to be fully populated to feel complete.",
      },
    },
  },
};
