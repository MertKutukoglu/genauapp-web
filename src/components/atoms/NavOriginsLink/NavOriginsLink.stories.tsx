import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavOriginsLink } from "./NavOriginsLink";

const meta: Meta<typeof NavOriginsLink> = {
  title: "Atoms/NavOriginsLink",
  component: NavOriginsLink,
  tags: ["autodocs"],
  parameters: { viewport: { defaultViewport: "desktop" } },
};
export default meta;
type Story = StoryObj<typeof NavOriginsLink>;

export const Default: Story = {};
