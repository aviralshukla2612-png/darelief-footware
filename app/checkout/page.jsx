"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Plus
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, finalTotal, rawSubtotal, shippingFee, couponDiscountAmount, appliedCoupon, clearCart } =
    useCart();
  const { addresses, addOrder } = useUI();

  // Step state: 1 (Address) -> 2 (Payment) -> 3 (Confirmation)
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || 1);
  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi | card | cod | netbanking
  const [upiId, setUpiId] = useState("neha.sharma@okhdfcbank");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8921");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // New address form inline
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: "Neha Sharma",
    phone: "+91 98765 43210",
    street: "",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380001",
    tag: "HOME"
  });

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0] || newAddr;

  const handlePlaceOrder = () => {
    // Generate simulated order
    const orderData = {
      totalAmount: finalTotal,
      subtotal: rawSubtotal,
      shippingFee,
      discountAmount: couponDiscountAmount,
      paymentMethod:
        paymentMethod === "upi"
          ? `UPI (${upiId})`
          : paymentMethod === "card"
          ? "Credit Card (Visa)"
          : paymentMethod === "cod"
          ? "Cash on Delivery"
          : "Net Banking (HDFC)",
      shippingAddress: selectedAddress,
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        slug: i.slug,
        color: i.selectedColor,
        size: i.selectedSize,
        price: i.price,
        quantity: i.quantity,
        image: i.image
      }))
    };

    const newOrder = addOrder(orderData);
    setConfirmedOrder(newOrder);
    clearCart();
    setCurrentStep(3);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }
  };

  // If cart is empty and not in confirmation step
  if (cart.length === 0 && currentStep !== 3) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold">Your Bag is Empty</h2>
        <p className="text-xs text-[#77716A]">Please add footwear to your bag before checking out.</p>
        <Link
          href="/new-arrivals"
          className="inline-block px-6 py-3 bg-[#701A2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Browse Footwear
        </Link>
      </div>
    );
  }

  // ORDER CONFIRMED SCREEN (Step 3)
  if (currentStep === 3 && confirmedOrder) {
    return (
      <div className="w-full bg-[#FAF7F2] py-12 sm:py-20 border-b border-[#E5DED4]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5DED4] shadow-xl text-center space-y-6 animate-fade-in">
            {/* Success Icon Badge */}
            <div className="w-20 h-20 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto border-2 border-[#2E7D32]/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#701A2B]">
                Order Confirmed
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#181615] mt-1">
                Thank you for your order!
              </h1>
              <p className="text-xs sm:text-sm text-[#77716A] mt-2">
                Order ID: <strong className="text-[#181615]">{confirmedOrder.orderNumber}</strong> • We have sent confirmation details to{" "}
                <strong>neha.sharma@gmail.com</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DED4] text-left space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DED4] text-xs">
                <span className="font-bold text-[#181615]">Estimated Delivery</span>
                <span className="text-[#2E7D32] font-bold">2 to 4 Business Days</span>
              </div>

              {/* Items in order */}
              <div className="space-y-3">
                {confirmedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded-lg border border-[#E5DED4]"
                    />
                    <div className="flex-1 text-xs">
                      <p className="font-bold text-[#181615]">{item.name}</p>
                      <p className="text-[#77716A]">
                        {item.color} • Size {item.size} • Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#181615]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E5DED4] flex items-center justify-between text-xs font-bold">
                <span className="text-[#181615]">Total Paid ({confirmedOrder.paymentMethod})</span>
                <span className="text-base text-[#701A2B]">
                  ₹{confirmedOrder.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/account/orders"
                className="flex-1 py-3.5 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md text-center"
              >
                View in My Orders
              </Link>

              <Link
                href="/account/track-order"
                className="flex-1 py-3.5 bg-[#181615] hover:bg-[#2A2725] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md text-center"
              >
                Track Live Shipment
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF7F2] py-8 sm:py-12 border-b border-[#E5DED4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            {/* Step Line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#E5DED4] z-0" />
            <div
              className="absolute left-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#701A2B] z-0 transition-all duration-500"
              style={{ width: currentStep === 1 ? "0%" : "100%" }}
            />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep >= 1 ? "bg-[#701A2B] text-white" : "bg-[#FAF7F2] text-[#77716A]"
                }`}
              >
                1
              </div>
              <span className="text-[11px] font-bold uppercase mt-1 text-[#181615]">
                Delivery Address
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep >= 2 ? "bg-[#701A2B] text-white" : "bg-white border border-[#E5DED4] text-[#77716A]"
                }`}
              >
                2
              </div>
              <span className="text-[11px] font-bold uppercase mt-1 text-[#181615]">
                Payment
              </span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-white border border-[#E5DED4] text-[#77716A] flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-[11px] font-bold uppercase mt-1 text-[#77716A]">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Form Steps (8 cols) + Sticky Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: DELIVERY ADDRESS */}
            {currentStep === 1 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DED4] shadow-xs space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                  <h2 className="font-serif-luxury text-2xl font-bold text-[#181615] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#701A2B]" />
                    <span>Select Delivery Address</span>
                  </h2>
                </div>

                {/* Saved Addresses List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        selectedAddressId === addr.id
                          ? "border-[#701A2B] bg-[#701A2B]/5 shadow-sm"
                          : "border-[#E5DED4] hover:border-[#77716A]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FAF7F2] border border-[#E5DED4] rounded text-[#181615]">
                          {addr.tag}
                        </span>
                        {selectedAddressId === addr.id && (
                          <div className="w-5 h-5 rounded-full bg-[#701A2B] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-[#181615]">{addr.fullName}</h4>
                      <p className="text-xs text-[#77716A] mt-1 leading-relaxed">
                        {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-xs text-[#181615] font-semibold mt-2">{addr.phone}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#FAF7F2] flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-3.5 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-md"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {currentStep === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DED4] shadow-xs space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                  <h2 className="font-serif-luxury text-2xl font-bold text-[#181615] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#701A2B]" />
                    <span>Choose Payment Method</span>
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-semibold text-[#701A2B] hover:underline"
                  >
                    Change Address
                  </button>
                </div>

                {/* Selected Address Preview */}
                <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E5DED4] text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[#77716A]">Deliver to: </span>
                    <strong className="text-[#181615]">
                      {selectedAddress.fullName}, {selectedAddress.city} ({selectedAddress.pincode})
                    </strong>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "upi"
                        ? "border-[#701A2B] bg-[#701A2B]/5 shadow-sm"
                        : "border-[#E5DED4] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="mt-1 accent-[#701A2B]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#181615] flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-[#701A2B]" />
                          <span>Instant UPI (Google Pay / PhonePe / Paytm / BHIM)</span>
                        </span>
                        <span className="text-[10px] bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-0.5 rounded font-bold">
                          FASTEST
                        </span>
                      </div>
                      <p className="text-[11px] text-[#77716A] mt-1">
                        Zero transaction fees. Instant payment confirmation.
                      </p>
                      {paymentMethod === "upi" && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter UPI ID (e.g. name@okhdfcbank)"
                            className="w-full sm:w-80 px-3 py-2 text-xs bg-white border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Credit / Debit Card */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-[#701A2B] bg-[#701A2B]/5 shadow-sm"
                        : "border-[#E5DED4] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mt-1 accent-[#701A2B]"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-[#181615] flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#701A2B]" />
                        <span>Credit / Debit Card (Visa, MasterCard, RuPay, Amex)</span>
                      </span>
                      {paymentMethod === "card" && (
                        <div className="mt-3 space-y-2 max-w-sm">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Card Number"
                            className="w-full px-3 py-2 text-xs bg-white border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              defaultValue="08/28"
                              placeholder="MM/YY"
                              className="w-1/2 px-3 py-2 text-xs bg-white border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                            />
                            <input
                              type="password"
                              defaultValue="123"
                              maxLength={3}
                              placeholder="CVV"
                              className="w-1/2 px-3 py-2 text-xs bg-white border border-[#E5DED4] rounded-lg focus:outline-none focus:border-[#701A2B]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-[#701A2B] bg-[#701A2B]/5 shadow-sm"
                        : "border-[#E5DED4] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 accent-[#701A2B]"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-[#181615] flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#701A2B]" />
                        <span>Cash on Delivery (Pay cash/UPI upon delivery)</span>
                      </span>
                      <p className="text-[11px] text-[#77716A] mt-1">
                        Verified contactless OTP verification at your doorstep.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#FAF7F2] flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-semibold text-[#77716A] hover:text-[#181615]"
                  >
                    ← Back to Address
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="px-8 py-4 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <span>PLACE ORDER • ₹{finalTotal.toLocaleString("en-IN")}</span>
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E5DED4] shadow-xs space-y-4 sticky top-24">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#181615] pb-3 border-b border-[#FAF7F2]">
              Order Summary ({cart.length} items)
            </h3>

            {/* Cart Preview Thumbnail List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-[#FAF7F2]">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-2 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover rounded-md border border-[#E5DED4]"
                  />
                  <div className="flex-1 text-xs">
                    <p className="font-bold text-[#181615] line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-[#77716A]">
                      {item.selectedColor} • Size {item.selectedSize} (Qty {item.quantity})
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#181615]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-3 border-t border-[#E5DED4] space-y-2 text-xs text-[#242220]">
              <div className="flex justify-between">
                <span className="text-[#77716A]">Subtotal</span>
                <span>₹{rawSubtotal.toLocaleString("en-IN")}</span>
              </div>

              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-[#701A2B] font-bold">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span>-₹{couponDiscountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-[#77716A]">Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-[#2E7D32] uppercase">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E5DED4] flex justify-between items-baseline text-base font-bold text-[#181615]">
                <span>Total Amount</span>
                <span className="text-xl text-[#701A2B]">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-3 bg-[#FAF7F2] rounded-xl text-[11px] text-[#77716A] text-center border border-[#E5DED4]">
              🔒 256-bit Encrypted Checkout Simulation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
