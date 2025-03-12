import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addToFavorites, removeFromFavorites } from '../features/favoritesSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.movies);
  const isFavorite = favorites.some((m) => m.id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <div className="relative group">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg w-full h-auto transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
          <p className="text-gray-300 text-sm">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </Link>
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full"
      >
        {isFavorite ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FaRegHeart className="text-white text-xl" />
        )}
      </button>
    </div>
  );
};

export default MovieCard;
