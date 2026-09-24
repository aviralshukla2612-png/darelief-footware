"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  RotateCcw,
  ArrowLeft,
  Package
} from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { useUI } from "@/context/UIContext";

export default function OrderDetailPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { orders } = useUI();

  const order = orders.find((o) => o.id === id || o.orderNumber.replace("#", "") === id) || orders[0];

  if (!order) {
    return (
      <AccountLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-bold">Order Not Found</h2>
          <Link href="/account/orders" className="text-[#701A2B] underline mt-3 inline-block">
            Back to Orders
          </Link>
        </div>
      </AccountLayout>
    );
  }

  const timelineSteps = order.timeline || [
    { title: "Order Placed", date: "18 May 2024, 10:30 AM", completed: true, desc: "Your order was received." },
    { title: "Confirmed", date: "18 May 2024, 11:15 AM", completed: true, desc: "Payment received." },
    { title: "Packed", date: "19 May 2024, 02:45 PM", completed: true, desc: "Quality checked." },
    { title: "Shipped", date: "19 May 2024, 07:00 PM", completed: true, desc: "Dispatched." },
    { title: "Out for Delivery", date: "21 May 2024, 08:30 AM", completed: order.status === "Delivered", desc: "Out on route." },
    { title: "Delivered", date: "21 May 2024, 01:15 PM", completed: order.status === "Delivered", desc: "Handed over." }
  ];

  return (
    <AccountLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <Link
              href="/account/orders"
              className="p-2 bg-[#FAF7F2] hover:bg-[#EFE8DA] rounded-full text-[#181615]"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#701A2B]">
                Order Details
              </span>
              <h1 className="font-serif-luxury text-2xl font-bold text-[#181615]">
                {order.orderNumber}
              </h1>
            </div>
          </div>

          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#2E7D32]/10 text-[#2E7D32]">
            {order.status}
          </span>
        </div>

        {/* 6-Stage Timeline Stepper */}
        <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-[#E5DED4] space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#701A2B]" />
            <span>Shipment Timeline (BlueDart Tracking: {order.trackingNumber || "AWB984729104IN"})</span>
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5DED4]">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    step.completed
                      ? "bg-[#701A2B] border-[#701A2B] text-white"
                      : "bg-white border-[#E5DED4] text-[#9B948C]"
                  }`}
                >
                  {step.completed ? "✓" : idx + 1}
                </div>

                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-bold ${step.completed ? "text-[#181615]" : "text-[#77716A]"}`}>
                      {step.title}
                    </h4>
                    <span className="text-[10px] text-[#77716A]">({step.date})</span>
                  </div>
                  <p className="text-[#77716A] text-[11px] mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items & Shipping Address Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Items */}
          <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E5DED4] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615]">
              Items In This Order
            </h3>
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#E5DED4]">
                <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-lg border border-[#E5DED4]" />
                <div className="flex-1 text-xs">
                  <p className="font-bold text-[#181615]">{item.name}</p>
                  <p className="text-[#77716A]">{item.color} • Size {item.size} • Qty {item.quantity}</p>
                  <p className="font-bold text-[#181615] mt-0.5">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Payment Info */}
          <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E5DED4] space-y-4 text-xs">
            <div>
              <h3 className="font-bold uppercase tracking-wider text-[#181615] mb-1">
                Delivery Address
              </h3>
              <p className="font-bold text-[#181615]">{order.shippingAddress?.fullName || "Neha Sharma"}</p>
              <p className="text-[#77716A]">
                {order.shippingAddress?.street}, {order.shippingAddress?.city} - {order.shippingAddress?.pincode}
              </p>
              <p className="text-[#181615] mt-1">{order.shippingAddress?.phone}</p>
            </div>

            <div className="pt-3 border-t border-[#E5DED4]">
              <h3 className="font-bold uppercase tracking-wider text-[#181615] mb-1">
                Payment Breakdown
              </h3>
              <div className="space-y-1 text-[#77716A]">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-bold text-[#181615]">{order.paymentMethod || "UPI"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount Paid:</span>
                  <span className="font-bold text-[#701A2B]">₹{order.totalAmount?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
