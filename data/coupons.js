export const validCoupons = {
  WELCOME10: {
    code: "WELCOME10",
    discountPercent: 10,
    discountAmount: 0,
    minOrder: 999,
    description: "10% OFF on your first purchase"
  },
  URBAN20: {
    code: "URBAN20",
    discountPercent: 0,
    discountAmount: 200,
    minOrder: 1499,
    description: "Flat ₹200 OFF on orders above ₹1,499"
  },
  DARELIEF500: {
    code: "DARELIEF500",
    discountPercent: 0,
    discountAmount: 500,
    minOrder: 2999,
    description: "Flat ₹500 OFF on luxury orders above ₹2,999"
  },
  FREESHIP: {
    code: "FREESHIP",
    discountPercent: 0,
    discountAmount: 0,
    freeShipping: true,
    minOrder: 0,
    description: "Complimentary Express Free Shipping"
  }
};
