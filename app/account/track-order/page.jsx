"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Truck,
  FileText,
  CreditCard,
  Package,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  Headphones,
  Check,
  Sparkles
} from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { useUI } from "@/context/UIContext";

export default function TrackOrderPage() {
  const { orders } = useUI();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(orders[0] || null);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const cleaned = searchQuery.trim().replace("#", "").toLowerCase();
    const match = orders.find(
      (o) =>
        o.id.toLowerCase().includes(cleaned) ||
        o.orderNumber.toLowerCase().includes(cleaned) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(cleaned))
    );

    if (match) {
      setActiveTrackingOrder(match);
      setShowSearchModal(false);
    }
  };

  const currentOrder = activeTrackingOrder || orders[0] || {
    id: "ord_101",
    orderNumber: "#DR12345",
    date: "18 May, 2024",
    status: "Delivered",
    statusStage: 6,
    courierName: "BlueDart Express",
    trackingNumber: "AWB984729104IN",
    items: [
      {
        name: "Darelief Bow Detail Pointed Flat",
        color: "Nude Elegance",
        size: 6,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=85"
      }
    ]
  };

  const orderItem = currentOrder.items?.[0] || {
    name: "Darelief Bow Detail Pointed Flat",
    color: "Nude Elegance",
    size: 6,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=85"
  };

  // 6 Defined tracking stages matching Screenshot 1
  const journeySteps = [
    {
      stepNumber: 1,
      title: "Placed",
      subtext: "Your order has been placed.",
      date: "18 May, 2024",
      time: "10:30 AM",
      icon: FileText,
      completed: true
    },
    {
      stepNumber: 2,
      title: "Confirmed",
      subtext: "Your order has been confirmed.",
      date: "18 May, 2024",
      time: "11:45 AM",
      icon: CreditCard,
      completed: true
    },
    {
      stepNumber: 3,
      title: "Packed",
      subtext: "Your order has been carefully packed.",
      date: "19 May, 2024",
      time: "02:15 PM",
      icon: Package,
      completed: true
    },
    {
      stepNumber: 4,
      title: "Shipped",
      subtext: "Your order is on the way.",
      date: "20 May, 2024",
      time: "09:00 AM",
      icon: Truck,
      completed: true
    },
    {
      stepNumber: 5,
      title: "Out for Delivery",
      subtext: "Your order is out for delivery.",
      date: "21 May, 2024",
      time: "08:30 AM",
      icon: MapPin,
      completed: true
    },
    {
      stepNumber: 6,
      title: "Delivered",
      subtext: "Your order has been delivered.",
      date: "21 May, 2024",
      time: "02:40 PM",
      icon: Package,
      isFinalHighlight: true,
      completed: true
    }
  ];

  return (
    <AccountLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Top Hero Section: Title (Left) + Order Info Card (Center) + Gift Box Accent (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Luxury Editorial Header */}
          <div className="lg:col-span-5 space-y-2 text-left">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-[#701A2B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#701A2B]">
                ORDER TRACKING
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[54px] text-[#181615] font-bold tracking-tight leading-[1.08]">
              Your Order<br />
              <span className="italic font-normal text-[#701A2B]">Journey.</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed pt-1">
              From our studio to your doorstep.
            </p>

            {/* Quick search/switch order trigger */}
            <div className="pt-2">
              <button
                onClick={() => setShowSearchModal(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#701A2B] hover:underline cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track a different order number</span>
              </button>
            </div>
          </div>

          {/* Center/Right: Order Details Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DED4] shadow-md space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E5DED4] shrink-0">
                  <img
                    src={orderItem.image}
                    alt={orderItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#181615]">
                    Order {currentOrder.orderNumber}
                  </h2>
                  <p className="text-[11px] text-[#77716A]">Placed via Darelief Walkwear</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] rounded-full text-xs font-bold shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{currentOrder.status || "Delivered"}</span>
              </div>
            </div>

            {/* Courier & AWB stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#FAF7F2]">
              <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-2xl border border-[#E5DED4]">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DED4] text-[#701A2B] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div>
                  <span className="block text-[10px] text-[#77716A] uppercase tracking-wider font-semibold">
                    Courier
                  </span>
                  <span className="text-xs font-bold text-[#181615]">
                    {currentOrder.courierName || "BlueDart Express"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-2xl border border-[#E5DED4]">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DED4] text-[#701A2B] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div>
                  <span className="block text-[10px] text-[#77716A] uppercase tracking-wider font-semibold">
                    AWB Number
                  </span>
                  <span className="text-xs font-bold text-[#181615]">
                    {currentOrder.trackingNumber || "AWB984729104IN"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: "Delivery Journey" Full Stepper Container */}
        <div className="bg-[#FAF7F2]/80 border border-[#E5DED4] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden space-y-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#E5DED4]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-[#701A2B]" />
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#181615]">
                Delivery Journey
              </h3>
            </div>
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#77716A]">
              Crafted with care. Delivered with love.
            </p>
          </div>

          {/* Stepper Timeline: Responsive Horizontal Desktop / Connected Vertical Mobile */}
          <div>
            {/* Desktop View: Horizontal 6-Column Wavy Stepper (lg:block) */}
            <div className="hidden lg:block relative">
              {/* Desktop Connective Dotted Curve Line */}
              <div className="absolute top-[58px] left-[6%] right-[6%] h-[2px] z-0 pointer-events-none">
                <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 40">
                  <path
                    d="M 0,20 Q 200,-5 400,20 T 800,20 T 1000,20"
                    fill="none"
                    stroke="#701A2B"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.45"
                  />
                </svg>
              </div>

              {/* Stepper Nodes Grid */}
              <div className="grid grid-cols-6 gap-3 relative z-10">
                {journeySteps.map((step) => {
                  const Icon = step.icon;
                  const isHighlight = step.isFinalHighlight;

                  return (
                    <div
                      key={step.stepNumber}
                      className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl transition-all duration-300 ${
                        isHighlight
                          ? "bg-white/95 border border-[#E5DED4] shadow-sm relative"
                          : "hover:bg-white/50"
                      }`}
                    >
                      {/* Top Package Arch Image on Step 6 */}
                      {isHighlight && (
                        <div className="relative mb-3 w-28 h-20 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E5DED4] shadow-xs group">
                          <img
                            src="/images/delivery-box.jpg"
                            alt="Delivered Package"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-1.5 right-1.5 text-[#C5A059] animate-pulse">
                            <Sparkles className="w-3.5 h-3.5 fill-[#C5A059]" />
                          </div>
                        </div>
                      )}

                      {/* Step Icon in soft circular container */}
                      {!isHighlight && (
                        <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5DED4] text-[#701A2B] flex items-center justify-center mb-3 shadow-xs">
                          <Icon className="w-5 h-5 stroke-[1.75]" />
                        </div>
                      )}

                      {/* Checkmark Node Circle */}
                      <div className="w-6 h-6 rounded-full bg-[#701A2B] text-white flex items-center justify-center text-xs font-bold mb-2.5 shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>

                      {/* Step Title & Subtext */}
                      <h4 className="text-xs sm:text-sm font-bold text-[#181615] tracking-tight">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-[#77716A] leading-tight mt-1 max-w-[150px] min-h-[28px]">
                        {step.subtext}
                      </p>

                      {/* Date & Time with Clock Icon */}
                      <div className="mt-3 pt-2 border-t border-[#E5DED4]/60 w-full space-y-1 text-[10px] text-[#77716A]">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3 text-[#9B948C]" />
                          <span>Date: <strong>{step.date}</strong></span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3 text-[#9B948C]" />
                          <span>Time: <strong>{step.time}</strong></span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile / Tablet View (< lg): Connected Luxury Vertical Stepper */}
            <div className="lg:hidden relative pl-7 sm:pl-8 space-y-4">
              {/* Vertical Connecting Dashed Line */}
              <div className="absolute left-[11px] sm:left-[15px] top-4 bottom-6 w-[2px] border-l-2 border-dashed border-[#701A2B]/40" />

              {journeySteps.map((step) => {
                const Icon = step.icon;
                const isHighlight = step.isFinalHighlight;

                return (
                  <div key={step.stepNumber} className="relative flex items-start gap-3.5">
                    {/* Checkmark Node Circle placed on vertical line */}
                    <div className="absolute -left-7 sm:-left-8 top-3 w-6 h-6 rounded-full bg-[#701A2B] text-white flex items-center justify-center text-xs font-bold shadow-sm z-10">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    {/* Step Content Card */}
                    <div
                      className={`flex-1 p-4 rounded-2xl border transition-all ${
                        isHighlight
                          ? "bg-white border-[#E5DED4] shadow-sm"
                          : "bg-white/80 border-[#E5DED4]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E5DED4] text-[#701A2B] flex items-center justify-center shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-[#181615]">{step.title}</h4>
                          </div>
                          <p className="text-xs text-[#77716A] leading-relaxed pt-0.5">{step.subtext}</p>
                        </div>

                        {/* Highlighted image on Delivered step */}
                        {isHighlight && (
                          <div className="w-16 h-12 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E5DED4] shrink-0">
                            <img
                              src="/images/delivery-box.jpg"
                              alt="Delivered Package"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#FAF7F2] flex flex-wrap items-center gap-3 text-[10px] text-[#77716A]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#9B948C]" />
                          <span>Date: <strong>{step.date}</strong></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#9B948C]" />
                          <span>Time: <strong>{step.time}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Banner: Need Help? + Contact Support Button */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5DED4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF7F2] border border-[#E5DED4] text-[#701A2B] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#181615]">Need Help?</h4>
              <p className="text-xs text-[#77716A] mt-0.5">
                Our support team is always here for you.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg shrink-0"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Modal to Search another order number */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181615]/70 backdrop-blur-md animate-fade-in"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#701A2B]">
                  LIVE TRACKING
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#181615]">
                  Lookup Order Number
                </h3>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#E5DED4] text-[#181615] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#181615] uppercase tracking-wider mb-1.5">
                  Order ID or AWB Tracking Number
                </label>
                <input
                  type="text"
                  required
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. #DR12345 or AWB984729104IN"
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E5DED4] text-xs font-bold text-[#77716A] hover:text-[#181615]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Track Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
