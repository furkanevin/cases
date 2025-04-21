"use client";

import React from 'react';
import ProductCard from '@/components/cards/product-card';
import { useFilter } from '@/context/filter-context';


const ProductGrid: React.FC = () => {
  const { filteredProducts } = useFilter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product, key) => (
          <ProductCard key={key} product={product} />
        ))}
      </div>
      
      {(!filteredProducts || filteredProducts.length === 0) && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 