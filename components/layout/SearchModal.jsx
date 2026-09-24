"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { products } from "@/data/products";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useUI();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ["Sandals", "Flats", "Loafers", "Heels", "Arch Support", "Maroon"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#181615]/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E5DED4] overflow-hidden z-10 animate-fade-in">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-[#E5DED4] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#701A2B]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flats, block heels, loafers, comfort slides..."
            className="w-full text-sm sm:text-base bg-transparent text-[#181615] placeholder-[#9B948C] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-[#77716A] hover:text-[#181615]"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full text-[#77716A] hover:bg-[#FAF7F2] hover:text-[#181615]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-[#77716A]">
                <span>Results for &quot;{query}&quot;</span>
                <span>{filtered.length} products found</span>
              </div>

              {filtered.length > 0 ? (
                <div className="divide-y divide-[#E5DED4]">
                  {filtered.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 py-3 hover:bg-[#EFE8DA]/50 px-2 rounded-lg transition-colors group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-md border border-[#E5DED4]"
                      />
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#701A2B]">
                          {product.categoryName}
                        </p>
                        <h4 className="text-sm font-semibold text-[#181615] group-hover:text-[#701A2B] transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-[#181615]">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[11px] text-[#9B948C] line-through">
                            ₹{product.mrp.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] font-bold text-[#701A2B]">
                            {product.discount}% OFF
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#9B948C] group-hover:text-[#701A2B] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-[#77716A]">No products matching &quot;{query}&quot;</p>
                  <p className="text-xs text-[#9B948C] mt-1">
                    Try searching for &quot;sandals&quot;, &quot;flats&quot; or &quot;heels&quot;
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#77716A] mb-3">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DED4] text-xs font-medium text-[#181615] hover:border-[#701A2B] hover:text-[#701A2B] transition-colors"
                  >
                    <Tag className="w-3 h-3 text-[#701A2B]" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-[#77716A] mb-3">
                Featured Collections
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { name: "New Arrivals", href: "/new-arrivals" },
                  { name: "Flats", href: "/flats" },
                  { name: "Sandals", href: "/sandals" },
                  { name: "Heels", href: "/heels" },
                  { name: "Office Wear", href: "/office-wear" },
                  { name: "Comfort Slides", href: "/comfort" }
                ].map((c) => (
                  <Link
                    key={c.name}
                    href={c.href}
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2.5 rounded-xl bg-white border border-[#E5DED4] text-xs font-semibold text-[#181615] hover:bg-[#EFE8DA] transition-colors text-center"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
