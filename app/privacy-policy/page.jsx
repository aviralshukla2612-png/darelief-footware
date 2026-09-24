import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Darelief Walkwear",
  description: "Learn how we protect and handle your personal shopping data."
};

export default function PrivacyPolicyPage() {
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
            <h1 className="font-serif-luxury text-3xl font-bold text-[#181615] mt-1">Privacy Policy</h1>
            <p className="text-xs text-[#77716A] mt-1">Your Privacy is Sacred to Us</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#242220] leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">1. Data Collection</h3>
              <p>
                We only collect necessary customer information such as your name, shipping address, contact phone number, and email to process footwear orders, provide order tracking updates, and deliver concierge customer support.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">2. Payment Security</h3>
              <p>
                We do not store your credit card numbers or banking passwords on our servers. All transactions are routed through PCI-DSS Level 1 compliant secure payment gateways.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
