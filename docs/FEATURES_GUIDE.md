# DARELIEF WALKWEAR — Features & Workflows Guide

This guide details all functional modules, client-side state architectures, and interaction workflows implemented in the project.

---

## 1. 3D Footwear Viewer (`components/3d/ShoeCanvas3D.jsx`)
- **Technology**: Three.js WebGL Renderer with procedural 3D shoe geometry (sculpted footbed, insole, sole underbed, architectural kitten block heel, crossover front straps, instep diagonal straps, ankle wrap with metallic gold buckle, and signature bow knot).
- **Lighting Setup**:
  - Warm ambient light (`#FFF7ED`, 1.4 intensity).
  - Directional sun key light (`#FFFFFF`, 2.2 intensity) casting soft PCF shadows.
  - Soft warm fill light (`#F8EAD6`, 1.2 intensity).
  - Champagne gold rim spotlight (`#C5A059`, 2.5 intensity).
- **Interactivity**:
  - Drag with pointer/finger to rotate 360° with vertical pitch constraints (`-0.4` to `+0.4` radians).
  - Auto-spin animation loop with floating sine-wave levitation.
  - Live material color switching between Maroon (`#701A2B`), Beige (`#EFE8DA`), Black (`#181615`), and Tan (`#C5A059`).

---

## 2. Cart & Discount Engine (`context/CartContext.jsx`)
- **State Persistence**: Synced automatically to `localStorage` under `darelief_cart`.
- **Items Management**: Add with selected size, update quantities, remove items, clear cart.
- **Dynamic Coupon Logic**:
  - `WELCOME10`: 10% flat discount on subtotal.
  - `URBAN20`: 20% discount on orders above ₹2,500.
  - Custom coupon validation with instant feedback toasts.
- **Free Shipping Threshold**: Free express shipping automatically granted when subtotal exceeds ₹1,999; otherwise standard ₹150 delivery charge applies.

---

## 3. Simulated Checkout (`app/checkout/page.jsx`)
- **Stage 1 — Shipping Address**: Select from saved addresses in the address book or input a new one.
- **Stage 2 — Delivery Options**: Choose between Standard Express (2–4 days) and Priority Doorstep (1–2 days).
- **Stage 3 — Payment Method**:
  - UPI (Instant QR / GooglePay / PhonePe).
  - Credit / Debit Cards (Visa, MasterCard, RuPay).
  - Net Banking (HDFC, ICICI, SBI, Axis).
  - Cash on Delivery (COD) with verification.
- **Stage 4 — Order Placement**: Triggers Canvas Confetti animation, generates unique `#DRxxxxxx` tracking ID, logs order to user history, and redirects to confirmation view.

---

## 4. Account & Order Tracking (`app/account/`)
- **Order Timeline Tracker** (`/account/track-order`): Displays a 6-stage visual progress timeline:
  1. *Order Placed*
  2. *Order Confirmed*
  3. *Packed & Quality Checked*
  4. *Shipped with Courier*
  5. *Out for Delivery*
  6. *Delivered*
- **Self-Service Return/Exchange**:
  - Instant modal dialog to select reason (sizing issue, color preference, defect) and request complimentary size exchange or return.
  - Auto-schedules simulated BlueDart reverse pickup.
- **Address Book Manager** (`/account/addresses`): Full CRUD for delivery addresses with default address switching.
- **Wishlist** (`/account/wishlist`): Add/remove styles, move directly to cart with size selection.

---

## 5. Centralized Policies Hub (`app/policies/`)
A dedicated hub linking to all legal, shipping, and return policies:
- `/shipping-policy`
- `/return-exchange`
- `/cancellation-policy`
- `/refund-policy`
- `/privacy-policy`
- `/terms`
- `/payment-policy`
- `/size-guide`
- Direct contact support banner with custom modal dialogs.
