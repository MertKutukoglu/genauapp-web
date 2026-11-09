import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TryLayout } from "./TryLayout";
import { LeftCard } from "@/components/templates/LeftCard/LeftCard";
import { RightCardPlaceholder } from "@/components/molecules/RightCardPlaceholder/RightCardPlaceholder";

const meta: Meta<typeof TryLayout> = {
  title: "Templates/TryLayout",
  component: TryLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The /try/ page's two-column shell. 360px left + flex right on desktop, stacks on mobile. No chrome of its own — each slot owns its card frame.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TryLayout>;

export const EmptyRight: Story = {
  render: () => (
    <TryLayout
      left={<LeftCard />}
      right={<RightCardPlaceholder />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The default landing state right after the level picker. Left card ready, right card inviting the first tap.",
      },
    },
  },
};

export const WithChipStub: Story = {
  render: () => (
    <TryLayout
      left={<LeftCard />}
      right={<RightCardPlaceholder selectedChip="words" />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A chip is open but its session is still being wired up. Right card shows the per-chip stub; left card chip would carry the `selected` ring (not exercised here since the store isn't primed).",
      },
    },
  },
};
