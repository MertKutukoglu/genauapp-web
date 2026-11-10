import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarSampleSentence } from "./GrammarSampleSentence";

const meta: Meta<typeof GrammarSampleSentence> = {
  title: "Molecules/GrammarSampleSentence",
  component: GrammarSampleSentence,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grammar chip's sunk Sample Sentence block. Variants of the Words SampleSentence with (1) an in-sentence substring rendered bold + `--chip-grammar-color`, (2) an optional translation under the German line. Substring match is plain `indexOf`; missing highlight degrades gracefully to a plain sentence.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarSampleSentence>;

export const WithHighlightAndTranslation: Story = {
  args: {
    sentence: "Ich bin Student.",
    highlight: "bin",
    translation: "I am a student.",
  },
};

export const HighlightOnly: Story = {
  args: { sentence: "Wir haben eine Katze.", highlight: "haben" },
};

export const NoHighlight: Story = {
  args: {
    sentence: "Er ist mein Vater.",
    translation: "He is my father.",
  },
};

export const MissingHighlightSubstring: Story = {
  args: {
    sentence: "Das Buch ist neu.",
    highlight: "nicht-hier", // falls back to plain sentence, no throw
  },
  parameters: {
    docs: {
      description: {
        story:
          "When the highlight string does not appear in the sentence, the renderer falls back to a plain line rather than throwing — a content typo degrades gracefully.",
      },
    },
  },
};

export const Turkish: Story = {
  args: {
    sentence: "Sie gehen nach Hause.",
    highlight: "gehen",
    translation: "Eve gidiyorlar.",
  },
};
