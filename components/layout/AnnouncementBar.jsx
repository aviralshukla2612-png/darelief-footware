"use client";

import React, { useState } from "react";
import { X, Sparkles, Truck } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-[#181615] text-[#FAF7F2] text-xs font-medium tracking-wider uppercase py-2.5 px-4 text-center border-b border-[#2D2A28] z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-[#EFE8DA]">
          <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>FREE SHIPPING ON ORDERS ABOVE ₹999</span>
        </span>
        <span className="text-[#77716A] hidden sm:inline">•</span>
        <span className="hidden sm:inline-block">EASY 7-DAY RETURNS & EXCHANGES</span>
        <span className="text-[#77716A] hidden md:inline">•</span>
        <Link
          href="/new-arrivals"
          className="hidden md:inline-flex items-center gap-1 text-[#C5A059] hover:underline font-semibold"
        >
          <span>Use code WELCOME10 for 10% OFF</span>
        </Link>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B948C] hover:text-[#FFFFFF] transition-colors p-1"
        aria-label="Close announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
