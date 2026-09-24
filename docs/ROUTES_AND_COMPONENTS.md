# DARELIEF WALKWEAR — Routes & Components Mapping

## 1. Complete Route Sitemap

| Route Path | Component File | Description |
| :--- | :--- | :--- |
| `/` | `app/page.jsx` | Brand homepage with Hero, Categories, New Arrivals, Pillars, Best Sellers, Testimonials |
| `/new-arrivals` | `app/new-arrivals/page.jsx` | New collection catalog with multi-filter |
| `/flats` | `app/flats/page.jsx` | Handcrafted flats and pointed loafers collection |
| `/sandals` | `app/sandals/page.jsx` | Strappy kitten & flat sandals |
| `/heels` | `app/heels/page.jsx` | Architectural block & kitten heels collection |
| `/office-wear` | `app/office-wear/page.jsx` | Ergonomic commuter and workday footwear |
| `/comfort` | `app/comfort/page.jsx` | Dual-density cloud comfort collection |
| `/product/[slug]` | `app/product/[slug]/page.jsx` | Product detail view, gallery, 3D switch, specs, reviews |
| `/cart` | `app/cart/page.jsx` | Cart view, quantity controls, coupons, shipping progress |
| `/checkout` | `app/checkout/page.jsx` | 4-stage simulated checkout with payment methods |
| `/account` | `app/account/page.jsx` | Account dashboard overview |
| `/account/profile` | `app/account/profile/page.jsx` | Edit profile info & contact numbers |
| `/account/orders` | `app/account/orders/page.jsx` | Order history with item breakdowns |
| `/account/orders/[id]` | `app/account/orders/[id]/page.jsx` | Detailed single order status and receipt |
| `/account/track-order` | `app/account/track-order/page.jsx` | 6-stage visual courier delivery tracker |
| `/account/wishlist` | `app/account/wishlist/page.jsx` | Saved favorite footwear styles |
| `/account/addresses` | `app/account/addresses/page.jsx` | Address book CRUD with default toggle |
| `/contact` | `app/contact/page.jsx` | Contact channels & message form with centered modal |
| `/services` | `app/services/page.jsx` | 5 core brand services & doorstep assistance |
| `/about` | `app/about/page.jsx` | Brand heritage, philosophy, and artisanal story |
| `/policies` | `app/policies/page.jsx` | Centralized 7-policy hub portal |
| `/shipping-policy` | `app/shipping-policy/page.jsx` | Dispatch timelines & threshold rules |
| `/return-exchange` | `app/return-exchange/page.jsx` | 7-day doorstep return & exchange portal |
| `/cancellation-policy`| `app/cancellation-policy/page.jsx` | Pre-dispatch cancellation terms |
| `/refund-policy` | `app/refund-policy/page.jsx` | Refund methods and timeline info |
| `/privacy-policy` | `app/privacy-policy/page.jsx` | User data privacy & security standards |
| `/terms` | `app/terms/page.jsx` | Terms of service and conditions |
| `/payment-policy` | `app/payment-policy/page.jsx` | Payment gateways, UPI, cards, and COD policy |
| `/size-guide` | `app/size-guide/page.jsx` | Measurement guide and international size conversion |

---

## 2. Component Structure

### Layout Components (`components/layout/`):
- `AnnouncementBar.jsx`: Top notification bar for free shipping.
- `Navbar.jsx`: Brand logo, navigation links, search, wishlist & cart badges.
- `MobileMenu.jsx`: Slide-out responsive mobile navigation.
- `Footer.jsx`: Full footer with newsletter, navigation links, customer guarantees, social icons.
- `SearchModal.jsx`: Global search dialog with quick keyword suggestions.
- `QuickViewModal.jsx`: Instant product preview modal.
- `SizeGuideModal.jsx`: Interactive sizing chart and foot measuring guide.
- `ToastContainer.jsx`: Toast notification renderer.

### Home Components (`components/home/`):
- `Hero.jsx`: Auto-sliding editorial hero with 3D model toggle.
- `CategoryShortcuts.jsx`: Circular visual shortcuts to footwear categories.
- `NewArrivals.jsx`: 5-column product showcase for newly launched designs.
- `BrandPillars.jsx`: 4 Craftsmanship Hallmarks (Cloud Insole, Featherweight Sole, Zero Break-in, Microfiber Lining).
- `TrustStrip.jsx`: 3+2 Our Services grid + Everyday Comfort banner.
- `BestSellers.jsx`: 4-column bestseller product grid.
- `Testimonials.jsx`: Magazine-style quote card with 3 customer photo reviews.

### Product Components (`components/product/`):
- `ProductCard.jsx`: Footwear card with hover effects, color swatches, quick add button, wishlist toggle.
- `ProductGrid.jsx`: Responsive layout grid for product cards.
- `ProductDetailView.jsx`: Full PDP with gallery, 3D toggle, color/size picker, delivery check, specs tabs.

### 3D Component (`components/3d/`):
- `ShoeCanvas3D.jsx`: Interactive Three.js WebGL canvas with 360° drag, color switcher, lighting, and levitation.

### Contexts (`context/`):
- `CartContext.jsx`: Cart items, quantity modifiers, coupon validation, free shipping calculations.
- `WishlistContext.jsx`: Wishlist toggle and local storage persistence.
- `UIContext.jsx`: Modal states, orders state, address book state, and user profile management.
