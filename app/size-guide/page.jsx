import React from "react";
import Link from "next/link";
import { Ruler, CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Size Guide & Footwear Measurement | Darelief Walkwear",
  description: "Find your perfect size with our UK/India, US, and EU footwear conversion chart and measuring guide."
};

export default function SizeGuidePage() {
  const sizeChart = [
    { uk: "3", us: "5", eu: "36", cm: "22.5", in: "8.8" },
    { uk: "4", us: "6", eu: "37", cm: "23.0", in: "9.0" },
    { uk: "5", us: "7", eu: "38", cm: "23.8", in: "9.3" },
    { uk: "6", us: "8", eu: "39", cm: "24.5", in: "9.6" },
    { uk: "7", us: "9", eu: "40", cm: "25.2", in: "9.9" },
    { uk: "8", us: "10", eu: "41", cm: "26.0", in: "10.2" },
    { uk: "9", us: "11", eu: "42", cm: "26.7", in: "10.5" },
    { uk: "10", us: "12", eu: "43", cm: "27.5", in: "10.8" }
  ];

  return (
    <div className="w-full bg-[#FAF7F2] py-10 sm:py-16 border-b border-[#E5DED4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/policies" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#701A2B] hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Policies</span>
        </Link>

        <div className="bg-white rounded-3xl border border-[#E5DED4] p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-[#FAF7F2] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">Fitting Manual</span>
            <h1 className="font-serif-luxury text-3xl font-bold text-[#181615] mt-1">Women&apos;s Size Guide & Measurement Chart</h1>
            <p className="text-xs text-[#77716A] mt-1">Engineered specifically with extra ball-of-foot comfort for Indian feet.</p>
          </div>

          <div className="p-4 bg-[#EFE8DA]/60 rounded-2xl border border-[#E5DED4] text-xs text-[#181615] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#701A2B] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Our Fit Promise:</strong> All Darelief shoes adhere to standard Indian / UK sizing. If you wear size 6 in most Indian brands, choose size 6 with us. If you are between sizes or prefer a slightly relaxed fit, we suggest ordering 1 size up.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#E5DED4] bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF7F2] text-[#181615] font-bold border-b border-[#E5DED4] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">UK / IND</th>
                  <th className="py-3 px-4">US Size</th>
                  <th className="py-3 px-4">EU Size</th>
                  <th className="py-3 px-4">Foot Length (cm)</th>
                  <th className="py-3 px-4">Inches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF7F2] text-[#242220]">
                {sizeChart.map((row, idx) => (
                  <tr key={row.uk} className={`hover:bg-[#FAF7F2] transition-colors ${idx === 3 ? "bg-[#701A2B]/5 font-semibold text-[#701A2B]" : ""}`}>
                    <td className="py-3 px-4 font-bold">{row.uk}</td>
                    <td className="py-3 px-4">{row.us}</td>
                    <td className="py-3 px-4">{row.eu}</td>
                    <td className="py-3 px-4">{row.cm} cm</td>
                    <td className="py-3 px-4">{row.in}&quot;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Guide */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#181615]">
              How to Measure Foot Length at Home
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E5DED4]">
                <strong className="block text-[#701A2B] mb-1">Step 1</strong>
                <p className="text-[#77716A]">Place a paper sheet on a hard floor flush against a wall.</p>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E5DED4]">
                <strong className="block text-[#701A2B] mb-1">Step 2</strong>
                <p className="text-[#77716A]">Step on the sheet with heel against the wall and mark the longest toe.</p>
              </div>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E5DED4]">
                <strong className="block text-[#701A2B] mb-1">Step 3</strong>
                <p className="text-[#77716A]">Measure distance in cm and compare with our UK conversion table above.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
