"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ExperienceVisual } from "@/config/experiences";
import type { ProductVisual } from "@/config/products";
import { ProductVisualArea } from "@/components/products/product-visuals";

/**
 * Designed placeholders for experiences that have no screenshot yet.
 *
 * These are abstract, hand-built CSS/DVG compositions — NOT screenshots and NOT
 * stock imagery. They intentionally contain no numbers, ratings or claims, so
 * nothing reads as a fabricated statistic. Once a real screenshot exists, add
 * its path to the project's `preview` field and the card renders that instead.
 */

/** Mirrors the soft stage used by the product visuals so both sit in one world. */
function Stage({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative isolate h-full w-full overflow-hidden rounded-2xl border border-line/80 bg-canvas-soft",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-line-strong) 50%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-line-strong) 50%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ 3D Furniture --
   A perspective floor plane with furniture volumes resting on it, plus a
   dashed orbit ring hinting that the scene can be rotated.
--------------------------------------------------------------------------- */
function Furniture3DVisual() {
  return (
    <div className="aspect-16/10">
      <Stage>
        <div
          aria-hidden
          className="absolute -top-12 left-6 size-44 rounded-full bg-brand-200/45 blur-2xl animate-drift"
        />

        <div className="relative flex h-full items-center justify-center [perspective:900px] p-5 sm:p-7">
          {/* Floor plane */}
          <div
            aria-hidden
            className="absolute inset-x-6 bottom-5 h-28 origin-bottom rounded-2xl border border-line bg-canvas-deep/50 [transform:rotateX(64deg)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklab, var(--color-line-strong) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-line-strong) 70%, transparent) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Orbit ring */}
          <div
            aria-hidden
            className="absolute inset-x-10 bottom-8 h-16 rounded-[50%] border border-dashed border-brand-300/80 [transform:rotateX(64deg)]"
          />

          {/* Furniture volumes */}
          <div className="relative flex h-full w-full max-w-72 items-end justify-center gap-3 animate-float-a">
            {/* Low block */}
            <div className="relative w-16 shrink-0 rounded-lg border border-line bg-surface shadow-md">
              <div className="h-2.5 rounded-t-lg bg-brand-300/70" />
              <div className="flex h-11 items-end gap-1 p-1.5">
                <span className="h-1.5 flex-1 rounded-pill bg-canvas-deep" />
                <span className="h-1.5 w-4 rounded-pill bg-canvas-deep/70" />
              </div>
            </div>

            {/* Tall block */}
            <div className="relative w-14 shrink-0 rounded-lg border border-line bg-surface shadow-md">
              <div className="h-3 rounded-t-lg bg-brand-400/60" />
              <div className="space-y-1 p-1.5">
                <span className="block h-1.5 rounded-pill bg-canvas-deep" />
                <span className="block h-1.5 w-3/4 rounded-pill bg-canvas-deep/70" />
              </div>
            </div>

            {/* Table: slab on two legs */}
            <div className="relative w-20 shrink-0">
              <div className="h-2.5 rounded-full border border-line bg-surface shadow-md" />
              <div className="mx-auto flex h-12 w-10 justify-between">
                <span className="w-1.5 rounded-b-full bg-line-strong/70" />
                <span className="w-1.5 rounded-b-full bg-line-strong/70" />
              </div>
            </div>
          </div>
        </div>
      </Stage>
    </div>
  );
}

/* ------------------------------------------------------------- Score Check --
   A completion ring and a list of verified-looking rows. Deliberately carries
   no numbers or grades — only the shape of a results check.
--------------------------------------------------------------------------- */
function ScoreCheckVisual() {
  const rows = [92, 74, 58];

  return (
    <div className="aspect-16/10">
      <Stage>
        <div
          aria-hidden
          className="absolute -right-6 -bottom-10 size-40 rounded-full bg-brand-100/80 blur-2xl animate-drift [animation-delay:-6s]"
        />

        <div className="relative flex h-full items-center gap-4 p-5 sm:gap-6 sm:p-7">
          {/* Completion ring */}
          <div className="relative grid size-24 shrink-0 place-items-center sm:size-28">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--color-canvas-deep)"
                strokeWidth="9"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--color-brand-500)"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="78 100"
              />
            </svg>
            <span className="absolute grid size-9 place-items-center rounded-full bg-surface shadow-sm">
              <svg viewBox="0 0 24 24" className="size-4 text-brand-600" fill="none" aria-hidden>
                <path
                  d="m5 12.5 4.5 4.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {/* Result rows */}
          <div className="min-w-0 flex-1 space-y-2.5">
            {rows.map((fill, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-surface/90 px-3 py-2.5"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-50">
                  <svg viewBox="0 0 24 24" className="size-3 text-brand-600" fill="none" aria-hidden>
                    <path
                      d="m5 12.5 4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <span className="block h-1.5 w-16 rounded-pill bg-ink/20" />
                  <span className="block h-1.5 overflow-hidden rounded-pill bg-canvas-deep">
                    <span
                      className="block h-full rounded-pill bg-brand-400/80"
                      style={{ width: `${fill}%` }}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Stage>
    </div>
  );
}

/* ------------------------------------------------------------- Book Launch --
   An upright book with a ribbon, backed by a soft launch burst.
--------------------------------------------------------------------------- */
function BookLaunchVisual() {
  return (
    <div className="aspect-16/10">
      <Stage>
        <div
          aria-hidden
          className="absolute inset-x-10 top-4 bottom-10 rounded-[50%] bg-brand-200/40 blur-2xl animate-pulse-ring"
        />

        <div className="relative flex h-full items-center justify-center p-5 sm:p-7">
          <div className="relative flex h-full items-center justify-center animate-float-b">
            {/* Back cover for depth */}
            <div className="absolute w-32 -rotate-6 rounded-lg border border-line bg-surface/70 shadow-sm sm:w-36" />

            {/* Front cover */}
            <div className="relative w-32 rounded-lg border border-line bg-surface p-3 shadow-lg sm:w-36">
              <div className="h-14 rounded-md bg-gradient-to-br from-brand-400 via-brand-300 to-brand-100 sm:h-16">
                <div className="flex h-full items-end p-2">
                  <span className="block h-1.5 w-10 rounded-pill bg-white/80" />
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                <span className="block h-1.5 w-20 rounded-pill bg-ink/25" />
                <span className="block h-1.5 w-14 rounded-pill bg-ink/12" />
              </div>
              {/* Ribbon */}
              <div className="absolute -top-1 right-4 h-24 w-2 rounded-b-full bg-brand-600/80" />
            </div>

            {/* Spark marks */}
            <span className="absolute -top-1 left-2 size-2 rounded-full bg-brand-400 animate-float-c" />
            <span className="absolute top-10 -right-3 size-1.5 rounded-full bg-brand-300 animate-float-a" />
            <span className="absolute -bottom-1 left-6 size-1.5 rounded-full bg-brand-300/80 animate-float-b" />
          </div>
        </div>
      </Stage>
    </div>
  );
}

/* ------------------------------------------------------------- Waffel Cafe --
   A waffle lattice with a cup alongside — a cafe counter in one composition.
--------------------------------------------------------------------------- */
function WaffelCafeVisual() {
  return (
    <div className="aspect-16/10">
      <Stage>
        <div
          aria-hidden
          className="absolute -left-8 -top-10 size-40 rounded-full bg-brand-200/50 blur-2xl animate-drift [animation-delay:-11s]"
        />

        <div className="relative flex h-full items-center justify-center gap-4 p-5 sm:gap-6 sm:p-7">
          {/* Waffle block */}
          <div className="relative -rotate-6 rounded-xl border border-line bg-surface p-2.5 shadow-lg animate-float-a">
            <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-brand-200/50 p-2">
              {Array.from({ length: 9 }, (_, index) => (
                <span
                  key={index}
                  className={cn(
                    "aspect-square rounded-[4px] border border-brand-300/70",
                    index % 2 === 0 ? "bg-brand-100" : "bg-surface/80",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Cup */}
          <div className="relative flex items-end gap-2 animate-float-c">
            <div className="relative w-16 rounded-b-2xl rounded-t-lg border border-line bg-surface p-2 shadow-md sm:w-20">
              <div className="h-2 rounded-pill bg-brand-300/80" />
              <div className="mt-2 space-y-1.5">
                <span className="block h-1.5 w-full rounded-pill bg-canvas-deep" />
                <span className="block h-1.5 w-2/3 rounded-pill bg-canvas-deep/70" />
              </div>
            </div>
            {/* Handle */}
            <span className="-ml-4 mb-3 size-6 rounded-full border-2 border-line-strong/80" />
          </div>
        </div>
      </Stage>
    </div>
  );
}

const placeholderMap = {
  furniture3d: Furniture3DVisual,
  scoreCheck: ScoreCheckVisual,
  bookLaunch: BookLaunchVisual,
  waffelCafe: WaffelCafeVisual,
} as const;

type PlaceholderVisual = keyof typeof placeholderMap;

const websiteScreenshotMap: Record<Exclude<PlaceholderVisual, ProductVisual>, string> = {
  furniture3d: "/screenshots/3d-furniture.png",
  scoreCheck: "/screenshots/score-check.png",
  bookLaunch: "/screenshots/book-launch.png",
  waffelCafe: "/screenshots/waffel-cafe.png",
};

function ScreenshotVisual({ src, alt, fallback }: { src: string; alt: string; fallback: React.ReactNode }) {
  const [error, setError] = React.useState(false);

  if (error) {
    return <>{fallback}</>;
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-canvas-soft">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        onError={() => setError(true)}
      />
    </div>
  );
}

function isProductVisual(visual: ExperienceVisual): visual is ProductVisual {
  return (
    visual === "cupi" || visual === "resultHub" || visual === "paperHub" || visual === "teaFlow"
  );
}

function isWebsiteVisual(visual: ExperienceVisual): visual is Exclude<PlaceholderVisual, ProductVisual> {
  return visual === "furniture3d" || visual === "scoreCheck" || visual === "bookLaunch" || visual === "waffelCafe";
}

/** Renders either the existing product artwork, a screenshot, or one of the new placeholders. */
export function ExperienceArtwork({ visual, name }: { visual: ExperienceVisual; name: string }) {
  if (isProductVisual(visual)) {
    return <ProductVisualArea visual={visual} name={name} />;
  }

  if (isWebsiteVisual(visual)) {
    const screenshotPath = websiteScreenshotMap[visual];
    const Visual = placeholderMap[visual];
    return (
      <ScreenshotVisual
        src={screenshotPath}
        alt={`${name} screenshot`}
        fallback={<Visual />}
      />
    );
  }

  const Visual = placeholderMap[visual as PlaceholderVisual];
  return <Visual />;
}