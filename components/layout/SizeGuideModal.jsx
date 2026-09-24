"use client";

import React from "react";
import { X, Ruler, CheckCircle2 } from "lucide-react";
import { useUI } from "@/context/UIContext";

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useUI();

  if (!isSizeGuideOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#181615]/70 backdrop-blur-sm"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E5DED4] overflow-hidden z-10 animate-fade-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#E5DED4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#701A2B]" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#181615]">
              Women&apos;s Footwear Size Guide
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 rounded-full text-[#77716A] hover:bg-[#FAF7F2] hover:text-[#181615]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-3.5 bg-[#EFE8DA]/60 rounded-xl border border-[#E5DED4] text-xs text-[#181615] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#701A2B] shrink-0 mt-0.5" />
            <span>
              <strong>Darelief Fit Promise:</strong> All our shoes use standard Indian (UK/IND) sizing. If you usually wear a UK 6, choose size 6. If you have broad feet or fall between sizes, we recommend sizing up.
            </span>
          </div>

          {/* Size Conversion Table */}
          <div className="overflow-x-auto rounded-xl border border-[#E5DED4] bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF7F2] text-[#181615] font-bold border-b border-[#E5DED4] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">UK / IND</th>
                  <th className="py-2.5 px-3">US Size</th>
                  <th className="py-2.5 px-3">EU Size</th>
                  <th className="py-2.5 px-3">Foot Length (cm)</th>
                  <th className="py-2.5 px-3">Inches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF7F2] text-[#242220]">
                {sizeChart.map((row, idx) => (
                  <tr
                    key={row.uk}
                    className={`hover:bg-[#FAF7F2] transition-colors ${
                      idx === 3 ? "bg-[#701A2B]/5 font-semibold text-[#701A2B]" : ""
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold">{row.uk}</td>
                    <td className="py-2.5 px-3">{row.us}</td>
                    <td className="py-2.5 px-3">{row.eu}</td>
                    <td className="py-2.5 px-3">{row.cm} cm</td>
                    <td className="py-2.5 px-3">{row.in}&quot;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#181615]">
              How To Measure Your Feet
            </h4>
            <ol className="text-xs text-[#77716A] space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Place a blank sheet of paper against a wall on a flat floor.</li>
              <li>Stand on the paper with your heel lightly touching the wall.</li>
              <li>Mark the tip of your longest toe with a pencil held perpendicular.</li>
              <li>Measure the distance from the paper edge to the pencil mark in centimeters.</li>
              <li>Match with our chart above!</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5DED4] bg-white flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-5 py-2 bg-[#181615] text-white rounded-xl text-xs font-semibold hover:bg-[#701A2B] transition-colors"
          >
            Got It, Close
          </button>
        </div>
      </div>
    </div>
  );
}
