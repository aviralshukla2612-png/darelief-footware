"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Star,
  ShoppingBag,
  Zap,
  Truck,
  RefreshCw,
  ShieldCheck,
  Ruler,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  Box,
  Image as ImageIcon,
  Share2
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import ShoeCanvas3D from "@/components/3d/ShoeCanvas3D";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { customerReviews } from "@/data/reviews";

export default function ProductDetailView({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { setIsSizeGuideOpen } = useUI();

  // State
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(6);
  const [quantity, setQuantity] = useState(1);
  const [is3DView, setIs3DView] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("description"); // description | details | fit | shipping

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link href="/new-arrivals" className="text-[#701A2B] underline mt-4 inline-block">
          Explore All Footwear
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const activeColor = product.colors?.[selectedColorIdx] || product.colors?.[0];
  const activeImage = product.images?.[selectedImageIdx] || product.images?.[0];

  const handleColorChange = (idx) => {
    setSelectedColorIdx(idx);
    if (product.images?.[idx]) {
      setSelectedImageIdx(idx);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, activeColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, activeColor, quantity);
    router.push("/checkout");
  };

  const checkPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      const today = new Date();
      today.setDate(today.getDate() + 3);
      const deliveryDate = today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        weekday: "short"
      });
      setPincodeStatus({
        valid: true,
        message: `Express Delivery Available to ${pincode} • By ${deliveryDate} (FREE on this item)`
      });
    } else {
      setPincodeStatus({ valid: false, message: "Please enter a valid 6-digit PIN code" });
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="w-full bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="text-xs text-[#77716A] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#701A2B]">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-[#701A2B] capitalize">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-[#181615] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DED4] shadow-sm">
          {/* Left Column: Gallery + 3D Viewer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails (Vertical on desktop) */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIdx(idx);
                    setIs3DView(false);
                  }}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIdx === idx && !is3DView
                      ? "border-[#701A2B] ring-2 ring-[#701A2B]/20 scale-102"
                      : "border-[#E5DED4] opacity-75 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}

              {/* 3D Viewer Thumbnail Trigger */}
              <button
                onClick={() => setIs3DView(true)}
                className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all shrink-0 ${
                  is3DView
                    ? "border-[#701A2B] bg-[#701A2B]/10 text-[#701A2B] font-bold"
                    : "border-[#E5DED4] bg-[#FAF7F2] text-[#181615] hover:bg-[#EFE8DA]"
                }`}
              >
                <Box className="w-5 h-5 text-[#701A2B] mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider">3D View</span>
              </button>
            </div>

            {/* Main Stage (Photo or 3D) */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E5DED4] aspect-[4/5] flex items-center justify-center">
              {is3DView ? (
                <div className="w-full h-full animate-fade-in">
                  <ShoeCanvas3D
                    color={activeColor?.hex || "#701A2B"}
                    autoRotate={true}
                    interactive={true}
                    showControls={true}
                    height="100%"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center animate-fade-in"
                  />

                  {/* Switch to 3D pill */}
                  <button
                    onClick={() => setIs3DView(true)}
                    className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5DED4] text-xs font-semibold text-[#181615] hover:text-[#701A2B] shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Box className="w-3.5 h-3.5 text-[#701A2B]" />
                    <span>Interact in 3D</span>
                  </button>
                </div>
              )}

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badge && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#701A2B] text-white shadow-sm">
                    {product.badge}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#181615] text-white shadow-sm">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Purchasing Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
                {product.categoryName}
              </span>
              <h1 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181615] mt-1">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex items-center text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#181615]">{product.rating}</span>
                <span className="text-xs text-[#77716A]">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Price block */}
              <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-[#FAF7F2]">
                <span className="text-2xl sm:text-3xl font-bold text-[#181615]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.mrp && (
                  <span className="text-base text-[#9B948C] line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-xs font-bold text-[#701A2B] bg-[#701A2B]/10 px-2.5 py-1 rounded-md">
                  Save ₹{(product.mrp - product.price).toLocaleString("en-IN")} ({product.discount}%)
                </span>
              </div>
              <p className="text-[11px] text-[#77716A] mt-1">Inclusive of all applicable GST & taxes.</p>
            </div>

            {/* Color Swatches */}
            {product.colors && (
              <div className="space-y-2 pt-2 border-t border-[#FAF7F2]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#181615] uppercase tracking-wider">
                    Color: <span className="font-semibold text-[#701A2B]">{activeColor?.name}</span>
                  </span>
                  <span className="text-[11px] text-[#77716A]">{product.colors.length} shades available</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => handleColorChange(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
                        selectedColorIdx === idx
                          ? "border-[#701A2B] bg-[#701A2B]/5 text-[#701A2B] font-bold shadow-xs"
                          : "border-[#E5DED4] bg-white text-[#181615] hover:bg-[#FAF7F2]"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide Modal Trigger */}
            <div className="space-y-2 pt-2 border-t border-[#FAF7F2]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#181615] uppercase tracking-wider">
                  Select Size (IND / UK)
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-semibold text-[#701A2B] hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-11 h-11 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === sz
                        ? "bg-[#181615] text-white shadow-md scale-105"
                        : "bg-white border border-[#E5DED4] text-[#181615] hover:bg-[#EFE8DA]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#77716A] italic">{product.fitAdvice}</p>
            </div>

            {/* Action Buttons: Add To Bag & Buy Now */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className={`p-4 rounded-xl border transition-all ${
                    isWishlisted
                      ? "bg-[#701A2B] border-[#701A2B] text-white"
                      : "bg-white border-[#E5DED4] text-[#181615] hover:text-[#701A2B] hover:border-[#701A2B]"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#181615] hover:bg-[#2A2725] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <Zap className="w-4 h-4 text-[#C5A059]" />
                <span>BUY NOW WITH 1-CLICK</span>
              </button>
            </div>

            {/* Pincode Check Delivery Simulation */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DED4] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#181615]">
                <span className="flex items-center gap-1.5 uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[#701A2B]" />
                  <span>Check Delivery & Cash on Delivery</span>
                </span>
              </div>
              <form onSubmit={checkPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 bg-white border border-[#E5DED4] rounded-lg text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#181615] text-white text-xs font-bold rounded-lg hover:bg-[#701A2B] transition-colors uppercase tracking-wider"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <div
                  className={`text-xs p-2 rounded-md ${
                    pincodeStatus.valid ? "bg-[#2E7D32]/10 text-[#2E7D32]" : "bg-red-50 text-red-700"
                  }`}
                >
                  {pincodeStatus.message}
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-[#77716A]">
              <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#E5DED4] flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#701A2B] mb-1" />
                <span className="font-bold text-[#181615]">Free Shipping</span>
                <span>Above ₹999</span>
              </div>
              <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#E5DED4] flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-[#701A2B] mb-1" />
                <span className="font-bold text-[#181615]">7-Day Returns</span>
                <span>Hassle-free pickup</span>
              </div>
              <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#E5DED4] flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#701A2B] mb-1" />
                <span className="font-bold text-[#181615]">100% Genuine</span>
                <span>CloudStep™ Tech</span>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Accordion / Specification Tabs */}
        <div className="mt-12 bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex border-b border-[#E5DED4] overflow-x-auto">
            {[
              { id: "description", label: "DESCRIPTION" },
              { id: "details", label: "DETAILS & SPECS" },
              { id: "fit", label: "SIZE & FIT" },
              { id: "shipping", label: "SHIPPING & RETURNS" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[#701A2B] border-b-2 border-[#701A2B]"
                    : "text-[#77716A] hover:text-[#181615]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="text-xs sm:text-sm text-[#242220] leading-relaxed animate-fade-in">
            {activeTab === "description" && (
              <div className="space-y-4 max-w-3xl">
                <p>{product.description}</p>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E5DED4]">
                  <h4 className="font-bold uppercase tracking-wider text-[#181615] mb-2 text-xs">
                    Material & Care Instructions
                  </h4>
                  <p className="text-xs text-[#77716A]"><strong>Material:</strong> {product.material}</p>
                  <p className="text-xs text-[#77716A] mt-1"><strong>Care:</strong> {product.care}</p>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-3 max-w-2xl">
                <ul className="space-y-2">
                  {product.details?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#701A2B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "fit" && (
              <div className="space-y-3 max-w-2xl">
                <p><strong>Fit Type:</strong> {product.fitAdvice}</p>
                <p>
                  All Darelief footwear is engineered using standardized UK/Indian sizing dimensions with extra width around the ball of the foot.
                </p>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-bold text-[#701A2B] underline"
                >
                  Click to open full measurement guide
                </button>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-3 max-w-2xl text-xs text-[#77716A]">
                <p>• <strong>Free Shipping:</strong> Automatically applied on all orders above ₹999 across all India pincodes.</p>
                <p>• <strong>Delivery Timeframe:</strong> 2 to 4 business days for metro cities, 4 to 6 business days for tier 2/3 locations.</p>
                <p>• <strong>7-Day Returns & Exchanges:</strong> Instant door-to-door reverse pickup arranged via BlueDart/Delhivery.</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-12 bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DED4]">
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#181615]">
                Customer Reviews
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#181615]">{product.rating} out of 5</span>
                <span className="text-xs text-[#77716A]">Based on {product.reviewsCount} reviews</span>
              </div>
            </div>

            <button
              onClick={() => alert("Review submitted! Thank you for sharing your experience.")}
              className="px-5 py-2.5 bg-[#181615] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#701A2B] transition-colors"
            >
              Write A Review
            </button>
          </div>

          {/* Reviews list */}
          <div className="divide-y divide-[#FAF7F2] mt-4">
            {customerReviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="py-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-[#181615]">{rev.name}</h4>
                      <span className="text-[10px] text-[#2E7D32] font-semibold">✓ Verified Buyer • {rev.location}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#77716A]">{rev.date}</span>
                </div>
                <div className="flex items-center text-[#C5A059]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#242220] leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* You May Also Like / Related Row */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-serif-luxury text-2xl font-bold uppercase tracking-wider text-[#181615] mb-6">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
