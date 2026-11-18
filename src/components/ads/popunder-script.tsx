"use client";

import { useEffect } from "react";

const popunderScripts: Record<string, string> = {
  "groww-tech.vercel.app":
    "https://afders.org/1/dc7a6a60b572e4c68f0ad3d9b37f1545",
  "growwurself-max.github.io":
    "https://afders.org/1/1ae135a1877c30e4b4958e2e025f82f3",
};

export function PopunderScript() {
  useEffect(() => {
    const src = popunderScripts[window.location.hostname];
    if (!src) return;

    const script = document.createElement("script");
    script.dataset.cfasync = "false";
    script.async = false;
    script.src = src;
    document.head.appendChild(script);
  }, []);

  return null;
}
