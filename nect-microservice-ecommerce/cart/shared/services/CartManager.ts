/**
 * Centralized Cart Management Service
 *
 * Bu service tüm cart operasyonlarını yönetir ve localStorage ile senkronizasyon sağlar.
 * Hem home hem cart uygulamaları bu service'i kullanır.
 */

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

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  lastUpdated: number; // Timestamp to prevent stale updates
}

export type CartUpdateCallback = (cart: CartState) => void;

class CartManagerService {
  private static instance: CartManagerService;
  private readonly STORAGE_KEY = "e-commerce-cart";
  private callbacks: Set<CartUpdateCallback> = new Set();
  private isUpdating = false; // Prevent infinite loops

  private constructor() {
    // Listen for storage changes from other tabs/apps
    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.handleStorageChange.bind(this));
    }
  }

  static getInstance(): CartManagerService {
    if (!CartManagerService.instance) {
      CartManagerService.instance = new CartManagerService();
    }
    return CartManagerService.instance;
  }

  /**
   * Get current cart state from localStorage
   */
  getCart(): CartState {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const cart: CartState = JSON.parse(stored);
        return this.validateCart(cart);
      }
    } catch (error) {
      console.error("CartManager: Error loading cart:", error);
    }

    return this.getEmptyCart();
  }

  /**
   * Add product to cart
   */
  addToCart(product: Product): CartState {
    const cart = this.getCart();
    const existingItem = cart.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        id: product.id,
        product,
        quantity: 1,
      });
    }

    return this.updateCart(cart);
  }

  /**
   * Remove product from cart
   */
  removeFromCart(productId: number): CartState {
    const cart = this.getCart();
    cart.items = cart.items.filter((item) => item.id !== productId);
    return this.updateCart(cart);
  }

  /**
   * Update product quantity
   */
  updateQuantity(productId: number, quantity: number): CartState {
    const cart = this.getCart();
    const item = cart.items.find((item) => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        cart.items = cart.items.filter((item) => item.id !== productId);
      } else {
        item.quantity = quantity;
      }
    }

    return this.updateCart(cart);
  }

  /**
   * Clear all items from cart
   */
  clearCart(): CartState {
    return this.updateCart(this.getEmptyCart());
  }

  /**
   * Subscribe to cart changes
   */
  subscribe(callback: CartUpdateCallback): () => void {
    this.callbacks.add(callback);

    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * Force sync cart state (useful for initial load)
   */
  sync(): CartState {
    const cart = this.getCart();
    this.notifyCallbacks(cart);
    return cart;
  }

  private updateCart(cart: CartState): CartState {
    if (this.isUpdating) {
      return cart; // Prevent infinite loops
    }

    this.isUpdating = true;

    try {
      // Calculate totals
      cart.itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
      cart.total = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      cart.lastUpdated = Date.now();

      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));

      // Notify subscribers
      this.notifyCallbacks(cart);

      return cart;
    } catch (error) {
      console.error("CartManager: Error updating cart:", error);
      return cart;
    } finally {
      this.isUpdating = false;
    }
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === this.STORAGE_KEY && !this.isUpdating) {
      console.log("CartManager: Detected storage change from another tab/app");

      try {
        if (event.newValue) {
          const cart: CartState = JSON.parse(event.newValue);
          const validatedCart = this.validateCart(cart);
          this.notifyCallbacks(validatedCart);
        } else {
          // Cart was cleared
          this.notifyCallbacks(this.getEmptyCart());
        }
      } catch (error) {
        console.error("CartManager: Error handling storage change:", error);
      }
    }
  }

  private notifyCallbacks(cart: CartState): void {
    this.callbacks.forEach((callback) => {
      try {
        callback(cart);
      } catch (error) {
        console.error("CartManager: Error in callback:", error);
      }
    });
  }

  private validateCart(cart: any): CartState {
    if (!cart || typeof cart !== "object") {
      return this.getEmptyCart();
    }

    const validatedCart: CartState = {
      items: Array.isArray(cart.items) ? cart.items.filter(this.isValidCartItem) : [],
      total: typeof cart.total === "number" ? cart.total : 0,
      itemCount: typeof cart.itemCount === "number" ? cart.itemCount : 0,
      lastUpdated: typeof cart.lastUpdated === "number" ? cart.lastUpdated : Date.now(),
    };

    // Recalculate totals to ensure consistency
    validatedCart.itemCount = validatedCart.items.reduce((total, item) => total + item.quantity, 0);
    validatedCart.total = validatedCart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return validatedCart;
  }

  private isValidCartItem(item: any): item is CartItem {
    return (
      item &&
      typeof item.id === "number" &&
      typeof item.quantity === "number" &&
      item.quantity > 0 &&
      item.product &&
      typeof item.product.id === "number" &&
      typeof item.product.title === "string" &&
      typeof item.product.price === "number"
    );
  }

  private getEmptyCart(): CartState {
    return {
      items: [],
      total: 0,
      itemCount: 0,
      lastUpdated: Date.now(),
    };
  }

  /**
   * Get cart statistics
   */
  getCartStats(): { itemCount: number; total: number } {
    const cart = this.getCart();
    return {
      itemCount: cart.itemCount,
      total: cart.total,
    };
  }

  /**
   * Check if product is in cart
   */
  isInCart(productId: number): boolean {
    const cart = this.getCart();
    return cart.items.some((item) => item.id === productId);
  }

  /**
   * Get quantity of specific product in cart
   */
  getProductQuantity(productId: number): number {
    const cart = this.getCart();
    const item = cart.items.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  }
}

// Export singleton instance
export const CartManager = CartManagerService.getInstance();

// Export types
export type { CartUpdateCallback };
