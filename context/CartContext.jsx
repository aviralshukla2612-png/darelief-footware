"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { validCoupons } from "@/data/coupons";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("darelief_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("darelief_coupon");
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        if (validCoupons[parsed.code]) {
          setAppliedCoupon(validCoupons[parsed.code]);
          setCouponCode(parsed.code);
        }
      }
    } catch (e) {
      console.error("Failed to parse cart storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("darelief_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      if (appliedCoupon) {
        localStorage.setItem("darelief_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("darelief_coupon");
      }
    }
  }, [appliedCoupon, isLoaded]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const addToCart = (product, selectedSize = 6, selectedColor = null, quantity = 1) => {
    const colorName = selectedColor?.name || (typeof selectedColor === "string" ? selectedColor : product.colors?.[0]?.name || "Standard");
    const colorHex = selectedColor?.hex || product.colors?.[0]?.hex || "#701A2B";
    const imageToUse = product.images?.[0] || product.image;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === colorName
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        showToast(`Updated quantity of ${product.name} (Size ${selectedSize})`);
        return updated;
      } else {
        showToast(`Added ${product.name} (Size ${selectedSize}) to your bag`);
        return [
          ...prevCart,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            discount: product.discount,
            selectedSize,
            selectedColor: colorName,
            colorHex,
            image: imageToUse,
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor))
    );
    showToast("Item removed from your bag");
  };

  const updateQuantity = (id, selectedSize, selectedColor, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, selectedSize, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponCode("");
    localStorage.removeItem("darelief_cart");
    localStorage.removeItem("darelief_coupon");
  };

  const applyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError("");

    if (!code) {
      setCouponError("Please enter a coupon code");
      return false;
    }

    const match = validCoupons[code];
    if (!match) {
      setCouponError("Coupon code is invalid or expired.");
      return false;
    }

    if (rawSubtotal < (match.minOrder || 0)) {
      setCouponError(`This coupon requires a minimum order of ₹${match.minOrder.toLocaleString("en-IN")}`);
      return false;
    }

    setAppliedCoupon(match);
    setCouponCode(code);
    setCouponError("");
    showToast(`🎉 Coupon "${code}" applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    showToast("Coupon removed");
  };

  // Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const rawMrpTotal = cart.reduce((acc, item) => acc + (item.mrp || item.price) * item.quantity, 0);
  const totalSavings = rawMrpTotal - rawSubtotal;

  let couponDiscountAmount = 0;
  if (appliedCoupon && rawSubtotal > 0) {
    if (appliedCoupon.discountPercent) {
      couponDiscountAmount = Math.round((rawSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      couponDiscountAmount = Math.min(appliedCoupon.discountAmount, rawSubtotal);
    }
  }

  // Free shipping over ₹999 or with FREESHIP coupon
  const freeShippingThreshold = 999;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold || appliedCoupon?.freeShipping;
  const shippingFee = rawSubtotal === 0 ? 0 : isFreeShipping ? 0 : 99;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  const finalTotal = Math.max(0, rawSubtotal - couponDiscountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItemsCount,
        rawSubtotal,
        rawMrpTotal,
        totalSavings,
        shippingFee,
        isFreeShipping,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        couponCode,
        setCouponCode,
        appliedCoupon,
        couponError,
        couponDiscountAmount,
        finalTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
