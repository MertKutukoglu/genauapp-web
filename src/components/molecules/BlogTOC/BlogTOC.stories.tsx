import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlogTOC } from "./BlogTOC";

const meta: Meta<typeof BlogTOC> = {
  title: "Molecules/BlogTOC",
  component: BlogTOC,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof BlogTOC>;

export const OriginsOfGenau: Story = {
  parameters: { viewport: { defaultViewport: "desktop" } },
  render: () => (
    <div className="w-[260px]">
      <BlogTOC
        slug="origins-of-genau"
        items={[
          { id: "dots", label: "The problem with the dots" },
          { id: "cases", label: "Then the cases" },
          { id: "classroom", label: "Where the classroom hits its limit" },
          { id: "adaptive", label: "The adaptive turn" },
          { id: "why", label: "Why Genau" },
        ]}
      />
    </div>
  ),
};
