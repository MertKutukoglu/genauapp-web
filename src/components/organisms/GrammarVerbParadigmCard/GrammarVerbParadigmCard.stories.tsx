import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarVerbParadigmCard } from "./GrammarVerbParadigmCard";

const meta: Meta<typeof GrammarVerbParadigmCard> = {
  title: "Organisms/GrammarVerbParadigmCard",
  component: GrammarVerbParadigmCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Grammar chip's `verbParadigm` Learn layout — sein + haben. Centered verb (bold 32) + English gloss, 6-row ParadigmGrid, sample sentence with the paradigm row highlighted inside real syntax, Repeat / I know bottom-pinned.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarVerbParadigmCard>;

export const Sein: Story = {
  args: {
    verb: "sein",
    english: "to be",
    forms: [
      { pronoun: "ich", form: "bin" },
      { pronoun: "du", form: "bist" },
      { pronoun: "er / sie / es", form: "ist" },
      { pronoun: "wir", form: "sind" },
      { pronoun: "ihr", form: "seid" },
      { pronoun: "sie / Sie", form: "sind" },
    ],
    sample: { de: "Ich bin Student.", en: "I am a student.", highlight: "bin" },
    current: 1,
    total: 5,
  },
};

export const Haben: Story = {
  args: {
    verb: "haben",
    english: "to have",
    forms: [
      { pronoun: "ich", form: "habe" },
      { pronoun: "du", form: "hast" },
      { pronoun: "er / sie / es", form: "hat" },
      { pronoun: "wir", form: "haben" },
      { pronoun: "ihr", form: "habt" },
      { pronoun: "sie / Sie", form: "haben" },
    ],
    sample: { de: "Wir haben eine Katze.", en: "We have a cat.", highlight: "haben" },
    current: 2,
    total: 5,
  },
};
