import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { SkillStrip } from "./SkillStrip";

const meta: Meta<typeof SkillStrip> = {
  title: "Molecules/SkillStrip",
  component: SkillStrip,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The row of four 54×54 skill badges that sits between the left card's subtitle and the chip list. Vocab · Gram · Read · Write (Listen excluded per spec). Hand it a `progress` map (0..1 per skill) and optional `pending` + `onCollect` props. Spec: `claude/GenauApp_Web_Try_ChipPicker_Brief.md` §8.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SkillStrip>;

export const Empty: Story = {
  args: {
    progress: { vocab: 0, grammar: 0, reading: 0, writing: 0 },
  },
};

export const MixedProgress: Story = {
  args: {
    progress: { vocab: 0.25, grammar: 0.5, reading: 0.75, writing: 1 },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Each badge fills one more segment than its neighbor so you can eyeball the sequential-segment fill at a glance.",
      },
    },
  },
};

export const Pending: Story = {
  args: {
    progress: { vocab: 0.25 },
    pending: { vocab: true, reading: true },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Two badges carry the cherry collect-me indicator. The pulse animation flows from the shared `.skill-pending` keyframes.",
      },
    },
  },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tapping a pending badge bumps it to 1.0 and clears pending. Approximates the production collect mechanic without any store wiring.",
      },
    },
  },
  render: function InteractiveStory() {
    const [progress, setProgress] = React.useState<Record<string, number>>({
      vocab: 0.25,
      grammar: 0,
      reading: 0,
      writing: 0,
    });
    const [pending, setPending] = React.useState<Record<string, boolean>>({
      vocab: true,
      grammar: true,
    });

    return (
      <SkillStrip
        progress={progress}
        pending={pending}
        onCollect={(skill) => {
          setProgress((p) => ({ ...p, [skill]: 1 }));
          setPending((pp) => ({ ...pp, [skill]: false }));
        }}
      />
    );
  },
};
