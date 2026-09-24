"use client";

import React from "react";
import { Feather, Sparkles, Shield, Heart } from "lucide-react";

export default function BrandPillars() {
  const pillars = [
    {
      icon: Feather,
      title: "ULTRA\nLIGHTWEIGHT",
      desc: "Easy on your feet\nall day long."
    },
    {
      icon: Sparkles,
      title: "SOFT CUSHION\nINSOLE",
      desc: "6mm CloudStep™\ndual-density comfort."
    },
    {
      icon: Shield,
      title: "PREMIUM\nQUALITY",
      desc: "Cruelty-free vegan\nleather made to last."
    },
    {
      icon: Heart,
      title: "DESIGNED\nIN INDIA",
      desc: "Custom contoured\nfor Indian feet shapes."
    }
  ];

  return (
    <section className="relative w-full bg-gradient-to-r from-[#F7F1E8] via-[#FAF6F0] to-[#F7F1E8] py-10 sm:py-14 border-y border-[#E5DED4] overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#E5DED4]/70">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center px-3 sm:px-6 ${
                  idx > 1 ? "pt-6 md:pt-0" : ""
                } ${idx % 2 === 1 ? "pt-0 md:pt-0" : ""}`}
              >
                {/* Circular White/Ivory Badge with Maroon Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-xs border border-[#E5DED4] shadow-xs flex items-center justify-center mb-3.5 text-[#701A2B] hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6 stroke-[1.65]" />
                </div>

                {/* Bold Serif Headline */}
                <h3 className="font-serif-luxury text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#181615] leading-snug whitespace-pre-line">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-[#77716A] leading-relaxed mt-2 whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
