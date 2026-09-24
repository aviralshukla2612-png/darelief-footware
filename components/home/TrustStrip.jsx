"use client";

import React from "react";
import Link from "next/link";
import { Truck, RefreshCw, Lock, Ruler, Headphones, ArrowRight } from "lucide-react";

export default function TrustStrip() {
  const topServices = [
    {
      icon: Truck,
      title: "FREE SHIPPING",
      desc: "On orders above ₹999"
    },
    {
      icon: RefreshCw,
      title: "EASY RETURNS",
      desc: "Simple & hassle-free returns"
    },
    {
      icon: Lock,
      title: "SECURE PAYMENT",
      desc: "100% secure checkout"
    }
  ];

  const bottomServices = [
    {
      icon: Ruler,
      title: "SIZE ASSISTANCE",
      desc: "Find your perfect fit"
    },
    {
      icon: Headphones,
      title: "CUSTOMER SUPPORT",
      desc: "We're here to help you"
    }
  ];

  return (
    <section className="w-full bg-[#FAF7F2] py-8 sm:py-12 border-b border-[#E5DED4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Section Header (Compact) */}
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#701A2B]">
            OUR SERVICES
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#181615] font-bold leading-tight">
            We&apos;re committed to give you the best shopping experience.
          </h2>
        </div>

        {/* 5 Service Feature Cards (3 on top row, 2 centered on bottom row) */}
        <div className="space-y-3.5">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {topServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#E5DED4] p-4 sm:p-5 text-center shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center space-y-2 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#FAF3EC] border border-[#E5DED4]/60 text-[#701A2B] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615]">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] text-[#77716A] leading-tight">
                    {srv.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: 2 Centered Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto">
            {bottomServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#E5DED4] p-4 sm:p-5 text-center shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center space-y-2 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#FAF3EC] border border-[#E5DED4]/60 text-[#701A2B] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615]">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] text-[#77716A] leading-tight">
                    {srv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Compact Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-[#F6EFEB] border border-[#E5DED4] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left Text */}
          <div className="space-y-2 max-w-xs text-left shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#701A2B]">
              DESIGNED FOR
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#181615] font-bold leading-tight">
              Everyday Comfort
            </h3>
            <div className="pt-1">
              <Link
                href="/new-arrivals"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Footwear Photography */}
          <div className="w-full sm:w-1/2 rounded-xl overflow-hidden shadow-xs aspect-[16/7]">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85"
              alt="Everyday Comfort Footwear"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
