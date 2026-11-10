import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { ChipList } from "./ChipList";
import { useChipStore } from "@/stores/chipStore";

const meta: Meta<typeof ChipList> = {
  title: "Organisms/ChipList",
  component: ChipList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The left card's chip picker body: 4 chips in a vertical stack, state read from `chipStore`, taps dispatch `openChip` through the store (and fire `demo_chip_opened` to PostHog). Sized to the 320px left-card column.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 320,
          padding: 20,
          borderRadius: 22,
          background: "var(--surface-card)",
          border: "1px solid var(--border)",
          boxShadow: "0 18px 44px -28px rgba(26,19,18,0.26)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChipList>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Fresh picker with all 4 chips in `active` state. Click any chip to select it (border + glow).",
      },
    },
  },
};

export const SeededAllDone: Story = {
  render: () => {
    // Prime the store before rendering so the picker shows all chips done.
    React.useEffect(() => {
      const s = useChipStore.getState();
      s.completeChip("words");
      s.completeChip("grammar");
      s.completeChip("sentence");
      s.completeChip("reading");
      return () => {
        useChipStore.getState().resetAll();
      };
    }, []);
    return <ChipList />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Prototype of the end-of-demo state: every chip done, every ✓ badge visible. Resets the store on unmount so other stories start clean.",
      },
    },
  },
};

export const WithSelection: Story = {
  render: () => {
    React.useEffect(() => {
      useChipStore.getState().openChip("grammar");
      return () => {
        useChipStore.getState().closeChip();
      };
    }, []);
    return <ChipList />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Grammar is selected; the other three stay at default. Verifies the border + box-shadow glow + solid icon slot per spec §3.1.",
      },
    },
  },
};
