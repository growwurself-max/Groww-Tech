"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProductVisual } from "@/config/products";

/** Shared soft backdrop so every visual sits in the same light world. */
function Stage({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-line/80 bg-canvas-soft",
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

/* ------------------------------------------------------------------ Cupi --
   Animated mini sites: stacked browser cards with drifting gradient blobs.
--------------------------------------------------------------------------- */
function CupiVisual() {
  return (
    <Stage className="aspect-16/10">
      <div
        aria-hidden
        className="absolute -top-10 -left-6 size-40 rounded-full bg-brand-300/45 blur-2xl animate-drift"
      />
      <div
        aria-hidden
        className="absolute -right-8 -bottom-12 size-44 rounded-full bg-brand-100/70 blur-2xl animate-drift [animation-delay:-7s]"
      />

      <div className="relative flex h-full items-center justify-center p-5 sm:p-7">
        <div className="w-full max-w-64 -rotate-2 rounded-xl border border-line bg-surface/95 p-2.5 shadow-lg animate-float-a">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-line-strong" />
            <span className="size-1.5 rounded-full bg-line-strong/70" />
            <span className="size-1.5 rounded-full bg-brand-400" />
          </div>
          <div className="relative h-16 overflow-hidden rounded-lg bg-gradient-to-br from-brand-200 via-brand-50 to-canvas">
            <div className="absolute inset-x-3 top-3 h-1.5 w-16 rounded-pill bg-ink/25" />
            <div className="absolute inset-x-3 top-7 h-1.5 w-24 rounded-pill bg-ink/12" />
            <div className="absolute bottom-2.5 left-3 h-4 w-12 rounded-pill bg-brand-500/70" />
          </div>
        </div>

        <div className="absolute w-full max-w-56 rotate-2 translate-x-6 translate-y-3 rounded-xl border border-line bg-surface p-2.5 shadow-xl animate-float-b sm:translate-x-10">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-line-strong" />
            <span className="size-1.5 rounded-full bg-line-strong/70" />
            <span className="size-1.5 rounded-full bg-brand-400" />
          </div>
          <div className="relative h-14 overflow-hidden rounded-lg bg-ink">
            <div
              aria-hidden
              className="absolute -top-6 left-4 size-16 rounded-full bg-brand-400/70 blur-lg animate-drift"
            />
            <div className="absolute inset-x-3 bottom-3 space-y-1.5">
              <div className="h-1.5 w-20 rounded-pill bg-white/85" />
              <div className="h-1.5 w-12 rounded-pill bg-white/45" />
            </div>
          </div>
        </div>

        <span className="absolute right-6 bottom-5 flex size-7 items-center justify-center rounded-full border border-line bg-surface shadow-md animate-float-c">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
            <path
              d="m5 3 14 8-6 1.6L10 19z"
              fill="#00A271"
              stroke="#101413"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------ Result Hub --
   Institutional data grid: result rows, status pills, export actions.
--------------------------------------------------------------------------- */
function ResultHubVisual() {
  const rows = [
    { label: "Semester I", state: "Published" },
    { label: "Semester II", state: "Published" },
    { label: "Semester III", state: "Draft" },
  ];

  return (
    <Stage className="aspect-16/10">
      <div className="relative h-full p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-5 rounded-md bg-ink" />
            <div className="h-2 w-20 rounded-pill bg-ink/15" />
          </div>
          <div className="flex gap-1.5">
            <span className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[0.5rem] tracking-wide text-ink-subtle">
              PDF
            </span>
            <span className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[0.5rem] tracking-wide text-ink-subtle">
              XLSX
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="grid grid-cols-[1fr_auto] gap-2 px-2.5">
            <span className="h-1.5 w-14 rounded-pill bg-ink/25" />
            <span className="h-1.5 w-10 rounded-pill bg-ink/25" />
          </div>
          {rows.map((row, index) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-lg border border-line bg-surface/90 px-2.5 py-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    index === 2 ? "bg-line-strong" : "bg-brand-500",
                  )}
                />
                <span className="text-[0.55rem] font-medium text-ink-muted">{row.label}</span>
              </div>
              <span
                className={cn(
                  "rounded-pill px-1.5 py-0.5 font-mono text-[0.45rem] tracking-wide uppercase",
                  index === 2
                    ? "bg-canvas-deep text-ink-subtle"
                    : "bg-brand-50 text-brand-700",
                )}
              >
                {row.state}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-1.5">
          {[38, 62, 45, 80, 55, 70, 42, 88].map((height, index) => (
            <div
              key={index}
              style={{ height: `${height * 0.28}px` }}
              className={cn(
                "flex-1 rounded-sm",
                index > 4 ? "bg-brand-400/70" : "bg-brand-200",
              )}
            />
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------- Paper Hub --
   Document sheets with typeset formulas and an AI assist marker.
--------------------------------------------------------------------------- */
function PaperHubVisual() {
  return (
    <Stage className="aspect-16/10">
      <div
        aria-hidden
        className="absolute -top-8 right-4 size-36 rounded-full bg-brand-200/40 blur-2xl animate-drift [animation-delay:-4s]"
      />

      <div className="relative flex h-full items-center justify-center p-5 sm:p-6">
        <div className="absolute w-full max-w-52 -rotate-3 rounded-xl border border-line bg-surface/90 p-3 shadow-md animate-float-c">
          <div className="h-1.5 w-16 rounded-pill bg-ink/20" />
          <div className="mt-2.5 space-y-1.5">
            {[64, 88, 52].map((width, index) => (
              <div
                key={index}
                style={{ width: `${width}%` }}
                className="h-1.5 rounded-pill bg-canvas-deep"
              />
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-56 rounded-xl border border-line bg-surface p-3.5 shadow-xl animate-float-a">
          <div className="flex items-center justify-between">
            <span className="h-1.5 w-20 rounded-pill bg-ink/25" />
            <span className="flex items-center gap-1 rounded-pill bg-brand-50 px-1.5 py-0.5 font-mono text-[0.45rem] tracking-wide text-brand-700 uppercase">
              <svg viewBox="0 0 24 24" className="size-2" fill="currentColor" aria-hidden>
                <path d="M12 2l1.9 5.6L19.5 9l-4 3.4 1.2 5.9L12 15.4 7.3 18.3l1.2-5.9L4.5 9l5.6-1.4z" />
              </svg>
              AI
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="rounded-lg border border-line bg-canvas/70 p-2.5">
              <div className="font-mono text-[0.5rem] tracking-wide text-ink-muted">
                ∫ f(x) dx = F(x) + C
              </div>
            </div>
            {[
              { q: "Q1", w: "78%" },
              { q: "Q2", w: "62%" },
              { q: "Q3", w: "46%" },
            ].map((row) => (
              <div key={row.q} className="flex items-center gap-2">
                <span className="w-4 shrink-0 font-mono text-[0.5rem] text-ink-faint">
                  {row.q}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-pill bg-canvas-deep">
                  <div style={{ width: row.w }} className="h-full rounded-pill bg-brand-400/80" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------- Tea Flow --
   Order ticket with a scannable code and fulfilment steps.
--------------------------------------------------------------------------- */
function TeaFlowVisual() {
  const steps = ["Received", "Preparing", "Ready"];

  return (
    <Stage className="aspect-16/10">
      <div
        aria-hidden
        className="absolute -bottom-10 left-10 size-40 rounded-full bg-brand-100/80 blur-2xl animate-drift [animation-delay:-9s]"
      />

      <div className="relative flex h-full items-center justify-center p-5 sm:p-6">
        <div className="w-full max-w-60 rounded-xl border border-line bg-surface p-3.5 shadow-xl animate-float-b">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-1.5">
              <span className="block h-2 w-16 rounded-pill bg-ink/25" />
              <div className="flex justify-between gap-1.5">
                <span className="h-1.5 w-14 rounded-pill bg-canvas-deep" />
                <span className="h-1.5 w-8 rounded-pill bg-canvas-deep/70" />
              </div>
              <div className="flex justify-between gap-1.5">
                <span className="h-1.5 w-12 rounded-pill bg-canvas-deep" />
                <span className="h-1.5 w-10 rounded-pill bg-canvas-deep/70" />
              </div>
            </div>

            <div className="grid size-12 shrink-0 grid-cols-4 gap-[2px] rounded-md bg-ink p-1">
              {Array.from({ length: 16 }, (_, index) => (
                <span
                  key={index}
                  className={cn(
                    "rounded-[1px]",
                    [0, 3, 5, 10, 12, 15].includes(index) ? "bg-white/25" : "bg-white",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-1 items-center gap-1.5">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      "size-3 rounded-full border-2",
                      index <= 1 ? "border-brand-500 bg-brand-500/20" : "border-line-strong",
                    )}
                  />
                  <span className="font-mono text-[0.4rem] tracking-wide text-ink-faint uppercase">
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 ? (
                  <span
                    className={cn(
                      "mb-3 h-px flex-1",
                      index === 0 ? "bg-brand-400" : "bg-line-strong",
                    )}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}

const visualMap = {
  cupi: CupiVisual,
  resultHub: ResultHubVisual,
  paperHub: PaperHubVisual,
  teaFlow: TeaFlowVisual,
} as const;

const screenshotMap: Record<ProductVisual, string> = {
  cupi: "/screenshots/cupi.png",
  resultHub: "/screenshots/result-hub.png",
  paperHub: "/screenshots/paper-hub.png",
  teaFlow: "/screenshots/tea-flow.png",
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

export function ProductVisualArea({ visual, name }: { visual: ProductVisual; name: string }) {
  const screenshotPath = screenshotMap[visual];
  const Visual = visualMap[visual];

  // Try to use screenshot if it exists, otherwise fall back to CSS visual
  return (
    <div className="group relative h-full w-full">
      {screenshotPath ? (
        <ScreenshotVisual
          src={screenshotPath}
          alt={`${name} screenshot`}
          fallback={<Visual />}
        />
      ) : (
        <Visual />
      )}
    </div>
  );
}