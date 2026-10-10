import { cn } from "@/lib/cn";

/**
 * Deterministic pseudo-random source.
 *
 * A 32-bit linear congruential generator. Every step is an exact integer
 * operation inside the IEEE-754 safe range, so it produces byte-identical
 * values on every JS engine. That matters because this component is rendered on
 * the server and then hydrated on the client: any engine-dependent float math
 * (e.g. `Math.sin`, `Math.random`) can round differently in Node vs the browser
 * and produce a hydration mismatch.
 */
function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const random = createRandom(0x9e3779b9);

/**
 * Particle geometry is pre-computed once and rounded to two decimals. The
 * values are plain strings/config so the server markup and the first client
 * render are identical — and because there is no runtime branching here, they
 * can never drift apart.
 */
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: `${(random() * 3.5 + 2).toFixed(2)}px`,
  left: `${(random() * 92 + 4).toFixed(2)}%`,
  top: `${(random() * 88 + 4).toFixed(2)}%`,
  delay: `-${(random() * 12).toFixed(2)}s`,
  duration: `${(random() * 10 + 8).toFixed(2)}s`,
  float: cn(
    i % 3 === 0 && "animate-float-a",
    i % 3 === 1 && "animate-float-b",
    i % 3 === 2 && "animate-float-c",
  ),
}));

const MESH_GRADIENT = `
  radial-gradient(circle at 20% 30%, color-mix(in oklab, var(--color-brand-200) 60%, transparent) 0%, transparent 50%),
  radial-gradient(circle at 80% 70%, color-mix(in oklab, var(--color-brand-300) 50%, transparent) 0%, transparent 50%),
  radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-canvas-deep) 70%, transparent) 0%, transparent 70%)
`;

/**
 * Animated gradient background with gently floating particles.
 *
 * Rendered entirely with CSS (no client JS, no motion library), so the
 * server HTML and the initial client render are guaranteed to match. The
 * global `prefers-reduced-motion` rule in `globals.css` neutralises all of the
 * animations for users who ask for less motion.
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 animate-mesh opacity-40"
        style={{
          background: MESH_GRADIENT,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={cn(
              "absolute rounded-full bg-brand-300/25 will-change-transform",
              particle.float,
            )}
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Faint diagonal light sweep for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,color-mix(in_oklab,var(--color-brand-100)_35%,transparent)_50%,transparent_65%)]" />
    </div>
  );
}
