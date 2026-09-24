"use client";

import React from "react";
import Link from "next/link";
import { X, ChevronRight, Phone, Mail, MapPin, Heart, ShoppingBag, User } from "lucide-react";
import { useUI } from "@/context/UIContext";

export default function MobileMenu() {
  const { isMobileMenuOpen, setIsMobileMenuOpen, setIsSearchOpen } = useUI();

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
    { name: "My Profile", href: "/account" },
    { name: "My Orders & Tracking", href: "/account/orders" },
    { name: "Track Active Order", href: "/account/track-order" },
    { name: "Saved Addresses", href: "/account/addresses" },
    { name: "Wishlist", href: "/account/wishlist" }
  ];

  const infoLinks = [
    { name: "Our Services", href: "/services" },
    { name: "About Darelief", href: "/about" },
    { name: "Contact & Support", href: "/contact" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Returns & Exchanges", href: "/return-exchange" }
  ];

  const handleClose = () => setIsMobileMenuOpen(false);

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#181615]/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className="relative w-[85%] max-w-sm bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-[#E5DED4] flex items-center justify-between bg-white">
          <div>
            <span className="block font-serif-luxury text-xl tracking-[0.2em] text-[#181615] font-bold">
              DARELIEF
            </span>
            <span className="block text-[8px] tracking-[0.3em] text-[#701A2B] font-semibold uppercase">
              WALKWEAR
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-[#77716A] hover:bg-[#FAF7F2] hover:text-[#181615]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-[#E5DED4]">
          <p className="text-[11px] font-bold text-[#77716A] uppercase tracking-wider mb-3 px-2">
            Categories
          </p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={handleClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#181615] hover:bg-[#EFE8DA] transition-colors"
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

        {/* Account Area */}
        <div className="p-4 border-b border-[#E5DED4]">
          <p className="text-[11px] font-bold text-[#77716A] uppercase tracking-wider mb-3 px-2">
            My Account
          </p>
          <div className="space-y-1">
            {accountLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleClose}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#242220] hover:bg-[#EFE8DA] transition-colors"
              >
                <span>{item.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#9B948C]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Customer Care */}
        <div className="p-4 border-b border-[#E5DED4]">
          <p className="text-[11px] font-bold text-[#77716A] uppercase tracking-wider mb-3 px-2">
            Help & Info
          </p>
          <div className="space-y-1">
            {infoLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleClose}
                className="block px-3 py-1.5 text-xs text-[#77716A] hover:text-[#701A2B]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Contact */}
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
