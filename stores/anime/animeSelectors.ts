"use client";
import { useAnimeStore } from "./useAnimeStore";
import { useShallow } from "zustand/react/shallow";

export const useTopAnime = () =>
  useAnimeStore(
    useShallow((state) => ({
      anime: state.topAnime,
      loading: state.loading,
      pagination: state.pagination,
      currentPage: state.currentPage,
      error: state.error,
    }))
  );

// Get search data
export const useAnimeSearch = () =>
  useAnimeStore(
    useShallow((state) => ({
      results: state.searchResults,
      loading: state.searchLoading,
      pagination: state.pagination,
      error: state.error,
    }))
  );

// Get seasonal anime data
export const useSeasonalAnime = () =>
  useAnimeStore(
    useShallow((state) => ({
      anime: state.seasonalAnime,
      loading: state.loading,
      pagination: state.pagination,
      currentPage: state.currentPage,
      error: state.error,
    }))
  );

// Get single selected anime
export const useSelectedAnime = () =>
  useAnimeStore(
    useShallow((state) => ({
      anime: state.selectedAnime,
      loading: state.loading,
      error: state.error,
    }))
  );
// Get only actions (no data)
export const useAnimeActions = () =>
  useAnimeStore(
    useShallow((state) => ({
      fetchTopAnime: state.fetchTopAnime,
      searchAnime: state.searchAnime,
      fetchAnimeById: state.fetchAnimeById,
      fetchCurrentSeason: state.fetchCurrentSeason,
      fetchSeasonalAnime: state.fetchSeasonalAnime,
      clearSearch: state.clearSearch,
      clearError: state.clearError,
    }))
  );
