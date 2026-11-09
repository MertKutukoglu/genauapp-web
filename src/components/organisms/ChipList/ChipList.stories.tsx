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

// Small dev toolbar so you can drive the store from Storybook without
// opening devtools. Not part of the shipped component — stories only.
function StoreTools() {
  const progress = useChipStore((s) => s.progress);
  const selected = useChipStore((s) => s.selected);
  const completeChip = useChipStore((s) => s.completeChip);
  const closeChip = useChipStore((s) => s.closeChip);
  const resetAll = useChipStore((s) => s.resetAll);

  return (
    <div
      style={{
        marginTop: 20,
        padding: 12,
        borderRadius: 10,
        background: "var(--surface-sunk)",
        fontFamily: "var(--font-body)",
        fontSize: 12,
        color: "var(--fg-muted)",
      }}
    >
      <div style={{ marginBottom: 8, fontWeight: 600, color: "var(--fg)" }}>
        Store
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
        <div>selected: <code>{selected ?? "null"}</code></div>
        <div>progress: <code>{JSON.stringify(progress)}</code></div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {(["words", "grammar", "sentence", "reading"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => completeChip(id)}
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid var(--border-strong)",
              background: "transparent",
              font: "inherit",
              color: "var(--fg)",
              cursor: "pointer",
            }}
          >
            Done: {id}
          </button>
        ))}
        <button
          type="button"
          onClick={closeChip}
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            border: "1px solid var(--border-strong)",
            background: "transparent",
            font: "inherit",
            color: "var(--fg)",
            cursor: "pointer",
          }}
        >
          Close selected
        </button>
        <button
          type="button"
          onClick={resetAll}
          style={{
            padding: "4px 10px",
            borderRadius: 999,
            border: "1px solid var(--border-strong)",
            background: "transparent",
            font: "inherit",
            color: "var(--fg)",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <>
      <ChipList />
      <StoreTools />
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Fresh picker with all 4 chips in `active` state. Click any chip to select it (border + glow), or use the toolbar below to mark chips done and see the ✓ badge + 10% tint treatment.",
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
    return (
      <>
        <ChipList />
        <StoreTools />
      </>
    );
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
    return (
      <>
        <ChipList />
        <StoreTools />
      </>
    );
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
