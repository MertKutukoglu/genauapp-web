import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrammarArticleCard } from "./GrammarArticleCard";

const meta: Meta<typeof GrammarArticleCard> = {
  title: "Organisms/GrammarArticleCard",
  component: GrammarArticleCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Grammar chip's `articleSingle` Learn layout — one article per card, so der / die / das get three dedicated cards in the Learn deck walked in authored order. The article is the hero in its own color (blue/red/green), followed by a sunk pattern panel listing suffix → example rows, an optional caveat, and a sample sentence with the article highlighted in its own color.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarArticleCard>;

export const Der: Story = {
  args: {
    article: "der",
    role: "masculine",
    patterns: [
      { suffix: "-er", example: "Lehrer" },
      { suffix: "-or", example: "Motor" },
      { suffix: "-ling", example: "Liebling" },
    ],
    caveat:
      "Endings are reliable, not absolute. Kinship (die Mutter) and a few high-frequency nouns are exceptions.",
    sample: {
      de: "Der Lehrer ist neu.",
      en: "The teacher is new.",
      highlight: "Der",
    },
    current: 4,
    total: 7,
  },
  parameters: {
    docs: {
      description: {
        story:
          "First of the three article anchors. Hero in `--color-article-der` (blue), pattern panel tinted with the same color, sample highlight in blue. The caveat ships on the der card only — the second and third cards skip it so the admonition doesn't repeat.",
      },
    },
  },
};

export const Die: Story = {
  args: {
    article: "die",
    role: "feminine",
    patterns: [
      { suffix: "-e", example: "Lampe" },
      { suffix: "-ung", example: "Zeitung" },
      { suffix: "-in", example: "Lehrerin" },
    ],
    sample: {
      de: "Die Zeitung ist neu.",
      en: "The newspaper is new.",
      highlight: "Die",
    },
    current: 5,
    total: 7,
  },
};

export const Das: Story = {
  args: {
    article: "das",
    role: "neuter",
    patterns: [
      { suffix: "-chen", example: "Mädchen" },
      { suffix: "-ment", example: "Dokument" },
      { suffix: "-um", example: "Datum" },
    ],
    sample: {
      de: "Das Mädchen ist nett.",
      en: "The girl is kind.",
      highlight: "Das",
    },
    current: 6,
    total: 7,
  },
};

export const DerTurkish: Story = {
  args: {
    article: "der",
    role: "eril",
    patterns: [
      { suffix: "-er", example: "Lehrer" },
      { suffix: "-or", example: "Motor" },
      { suffix: "-ling", example: "Liebling" },
    ],
    caveat:
      "Ekler güvenilirdir ama mutlak değildir. Akrabalık (die Mutter) ve birkaç yüksek frekanslı kelime istisnadır.",
    sample: {
      de: "Der Lehrer ist neu.",
      en: "Öğretmen yeni.",
      highlight: "Der",
    },
    current: 4,
    total: 7,
  },
};
