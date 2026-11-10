import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarArticleCardsCard } from "./GrammarArticleCardsCard";

const meta: Meta<typeof GrammarArticleCardsCard> = {
  title: "Organisms/GrammarArticleCardsCard",
  component: GrammarArticleCardsCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Grammar chip's `articleCards` Learn layout — der / die / das side-by-side. The one Grammar layout where the three article colors reclaim the surface instead of the chip's purple. Stacks vertically on narrow viewports.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarArticleCardsCard>;

export const Default: Story = {
  args: {
    headline: "Three definite articles",
    english: "every German noun carries one",
    articles: [
      { article: "der", role: "masculine", example: { de: "der Tisch", en: "the table" } },
      { article: "die", role: "feminine", example: { de: "die Lampe", en: "the lamp" } },
      { article: "das", role: "neuter", example: { de: "das Buch", en: "the book" } },
    ],
    sample: { de: "Das Buch ist neu.", en: "The book is new.", highlight: "Das" },
    current: 4,
    total: 5,
  },
};

export const Turkish: Story = {
  args: {
    headline: "Üç belirli artikel",
    english: "her Almanca ismin biri vardır",
    articles: [
      { article: "der", role: "eril", example: { de: "der Tisch", en: "the table" } },
      { article: "die", role: "dişil", example: { de: "die Lampe", en: "the lamp" } },
      { article: "das", role: "nötr", example: { de: "das Buch", en: "the book" } },
    ],
    sample: { de: "Das Buch ist neu.", en: "Kitap yeni.", highlight: "Das" },
    current: 4,
    total: 5,
  },
};
