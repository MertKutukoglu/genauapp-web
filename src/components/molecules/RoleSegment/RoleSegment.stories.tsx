import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RoleSegment } from "./RoleSegment";

const meta: Meta<typeof RoleSegment> = {
  title: "Molecules/RoleSegment",
  component: RoleSegment,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Inline role-colored word used by the Sentence Learn examples and the Exercise feedback banner. Semi-bold 17, no padding/background. Multi-word segments like \"in Berlin.\" or \"mein Bruder.\" are single segments, not split.",
      },
    },
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof RoleSegment>;

export const Subject: Story = { args: { text: "Ich", role: "subject" } };
export const Verb: Story = { args: { text: "esse", role: "verb" } };
export const Object_: Story = { args: { text: "Brot.", role: "object" } };
export const Time: Story = { args: { text: "heute", role: "time" } };
export const Place: Story = { args: { text: "in Berlin.", role: "place" } };
export const Qword: Story = { args: { text: "Wo", role: "qword" } };
