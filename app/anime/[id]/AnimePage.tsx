"use client";
import HeadNav from "@/app/_components/HeadNav";
import {
  useAnimeActions,
  useSelectedAnime,
} from "@/stores/anime/animeSelectors";
import { useEffect } from "react";

export default function AnimePage({ id }: { id?: string }) {
  const animeId = parseInt(id || "");
  const { fetchAnimeById } = useAnimeActions();
  const { anime, loading, error } = useSelectedAnime();

  useEffect(() => {
    if (!animeId || isNaN(animeId)) return;
    fetchAnimeById(animeId);
  }, [animeId, fetchAnimeById]);

  return (
    <>
      <HeadNav />
      <section className="@container min-h-screen w-full max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8"></div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-foreground" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-red-500 text-center">
            <p className="text-xl font-bold">Error</p>
            <p>{error}</p>
            <button
              onClick={() => fetchAnimeById(animeId)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        )}

        {/* Success State - Show Anime */}
        {!loading && !error && anime && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full md:w-64 h-96 object-cover rounded-lg shadow-lg"
              />

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
                {anime.title_english && (
                  <p className="text-gray-600 mb-4">{anime.title_english}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-yellow-500 px-3 py-1 bg-gray-500 rounded">
                    ★ {anime.score || "N/A"}
                  </span>
                  <span className="px-3 py-1 bg-blue-500 text-white rounded">
                    {anime.type}
                  </span>
                  <span className="px-3 py-1 bg-gray-200 rounded text-black">
                    {anime.episodes ? `${anime.episodes} Episodes` : "Unknown"}
                  </span>
                  <span className="px-3 py-1 bg-green-500 text-white rounded">
                    {anime.status}
                  </span>
                </div>

                <div className="mb-4">
                  <strong>Genres: </strong>
                  {anime.genres?.map((g) => g.name).join(", ") || "N/A"}
                </div>

                <div className="mb-4">
                  <strong>Studios: </strong>
                  {anime.studios?.map((s) => s.name).join(", ") || "N/A"}
                </div>

                <div className="mb-4">
                  <strong>Ranked: </strong>#{anime.rank || "N/A"}
                </div>

                <div className="mb-4">
                  <strong>Popularity: </strong>#{anime.popularity || "N/A"}
                </div>
              </div>
            </div>
            {/* Trailer Section */}
            {anime.trailer && anime.trailer.youtube_id && (
              <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                    title={`${anime.title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
            {/* Synopsis */}
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-text-secondary text-lg font-bold mb-3">
                Synopsis
              </h3>
              <p className="leading-relaxed">
                {anime.synopsis || "No synopsis available"}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-secondary p-4 rounded-lg shadow">
                <p className="text-sm text-text-secondary">Score</p>
                <p className="font-bold">{anime.score || "N/A"}</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg shadow">
                <p className="text-sm text-text-secondary">Members</p>
                <p className="font-bold">
                  {anime.members?.toLocaleString() || "N/A"}
                </p>
              </div>
              <div className="bg-secondary p-4 rounded-lg shadow">
                <p className="text-sm text-text-secondary">Favorites</p>
                <p className="font-bold">
                  {anime.favorites?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No Anime Found */}
        {!loading && !error && !anime && (
          <p className="text-center text-gray-500 text-xl">
            No anime found with ID: {animeId}
          </p>
        )}
      </section>
    </>
  );
}
