"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ToastContainer() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-sm">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#181615] text-white rounded-xl shadow-2xl border border-[#3D3834]">
        <div className="p-2 bg-[#701A2B] rounded-lg text-white">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div className="flex-1 text-xs">
          <p className="font-semibold text-[#FAF7F2]">{toastMessage}</p>
        </div>
        <Link
          href="/cart"
          className="text-xs font-bold text-[#C5A059] hover:underline shrink-0"
        >
          View Bag
        </Link>
      </div>
    </div>
  );
}
