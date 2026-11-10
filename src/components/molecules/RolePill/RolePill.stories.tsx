import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RolePill } from "./RolePill";

const meta: Meta<typeof RolePill> = {
  title: "Molecules/RolePill",
  component: RolePill,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One pill in the Sentence formula strip. Role-colored at 10% bg / 20% border, bold 16 label in the role color, muted regular 11 caption underneath. The label field supports a literal `\\n` for two-line pills (Possessiv + Nomen).",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 160 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof RolePill>;

export const Subject: Story = {
  args: { text: "Subjekt", translation: "Subject", caption: "Position 1", role: "subject" },
};
export const Verb: Story = {
  args: { text: "Verb", translation: "Verb", caption: "Position 2", role: "verb" },
};
export const Object_: Story = {
  args: { text: "Objekt", translation: "Object", caption: "Rest", role: "object" },
};
export const Time: Story = {
  args: { text: "Zeit", translation: "Time", caption: "When", role: "time" },
};
export const Place: Story = {
  args: { text: "Ort", translation: "Place", caption: "Where", role: "place" },
};
export const Qword: Story = {
  args: { text: "W-Wort", translation: "Question word", caption: "wo / was / wer", role: "qword" },
};
export const TwoLineLabel: Story = {
  args: {
    text: "Possessiv +\nNomen",
    translation: "Possessive +\nNoun",
    caption: "Who's",
    role: "object",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Possessivartikel formula wraps its object label over two lines. `whitespace-pre-line` renders the embedded newline — same treatment for the translation.",
      },
    },
  },
};
export const Turkish: Story = {
  args: {
    text: "Subjekt",
    translation: "Özne",
    caption: "Pozisyon 1",
    role: "subject",
  },
};
