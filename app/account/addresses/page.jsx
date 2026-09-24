"use client";

import React, { useState } from "react";
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, X } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { useUI } from "@/context/UIContext";

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUI();
  const [modalMode, setModalMode] = useState(null); // "add" | "edit" | null
  const [activeAddr, setActiveAddr] = useState(null);

  const initialForm = {
    tag: "HOME",
    fullName: "Neha Sharma",
    phone: "+91 98765 43210",
    street: "",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380001",
    isDefault: false
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setModalMode("add");
  };

  const handleOpenEdit = (addr) => {
    setActiveAddr(addr);
    setFormData(addr);
    setModalMode("edit");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      addAddress(formData);
    } else if (modalMode === "edit" && activeAddr) {
      updateAddress(activeAddr.id, formData);
    }
    setModalMode(null);
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="pb-4 border-b border-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
              Address Book
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#181615]">
              My Addresses ({addresses.length})
            </h1>
            <p className="text-xs text-[#77716A] mt-0.5">
              Manage your delivery locations for faster 1-click checkout.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-5 rounded-2xl border-2 transition-all bg-[#FAF7F2] flex flex-col justify-between space-y-4 ${
                addr.isDefault ? "border-[#701A2B] bg-[#701A2B]/5 shadow-xs" : "border-[#E5DED4]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-white border border-[#E5DED4] text-[#181615]">
                    {addr.tag}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-[#701A2B] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Default Delivery</span>
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-[#181615]">{addr.fullName}</h3>
                <p className="text-xs text-[#77716A] mt-1 leading-relaxed">
                  {addr.street}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                </p>
                <p className="text-xs text-[#181615] font-semibold mt-2">{addr.phone}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E5DED4] flex items-center justify-between text-xs">
                {!addr.isDefault ? (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-xs font-bold text-[#701A2B] hover:underline"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-[11px] text-[#77716A]">Primary Address</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="p-1.5 text-[#77716A] hover:text-[#181615] hover:bg-white rounded-lg transition-colors"
                    title="Edit address"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this address?")) deleteAddress(addr.id);
                    }}
                    className="p-1.5 text-[#77716A] hover:text-[#C62828] hover:bg-white rounded-lg transition-colors"
                    title="Delete address"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Address Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#181615]/70 backdrop-blur-sm"
            onClick={() => setModalMode(null)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E5DED4] overflow-hidden z-10 animate-fade-in p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
              <h3 className="font-serif-luxury text-xl font-bold text-[#181615]">
                {modalMode === "add" ? "Add New Address" : "Edit Address"}
              </h3>
              <button onClick={() => setModalMode(null)} className="p-1 text-[#77716A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="flex gap-2">
                {["HOME", "OFFICE", "OTHER"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setFormData({ ...formData, tag })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      formData.tag === tag
                        ? "bg-[#701A2B] text-white border-[#701A2B]"
                        : "border-[#E5DED4] text-[#77716A]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#77716A] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#77716A] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#77716A] mb-1">Flat / Building / Street Address</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="e.g. Flat 301, Silver Oak Apartments, CG Road"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#77716A] mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#77716A] mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#77716A] mb-1">PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#FAF7F2] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 border border-[#E5DED4] rounded-lg font-semibold text-[#77716A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-lg font-bold uppercase tracking-wider"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
