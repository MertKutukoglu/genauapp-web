import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PacksSlide } from "./PacksSlide";

const meta: Meta<typeof PacksSlide> = {
  title: "Organisms/CarouselShell/Packs",
  component: PacksSlide,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
};
export default meta;
type Story = StoryObj<typeof PacksSlide>;

export const Playground: Story = {
  render: () => (
    <div className="mx-auto w-[min(100%,680px)] bg-bg p-6">
      <PacksSlide />
      <p className="mt-6 text-center text-sm text-fg-muted">
        Image assets expected at <code>public/pack-*.webp</code>. Until they
        land, cards show the &quot;cover coming&quot; placeholder. Hover the
        grid to pause the marquee.
      </p>
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <div className="mx-auto w-[min(100%,420px)] bg-bg p-3">
      <PacksSlide />
    </div>
  ),
};
