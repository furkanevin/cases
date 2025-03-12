import React from 'react';
import { Product } from '@/types';
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        {/* Placeholder image */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-500 flex items-center justify-center">
          <span className="text-white font-medium">{product.title.substring(0, 20)}...</span>
        </div>
        
        {/* Discount badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            {product.discount}% OFF
          </div>
        )}
        
        {/* Favorite button */}
        <button 
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md"
          aria-label={product.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={product.isFavorite ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
        
        {/* Category badge */}
        <div className="absolute bottom-3 left-3 bg-primary-500 text-white px-3 py-1 rounded-md text-xs font-medium uppercase">
          {product.category === 'tour' ? 'Tour' : product.category}
        </div>
      </div>
      
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center bg-yellow-400 text-white px-2 py-0.5 rounded text-xs font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {product.rating}
          </div>
          <span className="text-gray-500 text-xs ml-2">({product.reviewCount})</span>
          
          {/* Location */}
          <div className="flex items-center ml-auto text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {product.location}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-gray-800 mb-3 line-clamp-2">{product.title}</h3>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {product.discountedPrice && (
              <span className="text-gray-400 text-sm line-through mr-2">
                THB {formatPrice(product.price)}
              </span>
            )}
            <span className="text-gray-800 font-bold">
              THB {formatPrice(product.discountedPrice || product.price)}
            </span>
          </div>
          
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 