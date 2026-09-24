"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockOrders, initialAddresses } from "@/data/orders";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [selectedOrderForReturn, setSelectedOrderForReturn] = useState(null);

  // Address and Order Simulation State
  const [addresses, setAddresses] = useState(initialAddresses);
  const [orders, setOrders] = useState(mockOrders);
  const [userProfile, setUserProfile] = useState({
    name: "Neha Sharma",
    email: "neha.sharma@gmail.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 91234 56789",
    birthday: "1994-08-15"
  });

  useEffect(() => {
    try {
      const savedAddrs = localStorage.getItem("darelief_addresses");
      if (savedAddrs) setAddresses(JSON.parse(savedAddrs));

      const savedOrders = localStorage.getItem("darelief_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedProfile = localStorage.getItem("darelief_profile");
      if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveAddresses = (newAddrs) => {
    setAddresses(newAddrs);
    localStorage.setItem("darelief_addresses", JSON.stringify(newAddrs));
  };

  const addAddress = (addr) => {
    const newAddrs = [...addresses, { ...addr, id: Date.now() }];
    saveAddresses(newAddrs);
  };

  const updateAddress = (id, updated) => {
    const newAddrs = addresses.map((a) => (a.id === id ? { ...a, ...updated } : a));
    saveAddresses(newAddrs);
  };

  const deleteAddress = (id) => {
    const newAddrs = addresses.filter((a) => a.id !== id);
    saveAddresses(newAddrs);
  };

  const setDefaultAddress = (id) => {
    const newAddrs = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    saveAddresses(newAddrs);
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `DR${Math.floor(100000 + Math.random() * 900000)}`,
      orderNumber: `#DR${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      status: "Processing",
      statusStage: 1,
      ...orderData,
      timeline: [
        {
          title: "Order Placed",
          date: `${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })}, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
          completed: true,
          desc: "Your order was received and verified."
        },
        { title: "Order Confirmed", date: "Pending", completed: false, desc: "Processing at fulfillment center." },
        { title: "Packed & Quality Checked", date: "Pending", completed: false, desc: "Ready for courier dispatch." },
        { title: "Shipped", date: "Pending", completed: false, desc: "Handover to express delivery." },
        { title: "Out for Delivery", date: "Pending", completed: false, desc: "Courier partner out on route." },
        { title: "Delivered", date: "Pending", completed: false, desc: "Handed over to recipient." }
      ]
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem("darelief_orders", JSON.stringify(updated));
    return newOrder;
  };

  const updateProfile = (profile) => {
    setUserProfile(profile);
    localStorage.setItem("darelief_profile", JSON.stringify(profile));
  };

  return (
    <UIContext.Provider
      value={{
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isReturnModalOpen,
        setIsReturnModalOpen,
        selectedOrderForReturn,
        setSelectedOrderForReturn,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        addOrder,
        userProfile,
        updateProfile
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
