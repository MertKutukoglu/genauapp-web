import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon, type IconName } from "./Icon";
import { ICONS } from "./icons";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: {
    name: "lightbulb",
    title: undefined,
  },
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(ICONS) as IconName[],
    },
    title: {
      control: "text",
      description:
        "Optional accessible label. Omit for decorative icons (default).",
    },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: { name: "lightbulb" },
  render: (args) => (
    <div className="flex items-center gap-4 text-fg">
      <Icon {...args} className="w-4 h-4" />
      <Icon {...args} className="w-5 h-5" />
      <Icon {...args} className="w-6 h-6" />
      <Icon {...args} className="w-8 h-8 text-accent" />
      <Icon {...args} className="w-10 h-10 text-ok" />
    </div>
  ),
};

/** All icons at once — the library-at-a-glance view. */
export const Library: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "desktop" },
  },
  render: () => {
    const names = Object.keys(ICONS) as IconName[];
    return (
      <div className="p-6">
        <h1 className="mb-1 font-display text-3xl font-semibold text-fg">
          Icon library
        </h1>
        <p className="mb-6 text-fg-muted">
          Every symbol uses{" "}
          <code className="rounded bg-surface-sunk px-1.5 py-0.5 text-sm">
            stroke=&quot;currentColor&quot;
          </code>
          , so tint flows from the parent&apos;s text color. Size via
          Tailwind utilities (
          <code className="rounded bg-surface-sunk px-1.5 py-0.5 text-sm">
            w-5 h-5
          </code>
          ).
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {names.map((n) => (
            <div
              key={n}
              className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface-card p-5 text-center"
            >
              <Icon name={n} className="w-7 h-7 text-fg" />
              <code className="text-[11px] text-fg-muted break-all">{n}</code>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/** Semantic color showcase. */
export const Tints: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {(
        [
          ["text-fg", "fg"],
          ["text-fg-muted", "fg-muted"],
          ["text-accent", "accent"],
          ["text-ok", "ok"],
          ["text-[color:var(--article-der)]", "article-der"],
          ["text-[color:var(--article-die)]", "article-die"],
          ["text-[color:var(--article-das)]", "article-das"],
          ["text-[color:var(--chip-sentence-color)]", "chip-sentence"],
        ] as const
      ).map(([cls, label]) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface-card p-5 text-center"
        >
          <Icon name="lightbulb" className={`w-8 h-8 ${cls}`} />
          <code className="text-[11px] text-fg-muted">{label}</code>
        </div>
      ))}
    </div>
  ),
};
