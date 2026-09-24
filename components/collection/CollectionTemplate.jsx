"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Filter, ChevronDown, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import ProductGrid from "@/components/product/ProductGrid";
import { products as allProducts } from "@/data/products";

export default function CollectionTemplate({
  categorySlug = "all",
  title = "All Footwear",
  subtitle = "Step into style and comfort with our handcrafted women's collection."
}) {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categorySlug);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    { name: "All Footwear", slug: "all" },
    { name: "New Arrivals", slug: "new-arrivals" },
    { name: "Flats", slug: "flats" },
    { name: "Sandals", slug: "sandals" },
    { name: "Heels", slug: "heels" },
    { name: "Office Wear", slug: "office-wear" },
    { name: "Comfort", slug: "comfort" }
  ];

  const availableSizes = [3, 4, 5, 6, 7, 8, 9, 10];
  const colorOptions = [
    { name: "Beige", hex: "#EFE8DA" },
    { name: "Maroon", hex: "#701A2B" },
    { name: "Black", hex: "#181615" },
    { name: "Tan", hex: "#C5A059" }
  ];

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const resetFilters = () => {
    setSelectedCategory(categorySlug);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(3000);
    setSortBy("featured");
  };

  const hasActiveFilters =
    (categorySlug === "all" && selectedCategory !== "all") ||
    (categorySlug !== "all" && selectedCategory !== categorySlug) ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    maxPrice < 3000;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Category
        if (selectedCategory && selectedCategory !== "all" && selectedCategory !== "new-arrivals") {
          if (p.category !== selectedCategory) return false;
        }
        if (selectedCategory === "new-arrivals" && !p.isNew) {
          return false;
        }

        // Sizes
        if (selectedSizes.length > 0) {
          const hasSize = selectedSizes.some((sz) => p.sizes?.includes(sz));
          if (!hasSize) return false;
        }

        // Colors
        if (selectedColors.length > 0) {
          const hasColor = selectedColors.some((colName) =>
            p.colors?.some((c) => c.name.toLowerCase().includes(colName.toLowerCase()))
          );
          if (!hasColor) return false;
        }

        // Price
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [selectedCategory, selectedSizes, selectedColors, maxPrice, sortBy]);

  return (
    <div className="w-full bg-[#FAF7F2] py-8 sm:py-12 border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#77716A] mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#701A2B]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#181615] font-semibold capitalize">{title}</span>
        </nav>

        {/* Collection Header */}
        <div className="mb-8 pb-6 border-b border-[#E5DED4]">
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#181615] font-bold uppercase tracking-wider">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-[#77716A] mt-1.5 max-w-2xl">{subtitle}</p>
        </div>

        {/* Action bar (Mobile filter trigger + Sort Dropdown) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-[#E5DED4] shadow-xs">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-[#FAF7F2] border border-[#E5DED4] rounded-lg text-xs font-bold text-[#181615]"
            >
              <Filter className="w-3.5 h-3.5 text-[#701A2B]" />
              <span>Filters {hasActiveFilters && "•"}</span>
            </button>

            <span className="text-xs font-semibold text-[#77716A]">
              Showing <strong className="text-[#181615]">{filteredProducts.length}</strong> styles
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#77716A] hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF7F2] border border-[#E5DED4] rounded-lg px-3 py-2 text-xs font-semibold text-[#181615] focus:outline-none focus:border-[#701A2B] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Main Body: Filter Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-[#E5DED4] shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#701A2B]" />
                <h3 className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#181615]">
                  Filter By
                </h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-[#701A2B] hover:text-[#8E2337] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#181615] mb-3">
                Category
              </h4>
              <div className="space-y-1">
                {categories.map((c) => {
                  const isSelected = selectedCategory === c.slug;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer text-left group ${
                        isSelected
                          ? "bg-[#701A2B]/8 text-[#701A2B] font-bold"
                          : "text-[#4A453F] hover:bg-[#FAF7F2] hover:text-[#181615]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Custom Luxury Radio Circle */}
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-[#701A2B] bg-[#701A2B]"
                              : "border-[#C5BCB0] bg-white group-hover:border-[#701A2B]"
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="tracking-wide">{c.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div className="pt-4 border-t border-[#F0EAE1]">
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#181615] mb-3">
                Size (IND/UK)
              </h4>
              <div className="grid grid-cols-4 gap-1.5">
                {availableSizes.map((sz) => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#701A2B] border-[#701A2B] text-white shadow-xs scale-102"
                          : "bg-[#FAF7F2] border-[#E5DED4] text-[#181615] hover:bg-[#EFE8DA]"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Filter */}
            <div className="pt-4 border-t border-[#F0EAE1]">
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#181615] mb-3">
                Color
              </h4>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((col) => {
                  const isSelected = selectedColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      onClick={() => toggleColor(col.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#701A2B] bg-[#701A2B]/8 text-[#701A2B] shadow-xs"
                          : "border-[#E5DED4] bg-white text-[#4A453F] hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-4 border-t border-[#F0EAE1]">
              <div className="flex items-center justify-between text-xs font-bold text-[#181615] mb-2.5">
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase">Max Price</span>
                <span className="text-[#701A2B] font-bold text-sm">₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#701A2B] cursor-pointer h-1.5 bg-[#E5DED4] rounded-lg"
              />
              <div className="flex items-center justify-between text-[11px] font-medium text-[#77716A] mt-1.5">
                <span>₹1,000</span>
                <span>₹3,000+</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#181615]/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 p-5 overflow-y-auto ml-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DED4]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#181615]">
                Filter Footwear
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#77716A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-6 flex-1">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#181615] mb-2.5">Category</h4>
                <div className="space-y-1">
                  {categories.map((c) => {
                    const isSelected = selectedCategory === c.slug;
                    return (
                      <button
                        key={c.slug}
                        onClick={() => setSelectedCategory(c.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left ${
                          isSelected
                            ? "bg-[#701A2B]/10 text-[#701A2B] font-bold"
                            : "text-[#4A453F] hover:bg-[#FAF7F2]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-[#701A2B] bg-[#701A2B]" : "border-[#C5BCB0] bg-white"
                            }`}
                          >
                            {isSelected && <span className="w-1 h-1 rounded-full bg-white" />}
                          </div>
                          <span>{c.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-4 border-t border-[#E5DED4]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#181615] mb-2.5">Sizes (IND/UK)</h4>
                <div className="grid grid-cols-4 gap-1.5">
                  {availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        selectedSizes.includes(sz)
                          ? "bg-[#701A2B] text-white border-[#701A2B] shadow-xs"
                          : "border-[#E5DED4] bg-[#FAF7F2] text-[#181615]"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="pt-4 border-t border-[#E5DED4]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#181615] mb-2.5">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((col) => {
                    const isSelected = selectedColors.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        onClick={() => toggleColor(col.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? "border-[#701A2B] bg-[#701A2B]/10 text-[#701A2B]"
                            : "border-[#E5DED4] bg-white text-[#4A453F]"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-[#E5DED4]">
                <div className="flex items-center justify-between text-xs font-bold text-[#181615] mb-2">
                  <span className="uppercase tracking-wider">Max Price</span>
                  <span className="text-[#701A2B]">₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="3000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#701A2B] h-1.5 bg-[#E5DED4] rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5DED4] flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 border border-[#E5DED4] rounded-xl text-xs font-bold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
