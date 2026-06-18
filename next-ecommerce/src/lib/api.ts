import { Product, API_BASE_URL, API_ENDPOINTS } from "./types";

/**
 * Generic API fetch function with error handling
 */
async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      // Enable caching for better performance
      next: { revalidate: 1800 }, // Revalidate every 30 minutes
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Fetch all products
 */
export async function getProducts(): Promise<Product[]> {
  return apiRequest<Product[]>(API_ENDPOINTS.PRODUCTS);
}

/**
 * Fetch featured products (first 4 products for homepage)
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, 4);
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: number): Promise<Product> {
  return apiRequest<Product>(API_ENDPOINTS.PRODUCT_BY_ID(id));
}

/**
 * Fetch all available categories
 */
export async function getCategories(): Promise<string[]> {
  return apiRequest<string[]>(API_ENDPOINTS.CATEGORIES);
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  return apiRequest<Product[]>(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category));
}

/**
 * Client-side fetch functions for use in components
 * These don't use Next.js caching and are suitable for client-side requests
 */
export const clientApi = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  async getProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCT_BY_ID(id)}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return response.json();
  },

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category)}`);
    if (!response.ok) throw new Error("Failed to fetch products by category");
    return response.json();
  },
};
