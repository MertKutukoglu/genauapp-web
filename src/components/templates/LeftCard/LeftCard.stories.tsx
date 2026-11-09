import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { LeftCard } from "./LeftCard";
import { SkillStrip } from "@/components/molecules/SkillStrip/SkillStrip";
import { useChipStore } from "@/stores/chipStore";

const meta: Meta<typeof LeftCard> = {
  title: "Templates/LeftCard",
  component: LeftCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The /try/ page's sticky left column: `Your workout` title + `WorkoutCounter` + subtitle + (future SkillStrip) + `ChipList`. Reads the chip store directly; stories prime the store to walk through visual states. Spec: `claude/GenauApp_Web_Try_ChipPicker_Brief.md` §7 + §9.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          // Mock the right-card column alongside so the sticky + card
          // proportions read like the real /try/ grid.
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 20,
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        <Story />
        <div
          style={{
            minHeight: 520,
            borderRadius: 22,
            border: "1px dashed var(--border-strong)",
            background: "var(--surface-sunk)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--fg-faint)",
          }}
        >
          Right card (session renders here)
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LeftCard>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Fresh left card — counter at 0, every chip active. Tap a chip to see it flip to `selected`; the right card is a static placeholder here.",
      },
    },
  },
};

export const OneDone: Story = {
  render: () => {
    React.useEffect(() => {
      useChipStore.getState().completeChip("words");
      return () => useChipStore.getState().resetAll();
    }, []);
    return <LeftCard />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Counter at 1; Words chip shows its done state + ✓ badge, the other three stay active.",
      },
    },
  },
};

export const AllDone: Story = {
  render: () => {
    React.useEffect(() => {
      const s = useChipStore.getState();
      s.completeChip("words");
      s.completeChip("grammar");
      s.completeChip("sentence");
      s.completeChip("reading");
      return () => useChipStore.getState().resetAll();
    }, []);
    return <LeftCard />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "End-of-demo state. Counter maxes to the green tint; every chip carries its ✓ badge.",
      },
    },
  },
};

export const WithSelection: Story = {
  render: () => {
    React.useEffect(() => {
      useChipStore.getState().openChip("grammar");
      return () => useChipStore.getState().closeChip();
    }, []);
    return <LeftCard />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "A chip is open (Grammar). The border + glow + solid icon slot show; counter stays at 0 because nothing is done yet.",
      },
    },
  },
};

export const SkillStripWithProgress: Story = {
  render: () => (
    <LeftCard
      skillStrip={
        <SkillStrip
          progress={{ vocab: 0.5, grammar: 0.25, reading: 0.75, writing: 0.25 }}
        />
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Override the default empty strip with partial progress. Shows how the ring fill reads at a glance under the subtitle.",
      },
    },
  },
};

export const SkillStripWithPending: Story = {
  render: () => (
    <LeftCard
      skillStrip={
        <SkillStrip
          progress={{ vocab: 0.25, grammar: 0.5 }}
          pending={{ reading: true, writing: true }}
        />
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Two badges carry the cherry collect-me indicator to show the strip's attention state.",
      },
    },
  },
};

export const SkillStripSuppressed: Story = {
  render: () => <LeftCard skillStrip={null} />,
  parameters: {
    docs: {
      description: {
        story:
          "Passing `null` to `skillStrip` hides the row entirely — useful for surfaces that don't need the skills signal.",
      },
    },
  },
};
