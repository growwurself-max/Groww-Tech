"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Clock, CheckCircle2, Lightbulb, Rocket } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb, GridBackdrop } from "@/components/ui/decor";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

type ProjectState = "live" | "building" | "coming-soon";

type GrowthItem = {
  id: string;
  name: string;
  state: ProjectState;
  description?: string;
  stage?: "idea" | "experiment" | "build" | "launch" | "grow";
};

const growthItems: GrowthItem[] = [
  {
    id: "tea-flow",
    name: "Tea Flow",
    state: "live",
    description: "Order management platform",
    stage: "grow",
  },
  {
    id: "paper-hub",
    name: "Paper Hub",
    state: "live",
    description: "AI-powered question paper generation",
    stage: "grow",
  },
  {
    id: "result-hub",
    name: "Result Hub",
    state: "live",
    description: "Digital result management",
    stage: "grow",
  },
  {
    id: "cupi",
    name: "Cupi",
    state: "live",
    description: "Animated mini websites",
    stage: "launch",
  },
  {
    id: "experiments",
    name: "Web Experiments",
    state: "building",
    description: "New interactive ideas taking shape",
    stage: "build",
  },
  {
    id: "more",
    name: "More ideas are growing...",
    state: "coming-soon",
    description: "Always something new brewing",
    stage: "idea",
  },
];

const stateConfig: Record<ProjectState, { label: string; icon: React.ElementType; className: string }> = {
  live: {
    label: "Live",
    icon: CheckCircle2,
    className: "bg-brand-50 text-brand-700 border-brand-200",
  },
  building: {
    label: "Building",
    icon: Sparkles,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "coming-soon": {
    label: "Coming Soon",
    icon: Clock,
    className: "bg-canvas-soft text-ink border-line",
  },
};

const stageConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  idea: { label: "Idea", icon: Lightbulb, color: "text-cyan-600" },
  experiment: { label: "Experiment", icon: Sparkles, color: "text-violet-600" },
  build: { label: "Build", icon: Sparkles, color: "text-amber-600" },
  launch: { label: "Launch", icon: Rocket, color: "text-brand-600" },
  grow: { label: "Grow", icon: CheckCircle2, color: "text-emerald-600" },
};

function EcosystemNode({ item, index, reduceMotion }: { item: GrowthItem; index: number; reduceMotion: boolean | null }) {
  const state = stateConfig[item.state];
  const stage = item.stage ? stageConfig[item.stage] : null;
  const StateIcon = state.icon;
  const StageIcon = stage?.icon;

  return (
    <RevealItem key={item.id} variant="up">
      <motion.div
        whileHover={reduceMotion ? undefined : { scale: 1.02, y: -4 }}
        transition={{ duration: 0.3, ease: EASE.outExpo }}
        className={cn(
          "group relative flex h-full flex-col gap-3 rounded-3xl border border-line bg-surface/80 backdrop-blur-sm p-5 shadow-xs transition-all duration-300 ease-smooth hover:border-line-strong hover:shadow-md sm:p-6",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-medium text-ink sm:text-lg">{item.name}</h3>
            {stage && (
              <div className={cn("flex items-center gap-1.5 text-xs font-medium", stage.color)}>
                {StageIcon && <StageIcon className="h-3.5 w-3.5" />}
                {stage.label}
              </div>
            )}
          </div>
          <span className={cn("inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-2xs font-medium tracking-wide uppercase", state.className)}>
            <StateIcon className="h-3.5 w-3.5" />
            {state.label}
          </span>
        </div>
        {item.description && (
          <p className="text-sm text-pretty text-ink-muted">{item.description}</p>
        )}
        <div className="mt-auto">
          <div className="h-1 w-full overflow-hidden rounded-full bg-canvas-soft">
            <motion.div
              className={cn(
                "h-full rounded-full",
                item.state === "live" && "bg-brand-500",
                item.state === "building" && "bg-amber-500",
                item.state === "coming-soon" && "bg-line-strong",
              )}
              initial={{ width: 0 }}
              whileInView={{ width: item.state === "live" ? "100%" : item.state === "building" ? "60%" : "30%" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: EASE.outExpo, delay: index * 0.05 }}
            />
          </div>
        </div>
      </motion.div>
    </RevealItem>
  );
}

function FlowIndicator({ icon: Icon, label, delay }: { icon: React.ElementType; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE.outExpo, delay }}
      className="flex flex-col items-center gap-2"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-canvas-soft border border-line shadow-sm">
        <Icon className="h-5 w-5 text-brand-600" />
      </div>
      <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}

function ConnectionLine({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE.outExpo, delay }}
      className="hidden h-px w-16 bg-gradient-to-r from-line via-brand-300/50 to-line lg:block"
    />
  );
}

export function Growing() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <Section id="growing" tone="soft" spacing="md" className="overflow-hidden">
      <GridBackdrop />
      <GlowOrb className="-top-24 -left-40 size-[34rem] opacity-60" />
      <GlowOrb tone="neutral" className="-bottom-32 -right-32 size-[28rem]" />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Growing"
            title={
              <>
                We&apos;re Still <span className="text-gradient">Building.</span>
              </>
            }
            description="GROWW TECH is a growing collection of ideas, experiments, and products. There&apos;s always something new taking shape."
          />
        </Reveal>

        {/* Desktop Ecosystem */}
        <div className="hidden lg:block mt-12">
          <RevealGroup stagger={0.1} delay={0.15}>
            <div className="relative">
              {/* Flow Visualization */}
              <div className="flex items-center justify-center gap-0 mb-16">
                <FlowIndicator icon={Lightbulb} label="Idea" delay={0.2} />
                <ConnectionLine delay={0.3} />
                <FlowIndicator icon={Sparkles} label="Experiment" delay={0.35} />
                <ConnectionLine delay={0.4} />
                <FlowIndicator icon={Sparkles} label="Build" delay={0.45} />
                <ConnectionLine delay={0.5} />
                <FlowIndicator icon={Rocket} label="Launch" delay={0.55} />
                <ConnectionLine delay={0.6} />
                <FlowIndicator icon={CheckCircle2} label="Grow" delay={0.65} />
              </div>

              {/* Connected Nodes Grid */}
              <div className="grid gap-6 lg:grid-cols-3">
                {growthItems.map((item, index) => (
                  <EcosystemNode key={item.id} item={item} index={index} reduceMotion={reduceMotion} />
                ))}
              </div>

              {/* Central Connection Lines */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-500/20 via-line to-transparent" />
                <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-line to-transparent" />
              </motion.div>
            </div>
          </RevealGroup>
        </div>

        {/* Tablet Simplified */}
        <div className="hidden sm:block lg:hidden mt-10">
          <RevealGroup stagger={0.08} delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {growthItems.map((item, index) => (
                <EcosystemNode key={item.id} item={item} index={index} reduceMotion={reduceMotion} />
              ))}
            </div>
          </RevealGroup>
        </div>

        {/* Mobile Vertical */}
        <div className="block sm:hidden mt-10">
          <RevealGroup stagger={0.1} delay={0.1}>
            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-brand-500/30 via-line to-transparent" />
              <div className="space-y-4 pl-12">
                {growthItems.map((item, index) => (
                  <div key={item.id} className="relative">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: EASE.outExpo, delay: index * 0.1 }}
                      className="absolute -left-9 top-6 size-3 rounded-full bg-brand-500 border-2 border-surface"
                    />
                    <EcosystemNode item={item} index={index} reduceMotion={reduceMotion} />
                  </div>
                ))}
              </div>
            </div>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
