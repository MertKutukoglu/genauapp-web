import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IOSBetaPill } from "./IOSBetaPill";

const meta: Meta<typeof IOSBetaPill> = {
  title: "Atoms/IOSBetaPill",
  component: IOSBetaPill,
  tags: ["autodocs"],
  argTypes: {
    narrow: { control: "inline-radio", options: ["rotate", "static"] },
  },
};
export default meta;
type Story = StoryObj<typeof IOSBetaPill>;

export const Default: Story = {
  args: { narrow: "rotate" },
  parameters: {
    docs: {
      description: {
        story:
          "Switch the viewport to mobile (iPhone SE) to see the rotator animation and the stripped-down pill treatment.",
      },
    },
  },
};

export const StaticNarrow: Story = {
  args: { narrow: "static" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
