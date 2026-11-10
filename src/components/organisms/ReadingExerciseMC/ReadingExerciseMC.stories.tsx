import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReadingExerciseMC } from "./ReadingExerciseMC";

const meta: Meta<typeof ReadingExerciseMC> = {
  title: "Organisms/ReadingExerciseMC",
  component: ReadingExerciseMC,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The Reading chip's multiple-choice exercise card. Topic eyebrow (plain text, no badge) + full German question + 4 vertical options. Options auto-grow to accommodate full-sentence answers; font 15 semi-bold (one step smaller than Grammar MC). Explanation on wrong may quote passage excerpts.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ReadingExerciseMC>;

export const MainIdea: Story = {
  args: {
    topic: "Main idea",
    prompt: "Was macht Max am Samstag?",
    options: [
      "Er bleibt zu Hause und entspannt sich.",
      "Er arbeitet im Büro.",
      "Er geht spazieren.",
      "Er fährt in die Stadt.",
    ],
    correctIndex: 0,
    explanation:
      'The text opens with "Am Samstag bleibt er zu Hause", he stays home and relaxes.',
    qType: "Main Idea",
    current: 1,
    total: 5,
  },
};

export const Detail: Story = {
  args: {
    topic: "Detail",
    prompt: "Wie alt ist Anna?",
    options: ["acht", "zehn", "zwölf", "achtzehn"],
    correctIndex: 1,
    explanation: '"Anna ist zehn Jahre alt und geht in die Schule."',
    qType: "Detail",
    current: 2,
    total: 5,
  },
};

export const Inference: Story = {
  args: {
    topic: "Inference",
    prompt: "Warum bleibt Max wahrscheinlich zu Hause?",
    options: [
      "Das Wetter ist schlecht.",
      "Er ist krank.",
      "Er hat Besuch.",
      "Er hat keine Zeit.",
    ],
    correctIndex: 0,
    explanation:
      '"Heute ist das Wetter schlecht, es regnet den ganzen Tag." The rain explains the stay-home mood.',
    qType: "Inference",
    current: 4,
    total: 5,
  },
};

export const Sequence: Story = {
  args: {
    topic: "Sequence",
    prompt: "Was macht Max zuerst am Samstag?",
    options: [
      "einen Kaffee trinken",
      "mit Anna telefonieren",
      "eine Suppe kochen",
      "einen Film sehen",
    ],
    correctIndex: 0,
    explanation:
      'The morning sentence says "Morgens trinkt er einen Kaffee", this comes first in the day.',
    qType: "Sequence",
    current: 5,
    total: 5,
  },
};
