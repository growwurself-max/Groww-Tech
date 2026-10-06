"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb, GridBackdrop } from "@/components/ui/decor";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <Section id="cta" tone="soft" spacing="lg" className="overflow-hidden">
      <GridBackdrop />
      <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[40rem] opacity-40" />

      <Container>
        <Reveal>
          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE.outExpo }}
              className="max-w-3xl"
            >
              <SectionHeading
                eyebrow="Let's Build"
                title={
                  <>
                    Have an idea?{" "}
                    <span className="text-gradient">Let&apos;s build it.</span>
                  </>
                }
                description="From a simple idea to a working digital product, GROWW TECH is always building something new."
                className="text-center"
              />
            </motion.div>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE.outExpo, delay: 0.1 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
            >
              <Button
                href="#products"
                variant="primary"
                size="lg"
                className="group"
              >
                Explore Our Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
