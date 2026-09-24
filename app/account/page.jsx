"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, ShoppingBag, MapPin, Edit3, ArrowRight, CheckCircle2 } from "lucide-react";
import AccountLayout from "@/components/account/AccountLayout";
import { useUI } from "@/context/UIContext";

export default function AccountOverviewPage() {
  const { userProfile, updateProfile, orders, addresses } = useUI();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const latestOrder = orders[0];
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

  return (
    <AccountLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FAF7F2]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
              Welcome Back
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#181615]">
              {userProfile.name}
            </h1>
            <p className="text-xs text-[#77716A] mt-0.5">
              Manage your personal details, recent footwear orders, and saved addresses.
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E5DED4] hover:border-[#701A2B] rounded-xl text-xs font-bold text-[#181615] hover:text-[#701A2B] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3.5 bg-[#2E7D32]/10 border border-[#2E7D32]/20 rounded-xl text-xs text-[#2E7D32] flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile information updated successfully.</span>
          </div>
        )}

        {/* Profile Edit Form or Overview Cards */}
        {isEditing ? (
          <form onSubmit={handleSave} className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E5DED4] space-y-4 max-w-xl animate-fade-in">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615]">
              Update Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#77716A] mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5DED4] rounded-lg text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#77716A] mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5DED4] rounded-lg text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#77716A] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5DED4] rounded-lg text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#77716A] mb-1">Alternate Phone</label>
                <input
                  type="text"
                  value={formData.alternatePhone || ""}
                  onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5DED4] rounded-lg text-xs text-[#181615] focus:outline-none focus:border-[#701A2B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-[#E5DED4] rounded-lg text-xs font-semibold text-[#77716A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#701A2B] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#8E2337]"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Orders Overview Card */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DED4] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#181615] flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#701A2B]" />
                  <span>Orders ({orders.length})</span>
                </span>
                <Link
                  href="/account/orders"
                  className="text-xs font-semibold text-[#701A2B] hover:underline"
                >
                  View All
                </Link>
              </div>

              {latestOrder ? (
                <div className="bg-white p-4 rounded-xl border border-[#E5DED4] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#181615]">
                      Latest Order {latestOrder.orderNumber}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#2E7D32]/10 text-[#2E7D32]">
                      {latestOrder.status}
                    </span>
                  </div>
                  <p className="text-[#77716A]">Placed on {latestOrder.date} • ₹{latestOrder.totalAmount}</p>
                  <div className="pt-2">
                    <Link
                      href={`/account/orders/${latestOrder.id}`}
                      className="text-[#701A2B] font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>Track Shipment Status</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#77716A]">No orders placed yet.</p>
              )}
            </div>

            {/* Saved Address Overview Card */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DED4] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#181615] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#701A2B]" />
                  <span>Default Address</span>
                </span>
                <Link
                  href="/account/addresses"
                  className="text-xs font-semibold text-[#701A2B] hover:underline"
                >
                  Manage ({addresses.length})
                </Link>
              </div>

              {defaultAddress ? (
                <div className="bg-white p-4 rounded-xl border border-[#E5DED4] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#181615]">{defaultAddress.fullName}</span>
                    <span className="text-[10px] font-bold text-[#701A2B] bg-[#701A2B]/10 px-2 py-0.5 rounded">
                      {defaultAddress.tag}
                    </span>
                  </div>
                  <p className="text-[#77716A]">
                    {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state} -{" "}
                    {defaultAddress.pincode}
                  </p>
                  <p className="text-[#181615] font-semibold">{defaultAddress.phone}</p>
                </div>
              ) : (
                <p className="text-xs text-[#77716A]">No address saved.</p>
              )}
            </div>
          </div>
        )}

        {/* Account Details Card */}
        <div className="p-6 rounded-2xl border border-[#E5DED4] space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615]">
            Account Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-[#77716A]">Name</p>
              <p className="font-bold text-[#181615] mt-0.5">{userProfile.name}</p>
            </div>
            <div>
              <p className="text-[#77716A]">Email</p>
              <p className="font-bold text-[#181615] mt-0.5">{userProfile.email}</p>
            </div>
            <div>
              <p className="text-[#77716A]">Phone</p>
              <p className="font-bold text-[#181615] mt-0.5">{userProfile.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
