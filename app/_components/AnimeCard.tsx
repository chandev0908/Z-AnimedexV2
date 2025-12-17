"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Anime } from "@/types/anime.types";

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const hoverTimeout = useRef<number | null>(null);
  const DELAY_MS = 3000;

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (anime.trailer?.embed_url) {
      // start delay before showing trailer
      hoverTimeout.current = window.setTimeout(() => {
        setShowTrailer(true);
      }, DELAY_MS);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTrailer(false);
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const trailerSrc = anime.trailer?.embed_url
    ? // prefer privacy-enhanced domain, then add params to hide controls and autoplay muted
      anime.trailer.embed_url
        .replace('youtube.com/embed', 'www.youtube-nocookie.com/embed')
        + (anime.trailer.embed_url.includes('?') ? '&' : '?')
        + 'autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1'
    : undefined;

  return (
    <div
      className="pointer-events-auto transition-all duration-5000 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/anime/${anime.mal_id}`} className="block relative">
        <div
          className={`bg-white rounded-lg overflow-hidden cursor-pointer flex flex-col h-80 transition-all duration-300 origin-center ${
            isHovered ? "shadow-2xl scale-110 z-50 relative" : "shadow-md hover:shadow-xl"
          }`}
        >
          {showTrailer && trailerSrc ? (
            <iframe
              src={trailerSrc}
              className="w-full h-full object-cover"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
          )}

          <div className="p-3 flex-1 flex flex-col justify-between absolute bottom-0 bg-gradient-to-t from-black to-transparent text-white w-full">
            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
              {anime.title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
