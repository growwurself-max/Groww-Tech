"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Clock, CheckCircle2 } from "lucide-react";
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
};

const growthItems: GrowthItem[] = [
  {
    id: "tea-flow",
    name: "Tea Flow",
    state: "live",
    description: "Order management platform",
  },
  {
    id: "paper-hub",
    name: "Paper Hub",
    state: "live",
    description: "AI-powered question paper generation",
  },
  {
    id: "result-hub",
    name: "Result Hub",
    state: "live",
    description: "Digital result management",
  },
  {
    id: "cupi",
    name: "Cupi",
    state: "live",
    description: "Animated mini websites",
  },
  {
    id: "experiments",
    name: "Web Experiments",
    state: "building",
    description: "New interactive ideas taking shape",
  },
  {
    id: "more",
    name: "More ideas are growing...",
    state: "coming-soon",
    description: "Always something new brewing",
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

export function Growing() {
  const reduceMotion = useReducedMotion();

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
                We're Still <span className="text-gradient">Building.</span>
              </>
            }
            description="GROWW TECH is a growing collection of ideas, experiments, and products. There's always something new taking shape."
          />
        </Reveal>

        <RevealGroup stagger={0.08} delay={0.1} className="mt-10 lg:mt-12">
          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-500/30 via-line to-transparent lg:block" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {growthItems.map((item, index) => {
                const state = stateConfig[item.state];
                const Icon = state.icon;
                return (
                  <RevealItem key={item.id} variant="up">
                    <motion.div
                      whileHover={reduceMotion ? undefined : { y: -4 }}
                      transition={{ duration: 0.3, ease: EASE.outExpo }}
                      className={cn(
                        "group relative flex h-full flex-col gap-3 rounded-3xl border border-line bg-surface p-5 shadow-xs transition-all duration-300 ease-smooth hover:border-line-strong hover:shadow-md sm:p-6",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-medium text-ink sm:text-lg">{item.name}</h3>
                        <span className={cn("inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-2xs font-medium tracking-wide uppercase", state.className)}>
                          <Icon className="h-3.5 w-3.5" />
                          {state.label}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-pretty text-ink-muted">{item.description}</p>
                      )}
                      <div className="mt-auto">
                        <div
                          className={cn(
                            "h-1 w-full overflow-hidden rounded-full bg-canvas-soft",
                          )}
                        >
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
              })}
            </div>
          </div>
        </RevealGroup>
      </Container>
    </Section>
  );
}
