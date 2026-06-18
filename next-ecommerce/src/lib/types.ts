// Product types based on Fake Store API response
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Cart item type for future use
export interface CartItem {
  product: Product;
  quantity: number;
}

// Filter types for product listing
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest";
}

// API endpoints configuration
export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  CATEGORIES: "/products/categories",
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
} as const;

// API base URL
export const API_BASE_URL = "https://fakestoreapi.com" as const;
