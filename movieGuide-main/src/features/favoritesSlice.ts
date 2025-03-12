import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types/movie';

interface FavoritesState {
  movies: Movie[];
}

const initialState: FavoritesState = {
  movies: JSON.parse(localStorage.getItem('favoriteMovies') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
      localStorage.setItem('favoriteMovies', JSON.stringify(state.movies));
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
      localStorage.setItem('favoriteMovies', JSON.stringify(state.movies));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer; 