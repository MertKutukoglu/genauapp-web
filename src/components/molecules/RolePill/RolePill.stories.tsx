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
  args: { text: "Subjekt", caption: "Position 1", role: "subject" },
};
export const Verb: Story = {
  args: { text: "Verb", caption: "Position 2", role: "verb" },
};
export const Object_: Story = {
  args: { text: "Objekt", caption: "Rest", role: "object" },
};
export const Time: Story = {
  args: { text: "Zeit", caption: "When", role: "time" },
};
export const Place: Story = {
  args: { text: "Ort", caption: "Where", role: "place" },
};
export const Qword: Story = {
  args: { text: "W-Wort", caption: "wo / was / wer", role: "qword" },
};
export const TwoLineLabel: Story = {
  args: {
    text: "Possessiv +\nNomen",
    caption: "Who's",
    role: "object",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Possessivartikel formula wraps its object label over two lines. `whitespace-pre-line` renders the embedded newline.",
      },
    },
  },
};
