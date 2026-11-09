import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SlideHead } from "./SlideHead";

const meta: Meta<typeof SlideHead> = {
  title: "Molecules/SlideHead",
  component: SlideHead,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof SlideHead>;

export const Workout: Story = {
  render: () => (
    <SlideHead
      eyebrow="Workout"
      headline={
        <>
          Built from your <em>last performance.</em>
        </>
      }
      sub="Yesterday's misses come back today. Today's wins get a rest. The workout is yours, not a template."
    />
  ),
};

export const Practice: Story = {
  render: () => (
    <SlideHead
      eyebrow="Practice"
      headline={
        <>
          The same word, <em>in every room you enter.</em>
        </>
      }
      sub="Pick it up in Words, meet it again in a Reading passage, hear it in a Story, build a sentence with it."
    />
  ),
};

export const Progress: Story = {
  render: () => (
    <SlideHead
      eyebrow="Your progress"
      headline={
        <>
          You see where you stand. <em>Honestly.</em>
        </>
      }
      sub="A real score per skill. Up when you earn it. Down when you miss it. Every time, we tell you what moved."
    />
  ),
};

export const Packs: Story = {
  render: () => (
    <SlideHead
      eyebrow="Real life events"
      headline={
        <>
          Packs for the moments <em>you&apos;ll actually live.</em>
        </>
      }
      sub="Haircut, Bürgeramt, pharmacy, groceries. Each pack holds the words that moment needs."
    />
  ),
};
