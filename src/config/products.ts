/**
 * GROWW TECH product catalogue.
 *
 * PROVENANCE
 *  - `name`, `tagline` and `description` come from the studio owner's brief.
 *  - `category` is a plain classification of what the product is.
 *  - `highlights` are only included where the underlying project files verify
 *    the capability (checked against each project's package.json / source).
 *  - NO metrics, user counts, customers, testimonials or URLs are invented.
 */

/* ---------------------------------------------------------------------------
 * LINK PLACEHOLDERS — fill these in only with real, verified URLs.
 * Until a value is a real URL the corresponding button is not rendered.
 * ------------------------------------------------------------------------- */
export const PRODUCT_LINK_PLACEHOLDERS = {
  cupi: {
    /** Real public URL for the Cupi demo. */
    liveUrl: "https://cupi-one.vercel.app/" as string | null,
    /** Real YouTube URL for the Cupi walkthrough. */
    videoUrl: null as string | null,
  },
  resultHub: {
    liveUrl: "https://result-hub-ten.vercel.app/" as string | null,
    videoUrl: null as string | null,
  },
  paperHub: {
    liveUrl: "https://paper-hub-1.vercel.app/" as string | null,
    videoUrl: null as string | null,
  },
  teaFlow: {
    liveUrl: "https://order-manager-team.vercel.app/" as string | null,
    videoUrl: null as string | null,
  },
} as const;

export type ProductVisual = "cupi" | "resultHub" | "paperHub" | "teaFlow";

export type Product = {
  id: string;
  name: string;
  /** One-line positioning shown under the name. */
  tagline: string;
  description: string;
  category: string;
  /** Verified technical / capability highlights. Empty when not verifiable. */
  highlights: readonly string[];
  /** Self-built products — not client work. */
  ownership: string;
  visual: ProductVisual;
  liveUrl: string | null;
  videoUrl: string | null;
  /** Featured card renders larger. */
  featured?: boolean;
};

export const products: readonly Product[] = [
  {
    id: "cupi",
    name: "Cupi",
    tagline: "Personalized animated mini websites",
    description:
      "Personalized animated mini websites and digital experiences — small, expressive sites built around a person, a brand or a moment.",
    category: "Web Experiences",
    highlights: [],
    ownership: "GROWW TECH product",
    visual: "cupi",
    liveUrl: PRODUCT_LINK_PLACEHOLDERS.cupi.liveUrl,
    videoUrl: PRODUCT_LINK_PLACEHOLDERS.cupi.videoUrl,
    featured: true,
  },
  {
    id: "result-hub",
    name: "Result Hub",
    tagline: "Digital result management platform",
    description:
      "A digital result management platform for educational institutions — publish results, and let students and staff reach them without the paperwork.",
    category: "SaaS Platform",
    highlights: [
      "PDF result generation",
      "Excel data export",
      "Role-based access",
      "OMR sheet scanning",
    ],
    ownership: "GROWW TECH product",
    visual: "resultHub",
    liveUrl: PRODUCT_LINK_PLACEHOLDERS.resultHub.liveUrl,
    videoUrl: PRODUCT_LINK_PLACEHOLDERS.resultHub.videoUrl,
  },
  {
    id: "paper-hub",
    name: "Paper Hub",
    tagline: "AI-powered question paper generation",
    description:
      "An AI-powered question paper generation platform that turns source material into structured question papers.",
    category: "AI Platform",
    highlights: [
      "PDF and DOCX import",
      "Mathematical typesetting",
      "Supabase backend",
    ],
    ownership: "GROWW TECH product",
    visual: "paperHub",
    liveUrl: PRODUCT_LINK_PLACEHOLDERS.paperHub.liveUrl,
    videoUrl: PRODUCT_LINK_PLACEHOLDERS.paperHub.videoUrl,
  },
  {
    id: "tea-flow",
    name: "Tea Flow",
    tagline: "Order & business management",
    description:
      "A business and order management project covering the full order loop — from taking an order to fulfilling and settling it.",
    category: "Business Platform",
    highlights: ["QR ordering", "Online payments", "Express API", "Cloud media"],
    ownership: "GROWW TECH product",
    visual: "teaFlow",
    liveUrl: PRODUCT_LINK_PLACEHOLDERS.teaFlow.liveUrl,
    videoUrl: PRODUCT_LINK_PLACEHOLDERS.teaFlow.videoUrl,
  },
];