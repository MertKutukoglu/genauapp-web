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
          "Shared Learn-card frame for the Scrambled + ChunkCompose variants. Same layout as the iOS reference: toolbar, topic + prompt eyebrow, big English hero with inline speaker, slot row + tile pool + backspace. No sample, no rule, no action buttons — once the puzzle solves, the card auto-advances via `onIKnow` after ~900ms.",
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
    current: 3,
    total: 20,
  },
};

export const ScrambledLong: Story = {
  args: {
    mode: "scrambled",
    topic: "Relationships",
    word: "Freundin",
    english: "girlfriend / female friend",
    article: "die",
    current: 20,
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
    current: 14,
    total: 20,
  },
};

export const ChunkComposeThreeChunks: Story = {
  args: {
    mode: "chunkCompose",
    topic: "Daily items",
    word: "Schlüssel",
    english: "key",
    article: "der",
    chunks: ["Schlüs", "sel"],
    current: 5,
    total: 20,
  },
};
