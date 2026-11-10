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
          "The Grammar chip's `articleSingle` Learn layout — one article per card, so der / die / das get three dedicated cards in the Learn deck walked in authored order. The article is the hero in its own color (blue/red/green), the suffix list sits in a tinted sunk panel, and the shared `RuleCard` beneath carries the \"by meaning\" categories that also take this article (days/months → der, numbers/flowers → die, infinitives/colors → das). RuleCard is article-tinted via its own `article` prop.",
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
      { suffix: "-ig", example: "Honig" },
      { suffix: "-ling", example: "Schmetterling" },
      { suffix: "-ismus", example: "Optimismus" },
      { suffix: "-or", example: "Motor" },
      { suffix: "-ant", example: "Elefant" },
      { suffix: "-ich", example: "Teppich" },
      { suffix: "-er", example: "Lehrer" },
    ],
    rule: "Days, months and seasons; weather; directions; alcoholic drinks; car brands are also masculine.",
    sample: {
      de: "Der Lehrer ist neu.",
      en: "The teacher is new.",
      highlight: "Der",
    },
    current: 4,
    total: 7,
  },
};

export const Die: Story = {
  args: {
    article: "die",
    role: "feminine",
    patterns: [
      { suffix: "-ung", example: "Zeitung" },
      { suffix: "-heit", example: "Freiheit" },
      { suffix: "-keit", example: "Höflichkeit" },
      { suffix: "-schaft", example: "Freundschaft" },
      { suffix: "-ei", example: "Bäckerei" },
      { suffix: "-in", example: "Studentin" },
      { suffix: "-ion", example: "Station" },
      { suffix: "-ität", example: "Universität" },
      { suffix: "-ik", example: "Musik" },
      { suffix: "-ur", example: "Natur" },
      { suffix: "-e", example: "Lampe" },
    ],
    rule: "Numbers; trees and flowers; ships and aircraft are also feminine.",
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
      { suffix: "-lein", example: "Fräulein" },
      { suffix: "-ment", example: "Dokument" },
      { suffix: "-um", example: "Zentrum" },
      { suffix: "-ma", example: "Thema" },
    ],
    rule: "Infinitives used as nouns (das Essen, das Lesen); colors (das Blau); metals (das Gold); fractions (das Drittel) are also neuter.",
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
    patterns: Der.args!.patterns,
    rule: "Gün, ay ve mevsimler; hava olayları; yönler; alkollü içecekler; araba markaları da erildir.",
    sample: {
      de: "Der Lehrer ist neu.",
      en: "Öğretmen yeni.",
      highlight: "Der",
    },
    current: 4,
    total: 7,
  },
};
