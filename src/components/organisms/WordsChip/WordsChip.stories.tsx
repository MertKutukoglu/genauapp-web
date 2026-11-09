import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WordsChip } from "./WordsChip";
import { WORDS_A1 } from "@/content/words-a1";

const meta: Meta<typeof WordsChip> = {
  title: "Organisms/WordsChip",
  component: WordsChip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The full Words-chip right-column experience: ModeToggle + current Learn card + Repeat/I-know mechanics + Learn completion + Exercise placeholder. The Learn card variant (normal / scrambled / chunkCompose) is picked per card via `pickLearnCardType`.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof WordsChip>;

export const FullDeck: Story = {
  args: { words: WORDS_A1 },
  parameters: {
    docs: {
      description: {
        story:
          "Full 20-item A1 deck. Each card picks its variant on mount (normal / scrambled / chunkCompose) — refresh the story to shuffle the walk.",
      },
    },
  },
};

export const StartsOnExercise: Story = {
  args: { words: WORDS_A1, initialMode: "exercise" },
};

export const SingleWord: Story = {
  args: { words: [WORDS_A1[0]] },
  parameters: {
    docs: {
      description: {
        story:
          "Deck of 1. Repeat leaves the card in slot 0 per spec; I-know completes the deck.",
      },
    },
  },
};

export const EmptyDeck: Story = {
  args: { words: [] },
};
