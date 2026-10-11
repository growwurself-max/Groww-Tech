"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { EASE } from "@/lib/motion";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb, GridBackdrop } from "@/components/ui/decor";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export function Contact() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Section id="contact" tone="canvas" spacing="lg" className="overflow-hidden">
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
                eyebrow="Start a Project"
                title={
                  <>
                    Let's build something{" "}
                    <span className="text-gradient">amazing together.</span>
                  </>
                }
                description="Tell us about your project and we'll get back to you within a couple of business days."
                className="text-center"
              />
            </motion.div>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE.outExpo, delay: 0.1 }}
              className="mt-12 w-full max-w-2xl"
            >
              <ContactForm />
            </motion.div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
