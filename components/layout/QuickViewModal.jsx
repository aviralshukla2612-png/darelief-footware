"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Star, Heart, ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useUI();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(6);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const activeColor = product.colors?.[selectedColorIdx] || product.colors?.[0];
  const activeImage = product.images?.[selectedColorIdx] || product.images?.[0];

  const handleAdd = () => {
    addToCart(product, selectedSize, activeColor, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#181615]/70 backdrop-blur-sm"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E5DED4] overflow-hidden z-10 animate-fade-in grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3.5 right-3.5 z-20 p-1.5 rounded-full bg-white/90 text-[#77716A] hover:text-[#181615] shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image */}
        <div className="relative bg-white p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E5DED4]">
          <img
            src={activeImage}
            alt={product.name}
            className="w-full max-h-80 object-cover rounded-xl shadow-sm"
          />
          {product.discount > 0 && (
            <span className="absolute top-4 left-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#701A2B] text-white">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Right Info */}
        <div className="p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#701A2B]">
              {product.categoryName}
            </span>
            <h3 className="font-serif-luxury text-xl font-bold text-[#181615] mt-1">
              {product.name}
            </h3>

            {/* Ratings & Price */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-[#C5A059]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                ))}
              </div>
              <span className="text-xs text-[#77716A] font-medium">({product.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-2.5 mt-3">
              <span className="text-xl font-bold text-[#181615]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-[#9B948C] line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
              <span className="text-xs font-semibold text-[#701A2B]">
                Inclusive of all taxes
              </span>
            </div>

            <p className="text-xs text-[#77716A] mt-2.5 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Color Select */}
          {product.colors && (
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#181615]">Color:</span>
                <span className="text-[#77716A]">{activeColor?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColorIdx === idx
                        ? "border-[#701A2B] ring-2 ring-[#701A2B]/20 scale-105"
                        : "border-white opacity-85"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Select */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#181615]">Select Size (IND/UK):</span>
              <span className="text-[#701A2B] font-medium">Size {selectedSize} Selected</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    selectedSize === s
                      ? "bg-[#181615] text-white"
                      : "bg-white border border-[#E5DED4] text-[#181615] hover:bg-[#EFE8DA]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleAdd}
              className="w-full py-3 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag • ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="text-xs text-[#77716A] hover:text-[#701A2B] flex items-center gap-1.5"
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-[#701A2B] text-[#701A2B]" : ""}`} />
                <span>{isWishlisted ? "In Wishlist" : "Add to Wishlist"}</span>
              </button>

              <Link
                href={`/product/${product.slug}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-xs font-bold text-[#181615] hover:text-[#701A2B] flex items-center gap-1"
              >
                <span>Full Product Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
