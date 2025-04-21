'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { allProducts } from '@/data/mock-data';
import { Product } from '@/types';

/**
 * Defines the possible categories for products
 */
type CategoryType = 'tour' | 'ticket' | 'rent' | 'transfer' | null;

/**
 * Represents the state of all available filters
 */
interface FilterState {
  category: CategoryType;
  location: string;
  theme: string[];
  activities: string[];
  priceRange: [number, number];
  timeRange: [string, string];
  groupSize: number;
  vehicles: string[];
  features: string[];
}

/**
 * Defines the shape of the FilterContext
 */
interface FilterContextType {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredProducts: Product[];
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  category: null,
  location: '',
  theme: [],
  activities: [],
  priceRange: [0, 12500],
  timeRange: ['00:00', '23:59'],
  groupSize: 40,
  vehicles: [],
  features: [],
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

/**
 * Provider component that wraps your app and makes filter values
 * available to any child component that calls useFilter().
 */
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    try {
      return allProducts.filter((product) => {
        // Basic validation
        if (!product) return false;

        // Filter by category
        if (filters.category && product.category !== filters.category) {
          return false;
        }

        // Filter by location - case insensitive search
        if (filters.location && !product.location?.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }

        // Filter by price range
        if (
          typeof product.price === 'number' &&
          (product.price < filters.priceRange[0] ||
            product.price > filters.priceRange[1])
        ) {
          return false;
        }

        // Category-specific filters for tours
        if (product.category === 'tour') {
          const tour = product;

          // Filter by theme
          if (
            filters.theme.length > 0 &&
            !tour.theme?.some((t) => filters.theme.includes(t))
          ) {
            return false;
          }

          // Filter by activities
          if (
            filters.activities.length > 0 &&
            !tour.activities?.some((a) => filters.activities.includes(a))
          ) {
            return false;
          }

          // Filter by time range
          if (
            tour.startTime &&
            (tour.startTime < filters.timeRange[0] || tour.startTime > filters.timeRange[1])
          ) {
            return false;
          }

          // Filter by group size
          if (tour.groupSize && tour.groupSize > filters.groupSize) {
            return false;
          }

          // Filter by vehicle
          if (
            filters.vehicles.length > 0 &&
            tour.vehicle &&
            !filters.vehicles.includes(tour.vehicle)
          ) {
            return false;
          }

          // Filter by features
          if (
            filters.features.length > 0 &&
            !tour.features?.some((f) => filters.features.includes(f))
          ) {
            return false;
          }
        }

        return true;
      });
    } catch (error) {
      console.error('Error filtering products:', error);
      return [];
    }
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        isFilterOpen,
        setIsFilterOpen,
        filters,
        setFilters,
        filteredProducts,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

/**
 * Custom hook to access the filter context
 * @throws {Error} if used outside of FilterProvider
 */
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}; 