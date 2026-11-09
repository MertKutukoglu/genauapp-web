import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { ModeToggle, type WordsMode } from "./ModeToggle";

const meta: Meta<typeof ModeToggle> = {
  title: "Molecules/ModeToggle",
  component: ModeToggle,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Segmented Learn / Exercise pill. Sits above every Words-chip card (and other chips as they land). State-less — parent owns mode.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ModeToggle>;

export const LearnActive: Story = { args: { mode: "learn" } };
export const ExerciseActive: Story = { args: { mode: "exercise" } };

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [mode, setMode] = React.useState<WordsMode>("learn");
    return <ModeToggle mode={mode} onChange={setMode} />;
  },
};
