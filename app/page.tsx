"use client";
import SearchBar from "./_components/SearchBar";
import Head from "next/head";
import { FaCaretDown, FaSun } from "react-icons/fa";
import HeadNav from "./_components/HeadNav";
import { useTheme } from "next-themes";
import { IoMoon } from "react-icons/io5";
import { useState } from "react";
import { AnimeList } from "./_components/AnimeList";
import {
  useAnimeActions,
  useSeasonalAnime,
  useTopAnime,
} from "@/stores/anime/animeSelectors";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState(false);

  return (
    <>
      <Head>
        <title>Z-Animedex 2.0</title>
      </Head>
      <main className="h-screen overflow-y-scroll">
        {/* First Section Landing Page */}
        <section className="@container snap-start landing-section relative flex flex-col items-center justify-center h-screen">
          <button
            className="absolute top-2 right-2 z-50"
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setIcon((prev) => !prev);
            }}
          >
            {!icon ? (
              <div className="flex flex-col justify-items-center items-center">
                <IoMoon className="text-4xl text-foreground" />
                <p className="text-xs">Light Mode</p>
              </div>
            ) : (
              <div className="flex flex-col justify-items-center items-center">
                <FaSun className="text-4xl text-foreground" />
                <p className="text-xs">Dark Mode</p>
              </div>
            )}
          </button>
          <div className="bg-img"></div>
          <div className="px-6 text-center">
            <h1 className="page-title text-5xl md:text-8xl font-semibold mb-6 font-sans text-white text-stroke">
              Z-Animedex
            </h1>
          </div>
          <SearchBar
            onSearch={(query) => console.log("Searching for:", query)}
          />
          <div className="floating-scroll-down flex flex-col items-center text-white absolute bottom-10 animate-bounce">
            <p className="font-sans text-stroke">
              Scroll Down To Check Latest Anime
            </p>
            <FaCaretDown />
          </div>
        </section>

        {/* Second section - Anime List */}
        <section className="@container anime-container snap-start overflow-hidden">
          <HeadNav></HeadNav>
          <div className="content w-full max-w-7xl mx-auto">
            <AnimeList
              AnimeListLabel="Current Season"
              AnimeSelector={useSeasonalAnime}
              useActions={useAnimeActions}
              fetchOnMount={(actions) => {
                if (typeof actions.fetchCurrentSeason === "function")
                  actions.fetchCurrentSeason();
              }}
            />
            <AnimeList
              AnimeListLabel="Top anime"
              AnimeSelector={useTopAnime}
              useActions={useAnimeActions}
              fetchOnMount={(actions) => {
                if (typeof actions.fetchTopAnime === "function")
                  actions.fetchTopAnime();
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
