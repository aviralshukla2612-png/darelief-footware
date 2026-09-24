import React from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, Lock, QrCode, Banknote } from "lucide-react";

export const metadata = {
  title: "Payment Policy | Darelief Walkwear",
  description: "Secure payment options and policies for Darelief Walkwear orders."
};

export default function PaymentPolicyPage() {
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
            <h1 className="font-serif-luxury text-3xl font-bold text-[#181615] mt-1">Payment Policy</h1>
            <p className="text-xs text-[#77716A] mt-1">100% Encrypted & Safe Transaction Processing</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#242220] leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">1. Accepted Payment Methods</h3>
              <p>We accept all major electronic and physical payment options in Indian Rupees (INR):</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DED4]">
                  <strong>UPI:</strong> Google Pay, PhonePe, Paytm, BHIM, Cred, Amazon Pay.
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DED4]">
                  <strong>Credit & Debit Cards:</strong> Visa, MasterCard, RuPay, American Express.
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DED4]">
                  <strong>Net Banking:</strong> All major Indian banks (HDFC, ICICI, SBI, Axis, Kotak).
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DED4]">
                  <strong>Cash on Delivery (COD):</strong> Pay at your doorstep via cash or dynamic UPI QR.
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
