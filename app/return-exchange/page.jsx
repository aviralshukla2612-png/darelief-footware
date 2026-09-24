"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RotateCcw, CheckCircle2, ShieldCheck, ArrowLeft, ArrowRight, HelpCircle, X } from "lucide-react";

export default function ReturnExchangePolicyPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [requestType, setRequestType] = useState("size_exchange");
  const [desiredSize, setDesiredSize] = useState("7");
  const [reason, setReason] = useState("Too tight around the toes");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setSubmittedOrder(orderNumber || "#DR98241");
      setIsSubmitted(false);
      setShowModal(true);
      setOrderNumber("");
    }, 1000);
  };

  return (
    <div className="w-full bg-[#FAF7F2] py-10 sm:py-16 border-b border-[#E5DED4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link href="/policies" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#701A2B] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Policies</span>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="border-b border-[#FAF7F2] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">Customer Guarantee</span>
            <h1 className="font-serif-luxury text-3xl font-bold text-[#181615] mt-1">7-Day Return & Exchange Policy</h1>
            <p className="text-xs text-[#77716A] mt-1">Simple, Transparent & Hassle-Free Doorstep Service</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#242220] leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">1. Eligibility & 7-Day Window</h3>
              <p>
                We offer a <strong>7-day hassle-free doorstep return & exchange guarantee</strong> starting from the date of package delivery. The footwear must be unworn, in its original pristine condition, and returned in the authentic Darelief shoe box with all accompanying tags and dust bags intact.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">2. Free Size Exchanges</h3>
              <p>
                Found that your shoes are a size too snug or too roomy? We provide <strong>100% complimentary first-time size exchanges</strong>. Our courier partner will deliver the new size and collect the previous pair simultaneously at your doorstep!
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-base text-[#181615]">3. Reverse Pickup Process</h3>
              <p>
                Once you initiate a return or exchange request below, our logistics partner (BlueDart / Delhivery) will arrange a reverse pickup from your registered address within 24 to 48 hours.
              </p>
            </section>
          </div>
        </div>

        {/* Interactive Self-Service Request Form */}
        <div className="bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-[#FAF7F2] pb-3">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#181615] flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#701A2B]" />
              <span>Initiate Return or Size Exchange Request</span>
            </h2>
            <p className="text-xs text-[#77716A] mt-1">Enter your order details below for automated instant authorization.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#181615] uppercase tracking-wider mb-1">
                  Order ID*
                </label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. #DR12345"
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs focus:outline-none focus:border-[#701A2B]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#181615] uppercase tracking-wider mb-1">
                  Registered Phone Number*
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 XXXXX"
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs focus:outline-none focus:border-[#701A2B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#181615] uppercase tracking-wider mb-1">
                  Request Action*
                </label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs focus:outline-none focus:border-[#701A2B]"
                >
                  <option value="size_exchange">Exchange Size (Complimentary)</option>
                  <option value="color_exchange">Exchange Color Variant</option>
                  <option value="refund">Return & Full Refund</option>
                </select>
              </div>

              {requestType.includes("exchange") && (
                <div>
                  <label className="block font-bold text-[#181615] uppercase tracking-wider mb-1">
                    New Desired Size (IND/UK)
                  </label>
                  <select
                    value={desiredSize}
                    onChange={(e) => setDesiredSize(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs focus:outline-none focus:border-[#701A2B]"
                  >
                    {[3, 4, 5, 6, 7, 8, 9, 10].map((sz) => (
                      <option key={sz} value={sz}>
                        Size UK {sz}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block font-bold text-[#181615] uppercase tracking-wider mb-1">
                Reason For Request
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs focus:outline-none focus:border-[#701A2B] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full py-4 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl font-bold uppercase tracking-widest transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isSubmitted ? "Authorizing Request..." : "SUBMIT RETURN / EXCHANGE REQUEST"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Premium Centered Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="fixed inset-0 bg-[#181615]/65 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />

          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl border border-[#E5DED4] p-8 sm:p-10 text-center shadow-2xl space-y-5">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-[#77716A] hover:text-[#181615] hover:bg-[#FAF7F2] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#701A2B]/10 border border-[#701A2B]/20 text-[#701A2B] mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-[#701A2B]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#701A2B]">
                REQUEST CONFIRMED
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#181615]">
                Pickup Scheduled
              </h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
                Return/Exchange request for Order <strong className="text-[#181615]">{submittedOrder}</strong> has been authorized. BlueDart express reverse pickup has been scheduled at your doorstep within 24–48 hours!
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3.5 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md cursor-pointer"
            >
              Close & Track
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
