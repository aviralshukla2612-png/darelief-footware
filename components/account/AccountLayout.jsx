"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  Truck,
  Heart,
  MapPin,
  LogOut,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { useUI } from "@/context/UIContext";

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile } = useUI();

  const navItems = [
    { label: "My Account", href: "/account", icon: User },
    { label: "My Orders", href: "/account/orders", icon: ShoppingBag },
    { label: "Track Order", href: "/account/track-order", icon: Truck },
    { label: "Wishlist", href: "/account/wishlist", icon: Heart },
    { label: "Addresses", href: "/account/addresses", icon: MapPin }
  ];

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out of your session?")) {
      router.push("/");
    }
  };

  const isActive = (href) => {
    if (href === "/account") return pathname === "/account" || pathname === "/account/profile";
    return pathname.startsWith(href);
  };

  return (
    <div className="w-full bg-[#FAF7F2] py-8 sm:py-12 border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#77716A] mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#701A2B]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#181615] font-semibold">Account Hub</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Account Sidebar Navigation (3 cols) */}
          <aside className="lg:col-span-3 bg-white rounded-3xl border border-[#E5DED4] p-5 shadow-xs space-y-4">
            {/* User Mini Card */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DED4] flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#701A2B] text-white flex items-center justify-center font-bold text-base">
                {userProfile.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-xs sm:text-sm font-bold text-[#181615] truncate">
                  {userProfile.name}
                </h3>
                <p className="text-[11px] text-[#77716A] truncate">{userProfile.email}</p>
              </div>
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold tracking-wide uppercase transition-all ${
                      active
                        ? "bg-[#701A2B] text-white shadow-xs"
                        : "text-[#181615] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${active ? "text-white" : "text-[#9B948C]"}`} />
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold tracking-wide uppercase text-[#C62828] hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </div>
              </button>
            </nav>
          </aside>

          {/* Main Account Area (9 cols) */}
          <main className="lg:col-span-9 bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-8 shadow-xs">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
