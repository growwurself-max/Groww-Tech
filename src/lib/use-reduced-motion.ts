"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// Server (and the first hydration render) must agree, so we report `false`
// until the client has hydrated. React swaps in the real value afterwards.
function getServerSnapshot() {
  return false;
}

/**
 * Hydration-safe `prefers-reduced-motion`.
 *
 * `motion/react`'s `useReducedMotion` reads `window.matchMedia` during the
 * very first client render, so it returns `null` on the server and a boolean
 * on the client — any markup that branches on it then mismatches during
 * hydration. This hook reports `false` on the server *and* during hydration,
 * then updates to the real preference, keeping SSR and the first client
 * render identical.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
