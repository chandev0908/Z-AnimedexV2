import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { animeService } from "@/services/anime.service";
import { Anime, PaginationInfo } from "@/types/anime.types";

// Define the store's state and actions
interface AnimeState {
  // ===== STATE (Data) =====
  topAnime: Anime[]; // List of top anime
  searchResults: Anime[]; // Search results
  selectedAnime: Anime | null; // Currently viewed anime
  seasonalAnime: Anime[]; // Seasonal anime list

  // Pagination data
  pagination: PaginationInfo | null;
  currentPage: number;

  // UI states
  loading: boolean; // Loading state for top/seasonal anime
  searchLoading: boolean; // Separate loading for search
  error: string | null; // Error messages

  // ===== ACTIONS (Functions to modify state) =====
  fetchTopAnime: (page?: number) => Promise<void>;
  searchAnime: (query: string, page?: number) => Promise<void>;
  fetchAnimeById: (id: number) => Promise<void>;
  fetchCurrentSeason: () => Promise<void>;
  fetchSeasonalAnime: (year: number, season: string) => Promise<void>;
  clearSearch: () => void;
  clearError: () => void;
  resetStore: () => void;
}

// Create the store
export const useAnimeStore = create<AnimeState>()(
  devtools(
    // persist( // Uncomment to save to localStorage
    (set, get) => ({
      // ===== INITIAL STATE =====
      topAnime: [],
      searchResults: [],
      selectedAnime: null,
      seasonalAnime: [],
      pagination: null,
      currentPage: 1,
      loading: false,
      searchLoading: false,
      error: null,

      // ===== ACTION IMPLEMENTATIONS =====

      // Fetch top anime
      fetchTopAnime: async (page = 1) => {
        set({ loading: true, error: null });

        try {
          // Use the corrected service method
          const response = await animeService.getTopAnime(page);

          set({
            topAnime: response.data,
            pagination: response.pagination,
            currentPage: page,
            loading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to fetch anime",
            loading: false,
          });
        }
      },

      // Search anime with debouncing handled in component
      searchAnime: async (query: string, page = 1) => {
        // Don't search empty queries
        if (!query.trim()) {
          set({ searchResults: [], searchLoading: false });
          return;
        }

        set({ searchLoading: true, error: null });

        try {
          const response = await animeService.searchAnime(query, page);

          set({
            searchResults: response.data,
            pagination: response.pagination,
            currentPage: page,
            searchLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Search failed",
            searchLoading: false,
          });
        }
      },

      // Fetch single anime details
      fetchAnimeById: async (id: number) => {
        set({ loading: true, error: null });

        try {
          const response = await animeService.getAnimeById(id);

          set({
            selectedAnime: response.data,
            loading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch anime details",
            loading: false,
          });
        }
      },

      // Fetch current season anime
      fetchCurrentSeason: async () => {
        set({ loading: true, error: null });

        try {
          const response = await animeService.getCurrentSeason();

          set({
            seasonalAnime: response.data,
            pagination: response.pagination,
            loading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch seasonal anime",
            loading: false,
          });
        }
      },

      // Fetch specific season anime
      fetchSeasonalAnime: async (year: number, season: string) => {
        set({ loading: true, error: null });

        try {
          const response = await animeService.getSeasonalAnime(year, season);

          set({
            seasonalAnime: response.data,
            pagination: response.pagination,
            loading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch seasonal anime",
            loading: false,
          });
        }
      },

      // Clear search results
      clearSearch: () =>
        set({
          searchResults: [],
          searchLoading: false,
          pagination: null,
        }),

      // Clear error messages
      clearError: () => set({ error: null }),

      // Reset entire store to initial state
      resetStore: () =>
        set({
          topAnime: [],
          searchResults: [],
          selectedAnime: null,
          seasonalAnime: [],
          pagination: null,
          currentPage: 1,
          loading: false,
          searchLoading: false,
          error: null,
        }),
    }),
    //   { name: 'anime-storage' } // Name for localStorage
    // ),
    { name: "anime-store" } // Name for Redux DevTools
  )
);
