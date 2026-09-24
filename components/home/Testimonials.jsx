"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function Testimonials() {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const reviews = [
    {
      quote:
        "“I have wide feet and finding stylish loafers in India was a nightmare until I found Darelief. Fits like a dream, the gold chain adds such an understated luxury feel to my work outfits!”",
      author: "Pooja Malhotra",
      location: "Bengaluru • Verified Buyer",
      shoes: [
        {
          src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=85",
          alt: "Beige Loafers on Feet"
        },
        {
          src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=85",
          alt: "Maroon Strappy Block Heels"
        },
        {
          src: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=500&q=85",
          alt: "Black Strappy Sandals"
        }
      ]
    },
    {
      quote:
        "“Super comfortable and so elegant! Perfect for daily wear as well as office. The memory foam insole actually works. I was on my feet for 8 hours during an exhibition and had zero ache.”",
      author: "Riya Sharma",
      location: "Mumbai • Verified Buyer",
      shoes: [
        {
          src: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=500&q=85",
          alt: "Strappy Sandal Styling"
        },
        {
          src: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=85",
          alt: "Comfort Loafer Fit"
        },
        {
          src: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=85",
          alt: "Slide Comfort Sandal"
        }
      ]
    }
  ];

  // Auto-cycle review smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const current = reviews[activeReviewIdx];

  return (
    <section className="w-full bg-[#FAF7F2] py-10 sm:py-14 border-b border-[#E5DED4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Heading & Button (Prominent Editorial) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="inline-block text-xs font-extrabold uppercase tracking-[0.28em] text-[#701A2B]">
              LOVED BY
            </span>

            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[54px] text-[#181615] font-bold tracking-tight leading-[1.06]">
              THOUSANDS OF<br />HAPPY WOMEN
            </h2>

            <p className="text-sm sm:text-base text-[#77716A] leading-relaxed max-w-md">
              Over 25,000+ modern Indian women trust Darelief for their daily commute, corporate meetings, and weekend celebrations.
            </p>

            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 px-8 py-3.5 sm:py-4 bg-[#181615] hover:bg-[#701A2B] text-white rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl group"
              >
                <span>READ ALL REVIEWS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Compact Maroon Card */}
          <div className="lg:col-span-7 bg-[#6F1D2B] rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
            {/* Watermark Quote */}
            <div className="absolute top-2 right-6 text-white/10 font-serif-luxury text-7xl select-none pointer-events-none leading-none">
              ”
            </div>

            <div className="relative z-10 space-y-4">
              {/* Gold Quote Glyph */}
              <div className="text-[#C5A059] text-3xl font-serif-luxury leading-none select-none">
                “
              </div>

              {/* Compact Quote Text */}
              <p className="font-serif-luxury text-sm sm:text-base font-light italic leading-relaxed text-[#FAF7F2] min-h-[55px] sm:min-h-[60px] transition-opacity duration-300">
                {current.quote}
              </p>

              {/* Author & Star Rating Row */}
              <div className="pt-3 border-t border-white/15 flex items-end justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-white tracking-wide text-xs sm:text-sm">
                    — {current.author}
                  </h4>
                  <p className="text-[11px] text-[#EFE8DA]/80 mt-0.5">{current.location}</p>
                </div>

                <div className="flex items-center text-[#C5A059] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>
              </div>

              {/* 3 Compact Customer Footwear Photos */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                {current.shoes.map((item, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#262321] border border-white/20 shadow-xs group"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
