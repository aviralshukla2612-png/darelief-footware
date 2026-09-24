"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight, X } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlistProducts, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [deleteTargetProduct, setDeleteTargetProduct] = useState(null);

  const handleMoveToBag = (product) => {
    addToCart(product, 6, product.colors?.[0], 1);
    removeFromWishlist(product.id);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetProduct) {
      removeFromWishlist(deleteTargetProduct.id);
      setDeleteTargetProduct(null);
    }
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b border-[#FAF7F2] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
              Saved Styles
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#181615]">
              My Wishlist ({wishlistProducts.length})
            </h1>
            <p className="text-xs text-[#77716A] mt-0.5">
              Footwear silhouettes you&apos;ve saved for future occasions.
            </p>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-10 h-10 text-[#D4C9BC] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#181615]">Your wishlist is empty</p>
            <p className="text-xs text-[#77716A] mt-1">Tap the heart icon on any footwear card to save it here.</p>
            <Link
              href="/new-arrivals"
              className="inline-block mt-4 px-6 py-2.5 bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Explore New Arrivals
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#FAF7F2] rounded-2xl border border-[#E5DED4] overflow-hidden flex flex-col justify-between group shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative aspect-[4/5] bg-white overflow-hidden">
                  <Link href={`/product/${product.slug}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => setDeleteTargetProduct(product)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/95 text-[#77716A] hover:text-[#C62828] hover:bg-white shadow-md transition-all cursor-pointer"
                    title="Remove from wishlist"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 bg-white flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-xs sm:text-sm font-bold text-[#181615] hover:text-[#701A2B] line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-[#181615]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.mrp && (
                        <span className="text-xs text-[#9B948C] line-through">
                          ₹{product.mrp.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="w-full py-2.5 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Premium Centered Remove From Wishlist Modal */}
      {deleteTargetProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          {/* Frosted Dark Backdrop */}
          <div
            className="fixed inset-0 bg-[#181615]/65 backdrop-blur-md transition-opacity"
            onClick={() => setDeleteTargetProduct(null)}
          />

          {/* Luxury Modal Card */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl border border-[#E5DED4] p-8 sm:p-10 text-center shadow-2xl space-y-5 animate-scale-up">
            <button
              onClick={() => setDeleteTargetProduct(null)}
              className="absolute top-4 right-4 p-2 text-[#77716A] hover:text-[#181615] hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Circular Icon Badge */}
            <div className="w-16 h-16 rounded-full bg-[#701A2B]/10 border border-[#701A2B]/20 text-[#701A2B] mx-auto flex items-center justify-center shadow-inner">
              <Trash2 className="w-7 h-7 text-[#701A2B]" />
            </div>

            {/* Product Thumbnail & Details */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E5DED4] text-left">
              <img
                src={deleteTargetProduct.images[0]}
                alt={deleteTargetProduct.name}
                className="w-12 h-12 object-cover rounded-xl border border-[#E5DED4]"
              />
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-[#181615] truncate">
                  {deleteTargetProduct.name}
                </h4>
                <p className="text-xs font-bold text-[#701A2B]">
                  ₹{deleteTargetProduct.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Confirmation Text */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#701A2B]">
                WISHLIST MANAGEMENT
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#181615]">
                Remove Saved Style?
              </h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
                Are you sure you want to remove this item from your saved wishlist?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteTargetProduct(null)}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#EFE8DA] text-[#181615] border border-[#E5DED4] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-full py-3 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
