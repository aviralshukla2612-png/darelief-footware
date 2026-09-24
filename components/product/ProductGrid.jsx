"use client";

import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], columns = 5, emptyMessage = "No products found matching your criteria." }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#E5DED4]">
        <p className="text-base font-semibold text-[#181615]">{emptyMessage}</p>
        <p className="text-xs text-[#77716A] mt-1">Try resetting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
