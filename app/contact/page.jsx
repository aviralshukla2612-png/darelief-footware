"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  MapPin,
  Headphones,
  X,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowSuccessModal(true);
      setFormData({ name: "", email: "", phone: "", orderNumber: "", message: "" });
    }, 800);
  };

  return (
    <div className="relative w-full bg-[#FAF7F2] py-10 sm:py-16 border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#77716A] mb-8 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#701A2B]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#181615] font-semibold">Contact Us</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
                CONTACT US
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181615] mt-1 leading-tight">
                WE&apos;RE HERE TO HELP!
              </h1>
              <p className="text-xs sm:text-sm text-[#77716A] mt-2 leading-relaxed">
                Have a question about your order, sizing recommendations, or exchange requests? We&apos;d love to hear from you.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-4 pt-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E5DED4] hover:border-[#701A2B] shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#181615] group-hover:text-[#701A2B]">
                    WHATSAPP US
                  </h4>
                  <p className="text-xs font-bold text-[#181615] mt-0.5">+91 98765 43210</p>
                  <p className="text-[10px] text-[#77716A]">Instant response within 15 mins</p>
                </div>
              </a>

              {/* Phone Call */}
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E5DED4] hover:border-[#701A2B] shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#701A2B]/10 text-[#701A2B] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#181615] group-hover:text-[#701A2B]">
                    CALL US
                  </h4>
                  <p className="text-xs font-bold text-[#181615] mt-0.5">+91 98765 43210</p>
                  <p className="text-[10px] text-[#77716A]">Mon - Sat (10:00 AM - 7:00 PM IST)</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:support@dareliefwalkwear.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E5DED4] hover:border-[#701A2B] shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C5A059]/15 text-[#856404] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#181615] group-hover:text-[#701A2B]">
                    EMAIL US
                  </h4>
                  <p className="text-xs font-bold text-[#181615] mt-0.5">
                    support@dareliefwalkwear.com
                  </p>
                  <p className="text-[10px] text-[#77716A]">Response within 24 business hours</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DED4] shadow-sm">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#181615] mb-2">
              Send Us A Direct Message
            </h3>
            <p className="text-xs text-[#77716A] mb-6">
              Fill out the form below and our footwear concierge will get back to you promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#181615] mb-1.5">
                    Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#181615] mb-1.5">
                    Email*
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#181615] mb-1.5">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 XXXXX"
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#181615] mb-1.5">
                    Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    placeholder="e.g. #DR12345"
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#181615] mb-1.5">
                  How can we help you?*
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message, sizing query, or feedback here..."
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5DED4] rounded-xl text-xs text-[#181615] focus:outline-none focus:border-[#701A2B] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full py-4 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitted ? "Sending Message..." : "SEND MESSAGE"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Premium Centered Modal Dialog Popup */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          {/* Frosted Dark Backdrop */}
          <div
            className="fixed inset-0 bg-[#181615]/65 backdrop-blur-md transition-opacity"
            onClick={() => setShowSuccessModal(false)}
          />

          {/* Luxury Modal Container */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl border border-[#E5DED4] p-8 sm:p-10 text-center shadow-2xl space-y-5 animate-scale-up">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-2 text-[#77716A] hover:text-[#181615] hover:bg-[#FAF7F2] rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Circular Luxury Checkmark Icon */}
            <div className="w-16 h-16 rounded-full bg-[#701A2B]/10 border border-[#701A2B]/20 text-[#701A2B] mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-[#701A2B]" />
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#701A2B]">
                CONFIRMATION
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#181615]">
                Message Sent!
              </h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed pt-1">
                Thank you! Your message has been safely received by our concierge team. We will review your query and respond within <strong className="text-[#181615]">24 business hours</strong>.
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3.5 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
              >
                Okay, Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
