export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  is_rated: boolean;
  is_unwanted: boolean;
  is_wanted: boolean;
  is_watched: boolean;
  is_gold_nugget: boolean;
  is_turnip: boolean;
  user_rating: number | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ErrorState {
  state: boolean | null;
  message: string | null;
}
