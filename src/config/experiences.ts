/**
 * GROWW TECH — "Web Experiences" showcase catalogue.
 *
 * These are GROWW TECH's OWN projects (websites, web apps and experiments).
 * This is NOT a client portfolio, so there is no client field anywhere.
 *
 * PROVENANCE
 *  - `name`, `category`, `liveUrl` and `videoUrl` were supplied verbatim by the
 *    studio owner. URLs are used exactly as given — nothing is rewritten.
 *  - `description` on the SaaS entries reuses the already-verified copy from
 *    `products.ts`.
 *  - `description` on the Website entries is derived from the project NAME only.
 *    It makes no claim about features and should be replaced with final wording
 *    from the studio owner.
 *  - `tech` is intentionally EMPTY for every entry. The underlying repositories
 *    were not available to verify a package.json, so no technology is claimed.
 *  - `preview` points at a local screenshot under /public/experiences. Every
 *    value is `null` today, so cards fall back to the designed CSS placeholder
 *    in `experience-visuals.tsx`. Drop a real screenshot at that path and the
 *    card renders it instead. NO stock or generated imagery is used.
 *  - NO statistics, customer names, testimonials, ratings or invented URLs.
 */

import type { ProductVisual } from "./products";

/** Every project either ships as a SaaS product or is a marketing-style site. */
export type ExperienceCategory = "SaaS" | "Websites";

/** New placeholder visuals plus the four visuals already built for products. */
export type ExperienceVisual =
  | ProductVisual
  | "furniture3d"
  | "scoreCheck"
  | "bookLaunch"
  | "waffelCafe";

export type Experience = {
  id: string;
  name: string;
  category: ExperienceCategory;
  /** One or two sentences. Sourced as described in the file header. */
  description: string;
  /** Verified technologies only. Empty when the stack cannot be confirmed. */
  tech: readonly string[];
  /** Local screenshot path, or null to render the CSS placeholder. */
  preview: string | null;
  /** Verified live URL, or null when no public link should be shown. */
  liveUrl: string | null;
  /** Real YouTube video or playlist URL, or null when none exists. */
  videoUrl: string | null;
  /** Overrides the video button label, e.g. a playlist. */
  videoLabel?: string;
  /** True when a video is acknowledged but not yet published. Renders no link. */
  videoComingSoon?: boolean;
  /** Also appears in the Featured Products section, so it is cross-referenced. */
  alsoFeatured?: boolean;
  visual: ExperienceVisual;
};

/* ---------------------------------------------------------------------------
 * Order matters: Websites lead the "All" view because the SaaS entries are
 * already given full cards in the Featured Products section above.
 * ------------------------------------------------------------------------- */
export const experiences: readonly Experience[] = [
  {
    id: "3d-furniture",
    name: "3D Furniture",
    category: "Websites",
    description:
      "An interactive 3D furniture experience, presented directly in the browser.",
    tech: [],
    preview: "/screenshots/3d-furniture.png",
    liveUrl: "https://me-3d-mu.vercel.app/",
    videoUrl: null,
    visual: "furniture3d",
  },
  {
    id: "score-check",
    name: "Score Check",
    category: "Websites",
    description: "A web app for looking up and checking scores.",
    tech: [],
    preview: "/screenshots/score-check.png",
    liveUrl: "https://scorecheck-azure.vercel.app/",
    videoUrl: null,
    visual: "scoreCheck",
  },
  {
    id: "book-launch",
    name: "Book Launch",
    category: "Websites",
    description: "A launch web experience built around a book release.",
    tech: [],
    preview: "/screenshots/book-launch.png",
    liveUrl: "https://brand-or-die.vercel.app/",
    videoUrl: null,
    visual: "bookLaunch",
  },
  {
    id: "waffel-cafe",
    name: "Waffel Cafe",
    category: "Websites",
    description: "A cafe web experience — a full brand page built as part of our web practice.",
    tech: [],
    preview: "/screenshots/waffel-cafe.png",
    liveUrl: "https://wowfells.vercel.app/",
    videoUrl: null,
    visual: "waffelCafe",
  },
  {
    id: "cupi",
    name: "Cupi",
    category: "SaaS",
    description:
      "Personalized animated mini websites and digital experiences — small, expressive sites built around a person, a brand or a moment.",
    tech: [],
    preview: "/screenshots/cupi.png",
    liveUrl: "https://cupi-one.vercel.app/",
    videoUrl: null,
    alsoFeatured: true,
    visual: "cupi",
  },
  {
    id: "paper-hub",
    name: "Paper Hub",
    category: "SaaS",
    description:
      "An AI-powered question paper generation platform that turns source material into structured question papers.",
    tech: [],
    preview: "/screenshots/paper-hub.png",
    liveUrl: "https://paper-hub-1.vercel.app/",
    videoUrl: "https://youtu.be/b35Igt5H1SM?si=4b70XQ2u0z-ClUu_",
    videoLabel: "Watch Demo",
    alsoFeatured: true,
    visual: "paperHub",
  },
  {
    id: "result-hub",
    name: "Result Hub",
    category: "SaaS",
    description:
      "A digital result management platform for educational institutions — publish results, and let students and staff reach them without the paperwork.",
    tech: [],
    preview: "/screenshots/result-hub.png",
    liveUrl: "https://result-hub-ten.vercel.app/",
    videoUrl: "https://youtube.com/playlist?list=PLDjy9inTnOPA&si=NC5Ym2bZWF2i-3a0",
    videoLabel: "Watch playlist",
    alsoFeatured: true,
    visual: "resultHub",
  },
  {
    id: "tea-flow",
    name: "Tea Flow",
    category: "SaaS",
    description:
      "A business and order management project covering the full order loop — from taking an order to fulfilling and settling it.",
    tech: [],
    preview: "/screenshots/tea-flow.png",
    liveUrl: "https://order-manager-team.vercel.app/",
    videoUrl: "https://youtu.be/DyMt0qNzl0w?si=cCyYeGzE6IOHKkwB",
    alsoFeatured: true,
    visual: "teaFlow",
  },
];

export type ExperienceFilter = "All" | ExperienceCategory;

/** Filter order is intentional: All, then SaaS, then Websites. */
export const experienceFilters: readonly ExperienceFilter[] = ["All", "SaaS", "Websites"];

export const experienceCounts: Record<ExperienceFilter, number> = {
  All: experiences.length,
  SaaS: experiences.filter((item) => item.category === "SaaS").length,
  Websites: experiences.filter((item) => item.category === "Websites").length,
};