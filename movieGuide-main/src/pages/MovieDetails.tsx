import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../features/movieApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addToFavorites, removeFromFavorites } from '../features/favoritesSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import millify from "millify";
import Comment from "../components/Comment";
import DetailLoading from "./loading/DetailLoading";
import type { Company, Language, Country } from '../types/movie';
import { getImageUrl, ImageSizes } from '../constant';

const MovieDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(Number(id));
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.movies);
  const isFavorite = movie ? favorites.some((m) => m.id === movie.id) : false;

  const handleFavoriteClick = () => {
    if (!movie) return;
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen">
        <DetailLoading />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center text-lg">
          {error ? 'Error loading movie details.' : 'Movie not found.'}
        </div>
      </div>
    );
  }

  const {
    title,
    backdrop_path,
    poster_path,
    vote_average,
    production_companies,
    spoken_languages,
    production_countries,
    overview,
    budget,
    revenue,
    release_date,
  } = movie;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        <img
          src={getImageUrl(backdrop_path, ImageSizes.backdrop.original)}
          alt={title}
          className="w-full h-[60vh] object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="mt-8 flex max-md:flex-col gap-8">
        <img
          src={getImageUrl(poster_path, ImageSizes.poster.w500)}
          alt={title}
          className="w-72 rounded-xl shadow-lg max-md:hidden"
        />
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">{title}</h1>
            <button
              onClick={handleFavoriteClick}
              className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-2xl" />
              ) : (
                <FaRegHeart className="text-white text-2xl" />
              )}
            </button>
          </div>
          
          <p className="mt-4 text-lg text-gray-600">{overview}</p>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Release Date</h3>
              <p>{new Date(release_date).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Rating</h3>
              <p>{vote_average.toFixed(1)} / 10</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-xl font-semibold mt-4">Production Companies</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {production_companies?.map((company: Company) => (
              <div key={company.id} className="bg-white p-4 rounded-lg flex items-center shadow-md">
                {company.logo_path ? (
                  <img
                    src={getImageUrl(company.logo_path, ImageSizes.logo.w500)}
                    alt={company.name}
                    className="w-24 h-12 object-contain"
                  />
                ) : (
                  <span className="text-gray-700">{company.name}</span>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-6">Languages</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {spoken_languages?.map((language: Language) => (
              <div key={language.iso_639_1} className="bg-white p-2 rounded-lg shadow-md">
                <span className="text-gray-700">{language.name}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mt-6">Production Countries</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {production_countries?.map((country: Country) => (
              <div key={country.id} className="bg-white p-2 rounded-lg shadow-md">
                <span className="text-gray-700">{country.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg">
            <span className="font-semibold">Budget: </span>
            <span className="text-green-500">
              {budget === 0 ? "Unknown" : `$${millify(budget)}`}
            </span>
          </p>
          <p className="text-lg mt-4">
            <span className="font-semibold">Revenue: </span>
            <span className="text-green-500">
              {revenue === 0 ? "Unknown" : `$${millify(revenue)}`}
            </span>
          </p>
        </div>
      </div>

      <Comment />
    </div>
  );
};

export default MovieDetails;
