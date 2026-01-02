"use client";

import { useEffect } from "react";
import { useAnimeActions, useAnimeSearch } from "@/stores/anime/animeSelectors";
import { AnimeCard } from "@/app/_components/AnimeCard";
import HeadNav from "../_components/HeadNav";

export default function SearchClient({ query }: { query?: string }) {
  const { searchAnime } = useAnimeActions();
  const { results, loading, error } = useAnimeSearch();
  useEffect(() => {
    searchAnime(query || "");
  }, [query]);

  return (
    <>
      <HeadNav />
      <section className="@container min-h-screen w-full max-w-7xl mx-auto px-4 py-8">
        <p className="text-center">Search Results for "{query}"</p>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-foreground" />
          </div>
        )}

        {!loading && results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((anime: any) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500">No anime found</p>
          )
        )}
      </section>
    </>
  );
}
