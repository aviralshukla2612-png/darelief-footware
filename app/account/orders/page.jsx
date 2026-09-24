"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  ChevronRight,
  Eye,
  AlertCircle,
  X
} from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { useUI } from "@/context/UIContext";

export default function OrdersPage() {
  const { orders } = useUI();
  const [returnModalOrder, setReturnModalOrder] = useState(null);
  const [returnReason, setReturnReason] = useState("size_issue");
  const [returnType, setReturnType] = useState("exchange"); // exchange | refund
  const [returnSubmitted, setReturnSubmitted] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState(false);

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    setReturnSubmitted(true);
    setTimeout(() => {
      setReturnSubmitted(false);
      setReturnSuccess(true);
    }, 1200);
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b border-[#FAF7F2]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
            Order History
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#181615]">
            My Orders ({orders.length})
          </h1>
          <p className="text-xs text-[#77716A] mt-0.5">
            Check real-time order shipment status, invoices, or request easy 7-day doorstep exchanges.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-[#77716A]">You haven&apos;t placed any orders yet.</p>
            <Link
              href="/new-arrivals"
              className="inline-block mt-4 px-6 py-2.5 bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FAF7F2] rounded-2xl border border-[#E5DED4] p-5 sm:p-6 space-y-4 shadow-xs"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5DED4] text-xs">
                  <div>
                    <span className="font-bold text-[#181615] text-sm">
                      Order {order.orderNumber}
                    </span>
                    <p className="text-[#77716A] text-[11px] mt-0.5">Placed on {order.date}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        order.status === "Delivered"
                          ? "bg-[#2E7D32]/10 text-[#2E7D32]"
                          : order.status === "Shipped"
                          ? "bg-[#C5A059]/15 text-[#856404]"
                          : "bg-[#701A2B]/10 text-[#701A2B]"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{order.status}</span>
                    </span>

                    <span className="font-bold text-sm text-[#181615]">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white p-3 rounded-xl border border-[#E5DED4]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-18 sm:w-20 sm:h-20 object-cover rounded-lg border border-[#E5DED4] shrink-0"
                      />
                      <div className="flex-1 text-xs">
                        <h4 className="font-bold text-[#181615] sm:text-sm">{item.name}</h4>
                        <p className="text-[#77716A] mt-0.5">
                          Color: <strong className="text-[#181615]">{item.color}</strong> • Size:{" "}
                          <strong className="text-[#181615]">UK {item.size}</strong> • Qty:{" "}
                          <strong>{item.quantity}</strong>
                        </p>
                        <p className="font-bold text-[#181615] mt-1">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5DED4]">
                  <div className="text-xs text-[#77716A]">
                    {order.courierName && (
                      <span>
                        Courier: <strong>{order.courierName}</strong> (Tracking #{order.trackingNumber})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReturnModalOrder(order)}
                      className="px-4 py-2 border border-[#E5DED4] hover:border-[#701A2B] bg-white text-[#181615] hover:text-[#701A2B] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#701A2B]" />
                      <span>Return / Exchange</span>
                    </button>

                    <Link
                      href={`/account/orders/${order.id}`}
                      className="px-4 py-2 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RETURN & EXCHANGE SIMULATION MODAL */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#181615]/70 backdrop-blur-sm"
            onClick={() => setReturnModalOrder(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E5DED4] overflow-hidden z-10 animate-fade-in p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#701A2B]">
                  Easy 7-Day Guarantee
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#181615]">
                  Return or Exchange Request
                </h3>
                <p className="text-xs text-[#77716A]">Order {returnModalOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setReturnModalOrder(null)}
                className="p-1 rounded-full text-[#77716A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {returnSuccess ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#701A2B]/10 border border-[#701A2B]/20 text-[#701A2B] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#701A2B]" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif-luxury text-2xl font-bold text-[#181615]">Request Recorded!</h4>
                  <p className="text-xs text-[#77716A] max-w-sm mx-auto leading-relaxed">
                    Return/Exchange request for order <strong className="text-[#181615]">{returnModalOrder?.orderNumber}</strong> has been logged! Our courier partner will contact you for door-to-door verification.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setReturnModalOrder(null);
                    setReturnSuccess(false);
                  }}
                  className="w-full py-3 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-4 text-xs">
                {/* Request Type */}
                <div>
                  <label className="block font-bold text-[#181615] uppercase tracking-wider mb-1.5">
                    Request Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setReturnType("exchange")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        returnType === "exchange"
                          ? "border-[#701A2B] bg-[#701A2B]/10 text-[#701A2B]"
                          : "border-[#E5DED4] text-[#77716A]"
                      }`}
                    >
                      Request Size Exchange
                    </button>
                    <button
                      type="button"
                      onClick={() => setReturnType("refund")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        returnType === "refund"
                          ? "border-[#701A2B] bg-[#701A2B]/10 text-[#701A2B]"
                          : "border-[#E5DED4] text-[#77716A]"
                      }`}
                    >
                      Return & Refund
                    </button>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block font-bold text-[#181615] uppercase tracking-wider mb-1.5">
                    Reason For Return
                  </label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                  >
                    <option value="size_issue">Size does not fit (Need bigger / smaller size)</option>
                    <option value="color_pref">Color differs slightly from display</option>
                    <option value="damaged">Quality / Stitching defect noticed</option>
                    <option value="wrong_item">Received wrong style</option>
                    <option value="changed_mind">Changed my mind</option>
                  </select>
                </div>

                {/* Pickup Address Confirmation */}
                <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DED4]">
                  <p className="font-bold text-[#181615] mb-1">Doorstep Pickup Address</p>
                  <p className="text-[#77716A]">
                    {returnModalOrder.shippingAddress?.street},{" "}
                    {returnModalOrder.shippingAddress?.city} -{" "}
                    {returnModalOrder.shippingAddress?.pincode}
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setReturnModalOrder(null)}
                    className="px-4 py-2.5 border border-[#E5DED4] rounded-xl font-semibold text-[#77716A]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={returnSubmitted}
                    className="px-6 py-2.5 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl font-bold uppercase tracking-wider transition-colors"
                  >
                    {returnSubmitted ? "Processing..." : "Submit Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
