"use client";

import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategoryShortcuts() {
  return (
    <section className="w-full bg-[#FAF7F2] py-12 sm:py-16 border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 text-center">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col items-center cursor-pointer"
            >
              {/* Circular Image Frame */}
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-white border border-[#E5DED4] shadow-xs group-hover:border-[#701A2B] group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1.5">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Title & Action */}
              <div className="mt-3">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#181615] group-hover:text-[#701A2B] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#77716A] uppercase tracking-wide group-hover:underline">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
