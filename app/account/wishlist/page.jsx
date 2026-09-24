"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlistProducts, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product) => {
    addToCart(product, 6, product.colors?.[0], 1);
    removeFromWishlist(product.id);
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
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-[#77716A] hover:text-[#C62828] shadow-sm"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
                    className="w-full py-2.5 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
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
    </AccountLayout>
  );
}
