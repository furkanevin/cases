import React from 'react';

export default function RecipeDetailSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Header image skeleton */}
      <div className="relative h-72 md:h-96 w-full bg-gray-200 dark:bg-gray-700">
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
          <div className="w-3/4 h-8 bg-gray-100 dark:bg-gray-600 rounded mb-4"></div>
          <div className="flex flex-wrap gap-2 mt-4">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="w-20 h-6 bg-gray-100 dark:bg-gray-600 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-6 md:p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full mb-2"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
              <div className="w-12 h-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>

        {/* About section */}
        <div className="mb-10">
          <div className="w-40 h-7 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-2">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>

        {/* Ingredients section */}
        <div className="mb-10">
          <div className="w-40 h-7 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array(9).fill(0).map((_, index) => (
              <div key={index} className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full mr-3"></div>
                <div className="w-32 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions section */}
        <div>
          <div className="w-40 h-7 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-4">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-gray-200 dark:bg-gray-600 rounded-full h-7 w-7 mr-3"></div>
                  <div className="w-full">
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 