"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionTemplate, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const POINTER_QUERY = "(pointer: fine)";

function subscribePointerFine(callback: () => void) {
  const mediaQuery = window.matchMedia(POINTER_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getPointerFineSnapshot() {
  return window.matchMedia(POINTER_QUERY).matches;
}

function getPointerFineServerSnapshot() {
  return false;
}

/**
 * Subtle cursor spotlight effect.
 * Creates a soft glow that follows the mouse cursor on desktop.
 * Respects reduced-motion preferences and only activates on pointer-fine devices.
 */
export function CursorSpotlight() {
  const reduceMotion = usePrefersReducedMotion();
  const isPointerFine = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot,
  );

  const mouseX = useSpring(0, { damping: 25, stiffness: 700 });
  const mouseY = useSpring(0, { damping: 25, stiffness: 700 });

  useEffect(() => {
    if (reduceMotion || !isPointerFine) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion, isPointerFine, mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, var(--color-brand-200) 15%, transparent), transparent)`;

  if (reduceMotion || !isPointerFine) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background }}
    />
  );
}
