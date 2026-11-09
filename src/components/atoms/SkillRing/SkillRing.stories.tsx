import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SkillRing, type Skill } from "./SkillRing";

const meta: Meta<typeof SkillRing> = {
  title: "Atoms/SkillRing",
  component: SkillRing,
  tags: ["autodocs"],
  args: {
    skill: "vocab",
    progress: 0.35,
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
    hideLabel: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof SkillRing>;

export const Default: Story = {};

export const AllSkills: Story = {
  render: () => {
    const skills: Skill[] = ["vocab", "grammar", "reading", "writing", "listening"];
    return (
      <div className="flex flex-wrap items-end gap-6">
        {skills.map((s, i) => (
          <SkillRing key={s} skill={s} progress={(i + 2) * 0.15} />
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

/** The hero-arc preview — 5 skill rings sitting in a gentle arc like the live landing. */
export const HeroArc: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "desktop" },
  },
  render: () => (
    <div className="relative mx-auto flex h-[220px] w-[520px] items-end justify-center gap-4">
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
