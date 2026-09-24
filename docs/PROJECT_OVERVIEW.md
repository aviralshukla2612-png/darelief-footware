# DARELIEF WALKWEAR — Project Overview & Architecture

## 1. Executive Summary
**DARELIEF WALKWEAR** is a luxury direct-to-consumer (DTC) women's footwear e-commerce application built with Next.js 15 (App Router), React 19, Tailwind CSS 4, and Three.js. The brand specializes in everyday comfort footwear engineered with dual-density cloud cushioning, anatomical arch support, and artisanal Indian craftsmanship.

---

## 2. Brand Identity & Visual Aesthetic
- **Primary Canvas**: Warm Ivory (`#FAF7F2` / `#EFE8DA`)
- **Signature Accent**: Deep Darelief Maroon / Burgundy (`#701A2B` / `#56121F`)
- **Secondary Accent**: Muted Champagne Gold (`#C5A059`)
- **Typography & Dark Contrast**: Deep Charcoal / Near-Black (`#181615` / `#242220`)
- **Headings Font**: *Playfair Display* (Editorial Italian High-Fashion Serif)
- **Body & UI Font**: *Outfit* (Modern Sans-Serif)

---

## 3. Key Accomplishments & Deliverables

### A. Dynamic Interactive Hero Section
- **Multi-Slide Editorial Showcase**: Smooth 4-second auto-advancing slides featuring flagship products.
- **Interactive 3D Configurator**: Three.js WebGL canvas allowing real-time 360° mouse/touch rotation, finish switching (Maroon, Beige, Black, Tan), auto-spin mode, and floating levitation physics.
- **Product Highlight Badge**: Clean floating card linking directly to featured footwear styles.

### B. Full Catalog Browsing & Multi-Attribute Filtering
- Dynamic filtering across Category, Size (IND/UK 3–10), Color finishes, and Price range slider (₹1,000–₹3,000).
- Dedicated collection routes for `/new-arrivals`, `/flats`, `/sandals`, `/heels`, `/office-wear`, and `/comfort`.

### C. Rich Product Detail Experience
- Multi-photo high-resolution gallery with 3D model toggle.
- Size selector with live stock indicators and interactive Size Guide modal.
- Delivery pincode serviceability checker.
- Specification tabs (Craftsmanship, Cushioning Tech, Sole Material, Shipping & Returns).
- Customer reviews list with star rating breakdown.

### D. Shopping Cart & Simulated Checkout Flow
- Real-time cart drawer & `/cart` page with quantity controllers and order notes.
- Dynamic coupon code validator (`WELCOME10` for 10% off, `URBAN20` for 20% off).
- Live free shipping progress meter (orders above ₹1,999 unlock free shipping).
- 4-stage simulated checkout (`/checkout`) with address selection, payment methods (UPI, Card, NetBanking, COD), and celebratory confetti animation upon completion.

### E. Account & Self-Service Management
- Profile management (`/account/profile`) with local storage persistence.
- Address book (`/account/addresses`) with Add/Edit/Delete/Set Default functionality.
- Real-time order timeline tracker (`/account/track-order` and `/account/orders/[id]`).
- Self-service 7-day doorstep return & size exchange authorization modal.

### F. Brand Trust & Legal Portals
- Craftsmanship Hallmarks (Cloud Insole, Featherweight Sole, Zero Break-in, Microfiber Lining).
- Comprehensive Policies Hub (`/policies`) with dedicated pages for Shipping, Return & Exchange, Cancellation, Refund, Privacy, Terms, and Payment policies.
- Global Search modal (`Ctrl+K` / Search icon) with instant keyword searching.
- Mobile navigation drawer and responsive design across mobile, tablet, and desktop viewports.
