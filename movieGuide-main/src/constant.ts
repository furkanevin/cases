export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

export const ImageSizes = {
  backdrop: {
    original: '/original',
    w1280: '/w1280',
  },
  poster: {
    w500: '/w500',
    w342: '/w342',
  },
  profile: {
    w45: '/w45',
  },
  logo: {
    w500: '/w500',
  },
} as const;

// Helper functions for image URLs
export const getImageUrl = (path: string | null, size: string): string => {
  if (!path) return '/default_poster.webp';
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
};
