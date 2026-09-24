"use client";

import React, { useState } from "react";
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, X, AlertTriangle } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { useUI } from "@/context/UIContext";

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUI();
  const [modalMode, setModalMode] = useState(null); // "add" | "edit" | null
  const [activeAddr, setActiveAddr] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [successModal, setSuccessModal] = useState(null); // { title, message, tag } | null

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
    const isEdit = modalMode === "edit";
    if (modalMode === "add") {
      addAddress(formData);
    } else if (modalMode === "edit" && activeAddr) {
      updateAddress(activeAddr.id, formData);
    }
    setModalMode(null);
    setSuccessModal({
      type: isEdit ? "edit" : "add",
      title: isEdit ? "Address Updated Successfully!" : "Address Added Successfully!",
      message: `Your delivery address details for "${formData.fullName} (${formData.tag})" have been updated in your address book.`
    });
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteAddress(deleteTargetId);
      setDeleteTargetId(null);
      setSuccessModal({
        type: "delete",
        title: "Address Deleted Successfully",
        message: "The delivery address has been removed from your saved address book."
      });
    }
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
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
                    className="text-xs font-bold text-[#701A2B] hover:underline cursor-pointer"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-[11px] text-[#77716A]">Primary Address</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="p-1.5 text-[#77716A] hover:text-[#181615] hover:bg-white rounded-lg transition-colors cursor-pointer"
                    title="Edit address"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(addr.id)}
                    className="p-1.5 text-[#77716A] hover:text-[#C62828] hover:bg-white rounded-lg transition-colors cursor-pointer"
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
              <button onClick={() => setModalMode(null)} className="p-1 text-[#77716A] cursor-pointer">
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
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
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
                  className="px-4 py-2 border border-[#E5DED4] rounded-lg font-semibold text-[#77716A] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-lg font-bold uppercase tracking-wider cursor-pointer"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Premium Centered Delete Address Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="fixed inset-0 bg-[#181615]/65 backdrop-blur-md"
            onClick={() => setDeleteTargetId(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl border border-[#E5DED4] p-8 text-center shadow-2xl space-y-5 animate-scale-up">
            <button
              onClick={() => setDeleteTargetId(null)}
              className="absolute top-4 right-4 p-2 text-[#77716A] hover:text-[#181615] hover:bg-[#FAF7F2] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#C62828]/10 border border-[#C62828]/20 text-[#C62828] mx-auto flex items-center justify-center shadow-inner">
              <Trash2 className="w-7 h-7 text-[#C62828]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C62828]">
                DELETE ADDRESS
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#181615]">
                Remove Address?
              </h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed">
                Are you sure you want to permanently delete this address from your saved address book?
              </p>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="w-full py-3 bg-[#FAF7F2] hover:bg-[#EFE8DA] text-[#181615] border border-[#E5DED4] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-full py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Centered Action Confirmation Success Modal */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="fixed inset-0 bg-[#181615]/65 backdrop-blur-md"
            onClick={() => setSuccessModal(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl border border-[#E5DED4] p-8 text-center shadow-2xl space-y-5 animate-scale-up">
            <button
              onClick={() => setSuccessModal(null)}
              className="absolute top-4 right-4 p-2 text-[#77716A] hover:text-[#181615] hover:bg-[#FAF7F2] rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Circular Icon (Green check for edit/add, maroon/neutral for delete) */}
            <div
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-inner ${
                successModal.type === "delete"
                  ? "bg-[#701A2B]/10 border border-[#701A2B]/20 text-[#701A2B]"
                  : "bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32]"
              }`}
            >
              {successModal.type === "delete" ? (
                <Trash2 className="w-7 h-7 stroke-[2]" />
              ) : (
                <CheckCircle2 className="w-8 h-8 stroke-[2]" />
              )}
            </div>

            <div className="space-y-2">
              <span
                className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
                  successModal.type === "delete" ? "text-[#701A2B]" : "text-[#2E7D32]"
                }`}
              >
                {successModal.type === "delete" ? "ADDRESS REMOVED" : "ADDRESS BOOK UPDATED"}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#181615]">
                {successModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#77716A] leading-relaxed pt-1">
                {successModal.message}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSuccessModal(null)}
                className="w-full py-3.5 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
