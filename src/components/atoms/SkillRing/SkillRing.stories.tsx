import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SkillRing, type Skill } from "./SkillRing";

const meta: Meta<typeof SkillRing> = {
  title: "Atoms/SkillRing",
  component: SkillRing,
  tags: ["autodocs"],
  args: {
    skill: "vocab",
    progress: 0.4,
    size: "md",
  },
  argTypes: {
    skill: {
      control: "inline-radio",
      options: ["vocab", "grammar", "reading", "writing", "listening"],
    },
    progress: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    variant: { control: "inline-radio", options: ["bare", "boxed"] },
    pending: { control: "boolean" },
    hideLabel: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof SkillRing>;

/** Interactive playground — slide progress and watch the 4 segments fill in order. */
export const Playground: Story = {};

export const AllSkills: Story = {
  render: () => {
    const skills: Skill[] = ["vocab", "grammar", "reading", "writing", "listening"];
    return (
      <div className="flex flex-wrap items-end gap-6">
        {skills.map((s, i) => (
          <SkillRing key={s} skill={s} progress={(i + 1) * 0.2} />
        ))}
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <SkillRing skill="grammar" progress={0.6} size="sm" />
      <SkillRing skill="grammar" progress={0.6} size="md" />
      <SkillRing skill="grammar" progress={0.6} size="lg" />
    </div>
  ),
};

/** Four segment fills — 0.25 fills one, 0.5 fills two, 0.75 fills three, 1.0 fills all four. */
export const ProgressStates: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <SkillRing skill="reading" progress={0} label="0%" />
      <SkillRing skill="reading" progress={0.25} label="25%" />
      <SkillRing skill="reading" progress={0.5} label="50%" />
      <SkillRing skill="reading" progress={0.75} label="75%" />
      <SkillRing skill="reading" progress={1} label="100%" />
    </div>
  ),
};

/** Pending indicator — cherry collect-me arrow on the top-right, pulsing. */
export const PendingBadge: Story = {
  args: { pending: true, progress: 0.25, skill: "writing" },
};

/** Boxed variant — label on top, ring on a soft tinted dark card. */
export const Boxed: Story = {
  args: { variant: "boxed", progress: 0.5 },
};

export const BoxedRow: Story = {
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "desktop" } },
  render: () => {
    const items: Array<{ skill: Skill; progress: number }> = [
      { skill: "vocab",     progress: 0.6 },
      { skill: "grammar",   progress: 0.4 },
      { skill: "reading",   progress: 0.85 },
      { skill: "writing",   progress: 0.3 },
      { skill: "listening", progress: 0.2 },
    ];
    return (
      <div className="flex flex-wrap items-stretch gap-4 bg-black p-8">
        {items.map(({ skill, progress }) => (
          <SkillRing key={skill} skill={skill} progress={progress} variant="boxed" />
        ))}
      </div>
    );
  },
};

/** Hero-arc preview — the 5 rings in a gentle arc like the live landing sticky hero. */
export const HeroArc: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "desktop" },
  },
  render: () => (
    <div className="relative mx-auto flex h-[220px] w-[560px] items-end justify-center gap-5">
      {(
        [
          { skill: "vocab",     progress: 0.6,  offset: 10 },
          { skill: "grammar",   progress: 0.4,  offset: -14 },
          { skill: "reading",   progress: 0.85, offset: -24 },
          { skill: "writing",   progress: 0.3,  offset: -14 },
          { skill: "listening", progress: 0.2,  offset: 10 },
        ] as const
      ).map(({ skill, progress, offset }) => (
        <div key={skill} style={{ transform: `translateY(${offset}px)` }}>
          <SkillRing skill={skill} progress={progress} size="md" />
        </div>
      ))}
    </div>
  ),
};
