"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import {
  experiences,
  experienceFilters,
  type Experience,
  type ExperienceFilter,
} from "@/config/experiences";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb, GridBackdrop } from "@/components/ui/decor";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ExperienceCard } from "@/components/experiences/experience-card";

const countLabel: Record<ExperienceFilter, (count: number) => string> = {
  All: (count) => `${count} experiences`,
  SaaS: (count) => `${count} SaaS products`,
  Websites: (count) => `${count} websites`,
};

function matches(experience: Experience, filter: ExperienceFilter) {
  return filter === "All" || experience.category === filter;
}

export function WebExperiences() {
  const [filter, setFilter] = useState<ExperienceFilter>("All");
  const reduceMotion = usePrefersReducedMotion();

  const visible = useMemo(
    () => experiences.filter((experience) => matches(experience, filter)),
    [filter],
  );

  return (
    /* `id` matches the existing "Experiments" nav anchor so the primary
       navigation keeps working without being modified. */
    <Section id="experiments" tone="soft" spacing="md" className="overflow-hidden">
      <GridBackdrop />
      <GlowOrb className="-top-24 -right-40 size-[34rem] opacity-70" />
      <GlowOrb tone="neutral" className="-bottom-32 -left-32 size-[28rem]" />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Web experiences"
            title={
              <>
                Beyond Ideas. <span className="text-gradient">Into Experiences.</span>
              </>
            }
            description="Exploring what's possible through thoughtful design, creative technology, and interactive digital experiences."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
            <div
              role="group"
              aria-label="Filter experiences by category"
              className="inline-flex w-fit max-w-full flex-wrap gap-1 rounded-pill border border-line bg-surface p-1 shadow-xs"
            >
              {experienceFilters.map((option) => {
                const active = option === filter;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFilter(option)}
                    aria-pressed={active}
                    className={cn(
                      "relative isolate inline-flex h-11 items-center justify-center rounded-pill px-4 text-sm font-medium",
                      "transition-colors duration-300 ease-smooth",
                      active ? "text-white" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="experience-filter-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-pill bg-ink"
                        transition={{
                          duration: reduceMotion ? 0 : 0.4,
                          ease: EASE.outExpo,
                        }}
                      />
                    ) : null}
                    {option}
                  </button>
                );
              })}
            </div>

            <p
              aria-live="polite"
              className="font-mono text-2xs tracking-wide text-ink-faint uppercase"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={filter}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE.outExpo }}
                >
                  {countLabel[filter](visible.length)}
                </motion.span>
              </AnimatePresence>
            </p>
          </div>
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-10 lg:gap-6 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                featured={index === 0}
              />
            ))}
          </AnimatePresence>
        </ul>
      </Container>
    </Section>
  );
}