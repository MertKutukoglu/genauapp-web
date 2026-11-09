import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogCTA } from "./BlogCTA";

const meta: Meta<typeof BlogCTA> = {
  title: "Molecules/BlogCTA",
  component: BlogCTA,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "End-of-post waitlist card for the `/blog/*` articles. Writes to `taste_email` localStorage and fires `waitlist_submit` + `blog_cta_focus` events through `window.__track`.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(680px, 90vw)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BlogCTA>;

export const OriginsOfGenau: Story = {
  args: { source: "origins_blog" },
};

export const CustomSource: Story = {
  args: { source: "sample_post" },
  parameters: {
    docs: {
      description: {
        story:
          "The `source` prop flows into the analytics payload and the stored row, so every blog post can attribute its own conversions.",
      },
    },
  },
};
