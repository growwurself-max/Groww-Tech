"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { Code2, Database, Sparkles, Layers, Server, Cloud, Zap, Box } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb, GridBackdrop } from "@/components/ui/decor";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

type Tech = {
  name: string;
  category: "Frontend" | "Backend" | "Data & Infrastructure" | "AI & Creative";
  icon: React.ElementType;
};

const techStack: Tech[] = [
  { name: "React", category: "Frontend", icon: Layers },
  { name: "Next.js", category: "Frontend", icon: Code2 },
  { name: "HTML / CSS", category: "Frontend", icon: Code2 },
  { name: "Tailwind CSS", category: "Frontend", icon: Box },
  { name: "Node.js", category: "Backend", icon: Server },
  { name: "Express", category: "Backend", icon: Server },
  { name: "Django", category: "Backend", icon: Server },
  { name: "REST APIs", category: "Backend", icon: Zap },
  { name: "Firebase", category: "Data & Infrastructure", icon: Database },
  { name: "Supabase", category: "Data & Infrastructure", icon: Database },
  { name: "Vercel", category: "Data & Infrastructure", icon: Cloud },
  { name: "Render", category: "Data & Infrastructure", icon: Cloud },
  { name: "AI integrations", category: "AI & Creative", icon: Sparkles },
  { name: "Three.js", category: "AI & Creative", icon: Box },
  { name: "React Three Fiber", category: "AI & Creative", icon: Box },
  { name: "GSAP / Motion", category: "AI & Creative", icon: Zap },
];

const categoryColors: Record<Tech["category"], string> = {
  Frontend: "bg-brand-50 text-brand-700 border-brand-200",
  Backend: "bg-canvas-soft text-ink border-line",
  "Data & Infrastructure": "bg-surface text-ink border-line",
  "AI & Creative": "bg-brand-50/70 text-brand-700 border-brand-200",
};

export function TechnologyCapabilities() {
  const reduceMotion = usePrefersReducedMotion();
  const grouped = techStack.reduce<Record<Tech["category"], Tech[]>>(
    (acc, tech) => {
      acc[tech.category] = acc[tech.category] || [];
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<Tech["category"], Tech[]>,
  );

  const categories = Object.keys(grouped) as Tech["category"][];

  return (
    <Section id="tech" tone="soft" spacing="md" className="overflow-hidden">
      <GridBackdrop />
      <GlowOrb className="-top-24 -right-40 size-[34rem] opacity-70" />
      <GlowOrb tone="neutral" className="-bottom-32 -left-32 size-[28rem]" />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Technology & Capabilities"
            title={
              <>
                Built With <span className="text-gradient">Modern Technology.</span>
              </>
            }
            description="From fast web applications to immersive experiences and AI-powered products, we use the right tools for the idea."
          />
        </Reveal>

        <RevealGroup stagger={0.08} delay={0.1} className="mt-10 space-y-8 lg:mt-12">
          {categories.map((category) => (
            <RevealItem key={category} variant="up">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className={cn("rounded-pill border px-3 py-1 text-2xs font-medium tracking-wide uppercase", categoryColors[category])}>
                    {category}
                  </span>
                </div>
                <motion.div
                  className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04 } },
                  }}
                >
                  {grouped[category].map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={tech.name}
                        variants={{
                          hidden: { opacity: 0, y: 16 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.outExpo } },
                        }}
                        whileHover={reduceMotion ? undefined : { y: -4 }}
                        className="group relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-surface p-4 text-center shadow-xs transition-all duration-300 ease-smooth hover:border-line-strong hover:shadow-md"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line/60 bg-gradient-to-br from-surface to-canvas-soft shadow-sm transition-transform duration-300 ease-smooth group-hover:scale-105">
                          <Icon className="h-5 w-5 text-ink" />
                        </div>
                        <p className="text-xs font-medium text-ink sm:text-sm">{tech.name}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
