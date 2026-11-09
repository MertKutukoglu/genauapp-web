import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LevelButton } from "./LevelButton";

const meta: Meta<typeof LevelButton> = {
  title: "Atoms/LevelButton",
  component: LevelButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A single CEFR card on the /try/ level-picker gateway. Four active levels on the picker; the `soon` prop is kept in the API for future locked states.",
      },
    },
  },
  argTypes: {
    level: { control: "select", options: ["A1", "A2", "B1", "B2", "C1", "C2"] },
    soon: { control: "boolean" },
    selected: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LevelButton>;

export const Default: Story = {
  args: {
    level: "A1",
    label: "Starting out.",
    description:
      "Basic verbs, articles, days and meals. If you can say your name in German, this is for you.",
  },
};

export const Selected: Story = {
  args: {
    level: "B1",
    label: "Holding your own.",
    description:
      "Opinions, hypotheticals, longer stories. You can argue, explain, read articles.",
    selected: true,
  },
};

export const Soon: Story = {
  args: {
    level: "C1",
    label: "Advanced.",
    description: "Coming soon.",
    soon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `soon` variant mutes the card and swaps hover/click for a cursor-not-allowed state. Not used by the current picker (4 active levels only), but kept for future locked states.",
      },
    },
  },
};

export const FourSideBySide: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 820 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
      <LevelButton
        level="A1"
        label="Starting out."
        description="Basic verbs, articles, days and meals. If you can say your name in German, this is for you."
      />
      <LevelButton
        level="A2"
        label="Building routines."
        description="Past tense, weil/dass, reflexive verbs. You can describe your week, read a short note."
      />
      <LevelButton
        level="B1"
        label="Holding your own."
        description="Opinions, hypotheticals, longer stories. You can argue, explain, read articles."
      />
      <LevelButton
        level="B2"
        label="Getting fluent."
        description="Idioms, nuance, abstract topics. You could run a meeting in German if you had to."
      />
    </div>
  ),
};
