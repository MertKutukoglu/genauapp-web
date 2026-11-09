import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Topnav } from "./Topnav";
import { OurStoryBanner } from "@/components/molecules/OurStoryBanner/OurStoryBanner";

const meta: Meta<typeof Topnav> = {
  title: "Organisms/Topnav",
  component: Topnav,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof Topnav>;

export const Desktop: Story = {
  parameters: { viewport: { defaultViewport: "desktop" } },
  render: () => (
    <div className="min-h-[200px] bg-bg">
      <Topnav />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <div className="min-h-[200px] bg-bg">
      <Topnav />
      <OurStoryBanner />
    </div>
  ),
};

export const Tablet: Story = {
  parameters: { viewport: { defaultViewport: "tablet" } },
  render: () => (
    <div className="min-h-[200px] bg-bg">
      <Topnav />
    </div>
  ),
};
