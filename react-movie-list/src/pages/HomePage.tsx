import { FC } from 'react';
import MovieGrid from '../components/MovieGrid';
import {
  useGetTopRatedMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTrendingMoviesQuery,
} from '../features/movieApi';

const HomePage: FC = () => {
  const { data: topRatedData } = useGetTopRatedMoviesQuery(1);
  const { data: popularData } = useGetPopularMoviesQuery(1);
  const { data: trendingData } = useGetTrendingMoviesQuery(1);

  return (
    <div className="space-y-12">
      {topRatedData && (
        <MovieGrid movies={topRatedData.results} title="Top Rated Movies" />
      )}
      {popularData && (
        <MovieGrid movies={popularData.results} title="Popular Movies" />
      )}
      {trendingData && (
        <MovieGrid movies={trendingData.results} title="Trending Movies" />
      )}
    </div>
  );
};

export default HomePage; 