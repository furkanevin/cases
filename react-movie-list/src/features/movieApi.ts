import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { Movie, MovieResponse, GenreResponse } from '../types/movie';
import { TMDB_API_BASE_URL } from '../constant';

interface ReviewResponse {
  id: number;
  page: number;
  results: Array<{
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path: string | null;
      rating: number | null;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  }>;
  total_pages: number;
  total_results: number;
}

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error('TMDB API key is not defined in environment variables');
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: TMDB_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${TMDB_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopRatedMovies: builder.query<MovieResponse, number>({
      query: (page = 1) => `/movie/top_rated?page=${page}`,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return `Error fetching top rated movies: ${JSON.stringify(response.data)}`;
      },
    }),
    getPopularMovies: builder.query<MovieResponse, number>({
      query: (page = 1) => `/movie/popular?page=${page}`,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return `Error fetching popular movies: ${JSON.stringify(response.data)}`;
      },
    }),
    getTrendingMovies: builder.query<MovieResponse, number>({
      query: (page = 1) => `/trending/movie/week?page=${page}`,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return `Error fetching trending movies: ${JSON.stringify(response.data)}`;
      },
    }),
    getMovieDetails: builder.query<Movie, number>({
      query: (movieId) => `/movie/${movieId}`,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return `Error fetching movie details: ${JSON.stringify(response.data)}`;
      },
    }),
    getGenres: builder.query<GenreResponse, void>({
      query: () => `/genre/movie/list`,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return `Error fetching genres: ${JSON.stringify(response.data)}`;
      },
    }),
    getMovieReviews: builder.query<ReviewResponse, string>({
      query: (movieId) => `/movie/${movieId}/reviews`,
      transformErrorResponse: (response: FetchBaseQueryError) => {
        return `Error fetching movie reviews: ${JSON.stringify(response.data)}`;
      },
    }),
  }),
});

export const {
  useGetTopRatedMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetMovieDetailsQuery,
  useGetGenresQuery,
  useGetMovieReviewsQuery,
} = movieApi; 