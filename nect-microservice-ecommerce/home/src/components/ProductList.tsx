"use client";

import { Product } from "@/shared/types";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-secondary-600 mb-4">No products found</h2>
        <p className="text-secondary-500">Please try again later or check back soon for new products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="animate-fade-in">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
