import React from "react";
import Link from "next/link";
import { Truck, CheckCircle2, ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Shipping Policy | Darelief Walkwear",
  description: "Read about our express shipping timelines, delivery coverage, and order tracking across India."
};

export default function ShippingPolicyPage() {
  return (
    <div className="w-full bg-[#FAF7F2] py-10 sm:py-16 border-b border-[#E5DED4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/policies" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#701A2B] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Policies</span>
        </Link>

        <div className="bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#FAF7F2] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">Policy Document</span>
            <h1 className="font-serif-luxury text-3xl font-bold text-[#181615] mt-1">Shipping & Delivery Policy</h1>
            <p className="text-xs text-[#77716A] mt-1">Last Updated: May 2024</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#242220] leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">1. Free Shipping Threshold</h3>
              <p>
                We provide <strong>FREE express shipping</strong> on all orders with a cart value of ₹999 or above across all valid postal codes in India. For orders below ₹999, a nominal standard shipping fee of ₹99 is applied at checkout.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">2. Processing & Dispatch Timelines</h3>
              <p>
                All orders placed before 1:00 PM IST on working days (Monday to Saturday) are packed, quality-inspected, and dispatched on the same business day from our Mumbai and Bengaluru fulfillment hubs.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">3. Delivery Estimates by Region</h3>
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DED4] space-y-2 text-xs">
                <p>• <strong>Metro Cities (Delhi-NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, Pune):</strong> 2 to 3 Business Days.</p>
                <p>• <strong>Tier 2 & Tier 3 Cities:</strong> 3 to 5 Business Days.</p>
                <p>• <strong>North-East & Remote Regions:</strong> 5 to 7 Business Days.</p>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">4. Courier Partners & Real-Time Tracking</h3>
              <p>
                We ship exclusively through premier express logistics providers including BlueDart, Delhivery, and DTDC. You will receive an SMS and WhatsApp update containing your live AWB tracking link as soon as your footwear is dispatched.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
