export const customerReviews = [
  {
    id: 1,
    name: "Riya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    date: "12 May 2024",
    verified: true,
    productName: "Darelief Strappy Block Sandal",
    comment: "Super comfortable and so elegant! Perfect for daily wear as well as office. The memory foam insole actually works. I was on my feet for 8 hours during an exhibition and had zero ache.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Pooja Malhotra",
    location: "Bengaluru, Karnataka",
    rating: 5,
    date: "04 June 2024",
    verified: true,
    productName: "Darelief Cloud Cushion Loafers",
    comment: "I have wide feet and finding stylish loafers in India was a nightmare until I found Darelief. Fits like a dream, the gold chain adds such an understated luxury feel to my work outfits!",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Ananya Iyer",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "28 April 2024",
    verified: true,
    productName: "Darelief Bow Detail Pointed Flat",
    comment: "The packaging alone felt like receiving a gift from a high-end French boutique. The pointed toe doesn't pinch at all and the maroon color is simply breathtaking.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "Tanvi Saxena",
    location: "New Delhi",
    rating: 5,
    date: "19 May 2024",
    verified: true,
    productName: "Darelief Slingback Pointed Heels",
    comment: "The heel height is ideal! Balanced, sturdy, and so flattering. I received at least five compliments at my presentation.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
  }
];

export const mockOrders = [
  {
    id: "DR12345",
    orderNumber: "#DR12345",
    date: "18 May, 2024",
    status: "Delivered",
    statusStage: 6, // 1: Placed, 2: Confirmed, 3: Packed, 4: Shipped, 5: Out for delivery, 6: Delivered
    paymentMethod: "UPI (Google Pay)",
    totalAmount: 1399,
    subtotal: 1399,
    shippingFee: 0,
    discountAmount: 0,
    trackingNumber: "AWB984729104IN",
    courierName: "BlueDart Express",
    deliveryDate: "21 May, 2024",
    shippingAddress: {
      name: "Neha Sharma",
      phone: "+91 98765 43210",
      street: "123, MG Road, Vastrapur",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001"
    },
    items: [
      {
        id: 2,
        name: "Darelief Bow Detail Pointed Flat",
        slug: "darelief-bow-detail-pointed-flat",
        color: "Beige",
        size: 6,
        price: 1399,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80"
      }
    ],
    timeline: [
      { title: "Order Placed", date: "18 May 2024, 10:30 AM", completed: true, desc: "Your order was received and verified." },
      { title: "Order Confirmed", date: "18 May 2024, 11:15 AM", completed: true, desc: "Payment received via UPI." },
      { title: "Packed & Quality Checked", date: "19 May 2024, 02:45 PM", completed: true, desc: "Inspected and packed in signature dust bag & box." },
      { title: "Shipped with BlueDart", date: "19 May 2024, 07:00 PM", completed: true, desc: "Dispatched from Mumbai Central Hub." },
      { title: "Out for Delivery", date: "21 May 2024, 08:30 AM", completed: true, desc: "Courier partner is en-route with your package." },
      { title: "Delivered", date: "21 May 2024, 01:15 PM", completed: true, desc: "Handed over to recipient with signature." }
    ]
  },
  {
    id: "DR12389",
    orderNumber: "#DR12389",
    date: "23 May, 2024",
    status: "Shipped",
    statusStage: 4,
    paymentMethod: "Credit Card (HDFC Visa)",
    totalAmount: 3898,
    subtotal: 4098,
    discountAmount: 200,
    shippingFee: 0,
    trackingNumber: "AWB771928341IN",
    courierName: "Delhivery Surface",
    estimatedDelivery: "26 May, 2024",
    shippingAddress: {
      name: "Neha Sharma",
      phone: "+91 98765 43210",
      street: "123, MG Road, Vastrapur",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001"
    },
    items: [
      {
        id: 1,
        name: "Darelief Strappy Block Sandal",
        slug: "darelief-strappy-block-sandal",
        color: "Maroon",
        size: 7,
        price: 1699,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: 4,
        name: "Darelief Slingback Pointed Heels",
        slug: "darelief-slingback-pointed-heels",
        color: "Noir Black",
        size: 7,
        price: 2199,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=400&q=80"
      }
    ],
    timeline: [
      { title: "Order Placed", date: "23 May 2024, 04:12 PM", completed: true, desc: "Order received." },
      { title: "Order Confirmed", date: "23 May 2024, 04:15 PM", completed: true, desc: "Payment verified." },
      { title: "Packed & Quality Checked", date: "24 May 2024, 09:30 AM", completed: true, desc: "Ready for courier pickup." },
      { title: "Shipped with Delhivery", date: "24 May 2024, 03:00 PM", completed: true, desc: "In transit to Ahmedabad distribution center." },
      { title: "Out for Delivery", date: "Pending", completed: false, desc: "Estimated on 26 May 2024." },
      { title: "Delivered", date: "Pending", completed: false, desc: "Awaiting final delivery." }
    ]
  }
];

export const initialAddresses = [
  {
    id: 1,
    tag: "HOME",
    isDefault: true,
    fullName: "Neha Sharma",
    phone: "+91 98765 43210",
    street: "123, MG Road, Vastrapur",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380001",
    landmark: "Near Alpha One Mall"
  },
  {
    id: 2,
    tag: "OFFICE",
    isDefault: false,
    fullName: "Neha Sharma",
    phone: "+91 98765 43210",
    street: "Unit 402, DLF Cyber City, Tower B",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122002",
    landmark: "Phase II Metro"
  }
];
