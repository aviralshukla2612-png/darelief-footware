"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ChevronRight, Phone, Mail, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useUI } from "@/context/UIContext";

export default function MobileMenu() {
  const { isMobileMenuOpen, setIsMobileMenuOpen, setIsSearchOpen } = useUI();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  const categories = [
    { name: "New Arrivals", href: "/new-arrivals", badge: "HOT" },
    { name: "Flats", href: "/flats" },
    { name: "Sandals", href: "/sandals" },
    { name: "Heels", href: "/heels" },
    { name: "Office Wear", href: "/office-wear" },
    { name: "Comfort Collection", href: "/comfort" },
    { name: "Sale & Offers", href: "/new-arrivals", badge: "UP TO 40% OFF" }
  ];

  const accountLinks = [
    { name: "My Account Hub", href: "/account" },
    { name: "My Orders & Tracking", href: "/account/orders" },
    { name: "Track Active Order", href: "/account/track-order" },
    { name: "Saved Addresses", href: "/account/addresses" },
    { name: "Wishlist", href: "/account/wishlist" }
  ];

  const infoLinks = [
    { name: "Our Services", href: "/services" },
    { name: "About Darelief", href: "/about" },
    { name: "Contact Concierge", href: "/contact" },
    { name: "Size Guide & Measurement", href: "/size-guide" },
    { name: "7-Day Return & Exchange", href: "/return-exchange" },
    { name: "All Policies", href: "/policies" }
  ];

  const handleClose = () => setIsMobileMenuOpen(false);

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex animate-fade-in">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-[#181615]/65 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-[86%] max-w-sm bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 overflow-y-auto pb-safe">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5DED4] flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <span className="block font-serif-luxury text-xl tracking-[0.2em] text-[#181615] font-bold">
              DARELIEF
            </span>
            <span className="block text-[8px] tracking-[0.3em] text-[#701A2B] font-semibold uppercase -mt-0.5">
              WALKWEAR
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-[#77716A] hover:bg-[#FAF7F2] hover:text-[#181615] touch-target flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Button in Drawer */}
        <div className="p-4 bg-white border-b border-[#E5DED4]">
          <button
            onClick={() => {
              handleClose();
              setIsSearchOpen(true);
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DED4] text-xs font-semibold text-[#77716A] hover:text-[#181615]"
          >
            <Search className="w-4 h-4 text-[#701A2B]" />
            <span>Search sandals, flats, heels...</span>
          </button>
        </div>

        {/* Categories Section */}
        <div className="p-4 border-b border-[#E5DED4]">
          <p className="text-[11px] font-bold text-[#77716A] uppercase tracking-wider mb-2.5 px-2">
            Explore Footwear
          </p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={handleClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[#181615] hover:bg-[#EFE8DA] transition-colors min-h-[44px]"
              >
                <span>{cat.name}</span>
                <div className="flex items-center gap-2">
                  {cat.badge && (
                    <span className="text-[10px] bg-[#701A2B] text-white px-2 py-0.5 rounded-full font-bold">
                      {cat.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#9B948C]" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Account Management Section */}
        <div className="p-4 border-b border-[#E5DED4]">
          <p className="text-[11px] font-bold text-[#77716A] uppercase tracking-wider mb-2.5 px-2">
            My Account
          </p>
          <div className="space-y-1">
            {accountLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleClose}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#242220] hover:bg-[#EFE8DA] transition-colors min-h-[40px]"
              >
                <span>{item.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#9B948C]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Help, Policies & Care */}
        <div className="p-4 border-b border-[#E5DED4]">
          <p className="text-[11px] font-bold text-[#77716A] uppercase tracking-wider mb-2.5 px-2">
            Customer Care & Policies
          </p>
          <div className="space-y-1">
            {infoLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleClose}
                className="block px-3 py-2 text-xs font-medium text-[#77716A] hover:text-[#701A2B] rounded-lg"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Contact Details */}
        <div className="p-4 mt-auto bg-white border-t border-[#E5DED4] text-xs text-[#77716A] space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#701A2B]" />
            <span>+91 98765 43210 (10 AM - 7 PM)</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#701A2B]" />
            <span>support@dareliefwalkwear.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
