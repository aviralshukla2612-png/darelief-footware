"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Truck, CheckCircle2, Clock, ArrowRight, Package } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { useUI } from "@/context/UIContext";

export default function TrackOrderPage() {
  const { orders } = useUI();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(orders[0] || null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    const cleaned = searchQuery.trim().replace("#", "").toLowerCase();
    const match = orders.find(
      (o) =>
        o.id.toLowerCase().includes(cleaned) ||
        o.orderNumber.toLowerCase().includes(cleaned) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(cleaned))
    );

    if (match) {
      setActiveTrackingOrder(match);
    } else {
      setActiveTrackingOrder(orders[0]); // default fallback
    }
  };

  const currentOrder = activeTrackingOrder || orders[0];

  return (
    <AccountLayout>
      <div className="space-y-8">
        <div className="pb-4 border-b border-[#FAF7F2]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
            Real-Time Tracking
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#181615]">
            TRACK YOUR ORDER
          </h1>
          <p className="text-xs text-[#77716A] mt-0.5">
            Track your package live across express BlueDart & Delhivery logistics hubs.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-[#E5DED4]">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#181615]">
              Enter Order ID or AWB Tracking Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. #DR12345 or AWB984729104IN"
                  className="w-full px-4 py-3 bg-white border border-[#E5DED4] rounded-xl text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>TRACK ORDER</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Tracking Result */}
        {currentOrder && (
          <div className="bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-8 space-y-6 shadow-xs animate-fade-in">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#FAF7F2]">
              <div>
                <span className="text-xs font-bold text-[#181615] sm:text-base">
                  Order {currentOrder.orderNumber}
                </span>
                <p className="text-xs text-[#77716A] mt-0.5">
                  Courier: <strong>{currentOrder.courierName || "BlueDart Express"}</strong> • AWB:{" "}
                  <strong>{currentOrder.trackingNumber || "AWB984729104IN"}</strong>
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentOrder.status === "Delivered"
                    ? "bg-[#2E7D32]/10 text-[#2E7D32]"
                    : "bg-[#701A2B]/10 text-[#701A2B]"
                }`}
              >
                {currentOrder.status}
              </span>
            </div>

            {/* Horizontal / Vertical 6-Step Stepper */}
            <div className="py-4">
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
                {[
                  { title: "Placed", done: true },
                  { title: "Confirmed", done: true },
                  { title: "Packed", done: true },
                  { title: "Shipped", done: currentOrder.statusStage >= 4 },
                  { title: "Out for Delivery", done: currentOrder.statusStage >= 5 },
                  { title: "Delivered", done: currentOrder.statusStage >= 6 }
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center p-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all ${
                        step.done
                          ? "bg-[#701A2B] text-white shadow-xs"
                          : "bg-[#FAF7F2] border border-[#E5DED4] text-[#9B948C]"
                      }`}
                    >
                      {step.done ? "✓" : idx + 1}
                    </div>
                    <span className={`text-xs font-semibold ${step.done ? "text-[#181615]" : "text-[#9B948C]"}`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order item preview */}
            <div className="pt-4 border-t border-[#FAF7F2] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentOrder.items?.[0]?.image || "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=200&q=80"}
                  alt="Product"
                  className="w-12 h-14 object-cover rounded-lg border border-[#E5DED4]"
                />
                <div className="text-xs">
                  <p className="font-bold text-[#181615]">{currentOrder.items?.[0]?.name}</p>
                  <p className="text-[#77716A]">
                    {currentOrder.items?.[0]?.color} • Size {currentOrder.items?.[0]?.size}
                  </p>
                </div>
              </div>

              <Link
                href={`/account/orders/${currentOrder.id}`}
                className="px-4 py-2 border border-[#E5DED4] hover:border-[#701A2B] text-xs font-bold text-[#181615] hover:text-[#701A2B] rounded-xl transition-colors"
              >
                Full Details
              </Link>
            </div>
          </div>
        )}

        {/* Quick select from recent orders list */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615] mb-3">
            Recent Orders
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {orders.map((o) => (
              <div
                key={o.id}
                onClick={() => setActiveTrackingOrder(o)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  activeTrackingOrder?.id === o.id
                    ? "border-[#701A2B] bg-[#701A2B]/5 shadow-xs"
                    : "border-[#E5DED4] hover:border-[#77716A]"
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-[#181615]">{o.orderNumber}</h4>
                  <p className="text-[11px] text-[#77716A]">Placed: {o.date}</p>
                </div>
                <span className="text-xs font-bold text-[#701A2B]">Track →</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
