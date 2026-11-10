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
          "The Grammar chip's `articleCards` Learn layout — der / die / das side-by-side, now teaching **suffix → gender patterns** instead of three memorized noun pairs. Each column lists 2-4 reliable A1 noun endings with one example per row; a muted caveat beneath acknowledges the exceptions. The one Grammar layout where the article colors reclaim the surface instead of the chip's purple.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GrammarArticleCardsCard>;

const EN_ARTICLES = [
  {
    article: "der" as const,
    role: "masculine",
    patterns: [
      { suffix: "-er", example: "Lehrer" },
      { suffix: "-or", example: "Motor" },
      { suffix: "-ling", example: "Liebling" },
    ],
  },
  {
    article: "die" as const,
    role: "feminine",
    patterns: [
      { suffix: "-e", example: "Lampe" },
      { suffix: "-ung", example: "Zeitung" },
      { suffix: "-in", example: "Lehrerin" },
    ],
  },
  {
    article: "das" as const,
    role: "neuter",
    patterns: [
      { suffix: "-chen", example: "Mädchen" },
      { suffix: "-ment", example: "Dokument" },
      { suffix: "-um", example: "Datum" },
    ],
  },
];

export const Default: Story = {
  args: {
    headline: "Articles by noun ending",
    english: "endings that predict the gender",
    articles: EN_ARTICLES,
    caveat:
      "Endings are reliable, not absolute. Kinship terms (die Mutter, der Vater) and a handful of high-frequency nouns are exceptions.",
    sample: {
      de: "Die Zeitung ist neu.",
      en: "The newspaper is new.",
      highlight: "Die",
    },
    current: 4,
    total: 5,
  },
};

export const WithoutCaveat: Story = {
  args: {
    ...Default.args,
    caveat: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Same card without the caveat row — collapses cleanly when the content doesn't supply one. Not shipped at A1 (we always show the caveat there), but the component tolerates its absence.",
      },
    },
  },
};

export const Turkish: Story = {
  args: {
    headline: "Artikeller ve isim ekleri",
    english: "cinsiyeti öngören ekler",
    articles: EN_ARTICLES.map((card, i) => ({
      ...card,
      role: ["eril", "dişil", "nötr"][i],
    })),
    caveat:
      "Ekler güvenilirdir ama mutlak değildir. Akrabalık isimleri (die Mutter, der Vater) ve bazı yüksek frekanslı kelimeler istisnadır.",
    sample: {
      de: "Die Zeitung ist neu.",
      en: "Gazete yeni.",
      highlight: "Die",
    },
    current: 4,
    total: 5,
  },
};
