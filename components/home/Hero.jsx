"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Box, Sparkles } from "lucide-react";
import ShoeCanvas3D from "@/components/3d/ShoeCanvas3D";

export default function Hero() {
  const [viewMode, setViewMode] = useState("photo"); // "photo" | "3d"
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    {
      badge: "DESIGNED FOR EVERYDAY COMFORT",
      titleLine1: "COMFORT,",
      titleLine2: "DESIGNED",
      titleLine3: "DIFFERENT.",
      subtitle: "Stylish • Soft • Lightweight\nFor every step of your day.",
      ctaText: "SHOP NEW ARRIVALS",
      ctaHref: "/new-arrivals",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
      productName: "The Strappy Stiletto Block",
      colorHex: "#701A2B"
    },
    {
      badge: "NEW COMMUTER COLLECTION",
      titleLine1: "EFFORTLESS",
      titleLine2: "LUXURY FOR",
      titleLine3: "THE WORKDAY.",
      subtitle: "Orthotic Cloud Cushioning • Zero Break-in Period\nEngineered for Indian women on the move.",
      ctaText: "EXPLORE OFFICE WEAR",
      ctaHref: "/office-wear",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
      productName: "The Parisian Pointed Loafer",
      colorHex: "#EFE8DA"
    },
    {
      badge: "ARCHITECTURAL KITTEN HEELS",
      titleLine1: "ELEGANCE",
      titleLine2: "WITHOUT",
      titleLine3: "THE ACHE.",
      subtitle: "Pressure-relief Ball Cushioning • 2.2-inch Stable Pitch\nDay-to-night transitions made seamless.",
      ctaText: "DISCOVER HEELS",
      ctaHref: "/heels",
      image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1200&q=85",
      productName: "The Knot Mule Kitten Heel",
      colorHex: "#181615"
    }
  ];

  // Auto slider effect - transitions every 4 seconds
  useEffect(() => {
    if (viewMode === "3d" || isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [viewMode, isPaused, heroSlides.length]);

  const current = heroSlides[activeSlide];

  return (
    <section className="relative w-full bg-[#FAF7F2] overflow-hidden border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DA] border border-[#E5DED4] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#701A2B]" />
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#701A2B]">
                {current.badge}
              </span>
            </div>

            {/* Main Editorial Serif Heading with fade transition */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.75rem] text-[#181615] font-normal tracking-[-0.02em] leading-[1.04] min-h-[130px] sm:min-h-[160px] lg:min-h-[185px] transition-opacity duration-500">
              <span className="block font-medium">{current.titleLine1}</span>
              <span className="block font-medium text-[#701A2B]">{current.titleLine2}</span>
              <span className="block font-medium">{current.titleLine3}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#6B655E] whitespace-pre-line leading-relaxed max-w-lg min-h-[48px] font-normal">
              {current.subtitle}
            </p>

            {/* CTA Button Group & Mode Switcher */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={current.ctaHref}
                className="px-8 py-4 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Toggle 3D Experience */}
              <button
                onClick={() => setViewMode(viewMode === "photo" ? "3d" : "photo")}
                className="px-4 py-3.5 bg-white hover:bg-[#EFE8DA] text-[#181615] border border-[#E5DED4] rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Box className="w-4 h-4 text-[#701A2B]" />
                <span>{viewMode === "photo" ? "Explore in 3D" : "View Editorial Look"}</span>
              </button>
            </div>

            {/* Subtle Carousel Progress Indicators */}
            <div className="flex items-center gap-2 pt-4">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 transition-all duration-500 rounded-full cursor-pointer ${
                    activeSlide === idx
                      ? "w-8 bg-[#701A2B]"
                      : "w-2 bg-[#D4C9BC] hover:bg-[#77716A]"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Visual Stage (Automatic Editorial Slide OR 3D Interactive Shoe Viewer) */}
          <div
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {viewMode === "3d" ? (
              <div className="animate-fade-in">
                <ShoeCanvas3D
                  color={current.colorHex}
                  autoRotate={true}
                  interactive={true}
                  showControls={true}
                  height="460px"
                />
              </div>
            ) : (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E5DED4] aspect-[4/3] sm:aspect-[16/11] bg-white group">
                <img
                  key={activeSlide}
                  src={current.image}
                  alt="Darelief Women Luxury Footwear"
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 animate-fade-in"
                />

                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Product Highlight Card (Compact) */}
                <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-[270px] py-1.5 px-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#E5DED4] shadow-md flex items-center justify-between gap-2.5 transition-transform duration-300">
                  <div className="overflow-hidden">
                    <span className="block text-[8px] font-bold tracking-wider uppercase text-[#701A2B]">
                      Featured In Hero
                    </span>
                    <h4 className="text-[11px] font-bold text-[#181615] truncate">
                      {current.productName}
                    </h4>
                  </div>
                  <Link
                    href={current.ctaHref}
                    className="shrink-0 px-2.5 py-1 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-md text-[10px] font-bold transition-colors shadow-xs uppercase tracking-wider"
                  >
                    View Style
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
