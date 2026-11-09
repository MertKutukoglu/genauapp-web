import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { LevelPicker } from "./LevelPicker";
import type { CEFRLevel } from "@/components/atoms/LevelButton/LevelButton";

const meta: Meta<typeof LevelPicker> = {
  title: "Templates/LevelPicker",
  component: LevelPicker,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The gateway screen between landing and /try/. Four CEFR cards in a 4-col → 2-col → 1-col grid (at 820px and 480px breakpoints). Tapping a level fires `onSelect`; the parent routes into the demo tuned to that level.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LevelPicker>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Fresh picker. Hover any card to see the lift + accent border; click fires `onSelect`.",
      },
    },
  },
};

export const Preselected: Story = {
  args: {
    selected: "B1",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A level is already chosen — useful for the return-visitor path where the last pick is persisted.",
      },
    },
  },
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [picked, setPicked] = React.useState<CEFRLevel | null>(null);
    return (
      <>
        <LevelPicker selected={picked} onSelect={setPicked} />
        <div
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            padding: "8px 14px",
            borderRadius: 999,
            background: "var(--surface-sunk)",
            border: "1px solid var(--border-strong)",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--fg-muted)",
          }}
        >
          Picked: <code>{picked ?? "null"}</code>
        </div>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click a card to select it; the ring + glow move. A small readout in the corner shows what the parent would route on.",
      },
    },
  },
};
