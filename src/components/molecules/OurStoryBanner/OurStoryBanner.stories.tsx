import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OurStoryBanner } from "./OurStoryBanner";

const meta: Meta<typeof OurStoryBanner> = {
  title: "Molecules/OurStoryBanner",
  component: OurStoryBanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "mobile1" } },
};
export default meta;
type Story = StoryObj<typeof OurStoryBanner>;

export const Mobile: Story = {};
