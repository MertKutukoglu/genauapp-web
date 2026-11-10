import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpeakerButton } from "./SpeakerButton";

const meta: Meta<typeof SpeakerButton> = {
  title: "Atoms/SpeakerButton",
  component: SpeakerButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "24×24 speaker icon. Click fires `SpeechSynthesisUtterance` with `lang: de-DE`. Disabled when `text` is empty. Flashes accent while speaking.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SpeakerButton>;

export const WithText: Story = { args: { text: "das Brot" } };
export const Disabled: Story = { args: { text: "" } };
