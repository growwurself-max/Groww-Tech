"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, ListVideo, PlayCircle } from "lucide-react";
import type { PointerEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb, GridBackdrop } from "@/components/ui/decor";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

type VideoItem = {
  id: string;
  name: string;
  description: string;
  category: "Product Demo" | "Build Walkthrough";
  videoUrl: string;
  isPlaylist?: boolean;
  thumbnailUrl: string;
};

const videos: readonly VideoItem[] = [
  {
    id: "tea-flow",
    name: "Tea Flow",
    description: "Product demo showcasing Tea Flow - our order management solution.",
    category: "Product Demo",
    videoUrl: "https://youtu.be/DyMt0qNzl0w?si=cCyYeGzE6IOHKkwB",
    thumbnailUrl: "https://img.youtube.com/vi/DyMt0qNzl0w/hqdefault.jpg",
  },
  {
    id: "paper-hub",
    name: "Paper Hub",
    description: "Walkthrough of Paper Hub - AI-powered question paper generation platform.",
    category: "Build Walkthrough",
    videoUrl: "https://youtu.be/b35Igt5H1SM?si=4b70XQ2u0z-ClUu_",
    thumbnailUrl: "https://img.youtube.com/vi/b35Igt5H1SM/hqdefault.jpg",
  },
  {
    id: "result-hub",
    name: "Result Hub",
    description: "Complete video playlist showcasing Result Hub - digital result management platform.",
    category: "Product Demo",
    videoUrl: "https://youtube.com/playlist?list=PLDjy9inTnOPA",
    isPlaylist: true,
    thumbnailUrl: "https://img.youtube.com/vi/0/maxresdefault.jpg",
  },
];

export function WatchOurWork() {
  return null;
}

