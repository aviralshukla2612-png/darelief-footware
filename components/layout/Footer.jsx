"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Send, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#181615] text-[#FAF7F2] pt-16 pb-10 border-t border-[#2A2725]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C2927]">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="block font-serif-luxury text-2xl sm:text-3xl tracking-[0.22em] text-[#FFFFFF] font-bold">
                DARELIEF
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-[#C5A059] font-semibold uppercase -mt-0.5">
                WALKWEAR
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#A8A199] leading-relaxed max-w-sm">
              Designed for Everyday Comfort. Made for Every Woman. We blend ergonomic orthopedic cushioning with high-fashion silhouettes tailored specifically for Indian feet.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#262321] hover:bg-[#701A2B] text-[#FAF7F2] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#262321] hover:bg-[#701A2B] text-[#FAF7F2] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#262321] hover:bg-[#701A2B] text-[#FAF7F2] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF] mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A199]">
              <li>
                <Link href="/new-arrivals" className="hover:text-[#FAF7F2] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/flats" className="hover:text-[#FAF7F2] transition-colors">
                  Flats Collection
                </Link>
              </li>
              <li>
                <Link href="/sandals" className="hover:text-[#FAF7F2] transition-colors">
                  Sandals & Slides
                </Link>
              </li>
              <li>
                <Link href="/heels" className="hover:text-[#FAF7F2] transition-colors">
                  Block & Kitten Heels
                </Link>
              </li>
              <li>
                <Link href="/office-wear" className="hover:text-[#FAF7F2] transition-colors">
                  Office Wear Loafers
                </Link>
              </li>
              <li>
                <Link href="/comfort" className="hover:text-[#FAF7F2] transition-colors">
                  Comfort & Arch Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP & POLICIES */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF] mb-4">
              HELP & POLICIES
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A199]">
              <li>
                <Link href="/account/track-order" className="hover:text-[#FAF7F2] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/return-exchange" className="hover:text-[#FAF7F2] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#FAF7F2] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-[#FAF7F2] transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#FAF7F2] transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-[#FAF7F2] transition-colors">
                  Size Guide & Measuring
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FAF7F2] transition-colors">
                  Contact Us / Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT & NEWSLETTER */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF] mb-4">
              STAY IN THE LOOP
            </h4>
            <p className="text-xs text-[#A8A199] mb-3 leading-relaxed">
              Subscribe to get special offers, complimentary gift codes, and VIP preview access.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#24211F] border border-[#3D3834] rounded-lg px-3.5 py-2.5 text-xs text-[#FAF7F2] placeholder-[#77716A] focus:outline-none focus:border-[#701A2B] pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-1.5 bg-[#701A2B] text-white rounded-md hover:bg-[#8E2337] transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {isSubscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#C5A059] animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you for subscribing! Check your inbox for WELCOME10.</span>
                </div>
              )}
            </form>

            <div className="pt-4 space-y-1.5 text-xs text-[#A8A199]">
              <Link href="/about" className="block hover:text-[#FAF7F2]">
                Our Brand Story
              </Link>
              <Link href="/services" className="block hover:text-[#FAF7F2]">
                Our Services
              </Link>
              <Link href="/privacy-policy" className="block hover:text-[#FAF7F2]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block hover:text-[#FAF7F2]">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Payment badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#77716A]">
          <p>© {new Date().getFullYear()} Darelief Walkwear Pvt. Ltd. All Rights Reserved.</p>

          <div className="flex items-center space-x-3 text-[11px] text-[#A8A199]">
            <span className="px-2 py-1 bg-[#262321] rounded border border-[#3D3834] font-semibold text-white">
              VISA
            </span>
            <span className="px-2 py-1 bg-[#262321] rounded border border-[#3D3834] font-semibold text-white">
              MasterCard
            </span>
            <span className="px-2 py-1 bg-[#262321] rounded border border-[#3D3834] font-semibold text-white">
              RuPay
            </span>
            <span className="px-2 py-1 bg-[#262321] rounded border border-[#3D3834] font-semibold text-white">
              UPI / GPay
            </span>
            <span className="px-2 py-1 bg-[#262321] rounded border border-[#3D3834] font-semibold text-white">
              COD Available
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
