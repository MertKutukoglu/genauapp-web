import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SceneCard } from "./SceneCard";
import { PackCard } from "@/components/atoms/PackCard/PackCard";

const meta: Meta<typeof SceneCard> = {
  title: "Molecules/SceneCard",
  component: SceneCard,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof SceneCard>;

export const Workout: Story = {
  render: () => (
    <SceneCard
      eyebrow="Workout"
      heading={
        <>
          Built from your <em className="not-italic text-accent italic">last performance.</em>
        </>
      }
      body="Yesterday's misses come back today. Today's wins get a rest. The workout is yours, not a template."
    >
      <div className="h-48 rounded-2xl border border-border bg-surface-card grid place-items-center text-fg-faint">
        [WorkoutCardMock slot]
      </div>
    </SceneCard>
  ),
};

export const PacksGrid: Story = {
  render: () => (
    <SceneCard
      eyebrow="Real life events"
      heading={
        <>
          Packs for the moments <em className="not-italic text-accent italic">you&apos;ll actually live.</em>
        </>
      }
      body="Haircut, Bürgeramt, pharmacy, groceries. Each pack holds the words that moment needs."
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {["Pharmacy & Doctor", "Food & Drink", "Shopping", "Daily Life", "Bürgeramt", "Hairdresser"].map(
          (t, i) => (
            <PackCard
              key={t}
              title={t}
              level={(["C1", "B1", "C2", "A1", "B2", "A2"] as const)[i]}
            />
          ),
        )}
      </div>
    </SceneCard>
  ),
};
