"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb, GridBackdrop } from "@/components/ui/decor";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

type Step = {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  dotColor: string;
  glowColor: string;
  iconBg: string;
};

const steps: Step[] = [
  {
    id: 1,
    number: "01",
    title: "IDEA",
    subtitle: "Every product starts with a thought.",
    description: "Explore the problem, idea, audience, and purpose.",
    dotColor: "bg-brand-500",
    glowColor: "bg-brand-200/50",
    iconBg: "from-brand-50 to-brand-100",
  },
  {
    id: 2,
    number: "02",
    title: "DESIGN",
    subtitle: "Turn the idea into an experience.",
    description: "Plan the interface, interactions, visual identity, and user flow.",
    dotColor: "bg-brand-500",
    glowColor: "bg-brand-200/50",
    iconBg: "from-brand-50 to-brand-100",
  },
  {
    id: 3,
    number: "03",
    title: "BUILD",
    subtitle: "Bring it to life.",
    description: "Develop the product using modern technologies, APIs, databases, AI, and interactive experiences where appropriate.",
    dotColor: "bg-brand-500",
    glowColor: "bg-brand-200/50",
    iconBg: "from-brand-50 to-brand-100",
  },
  {
    id: 4,
    number: "04",
    title: "LAUNCH",
    subtitle: "Put it in people's hands.",
    description: "Deploy, test, optimize, and make the product accessible on the web.",
    dotColor: "bg-brand-500",
    glowColor: "bg-brand-200/50",
    iconBg: "from-brand-50 to-brand-100",
  },
  {
    id: 5,
    number: "05",
    title: "GROW",
    subtitle: "Keep improving.",
    description: "Learn from usage, add improvements, experiment with new ideas, and continue building.",
    dotColor: "bg-brand-500",
    glowColor: "bg-brand-200/50",
    iconBg: "from-brand-50 to-brand-100",
  },
];

export function HowWeBuild() {
  const reduceMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  const progress = useTransform(smoothProgress, [0, 1], [0, 100]);

  useEffect(() => {
    if (reduceMotion) return;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.floor(v * steps.length);
      const step = Math.min(steps.length, Math.max(1, idx + 1));
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [reduceMotion, scrollYProgress]);

  return (
    <Section id="how-we-build" tone="canvas" spacing="md" className="overflow-hidden">
      <GridBackdrop />
      <GlowOrb className="-top-24 -left-40 size-[34rem] opacity-60" />
      <GlowOrb tone="neutral" className="-bottom-32 -right-32 size-[28rem]" />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How we build"
            title={
              <>
                From Idea to <span className="text-gradient">Reality.</span>
              </>
            }
            description="We turn ideas into thoughtful, functional digital experiences — from the first concept to a product people can actually use."
          />
        </Reveal>

        <div ref={containerRef} className="mt-12 lg:mt-16">
          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute left-8 top-0 h-full w-px">
              <motion.div
                className="h-full origin-top rounded-full bg-gradient-to-b from-brand-500 via-brand-500/40 to-line"
                style={{ scaleY: progress.get() / 100 }}
              />
              <div className="absolute inset-0 bg-line opacity-20" />
            </div>

            <div className="space-y-20">
              {steps.map((step, index) => {
                const isActive = activeStep === step.id;
                const isPast = activeStep > step.id;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: EASE.outExpo, delay: index * 0.05 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-4 top-0 flex items-center justify-center">
                      <motion.div
                        className={cn(
                          "relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500",
                          isActive || isPast
                            ? "border-brand-500 bg-surface shadow-brand"
                            : "border-line bg-surface/80",
                        )}
                      >
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full transition-all duration-500",
                            isActive || isPast ? step.dotColor : "bg-line-strong",
                          )}
                        />
                        {(isActive || isPast) && !reduceMotion && (
                          <motion.span
                            className={cn("absolute inset-0 -z-10 rounded-full blur-md", step.glowColor)}
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.2, 0.4] }}
                            transition={{ duration: 2.6, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    </div>

                    <motion.div
                      className={cn(
                        "relative overflow-hidden rounded-3xl border p-8 transition-all duration-500",
                        isActive
                          ? "border-brand-200/60 bg-surface shadow-lg"
                          : "border-line bg-surface/90 shadow-xs",
                        isPast && !isActive && "opacity-60",
                      )}
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                        <div className="space-y-3">
                          <span className="font-mono text-xs tracking-widest text-brand-700 uppercase">
                            {step.number} — {step.title}
                          </span>
                          <h3 className="text-2xl text-ink md:text-3xl">{step.subtitle}</h3>
                          <p className="max-w-2xl text-base text-pretty text-ink-muted">{step.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <div
                            className={cn(
                              "flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br border border-line/60 shadow-sm",
                              step.iconBg,
                            )}
                          >
                            <span className="text-3xl font-display font-semibold text-brand-700">{step.number}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="lg:hidden">
            <div className="relative space-y-8 pl-6 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-brand-500/60 before:to-line/40">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: EASE.outExpo, delay: index * 0.05 }}
                  className="relative"
                >
                  <div className="absolute -left-6 top-4 flex h-5 w-5 items-center justify-center rounded-full border border-brand-500 bg-surface shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  </div>
                  <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-6">
                    <span className="font-mono text-xs tracking-widest text-brand-700 uppercase">
                      {step.number} — {step.title}
                    </span>
                    <h3 className="mt-2 text-xl text-ink">{step.subtitle}</h3>
                    <p className="mt-2 text-sm text-pretty text-ink-muted">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
