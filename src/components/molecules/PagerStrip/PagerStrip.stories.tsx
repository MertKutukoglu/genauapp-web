import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { PagerStrip } from "./PagerStrip";

const meta: Meta<typeof PagerStrip> = {
  title: "Molecules/PagerStrip",
  component: PagerStrip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof PagerStrip>;

function Harness({ count = 4 }: { count?: number }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  return (
    <div className="w-[min(100%,560px)] space-y-4">
      <PagerStrip
        count={count}
        activeIndex={active}
        paused={paused}
        durationMs={3500}
        onChange={setActive}
        onPauseToggle={setPaused}
      />
      <p className="text-center text-sm text-fg-muted">
        Active scene {active + 1} / {count} · {paused ? "paused" : "playing"}
      </p>
    </div>
  );
}

export const Playing: Story = { render: () => <Harness /> };
export const ThreeScenes: Story = { render: () => <Harness count={3} /> };
export const SixScenes: Story = { render: () => <Harness count={6} /> };
