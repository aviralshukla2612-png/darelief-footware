import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Darelief Walkwear",
  description: "Terms and conditions of use for Darelief Walkwear digital boutique."
};

export default function TermsPage() {
  return (
    <div className="w-full bg-[#FAF7F2] py-10 sm:py-16 border-b border-[#E5DED4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/policies" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#701A2B] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Policies</span>
        </Link>

        <div className="bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#FAF7F2] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">Legal Document</span>
            <h1 className="font-serif-luxury text-3xl font-bold text-[#181615] mt-1">Terms & Conditions</h1>
            <p className="text-xs text-[#77716A] mt-1">Website Usage & Purchase Agreement</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#242220] leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">1. General Terms</h3>
              <p>
                By accessing and placing an order with Darelief Walkwear, you agree to be bound by these terms. We reserve the right to revise prices, product descriptions, and promotional codes without prior notice.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">2. Product Authenticity & Intellectual Property</h3>
              <p>
                All designs, logos, CloudStep™ footwear trademarks, imagery, and 3D digital renderings are the exclusive intellectual property of Darelief Walkwear Pvt. Ltd.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
