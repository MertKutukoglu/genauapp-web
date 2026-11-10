import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarVerbConjugationCard } from "./GrammarVerbConjugationCard";

const meta: Meta<typeof GrammarVerbConjugationCard> = {
  title: "Organisms/GrammarVerbConjugationCard",
  component: GrammarVerbConjugationCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Grammar chip's `verbConjugation` Learn layout — regular verbs (gehen). Right column of the grid composes `stem · ending` with the stem muted and the ending bold + grammar purple, encoding the fixed/varying split in typography. Optional purple-tinted note card lands between the grid and the sample.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarVerbConjugationCard>;

export const Gehen: Story = {
  args: {
    verb: "gehen",
    english: "to go",
    note: "Regular verbs use six endings on a stable stem.",
    forms: [
      { pronoun: "ich", stem: "geh", ending: "e" },
      { pronoun: "du", stem: "geh", ending: "st" },
      { pronoun: "er / sie / es", stem: "geh", ending: "t" },
      { pronoun: "wir", stem: "geh", ending: "en" },
      { pronoun: "ihr", stem: "geh", ending: "t" },
      { pronoun: "sie / Sie", stem: "geh", ending: "en" },
    ],
    sample: {
      de: "Sie gehen nach Hause.",
      en: "They are going home.",
      highlight: "gehen",
    },
    current: 5,
    total: 5,
  },
};

export const WithoutNote: Story = {
  args: {
    verb: "spielen",
    english: "to play",
    forms: [
      { pronoun: "ich", stem: "spiel", ending: "e" },
      { pronoun: "du", stem: "spiel", ending: "st" },
      { pronoun: "er / sie / es", stem: "spiel", ending: "t" },
      { pronoun: "wir", stem: "spiel", ending: "en" },
      { pronoun: "ihr", stem: "spiel", ending: "t" },
      { pronoun: "sie / Sie", stem: "spiel", ending: "en" },
    ],
    sample: {
      de: "Er spielt Fußball.",
      en: "He plays football.",
      highlight: "spielt",
    },
    current: 5,
    total: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Same card without the note block — collapses cleanly when `note` is absent. Useful for later anchors where the stem/ending split speaks for itself.",
      },
    },
  },
};
