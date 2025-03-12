import React from 'react';
import Navbar from '@/components/layout/navbar';
import FilterModal from '@/components/filters/filter-modal';
import ProductGrid from '@/components/layout/product-grid';

export default function Home() {

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <FilterModal />
      <ProductGrid/>
    </main>
  );
} 