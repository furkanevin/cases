import React from 'react';

export default function RecipeListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Skeleton for search header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="space-y-2">
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Grid of skeleton recipe cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4 space-y-3">
              <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 