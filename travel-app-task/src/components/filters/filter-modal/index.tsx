'use client';

import React, { useState, useMemo } from 'react';
import { useFilter } from '@/context/filter-context';
import { themes, activities, vehicles, features } from '@/data/mock-data';
import DOMPurify from 'isomorphic-dompurify';

interface CountMap {
  [key: string]: number;
}

const FilterModal = () => {
  const { isFilterOpen, setIsFilterOpen, filters, setFilters, resetFilters } = useFilter();
  const [activeCategory, setActiveCategory] = useState<'tour' | 'ticket' | 'rent' | 'transfer' | null>(null);

  console.log(activeCategory)

  // Memoize random counts to prevent unnecessary recalculations
  const counts = useMemo(() => {
    const newCounts: CountMap = {};
    [...themes, ...activities, ...vehicles, ...features].forEach((item) => {
      newCounts[item] = Math.floor(Math.random() * 50) + 10;
    });
    return newCounts;
  }, []); // Empty dependency array means this will only be calculated once

  const handleCategoryChange = (category: 'tour' | 'ticket' | 'rent' | 'transfer' | null) => {
    setActiveCategory(category);
    setFilters(prev => ({ ...prev, category }));
  };

  const handleThemeChange = (theme: string) => {
    setFilters(prev => ({
      ...prev,
      theme: prev.theme.includes(theme)
        ? prev.theme.filter(t => t !== theme)
        : [...prev.theme, theme]
    }));
  };

  const handleActivityChange = (activity: string) => {
    setFilters(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleVehicleChange = (vehicle: string) => {
    setFilters(prev => ({
      ...prev,
      vehicles: prev.vehicles.includes(vehicle)
        ? prev.vehicles.filter(v => v !== vehicle)
        : [...prev.vehicles, vehicle]
    }));
  };

  const handleFeatureChange = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handlePriceChange = (value: number) => {
    // Validate price range
    const sanitizedValue = Math.max(0, Math.min(value, 100000));
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], sanitizedValue]
    }));
  };

  const handleGroupSizeChange = (value: number) => {
    // Validate group size
    const sanitizedValue = Math.max(1, Math.min(value, 100));
    setFilters(prev => ({
      ...prev,
      groupSize: sanitizedValue
    }));
  };

  const handleTimeChange = (value: string, index: number) => {
    // Validate time format
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(value)) {
      return;
    }

    setFilters(prev => ({
      ...prev,
      timeRange: index === 0
        ? [value, prev.timeRange[1]]
        : [prev.timeRange[0], value]
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize input
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setFilters(prev => ({
      ...prev,
      location: sanitizedValue
    }));
  };

  const handleSearch = () => {
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    setActiveCategory(null);
    resetFilters();
  };

  if (!isFilterOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white w-full max-w-md mx-auto mt-16 rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filter</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close filter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {/* Categories */}
          <div className="mb-6">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              <button
                onClick={() => handleCategoryChange('tour')}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  activeCategory === 'tour'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                TOURS
              </button>
              <button
                onClick={() => handleCategoryChange('ticket')}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  activeCategory === 'ticket'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                TICKETS
              </button>
              <button
                onClick={() => handleCategoryChange('rent')}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  activeCategory === 'rent'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                RENT
              </button>
              <button
                onClick={() => handleCategoryChange('transfer')}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  activeCategory === 'transfer'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                TRANSFER
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Location</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Where you wanna start? (Phi Phi island, Chalong temple...)"
                className="w-full p-2 border rounded-md pl-8"
                value={filters.location}
                onChange={handleLocationChange}
                maxLength={100}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 absolute left-2 top-3 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>

          {/* Theme */}
          {activeCategory === 'tour' && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Theme</h3>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme,key) => (
                  <button
                    key={key}
                    onClick={() => handleThemeChange(theme)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filters.theme.includes(theme)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {theme} ({counts[theme] || 0})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Activity */}
          {activeCategory === 'tour' && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Activity <span className="text-xs text-gray-500">(select list)</span></h3>
              <div className="flex flex-wrap gap-2">
                {activities.map((activity,key) => (
                  <button
                    key={key}
                    onClick={() => handleActivityChange(activity)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filters.activities.includes(activity)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {activity} ({counts[activity] || 0})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <h3 className="text-sm font-medium">Price</h3>
              <span className="text-sm">{filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="12500"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">0</span>
              <span className="text-xs text-gray-500">12500</span>
            </div>
          </div>

          {/* Start time */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <h3 className="text-sm font-medium">Start time</h3>
              <div className="flex space-x-1 text-sm">
                <span>{filters.timeRange[0]}</span>
                <span>-</span>
                <span>{filters.timeRange[1]}</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="1"
              value={parseInt(filters.timeRange[1].split(':')[0])}
              onChange={(e) => {
                const hour = e.target.value.padStart(2, '0');
                handleTimeChange(`${hour}:00`, 1);
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">00:00</span>
              <span className="text-xs text-gray-500">23:59</span>
            </div>
          </div>

          {/* Group size */}
          {activeCategory === 'tour' && (
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <h3 className="text-sm font-medium">Group size</h3>
                <span className="text-sm">{filters.groupSize}</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={filters.groupSize}
                onChange={(e) => handleGroupSizeChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">1</span>
                <span className="text-xs text-gray-500">40</span>
              </div>
            </div>
          )}

          {/* Vehicle */}
          {activeCategory === 'tour' && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Vehicle</h3>
              <div className="flex flex-wrap gap-2">
                {vehicles.map((vehicle,key) => (
                  <button
                    key={key}
                    onClick={() => handleVehicleChange(vehicle)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      filters.vehicles.includes(vehicle)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {vehicle} ({counts[vehicle] || 0})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {features.map((feature,key) => (
                <button
                  key={key}
                  onClick={() => handleFeatureChange(feature)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filters.features.includes(feature)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {feature} ({counts[feature] || 0})
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              RESET
            </button>
            <button
              onClick={handleSearch}
              className="flex-1 py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal; 