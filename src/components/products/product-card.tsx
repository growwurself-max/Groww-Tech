"use client";

import type { PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import type { Product } from "@/config/products";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { ProductVisualArea } from "./product-visuals";

const SPRING = { stiffness: 130, damping: 22, mass: 0.5 } as const;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const reduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE.outExpo, delay: index * 0.07 },
    },
  };

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);

  const rotateY = useTransform(x, [-0.5, 0.5], [3.5, -3.5]);
  const rotateX = useTransform(y, [-0.5, 0.5], [-2.5, 2.5]);

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
    <motion.article
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface",
        "shadow-xs transition-[box-shadow,border-color] duration-500 ease-smooth",
        "hover:border-line-strong hover:shadow-lg",
      )}
    >
      {/* Visual area — drifts slightly against the pointer for depth */}
      <div className="relative overflow-hidden p-3 pb-0 sm:p-4 sm:pb-0">
        <motion.div
          style={reduceMotion ? undefined : { x, y }}
          className="transition-transform duration-700 ease-smooth will-change-transform"
        >
          <ProductVisualArea visual={product.visual} name={product.name} />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-pill border border-brand-200 bg-brand-50 px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-wide text-brand-700 uppercase">
            {product.category}
          </span>
          <span className="font-mono text-[0.6rem] tracking-wide text-ink-faint uppercase">
            {product.ownership}
          </span>
        </div>

        <div>
          <h3 className="text-xl text-ink sm:text-2xl">{product.name}</h3>
          <p className="mt-1 text-sm font-medium text-brand-700">{product.tagline}</p>
        </div>

        <p className="max-w-prose text-sm text-pretty text-ink-muted">{product.description}</p>

        {product.highlights.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {product.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-pill border border-line bg-canvas/70 px-2.5 py-1 text-[0.65rem] font-medium text-ink-subtle"
              >
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Actions render only when a real, verified URL exists */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {product.liveUrl ? (
            <a
              href={product.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-1.5 rounded-pill bg-ink px-4 text-sm font-medium text-white transition-colors duration-300 ease-smooth hover:bg-brand-700"
            >
              Live Demo
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : null}

          {product.videoUrl ? (
            <a
              href={product.videoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-1.5 rounded-pill border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors duration-300 ease-smooth hover:border-line-strong"
            >
              <PlayCircle className="size-3.5" />
              Watch
            </a>
          ) : null}

          {!product.liveUrl && !product.videoUrl ? (
            <span className="font-mono text-[0.6rem] tracking-wide text-ink-faint uppercase">
              Demo link coming soon
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}