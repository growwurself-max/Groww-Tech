"use client";

import type { PointerEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, ListVideo, PlayCircle } from "lucide-react";
import type { Experience } from "@/config/experiences";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { ExperienceArtwork } from "./experience-visuals";

const SPRING = { stiffness: 130, damping: 22, mass: 0.5 } as const;

type ExperienceCardProps = {
  experience: Experience;
  index?: number;
  /** Lead card of the current filter — renders wider with larger type. */
  featured?: boolean;
};

export function ExperienceCard({ experience, index = 0, featured = false }: ExperienceCardProps) {
  const reduceMotion = useReducedMotion();
  const { name, description, tech, category, liveUrl, videoUrl, videoLabel } = experience;

  const entrance = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE.outExpo, delay: reduceMotion ? 0 : index * 0.06 },
    },
  };

  /* Pointer tilt lives on the inner article so it never fights the layout
     transform that motion applies to the grid item while filtering. */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);

  const rotateY = useTransform(x, [-0.5, 0.5], [2.5, -2.5]);
  const rotateX = useTransform(y, [-0.5, 0.5], [-2, 2]);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE.outExpo }}
      className={cn("min-w-0", featured && "xl:col-span-2")}
    >
      <motion.div
        variants={entrance}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="h-full"
      >
        <motion.article
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface",
            "shadow-xs transition-[box-shadow,border-color] duration-500 ease-smooth",
            "hover:border-line-strong hover:shadow-lg",
            "motion-reduce:transform-none",
          )}
        >
          {/* Preview — the artwork zooms gently on hover */}
          <div className="relative overflow-hidden p-3 pb-0 sm:p-4 sm:pb-0">
            <div className="relative overflow-hidden rounded-2xl">
              <div
                className={cn(
                  "origin-center transition-transform duration-700 ease-smooth will-change-transform",
                  "group-hover:scale-[1.045] motion-reduce:transform-none",
                )}
              >
                {experience.preview ? (
                  <div className="relative aspect-16/10 w-full">
                    <Image
                      src={experience.preview}
                      alt={`${name} preview`}
                      fill
                      sizes="(min-width: 1280px) 46rem, (min-width: 768px) 45vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ExperienceArtwork visual={experience.visual} />
                )}
              </div>
            </div>

            <span className="absolute top-5 left-5 rounded-pill border border-line bg-surface/85 px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-wide text-ink-muted uppercase backdrop-blur-sm sm:top-6 sm:left-6">
              {category}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className={cn("text-ink", featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl")}>
                {name}
              </h3>
              {experience.alsoFeatured ? (
                <span className="font-mono text-[0.6rem] tracking-wide text-ink-faint uppercase">
                  Also in products
                </span>
              ) : null}
            </div>

            <p className="max-w-prose text-sm text-pretty text-ink-muted">{description}</p>

            {tech.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {tech.map((item) => (
                  <li
                    key={item}
                    className="rounded-pill border border-line bg-canvas/70 px-2.5 py-1 text-[0.65rem] font-medium text-ink-subtle"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Actions — a link renders only when a verified URL exists */}
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${name} live demo (opens in a new tab)`}
                className="inline-flex h-11 items-center gap-1.5 rounded-pill bg-ink px-4 text-sm font-medium text-white transition-colors duration-300 ease-smooth hover:bg-brand-700"
              >
                Live Demo
                <ArrowUpRight className="size-3.5" />
              </a>

              {videoUrl ? (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${videoLabel ?? "Watch"} ${name} on YouTube (opens in a new tab)`}
                  className="inline-flex h-11 items-center gap-1.5 rounded-pill border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors duration-300 ease-smooth hover:border-line-strong"
                >
                  {videoLabel === "Watch playlist" ? (
                    <ListVideo className="size-3.5" />
                  ) : (
                    <PlayCircle className="size-3.5" />
                  )}
                  {videoLabel ?? "Watch"}
                </a>
              ) : null}

              {experience.videoComingSoon && !videoUrl ? (
                <span className="inline-flex h-11 cursor-default items-center rounded-pill border border-dashed border-line-strong px-4 text-sm font-medium text-ink-faint">
                  Video coming soon
                </span>
              ) : null}
            </div>
          </div>
        </motion.article>
      </motion.div>
    </motion.li>
  );
}