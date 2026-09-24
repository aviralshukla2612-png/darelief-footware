"use client";

import React from "react";
import Link from "next/link";
import {
  Truck,
  Package,
  XCircle,
  IndianRupee,
  ShieldCheck,
  FileText,
  CreditCard,
  ChevronRight,
  ArrowRight
} from "lucide-react";

export default function PoliciesHubPage() {
  const policies = [
    {
      title: "SHIPPING POLICY",
      desc: "Information about order processing, shipping time and delivery.",
      href: "/shipping-policy",
      icon: Truck
    },
    {
      title: "RETURN & EXCHANGE POLICY",
      desc: "Easy returns and hassle-free exchanges within our policy period.",
      href: "/return-exchange",
      icon: Package
    },
    {
      title: "CANCELLATION POLICY",
      desc: "Learn about order cancellations and eligibility.",
      href: "/cancellation-policy",
      icon: XCircle
    },
    {
      title: "REFUND POLICY",
      desc: "Details on refund process, timelines and payment methods.",
      href: "/refund-policy",
      icon: IndianRupee
    },
    {
      title: "PRIVACY POLICY",
      desc: "How we collect, use and protect your personal information.",
      href: "/privacy-policy",
      icon: ShieldCheck
    },
    {
      title: "TERMS & CONDITIONS",
      desc: "Rules and guidelines for using our website and services.",
      href: "/terms",
      icon: FileText
    },
    {
      title: "PAYMENT POLICY",
      desc: "Accepted payment methods and transaction security.",
      href: "/payment-policy",
      icon: CreditCard
    }
  ];

  return (
    <div className="relative w-full bg-[#FAF7F2] min-h-screen py-10 sm:py-16 overflow-hidden border-b border-[#E5DED4]">
      {/* Background Editorial Architectural Arch & Florals at Top-Right */}
      <div className="absolute top-0 right-0 w-[550px] sm:w-[700px] h-[450px] pointer-events-none opacity-35 overflow-hidden">
        <img
          src="/images/hero/hero_studio_arch.jpg"
          alt="Studio arch background"
          className="w-full h-full object-cover object-top mask-radial"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#FAF7F2]/60 to-[#FAF7F2]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Section Matching Reference */}
        <div className="space-y-2 text-left">
          <h1 className="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#701A2B]">
            Policies
          </h1>
          <p className="text-sm sm:text-base text-[#6B655E] font-normal leading-relaxed">
            Please read our policies carefully.
          </p>
        </div>

        {/* 7 Policy Cards Grid / Stack */}
        <div className="space-y-3.5">
          {policies.map((pol) => {
            const Icon = pol.icon;
            return (
              <Link
                key={pol.title}
                href={pol.href}
                className="group flex items-center justify-between p-4.5 sm:p-5 bg-white/95 hover:bg-white rounded-2xl border border-[#E5DED4] hover:border-[#701A2B]/40 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Circular Icon Container */}
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] group-hover:bg-[#701A2B]/10 border border-[#EFE8DA] flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-[#701A2B]" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#181615] group-hover:text-[#701A2B] transition-colors">
                      {pol.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#77716A] mt-0.5 leading-relaxed">
                      {pol.desc}
                    </p>
                  </div>
                </div>

                {/* Right Arrow Chevron */}
                <div className="pl-4">
                  <ChevronRight className="w-5 h-5 text-[#9B948C] group-hover:text-[#701A2B] group-hover:translate-x-1.5 transition-all duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Support Callout Banner (Matching Screenshot 100%) */}
        <div className="relative rounded-3xl overflow-hidden border border-[#E5DED4] shadow-lg bg-[#EEE7DA] min-h-[220px]">
          {/* Stiletto Heels Editorial Photo Background */}
          <div className="absolute inset-0 right-0 w-full h-full pointer-events-none">
            <img
              src="/images/policies/banner_stilettos.jpg"
              alt="Luxury Darelief Footwear on stone pedestal"
              className="w-full h-full object-cover object-right sm:object-center"
            />
            {/* Soft Ivory Fade Gradient on Left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent sm:w-2/3" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-lg flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#77716A] mb-1.5">
              STILL HAVE QUESTIONS?
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#181615] tracking-tight">
              We’re here to <span className="text-[#701A2B]">help.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#77716A] mt-2 mb-6 max-w-sm leading-relaxed">
              Contact our support team and we’ll be happy to assist you.
            </p>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-md hover:shadow-xl group"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
