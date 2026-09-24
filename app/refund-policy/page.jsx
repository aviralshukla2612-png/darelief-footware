import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Refund Policy | Darelief Walkwear",
  description: "Read about our prompt refund processing times and payment reversal terms."
};

export default function RefundPolicyPage() {
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
            <h1 className="font-serif-luxury text-3xl font-bold text-[#181615] mt-1">Refund Policy</h1>
            <p className="text-xs text-[#77716A] mt-1">Prompt & Transparent Payment Reversals</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#242220] leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">1. Quality Inspection & Refund Approval</h3>
              <p>
                Once your returned pair is received at our facility and passes a simple quality check (unworn, original box intact), the full refund amount is initiated within <strong>24 business hours</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">2. Mode of Refund & Timelines</h3>
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DED4] space-y-2 text-xs">
                <p>• <strong>Prepaid Orders (UPI, Netbanking, Cards):</strong> Refund is credited directly back to the original payment source within 3 to 5 business days.</p>
                <p>• <strong>Cash on Delivery (COD) Orders:</strong> Refund is transferred via instant IMPS bank transfer or UPI ID provided by the customer.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
