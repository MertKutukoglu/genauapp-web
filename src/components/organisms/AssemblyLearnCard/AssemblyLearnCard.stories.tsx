import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AssemblyLearnCard } from "./AssemblyLearnCard";

const meta: Meta<typeof AssemblyLearnCard> = {
  title: "Organisms/AssemblyLearnCard",
  component: AssemblyLearnCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Shared Learn card frame for the Scrambled + ChunkCompose variants. Same frame, different piece source. I-know stays disabled until the puzzle resolves.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof AssemblyLearnCard>;

export const ScrambledNoun: Story = {
  args: {
    mode: "scrambled",
    topic: "Food",
    word: "Brot",
    english: "bread",
    article: "das",
    rule: "Nouns ending in -brot are neuter → das.",
    example: "Ich esse ein Brot mit Käse.",
    current: 1,
    total: 20,
  },
};

export const ScrambledVerb: Story = {
  args: {
    mode: "scrambled",
    topic: "Motion verbs",
    word: "gehen",
    english: "to go (on foot)",
    rule: "Regular (weak) verb, ich gehe, du gehst, er geht.",
    example: "Ich gehe nach Hause.",
    current: 3,
    total: 20,
  },
};

export const ChunkComposeNoun: Story = {
  args: {
    mode: "chunkCompose",
    topic: "Family",
    word: "Familie",
    english: "family",
    article: "die",
    chunks: ["Fa", "mi", "lie"],
    rule: "Most nouns ending in -ie are feminine → die.",
    example: "Meine Familie wohnt in Berlin.",
    current: 2,
    total: 20,
  },
};

export const ChunkComposeVerb: Story = {
  args: {
    mode: "chunkCompose",
    topic: "Communication",
    word: "sprechen",
    english: "to speak",
    chunks: ["spre", "chen"],
    rule: "Strong verb, stem change in du/er: du sprichst, er spricht.",
    example: "Ich spreche Deutsch und Englisch.",
    current: 14,
    total: 20,
  },
};
