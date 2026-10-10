"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Play, ArrowUpRight } from "lucide-react";
import { experiences } from "@/config/experiences";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb } from "@/components/ui/decor";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

type VideoItem = {
  id: string;
  name: string;
  description: string;
  label: string;
  thumbnail: string | null;
  embedUrl: string;
  externalUrl: string;
  isPlaylist: boolean;
};

/**
 * Turn a verified YouTube URL (short link, watch link or playlist) into a
 * privacy-friendly embed URL. Nothing is invented — the ids come straight from
 * the studio's own `experiences` catalogue.
 */
function toEmbedUrl(url: string): string {
  const listMatch = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
  if (listMatch) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${listMatch[1]}&rel=0`;
  }

  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if (shortMatch) {
    return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}?rel=0`;
  }

  const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]+)/);
  if (watchMatch) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}?rel=0`;
  }

  return url;
}

/** Only projects that actually ship a verified video URL are shown. */
const videos: VideoItem[] = experiences
  .filter((experience): experience is typeof experience & { videoUrl: string } =>
    Boolean(experience.videoUrl),
  )
  .map((experience) => ({
    id: experience.id,
    name: experience.name,
    description: experience.description,
    label: experience.videoLabel ?? "Watch",
    thumbnail: experience.preview,
    embedUrl: toEmbedUrl(experience.videoUrl),
    externalUrl: experience.videoUrl,
    isPlaylist: experience.videoUrl.includes("list="),
  }));

export function WatchOurWork() {
  const reduceMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <Section id="videos" tone="surface" spacing="md" className="overflow-hidden">
      <GlowOrb className="-top-24 right-[-12%] size-[32rem] opacity-50" />
      <GlowOrb tone="neutral" className="-bottom-32 -left-24 size-[26rem]" />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Watch our work"
            title={
              <>
                See the products <span className="text-gradient">in motion.</span>
              </>
            }
            description="Short walkthroughs and demos of the platforms and experiences we've built."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {videos.map((video, index) => {
            const isActive = activeId === video.id;

            return (
              <Reveal key={video.id} variant="up" delay={index * 0.08}>
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3, ease: EASE.outExpo }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-xs transition-[box-shadow,border-color] duration-500 ease-smooth hover:border-line-strong hover:shadow-lg"
                >
                  <div className="relative aspect-video overflow-hidden bg-ink">
                    {isActive ? (
                      <iframe
                        src={`${video.embedUrl}&autoplay=1`}
                        title={`${video.name} video`}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveId(video.id)}
                        aria-label={`Play ${video.name} video`}
                        className="absolute inset-0 h-full w-full cursor-pointer"
                      >
                        {video.thumbnail ? (
                          <Image
                            src={video.thumbnail}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 26rem, (min-width: 768px) 45vw, 92vw"
                            className="object-cover opacity-90 transition-transform duration-700 ease-smooth group-hover:scale-105"
                          />
                        ) : (
                          <span
                            className="absolute inset-0"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle at 30% 25%, color-mix(in oklab, var(--color-brand-400) 70%, transparent), transparent 55%), radial-gradient(circle at 75% 80%, color-mix(in oklab, var(--color-brand-600) 60%, transparent), transparent 60%)",
                              backgroundColor: "var(--color-ink)",
                            }}
                          />
                        )}

                        <span
                          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                          aria-hidden
                        />

                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex size-14 items-center justify-center rounded-full bg-surface/95 text-ink shadow-lg transition-transform duration-300 ease-smooth group-hover:scale-110">
                            <Play className="ml-0.5 size-6 fill-current" />
                          </span>
                        </span>

                        {video.isPlaylist ? (
                          <span className="absolute top-4 left-4 rounded-pill border border-white/25 bg-ink/55 px-2.5 py-1 font-mono text-2xs font-medium tracking-wide text-white uppercase backdrop-blur-sm">
                            Playlist
                          </span>
                        ) : null}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg text-ink sm:text-xl">{video.name}</h3>
                      <span className="font-mono text-2xs tracking-wide text-ink-faint uppercase">
                        {video.label}
                      </span>
                    </div>
                    <p className="text-sm text-pretty text-ink-muted">{video.description}</p>

                    <a
                      href={video.externalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={cn(
                        "mt-auto inline-flex w-fit items-center gap-1.5 pt-2 text-sm font-medium text-brand-700",
                        "transition-colors duration-300 ease-smooth hover:text-brand-600",
                        "focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:outline-none rounded",
                      )}
                    >
                      Open on YouTube
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
