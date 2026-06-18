// Re-export types from CartManager service for backward compatibility
export type { Product, CartItem, CartState, CartUpdateCallback } from "../services/CartManager";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}
