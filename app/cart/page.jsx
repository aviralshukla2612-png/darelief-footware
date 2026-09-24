"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Heart,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  X
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    totalItemsCount,
    rawSubtotal,
    rawMrpTotal,
    totalSavings,
    shippingFee,
    isFreeShipping,
    amountNeededForFreeShipping,
    couponCode,
    setCouponCode,
    appliedCoupon,
    couponError,
    couponDiscountAmount,
    finalTotal,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { toggleWishlist } = useWishlist();
  const [inputCoupon, setInputCoupon] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon(inputCoupon);
  };

  const handleMoveToWishlist = (item) => {
    toggleWishlist(item.id);
    removeFromCart(item.id, item.selectedSize, item.selectedColor);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#FAF7F2] py-20">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto border border-[#E5DED4] shadow-sm">
            <ShoppingBag className="w-8 h-8 text-[#701A2B]" />
          </div>
          <h1 className="font-serif-luxury text-3xl font-bold text-[#181615]">
            Your Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#77716A] max-w-md mx-auto">
            Looks like you haven&apos;t added any handcrafted footwear to your bag yet. Explore our latest collection of cloud-cushioned styles.
          </p>
          <div className="pt-2">
            <Link
              href="/new-arrivals"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#8E2337] transition-all shadow-md"
            >
              <span>Explore New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const freeShippingProgress = Math.min(100, Math.round((rawSubtotal / 999) * 100));

  return (
    <div className="w-full bg-[#FAF7F2] py-8 sm:py-12 border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5DED4]">
          <div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#181615] font-bold">
              MY BAG ({totalItemsCount})
            </h1>
            <p className="text-xs text-[#77716A] mt-1">Review your selected footwear items and proceed to checkout.</p>
          </div>

          <Link
            href="/new-arrivals"
            className="text-xs font-bold text-[#701A2B] hover:underline uppercase tracking-wider hidden sm:inline"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="mb-8 p-4 bg-white rounded-2xl border border-[#E5DED4] shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-[#181615] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#701A2B]" />
              {isFreeShipping ? (
                <span className="text-[#2E7D32]">🎉 You unlocked FREE Express Shipping!</span>
              ) : (
                <span>You are ₹{amountNeededForFreeShipping} away from FREE Express Shipping!</span>
              )}
            </span>
            <span className="text-[#77716A]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E5DED4]">
            <div
              className="h-full bg-[#701A2B] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Grid: Cart Items (8 cols) + Order Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-white p-5 rounded-2xl border border-[#E5DED4] shadow-xs flex flex-col sm:flex-row gap-5 items-center sm:items-start transition-all"
              >
                {/* Item Image */}
                <Link href={`/product/${item.slug}`} className="shrink-0 w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E5DED4]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                  />
                </Link>

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between w-full space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm sm:text-base font-bold text-[#181615] hover:text-[#701A2B] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#77716A] mt-1">
                        Color: <strong className="text-[#181615]">{item.selectedColor}</strong> • Size:{" "}
                        <strong className="text-[#181615]">UK {item.selectedSize}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-bold text-[#181615]">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                      {item.mrp && (
                        <p className="text-xs text-[#9B948C] line-through">
                          ₹{(item.mrp * item.quantity).toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions row: Quantity selector + Wishlist + Remove */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#FAF7F2]">
                    {/* Quantity Pill */}
                    <div className="flex items-center border border-[#E5DED4] rounded-lg bg-[#FAF7F2] overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-[#181615] hover:bg-[#EFE8DA] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#181615]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-[#181615] hover:bg-[#EFE8DA] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Move to Wishlist & Remove */}
                    <div className="flex items-center gap-4 text-xs">
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="text-[#77716A] hover:text-[#701A2B] font-medium flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Save for Later</span>
                      </button>

                      <button
                        onClick={() =>
                          removeFromCart(item.id, item.selectedSize, item.selectedColor)
                        }
                        className="text-[#77716A] hover:text-[#C62828] p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Coupon Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coupon Box */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5DED4] shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615] flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#701A2B]" />
                <span>Apply Coupon Code</span>
              </h3>

              {appliedCoupon ? (
                <div className="p-3 bg-[#701A2B]/5 rounded-xl border border-[#701A2B]/20 flex items-center justify-between animate-fade-in">
                  <div>
                    <span className="text-xs font-bold text-[#701A2B] uppercase">
                      ✓ {appliedCoupon.code}
                    </span>
                    <p className="text-[11px] text-[#77716A]">{appliedCoupon.description}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-[#77716A] hover:text-[#C62828]"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                      placeholder="e.g. WELCOME10, URBAN20"
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DED4] rounded-lg text-[#181615] uppercase font-semibold focus:outline-none focus:border-[#701A2B]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#181615] hover:bg-[#701A2B] text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs text-[#C62828] font-medium">{couponError}</p>
                  )}
                  <p className="text-[11px] text-[#77716A]">
                    Tip: Use <strong>WELCOME10</strong> for 10% OFF or <strong>URBAN20</strong> for ₹200 OFF.
                  </p>
                </form>
              )}
            </div>

            {/* Price Summary Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5DED4] shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615] pb-3 border-b border-[#FAF7F2]">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-[#242220]">
                <div className="flex justify-between">
                  <span className="text-[#77716A]">Total MRP</span>
                  <span>₹{rawMrpTotal.toLocaleString("en-IN")}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Discount on MRP</span>
                    <span>-₹{totalSavings.toLocaleString("en-IN")}</span>
                  </div>
                )}

                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-[#701A2B] font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-[#77716A]">Shipping Fee</span>
                  <span>
                    {shippingFee === 0 ? (
                      <strong className="text-[#2E7D32] uppercase">FREE</strong>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E5DED4] flex justify-between items-baseline text-sm sm:text-base font-bold text-[#181615]">
                  <span>Total Amount</span>
                  <span className="text-lg text-[#701A2B]">
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-[10px] text-[#77716A]">Inclusive of all applicable taxes & shipping.</p>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DED4] text-xs text-[#77716A] space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#701A2B]" />
                <span>100% Secure SSL Payment Gateway</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#701A2B]" />
                <span>7-Day Doorstep Replacement or Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
