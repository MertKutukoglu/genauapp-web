import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { RightCardRouter } from "./RightCardRouter";
import { useChipStore, type ChipId } from "@/stores/chipStore";

/**
 * Router stories let you flick between the chip states without walking
 * the full LevelPicker → LeftCard flow every time. Each story seeds
 * the store on mount so the router renders the right branch.
 */

function SeedStore({ chip }: { chip: ChipId | null }) {
  const openChip = useChipStore((s) => s.openChip);
  const closeChip = useChipStore((s) => s.closeChip);
  React.useEffect(() => {
    if (chip) openChip(chip);
    else closeChip();
  }, [chip, openChip, closeChip]);
  return null;
}

function Shell({ chip }: { chip: ChipId | null }) {
  return (
    <div className="min-h-screen bg-bg p-6">
      <SeedStore chip={chip} />
      <div className="max-w-[720px] mx-auto">
        <RightCardRouter />
      </div>
    </div>
  );
}

const meta: Meta<typeof RightCardRouter> = {
  title: "Organisms/RightCardRouter",
  component: RightCardRouter,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof RightCardRouter>;

export const Idle: Story = {
  render: () => <Shell chip={null} />,
};

export const WordsSelected: Story = {
  render: () => <Shell chip="words" />,
};

export const GrammarStub: Story = {
  render: () => <Shell chip="grammar" />,
};

export const SentenceStub: Story = {
  render: () => <Shell chip="sentence" />,
};

export const ReadingStub: Story = {
  render: () => <Shell chip="reading" />,
};
