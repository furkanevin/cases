"use client";

import { ProductList } from "@/components/ProductList";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetProductsQuery } from "@/lib/api";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p className="text-secondary-600">Unable to load products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-2">Our Products</h1>
        <p className="text-secondary-600 text-lg">Discover amazing products at great prices</p>
      </div>

      <ProductList products={products || []} />
    </div>
  );
}

