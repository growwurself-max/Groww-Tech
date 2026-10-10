"use client";

import type { PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import type { Product } from "@/config/products";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { ProductVisualArea } from "./product-visuals";

const SPRING = { stiffness: 130, damping: 22, mass: 0.5 } as const;

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const reduceMotion = usePrefersReducedMotion();

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
        "shadow-xs transition-all duration-500 ease-smooth",
        "hover:border-line-strong hover:shadow-xl hover:shadow-brand/10",
      )}
    >
      {/* Animated border gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, var(--color-brand-200) 0%, var(--color-brand-100) 50%, transparent 100%)",
          filter: "blur(8px)",
        }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hairline highlight that draws across the top edge on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-brand-500 to-transparent transition-transform duration-700 ease-smooth group-hover:scale-x-100"
      />

      {/* Visual area — drifts slightly against the pointer for depth */}
      <div className="relative overflow-hidden p-3 pb-0 sm:p-4 sm:pb-0">
        <motion.div
          style={reduceMotion ? undefined : { x, y }}
          className="transition-transform duration-700 ease-smooth will-change-transform"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
            <motion.a
              href={product.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-1.5 rounded-pill bg-ink px-4 text-sm font-medium text-white transition-colors duration-300 ease-smooth hover:bg-brand-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand-400" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-400" />
              </span>
              Live Demo
              <ArrowUpRight className="size-3.5" />
            </motion.a>
          ) : null}

          {product.videoUrl ? (
            <motion.a
              href={product.videoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-1.5 rounded-pill border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors duration-300 ease-smooth hover:border-line-strong"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <PlayCircle className="size-3.5" />
              Watch
            </motion.a>
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