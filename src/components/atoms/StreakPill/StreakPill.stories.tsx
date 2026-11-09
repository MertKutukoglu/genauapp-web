import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StreakPill } from "./StreakPill";

const meta: Meta<typeof StreakPill> = {
  title: "Atoms/StreakPill",
  component: StreakPill,
  tags: ["autodocs"],
  args: { days: 7 },
};
export default meta;
export const Default: StoryObj<typeof StreakPill> = {};
