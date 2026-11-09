import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardToolbar } from "./CardToolbar";

const meta: Meta<typeof CardToolbar> = {
  title: "Molecules/CardToolbar",
  component: CardToolbar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The top row of every chip card — speaker on the left, counter on the right. Bookmark was dropped from the spec per Mert; no auth flow in the demo means a bookmark button would have nothing meaningful behind it.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof CardToolbar>;

export const Start: Story = { args: { speakText: "das Brot", current: 1, total: 5 } };
export const MidDeck: Story = { args: { speakText: "der Hund", current: 3, total: 5 } };
export const NoSpeakText: Story = { args: { current: 2, total: 5 } };
