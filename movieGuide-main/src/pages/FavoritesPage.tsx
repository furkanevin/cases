import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MovieGrid from '../components/MovieGrid';

const FavoritesPage: FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  return (
    <div className="min-h-screen">
      <MovieGrid movies={favorites} title="Your Favorite Movies" />
      {favorites.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-xl">You haven't added any movies to your favorites yet.</p>
          <p className="mt-2">Browse movies and click the heart icon to add them to your favorites!</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 