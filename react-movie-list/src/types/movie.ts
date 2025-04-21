export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  budget: number;
  revenue: number;
  production_companies: Company[];
  spoken_languages: Language[];
  production_countries: Country[];
  credits: {
    cast: Actor[];
  };
  videos: {
    results: Video[];
  };
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface Company {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface Language {
  iso_639_1: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
}

export interface Actor {
  cast_id: number;
  character: string;
  name: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
} 