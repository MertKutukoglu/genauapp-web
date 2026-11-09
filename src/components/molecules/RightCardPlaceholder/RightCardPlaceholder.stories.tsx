import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RightCardPlaceholder } from "./RightCardPlaceholder";

const meta: Meta<typeof RightCardPlaceholder> = {
  title: "Molecules/RightCardPlaceholder",
  component: RightCardPlaceholder,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The /try/ right column's empty state. Shows the generic 'pick a workout' copy by default; with a `selectedChip` set, flips to a 'being wired up' stub for the chip whose session content hasn't landed yet.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720, minHeight: 520, display: "flex" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RightCardPlaceholder>;

export const Empty: Story = {};

export const WordsStub: Story = {
  args: { selectedChip: "words" },
  parameters: {
    docs: {
      description: {
        story:
          "A chip is selected but the session isn't built yet — placeholder flips to a per-chip stub.",
      },
    },
  },
};

export const GrammarStub: Story = {
  args: { selectedChip: "grammar" },
};
