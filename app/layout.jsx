import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { UIProvider } from "@/context/UIContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import MobileMenu from "@/components/layout/MobileMenu";
import Footer from "@/components/layout/Footer";
import SearchModal from "@/components/layout/SearchModal";
import QuickViewModal from "@/components/layout/QuickViewModal";
import SizeGuideModal from "@/components/layout/SizeGuideModal";
import ToastContainer from "@/components/layout/ToastContainer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata = {
  title: "Darelief Walkwear | Women's Everyday Comfort Footwear",
  description: "Luxury women's footwear designed for everyday comfort. Shop flats, block heels, strappy sandals, and office loafers with dual-density cloud cushioning.",
  keywords: "women footwear, comfort flats, block heels, strappy sandals, office loafers, darelief walkwear"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#181615] antialiased selection:bg-[#701A2B] selection:text-white">
        <UIProvider>
          <WishlistProvider>
            <CartProvider>
              <AnnouncementBar />
              <Navbar />
              <MobileMenu />
              <div className="flex-1">{children}</div>
              <Footer />
              <SearchModal />
              <QuickViewModal />
              <SizeGuideModal />
              <ToastContainer />
            </CartProvider>
          </WishlistProvider>
        </UIProvider>
      </body>
    </html>
  );
}
