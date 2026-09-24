"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Eye, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";

export default function ProductCard({ product, showQuickAdd = true }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { setQuickViewProduct } = useUI();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const isWishlisted = isInWishlist(product.id);
  const activeColor = product.colors?.[selectedColorIdx] || product.colors?.[0];
  const currentImage = product.images?.[selectedColorIdx] || product.images?.[0] || product.image;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 6, activeColor, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E5DED4] luxury-card-hover transition-all duration-300">
      {/* Image & Badges Container */}
      <div className="relative w-full aspect-[4/5] bg-[#FAF7F2] overflow-hidden">
        {/* Main Product Link */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#701A2B] text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#181615] text-[#FAF7F2] shadow-xs">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label="Toggle Wishlist"
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? "bg-[#701A2B] text-white"
              : "bg-white/85 backdrop-blur-md text-[#181615] hover:bg-white hover:text-[#701A2B] shadow-xs"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Clean Luxury Hover Overlay: Quick View + Quick Add */}
        {showQuickAdd && (
          <div className="absolute inset-x-0 bottom-3 px-3 z-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              className="flex-1 py-2 px-3 bg-white/95 hover:bg-[#701A2B] text-[#181615] hover:text-white backdrop-blur-md rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 border border-[#E5DED4]/60"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>

            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-xl bg-white/95 hover:bg-[#701A2B] text-[#181615] hover:text-white backdrop-blur-md flex items-center justify-center shadow-md border border-[#E5DED4]/60 transition-colors shrink-0"
              title="Quick Preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Color swatches */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mb-1.5">
              {product.colors.map((col, idx) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-3 h-3 rounded-full border transition-all ${
                    selectedColorIdx === idx
                      ? "border-[#701A2B] ring-1 ring-[#701A2B] scale-110"
                      : "border-gray-300 opacity-80"
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          )}

          {/* Product Name */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#701A2B] transition-colors">
            <h3 className="text-xs sm:text-sm font-semibold text-[#181615] line-clamp-1 tracking-tight">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Ratings */}
        <div className="mt-2 pt-2 border-t border-[#FAF7F2] flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-[#181615]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-[11px] text-[#9B948C] line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#77716A]">
            <Star className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
            <span>{product.rating}</span>
            <span className="text-[#9B948C] text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
