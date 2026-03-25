"use client";
import SearchBar from "./_components/SearchBar";
import Head from "next/head";
import { FaCaretDown, FaSun } from "react-icons/fa";
import HeadNav from "./_components/HeadNav";
import { useTheme } from "next-themes";
import { IoMoon } from "react-icons/io5";
import { useState, useEffect } from "react";
import { AnimeList } from "./_components/AnimeList";
import { motion } from "motion/react";
import {
  useAnimeActions,
  useSeasonalAnime,
  useTopAnime,
} from "@/stores/anime/animeSelectors";

export default function Home() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Z-Animedex 2.0</title>
      </Head>
      <main className="h-screen overflow-y-scroll overflow-x-hidden scroll-smooth">
        {/* First Section Landing Page */}
        <section className="@container snap-start landing-section relative flex flex-col items-center justify-center h-screen overflow-hidden">
          {/* Theme Toggle Button */}
          {mounted && (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md shadow-lg transition-all duration-300 group"
              onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
              }}
              aria-label="Toggle Theme"
            >
              {resolvedTheme === "dark" ? (
                <FaSun className="text-2xl text-yellow-400 drop-shadow-md group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <IoMoon className="text-2xl text-white drop-shadow-md group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </motion.button>
          )}

          {/* Background Image with Overlay */}
          <div className="bg-img absolute inset-0 z-0 scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-background z-[5]"></div>

          <div className="px-6 text-center z-10 w-full flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="page-title text-6xl md:text-9xl font-bold mb-8 font-sans text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-wider"
            >
              Z-Animedex
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-full flex justify-center mt-4"
            >
              <SearchBar />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="floating-scroll-down flex flex-col items-center text-white/80 absolute bottom-12 z-10"
          >
            <p className="font-sans text-sm md:text-base tracking-widest uppercase shadow-black drop-shadow-lg mb-2">
              Discover Latest Anime
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FaCaretDown className="text-3xl drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </section>

        {/* Second section - Anime List */}
        <section className="@container anime-container snap-start relative z-10 bg-background transition-colors duration-300">
          <HeadNav />
          <div className="content w-full max-w-7xl mx-auto py-10 px-4 md:px-0">
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
              AnimeListLabel="Top Anime"
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
