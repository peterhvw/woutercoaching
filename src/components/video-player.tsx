"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Click-to-load video. Nothing is requested from the video provider until the
 * visitor presses play, and the notice tells them what that click does. This
 * is what lets the site run without a cookie banner; do not load the player
 * automatically.
 */
export function VideoPlayer({
  title,
  embedUrl,
  poster,
  notice,
  buttonLabel,
}: {
  title: string;
  embedUrl: string;
  poster: string | null;
  notice: string;
  buttonLabel: string;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-ink">
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setActive(true)}
        className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-sage-800 text-left"
      >
        {poster && (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="object-cover opacity-80 transition-opacity group-hover:opacity-70"
          />
        )}
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-sage-800 shadow-lg transition-transform group-hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="rounded-full bg-ink/70 px-4 py-1.5 text-sm font-semibold text-white">
            {buttonLabel}
          </span>
        </span>
      </button>
      <p className="mt-3 text-sm leading-relaxed text-muted">{notice}</p>
    </div>
  );
}
