"use client";

import { useEffect, useState, useCallback } from "react";
import { CartManager, CartState, Product } from "../../../shared/services/CartManager";

/**
 * React hook for cart management
 * Provides real-time cart state and operations
 */
export function useCart() {
  const [cart, setCart] = useState<CartState>(() => {
    // SSR-safe initialization - return empty cart during SSR
    if (typeof window === "undefined") {
      return {
        items: [],
        total: 0,
        itemCount: 0,
        lastUpdated: Date.now(),
      };
    }
    return CartManager.getCart();
  });
  const [isLoading, setIsLoading] = useState(false);

  // Subscribe to cart changes
  useEffect(() => {
    const unsubscribe = CartManager.subscribe((newCart) => {
      console.log("🏠 Home: Cart updated via subscription:", newCart);
      setCart(newCart);
    });

    // Initial sync - this will check URL first, then localStorage
    const currentCart = CartManager.sync();
    setCart(currentCart);

    return unsubscribe;
  }, []);

  // Listen for URL changes to detect cart data transfer
  useEffect(() => {
    const handleCartFromURL = () => {
      // Force a sync when URL changes (for URL parameter transfer)
      const currentCart = CartManager.sync();
      setCart(currentCart);
      console.log("🏠 Home: URL changed, syncing cart:", currentCart);
    };

    // Initial check
    handleCartFromURL();

    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", handleCartFromURL);

    return () => {
      window.removeEventListener("popstate", handleCartFromURL);
    };
  }, []);

  // Cart operations with loading states
  const addToCart = useCallback(async (product: Product) => {
    setIsLoading(true);
    try {
      console.log("🏠 Home: Adding product to cart:", product.title);
      const updatedCart = CartManager.addToCart(product);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("🏠 Home: Error adding to cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (productId: number) => {
    setIsLoading(true);
    try {
      console.log("🏠 Home: Removing product from cart:", productId);
      const updatedCart = CartManager.removeFromCart(productId);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("🏠 Home: Error removing from cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (productId: number, quantity: number) => {
    setIsLoading(true);
    try {
      console.log("🏠 Home: Updating quantity:", productId, quantity);
      const updatedCart = CartManager.updateQuantity(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("🏠 Home: Error updating quantity:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("🏠 Home: Clearing cart");
      const updatedCart = CartManager.clearCart();
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("🏠 Home: Error clearing cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Helper functions
  const isInCart = useCallback((productId: number): boolean => {
    return CartManager.isInCart(productId);
  }, []);

  const getProductQuantity = useCallback((productId: number): number => {
    return CartManager.getProductQuantity(productId);
  }, []);

  const getCartStats = useCallback(() => {
    return CartManager.getCartStats();
  }, []);

  return {
    // State
    cart,
    isLoading,

    // Operations
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    // Helpers
    isInCart,
    getProductQuantity,
    getCartStats,
  };
}
