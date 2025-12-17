const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting helper
let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 334;

async function rateLimitedFetch(url: string) {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await new Promise(resolve => 
      setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest)
    );
  }
  
  lastRequestTime = Date.now();
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }
  
  return response.json();
}

export const animeService = {
  
  // ✅ CORRECT: Get popular anime (sorted by popularity)
  getTopAnime: async (page = 1, limit = 25) => {
    return await rateLimitedFetch(
      `${JIKAN_BASE_URL}/top/anime?page=${page}&limit=${limit}&sfw=true`
    );
  },

  // ✅ Get anime by score (highest rated)
  getTopRatedAnime: async (page = 1, limit = 25) => {
    return await rateLimitedFetch(
      `${JIKAN_BASE_URL}/anime?order_by=score&sort=desc&page=${page}&limit=${limit}&sfw=true`
    );
  },

  // ✅ Get airing anime
  getAiringAnime: async (page = 1) => {
    return await rateLimitedFetch(
      `${JIKAN_BASE_URL}/anime?status=airing&page=${page}&sfw=true`
    );
  },

  // ✅ Search anime
  searchAnime: async (query: string, page = 1) => {
    return await rateLimitedFetch(
      `${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&sfw=true`
    );
  },

  // ✅ Get anime by ID
  getAnimeById: async (id: number) => {
    return await rateLimitedFetch(
      `${JIKAN_BASE_URL}/anime/${id}/full`
    );
  },

  // ✅ Get current season
  getCurrentSeason: async () => {
    return await rateLimitedFetch(
      `${JIKAN_BASE_URL}/seasons/now`
    );
  },

  // ✅ Get specific season
  getSeasonalAnime: async (year: number, season: string) => {
    return await rateLimitedFetch(
      `${JIKAN_BASE_URL}/seasons/${year}/${season}`
    );
  },
};