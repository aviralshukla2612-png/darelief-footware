"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { setIsSearchOpen, isMobileMenuOpen, setIsMobileMenuOpen } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close account dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsAccountOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navLinksLeft = [
    { name: "NEW ARRIVALS", href: "/new-arrivals" },
    { name: "FLATS", href: "/flats" },
    { name: "SANDALS", href: "/sandals" }
  ];

  const navLinksRight = [
    { name: "HEELS", href: "/heels" },
    { name: "OFFICE WEAR", href: "/office-wear" },
    { name: "COMFORT", href: "/comfort" },
    { name: "SALE", href: "/new-arrivals", isSpecial: true }
  ];

  const isActive = (path) => pathname === path;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E5DED4]"
          : "bg-[#FAF7F2] border-b border-[#E5DED4]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#181615] hover:text-[#701A2B] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#181615] hover:text-[#701A2B] ml-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-[#181615] hover:text-[#701A2B] transition-colors text-xs font-semibold tracking-widest uppercase group"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Search</span>
            </button>
            <span className="text-[#D4C9BC]">|</span>
            {navLinksLeft.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors relative py-1 ${
                  isActive(link.href)
                    ? "text-[#701A2B] font-bold"
                    : "text-[#181615] hover:text-[#701A2B]"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#701A2B] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Center Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center">
            <Link href="/" className="inline-block text-center group">
              <span className="block font-serif-luxury text-2xl sm:text-3xl lg:text-3xl tracking-[0.22em] text-[#181615] font-bold uppercase transition-transform group-hover:scale-[1.01]">
                DARELIEF
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.35em] text-[#701A2B] font-semibold uppercase -mt-0.5">
                WALKWEAR
              </span>
            </Link>
          </div>

          {/* Desktop Right Nav Links & Actions */}
          <div className="hidden lg:flex items-center space-x-7">
            <nav className="flex items-center space-x-7">
              {navLinksRight.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors relative py-1 ${
                    link.isSpecial
                      ? "text-[#701A2B] font-bold"
                      : isActive(link.href)
                      ? "text-[#701A2B] font-bold"
                      : "text-[#181615] hover:text-[#701A2B]"
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#701A2B] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4 pl-4 border-l border-[#D4C9BC]">
              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="relative p-2 text-[#181615] hover:text-[#701A2B] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#701A2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div
                ref={accountMenuRef}
                className="relative"
                onMouseEnter={() => setIsAccountOpen(true)}
                onMouseLeave={() => setIsAccountOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                  className="p-2 text-[#181615] hover:text-[#701A2B] transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Account Menu"
                  aria-expanded={isAccountOpen}
                >
                  <User className="w-5 h-5" />
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 top-full pt-1 z-50 w-56 animate-fade-in text-left">
                    <div className="bg-white rounded-2xl shadow-2xl border border-[#E5DED4] py-2 overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-[#FAF7F2] bg-[#FAF7F2]/50">
                        <p className="text-xs font-bold text-[#181615]">Neha Sharma</p>
                        <p className="text-[11px] text-[#77716A] truncate">neha.sharma@gmail.com</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/account"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-xs font-medium text-[#181615] hover:bg-[#FAF7F2] hover:text-[#701A2B] transition-colors"
                        >
                          My Account Hub
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-xs font-medium text-[#181615] hover:bg-[#FAF7F2] hover:text-[#701A2B] transition-colors"
                        >
                          My Orders & Returns
                        </Link>
                        <Link
                          href="/account/track-order"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-xs font-medium text-[#181615] hover:bg-[#FAF7F2] hover:text-[#701A2B] transition-colors"
                        >
                          Track Order Status
                        </Link>
                        <Link
                          href="/account/addresses"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-xs font-medium text-[#181615] hover:bg-[#FAF7F2] hover:text-[#701A2B] transition-colors"
                        >
                          Saved Addresses
                        </Link>
                      </div>
                      <div className="border-t border-[#FAF7F2] pt-1 mt-1">
                        <Link
                          href="/account"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-xs font-medium text-[#701A2B] hover:bg-[#701A2B]/5 transition-colors"
                        >
                          Sign Out
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-[#181615] hover:text-[#701A2B] transition-colors"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#701A2B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Right Icons */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              href="/account/wishlist"
              className="relative p-2 text-[#181615] hover:text-[#701A2B]"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#701A2B] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              className="p-2 text-[#181615] hover:text-[#701A2B]"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-[#181615] hover:text-[#701A2B]"
              aria-label="Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#701A2B] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
