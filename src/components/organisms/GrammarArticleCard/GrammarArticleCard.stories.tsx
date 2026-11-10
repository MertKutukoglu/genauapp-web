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
      { suffix: "-ig", example: "Honig", gloss: { en: "honey", tr: "bal" } },
      { suffix: "-ling", example: "Schmetterling", gloss: { en: "butterfly", tr: "kelebek" } },
      { suffix: "-ismus", example: "Optimismus", gloss: { en: "optimism", tr: "iyimserlik" } },
      { suffix: "-or", example: "Motor", gloss: { en: "engine", tr: "motor" } },
      { suffix: "-ant", example: "Elefant", gloss: { en: "elephant", tr: "fil" } },
      { suffix: "-ich", example: "Teppich", gloss: { en: "carpet", tr: "halı" } },
      { suffix: "-er", example: "Lehrer", gloss: { en: "teacher", tr: "öğretmen" } },
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
      { suffix: "-ung", example: "Zeitung", gloss: { en: "newspaper", tr: "gazete" } },
      { suffix: "-heit", example: "Freiheit", gloss: { en: "freedom", tr: "özgürlük" } },
      { suffix: "-keit", example: "Höflichkeit", gloss: { en: "politeness", tr: "nezaket" } },
      { suffix: "-schaft", example: "Freundschaft", gloss: { en: "friendship", tr: "arkadaşlık" } },
      { suffix: "-ei", example: "Bäckerei", gloss: { en: "bakery", tr: "fırın" } },
      { suffix: "-in", example: "Studentin", gloss: { en: "student (f)", tr: "öğrenci (kadın)" } },
      { suffix: "-ion", example: "Station", gloss: { en: "station", tr: "istasyon" } },
      { suffix: "-ität", example: "Universität", gloss: { en: "university", tr: "üniversite" } },
      { suffix: "-ik", example: "Musik", gloss: { en: "music", tr: "müzik" } },
      { suffix: "-ur", example: "Natur", gloss: { en: "nature", tr: "doğa" } },
      { suffix: "-e", example: "Lampe", gloss: { en: "lamp", tr: "lamba" } },
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
      { suffix: "-chen", example: "Mädchen", gloss: { en: "girl", tr: "kız çocuk" } },
      { suffix: "-lein", example: "Fräulein", gloss: { en: "young woman", tr: "genç kız" } },
      { suffix: "-ment", example: "Dokument", gloss: { en: "document", tr: "belge" } },
      { suffix: "-um", example: "Zentrum", gloss: { en: "center", tr: "merkez" } },
      { suffix: "-ma", example: "Thema", gloss: { en: "topic", tr: "konu" } },
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
