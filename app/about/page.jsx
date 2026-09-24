import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, ArrowRight, Award } from "lucide-react";

export const metadata = {
  title: "Our Story & Craftsmanship | Darelief Walkwear",
  description: "Learn about Darelief Walkwear's mission to craft comfortable, luxury women's footwear tailored for Indian feet."
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#FAF7F2] py-10 sm:py-16 border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
            Our Story & Heritage
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#181615] leading-tight">
            COMFORT, DESIGNED DIFFERENT.
          </h1>
          <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
            Born out of a simple observation: modern Indian women should never have to choose between impeccable European elegance and 12-hour foot comfort.
          </p>
        </div>

        {/* Brand Mission Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-[#E5DED4]">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85"
              alt="Footwear Crafting"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
              The Darelief Difference
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-[#181615]">
              Handcrafted For Indian Feet Dimensions
            </h2>
            <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
              Standard international shoe lasts often pinch Indian feet because they are narrow at the ball. At Darelief, our master craftsmen redesigned the footwear curvature from scratch — providing extra width at the forefoot, arch support reinforcements, and 6mm high-density latex memory foam insoles.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-[#E5DED4]">
                <h4 className="font-bold text-sm text-[#181615]">100% Cruelty-Free</h4>
                <p className="text-[11px] text-[#77716A] mt-1">Ethical vegan leather with ultra-soft glove touch.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E5DED4]">
                <h4 className="font-bold text-sm text-[#181615]">Zero Break-In</h4>
                <p className="text-[11px] text-[#77716A] mt-1">Padded heel collars eliminate painful shoe bites.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#701A2B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
            Step Into Extraordinary Everyday Comfort
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/90 max-w-xl mx-auto">
            Experience our cloud-cushioned flats, block heels, and everyday slides with free shipping & easy 7-day doorstep returns.
          </p>
          <div>
            <Link
              href="/new-arrivals"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#181615] hover:bg-[#FAF7F2] rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-lg"
            >
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
