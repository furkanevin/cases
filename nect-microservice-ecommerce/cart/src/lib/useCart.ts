"use client";

import { useEffect, useState, useCallback } from "react";
import { CartManager, CartState, Product } from "../../../shared/services/CartManager";

/**
 * React hook for cart management - Cart App version
 * Provides real-time cart state and operations with enhanced sync capabilities
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
      console.log("🛒 Cart: Cart updated via subscription:", newCart);
      setCart(newCart);
    });

    // Initial sync
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
      console.log("🛒 Cart: URL changed, syncing cart:", currentCart);
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
      console.log("🛒 Cart: Adding product to cart:", product.title);
      const updatedCart = CartManager.addToCart(product);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("🛒 Cart: Error adding to cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (productId: number) => {
    setIsLoading(true);
    try {
      console.log("🛒 Cart: Removing product from cart:", productId);
      const updatedCart = CartManager.removeFromCart(productId);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("🛒 Cart: Error removing from cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (productId: number, quantity: number) => {
    setIsLoading(true);
    try {
      console.log("🛒 Cart: Updating quantity:", productId, quantity);
      const updatedCart = CartManager.updateQuantity(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("🛒 Cart: Error updating quantity:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("🛒 Cart: Clearing cart");
      const updatedCart = CartManager.clearCart();
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("🛒 Cart: Error clearing cart:", error);
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

  // Cart app specific functions
  const goToHome = useCallback(() => {
    window.open("http://localhost:3000", "_blank");
  }, []);

  const refreshCart = useCallback(() => {
    const currentCart = CartManager.sync();
    setCart(currentCart);
    return currentCart;
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

    // Cart app specific
    goToHome,
    refreshCart,
  };
}
