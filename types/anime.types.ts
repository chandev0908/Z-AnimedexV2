export interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  trailer: {
    youtube_id: "string";
    url: "string";
    embed_url: "string";
  };
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  synopsis: string | null;
  type: string; // TV, Movie, OVA, etc.
  episodes: number | null;
  status: string; // Airing, Finished, etc.
  aired: {
    from: string;
    to: string | null;
  };
  genres: Array<{ mal_id: number; name: string }>;
  studios: Array<{ mal_id: number; name: string }>;
  members: number;
  favorites: number;
}

export interface PaginationInfo {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}
