import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { WorkoutCounter } from "./WorkoutCounter";

const meta: Meta<typeof WorkoutCounter> = {
  title: "Atoms/WorkoutCounter",
  component: WorkoutCounter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The dumbbell pill on the /try/ left card header. Shows chip-completion count 0–4, bumps on every increment, flips to a green `--ok` tint at `count === total`. Spec: `claude/GenauApp_Web_Try_ChipPicker_Brief.md` §7.2.",
      },
    },
  },
  argTypes: {
    count: { control: { type: "range", min: 0, max: 6, step: 1 } },
    total: { control: { type: "range", min: 1, max: 6, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof WorkoutCounter>;

export const Zero: Story = {
  args: { count: 0 },
};

export const InProgress: Story = {
  args: { count: 2 },
};

export const Maxed: Story = {
  args: { count: 4 },
  parameters: {
    docs: {
      description: {
        story:
          "At `count === total` the pill switches to the `--ok` tint + full-opacity icon — signalling the demo is complete.",
      },
    },
  },
};

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The five snapshots side by side. Note the color + opacity jump at the last tile.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
      {[0, 1, 2, 3, 4].map((n) => (
        <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <WorkoutCounter count={n} />
          <span style={{ fontSize: 11, color: "var(--fg-faint)", fontFamily: "var(--font-body)" }}>
            {n === 4 ? "4 (maxed)" : `${n}`}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const LiveBump: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Press the button to bump the count. The spring scale fires on every change; at 4 the pill colors over, at 5+ it clamps at `total`.",
      },
    },
  },
  render: function LiveBumpStory() {
    const [n, setN] = React.useState(0);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <WorkoutCounter count={n} />
        <button
          type="button"
          onClick={() => setN((v) => v + 1)}
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            border: "1px solid var(--border-strong)",
            background: "transparent",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 13,
            color: "var(--fg)",
            cursor: "pointer",
          }}
        >
          Bump (+1)
        </button>
        <button
          type="button"
          onClick={() => setN(0)}
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            border: "1px solid var(--border-strong)",
            background: "transparent",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 13,
            color: "var(--fg-muted)",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    );
  },
};
