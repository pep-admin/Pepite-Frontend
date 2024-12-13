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
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ErrorState {
  state: boolean | null;
  message: string;
}

interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Cast {
  // Ajoute les types spécifiques de chaque acteur si nécessaire
  [key: string]: any;
}

interface Crew {
  // Ajoute les types spécifiques de chaque membre d'équipe si nécessaire
  [key: string]: any;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface MovieDetails {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: Collection;
  budget?: number;
  cast?: Cast[];
  crew?: Crew[];
  genres?: Genre[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  origin_country?: string[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  first_air_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  number_of_seasons?: number;
}

interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number; // 0 pour non spécifié, 1 pour femme, 2 pour homme
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null; // null si l'image n'est pas disponible
}

export interface CrewMember {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number; // 0 pour non spécifié, 1 pour femme, 2 pour homme
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; // null si l'image n'est pas disponible
}

export interface Credits {
  cast?: CastMember[]; // Liste des membres du casting
  crew?: CrewMember[]; // Liste des membres de l'équipe
  id?: number; // ID du film
}

export interface ExternalIds {
  id?: number;
  imdb_id?: string | null;
  wikidata_id?: string | null;
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
}