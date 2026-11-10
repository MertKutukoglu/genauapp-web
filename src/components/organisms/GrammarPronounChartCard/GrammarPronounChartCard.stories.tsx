import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarPronounChartCard } from "./GrammarPronounChartCard";

const meta: Meta<typeof GrammarPronounChartCard> = {
  title: "Organisms/GrammarPronounChartCard",
  component: GrammarPronounChartCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Grammar chip's `pronounChart` Learn layout — the single Personal Pronouns anchor. 8-row ParadigmGrid mapping German pronouns to their English (or Turkish) glosses, sample sentence with the pronoun highlighted.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarPronounChartCard>;

const forms = [
  { german: "ich", english: "I" },
  { german: "du", english: "you" },
  { german: "er", english: "he" },
  { german: "sie", english: "she / they" },
  { german: "es", english: "it" },
  { german: "wir", english: "we" },
  { german: "ihr", english: "you (plural)" },
  { german: "Sie", english: "you (formal)" },
];

export const Default: Story = {
  args: {
    headline: "Personal pronouns",
    english: "who's doing what",
    forms,
    sample: { de: "Er ist mein Vater.", en: "He is my father.", highlight: "Er" },
    current: 3,
    total: 5,
  },
};

export const Turkish: Story = {
  args: {
    headline: "Kişi zamirleri",
    english: "kim ne yapıyor",
    forms: [
      { german: "ich", english: "ben" },
      { german: "du", english: "sen" },
      { german: "er", english: "o (erkek)" },
      { german: "sie", english: "o (kadın) / onlar" },
      { german: "es", english: "o (nötr)" },
      { german: "wir", english: "biz" },
      { german: "ihr", english: "siz" },
      { german: "Sie", english: "siz (resmî)" },
    ],
    sample: { de: "Er ist mein Vater.", en: "O babam.", highlight: "Er" },
    current: 3,
    total: 5,
  },
};
