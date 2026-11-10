import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReadingPassageCard } from "./ReadingPassageCard";

const meta: Meta<typeof ReadingPassageCard> = {
  title: "Organisms/ReadingPassageCard",
  component: ReadingPassageCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Reading chip's Read-mode card. One passage, prose on the card surface, cherry \"Try the questions →\" CTA. No sunk container around the passage per brief §3 — the passage IS the content. Toolbar's counter pill is hidden here since there's no deck position to show.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ReadingPassageCard>;

const PASSAGE =
  "Max ist achtundzwanzig Jahre alt und wohnt in Berlin. Am Samstag bleibt er zu Hause. Morgens trinkt er einen Kaffee und liest ein Buch. Heute ist das Wetter schlecht, es regnet den ganzen Tag. Um zwölf Uhr isst Max ein Brot mit Käse. Dazu trinkt er ein Glas Wasser. Am Nachmittag telefoniert er mit seiner Schwester Anna. Anna ist zehn Jahre alt und geht in die Schule. Später kocht Max eine Suppe und sieht einen Film. Es ist ein ruhiger Tag.";

export const Default: Story = {
  args: {
    title: "Ein Samstag bei Max",
    subtitle: "A1 · ~1 min read",
    passage: PASSAGE,
  },
};

export const Turkish: Story = {
  args: {
    title: "Ein Samstag bei Max",
    subtitle: "A1 · ~1 dk okuma",
    passage: PASSAGE,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Subtitle flips to the Turkish gloss; title and passage stay German because the passage IS the material being taught to read.",
      },
    },
  },
};

export const MultipleParagraphs: Story = {
  args: {
    title: "Sample multi-paragraph",
    subtitle: "A1 · ~2 min read",
    passage:
      "Max ist achtundzwanzig Jahre alt und wohnt in Berlin. Am Samstag bleibt er zu Hause.\n\nMorgens trinkt er einen Kaffee und liest ein Buch. Heute ist das Wetter schlecht, es regnet den ganzen Tag.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "If a future level ships multiple paragraphs, `\\n\\n` splits them into separate <p> elements with a small vertical gap. A1 content is a single paragraph.",
      },
    },
  },
};
