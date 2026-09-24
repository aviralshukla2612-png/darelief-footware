"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { getBestsellerProducts } from "@/data/products";

export default function BestSellers() {
  const bestsellers = getBestsellerProducts();

  return (
    <section className="w-full bg-[#FAF7F2] py-14 sm:py-20 border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5DED4]">
          <div className="flex items-center gap-3">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#181615] font-bold uppercase tracking-wider">
              BESTSELLERS
            </h2>
          </div>

          <Link
            href="/new-arrivals"
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#181615] hover:text-[#701A2B] transition-colors group"
          >
            <span>VIEW ALL</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5-Column Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
