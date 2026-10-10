"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Deterministic, seeded pseudo-random source. Using `Math.sin` (instead of
 * `Math.random`) guarantees the server and client generate identical particle
 * data, so the first client render matches the SSR markup exactly.
 */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Particle positions/sizes are pre-computed once at module scope and rounded
 * to a low precision. Browsers normalise CSS numbers (e.g. 6 significant
 * figures), so passing raw high-precision floats — or bare numbers, which
 * motion serialises with a unit on the server but not on the client — caused a
 * hydration mismatch. Fixed-precision strings render identically everywhere.
 */
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: `${(seededRandom(i) * 4 + 2).toFixed(2)}px`,
  left: `${(seededRandom(i + 100) * 100).toFixed(2)}%`,
  top: `${(seededRandom(i + 200) * 100).toFixed(2)}%`,
  duration: Number((seededRandom(i + 300) * 20 + 15).toFixed(2)),
  delay: Number((seededRandom(i + 400) * 5).toFixed(2)),
}));

const MESH_GRADIENT = `
  radial-gradient(circle at 20% 30%, color-mix(in oklab, var(--color-brand-200) 60%, transparent) 0%, transparent 50%),
  radial-gradient(circle at 80% 70%, color-mix(in oklab, var(--color-brand-300) 50%, transparent) 0%, transparent 50%),
  radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-canvas-deep) 70%, transparent) 0%, transparent 70%)
`;

/**
 * Animated gradient background with floating particles.
 * Lightweight, respects reduced-motion preferences.
 */
export function AnimatedBackground() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-40"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 30, repeat: Infinity, ease: "linear" as const }
        }
        style={{
          background: MESH_GRADIENT,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-brand-200/30"
          initial={{ x: 0, y: 0, opacity: 0.3 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  opacity: [0.3, 0.6, 0.3],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut" as const,
                }
          }
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
        />
      ))}
    </div>
  );
}
