import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DoneBadge } from "./DoneBadge";

const meta: Meta<typeof DoneBadge> = {
  title: "Atoms/DoneBadge",
  component: DoneBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The 22×22 green tick that sits at the bottom-right of a completed chip in the /try/ picker. Positioning is the parent's job — here it just renders standalone.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DoneBadge>;

export const Default: Story = {};

export const OnColoredSurface: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 48,
          borderRadius: 18,
          background: "color-mix(in srgb, #EC4899 14%, var(--surface-card))",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Rendered against a pink chip background to verify the 2px --surface-card ring reads cleanly as a cutout.",
      },
    },
  },
};
