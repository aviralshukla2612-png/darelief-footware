import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Cancellation Policy | Darelief Walkwear",
  description: "Read our order cancellation guidelines and timelines."
};

export default function CancellationPolicyPage() {
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
            <h1 className="font-serif-luxury text-3xl font-bold text-[#181615] mt-1">Cancellation Policy</h1>
            <p className="text-xs text-[#77716A] mt-1">Order Modification & Cancellation Rules</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#242220] leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">1. Cancellation Prior to Dispatch</h3>
              <p>
                You may cancel your order at any time before it has been dispatched from our warehouse by visiting your <strong>My Orders</strong> hub or by messaging our WhatsApp support at +91 98765 43210.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">2. Cancellation After Dispatch</h3>
              <p>
                Once an order has been handed over to BlueDart or Delhivery with an active tracking number, it cannot be canceled in-transit. However, you can simply refuse the delivery at your doorstep or initiate our 7-day return once delivered.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
