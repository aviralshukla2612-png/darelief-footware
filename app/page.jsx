import Hero from "@/components/home/Hero";
import CategoryShortcuts from "@/components/home/CategoryShortcuts";
import NewArrivals from "@/components/home/NewArrivals";
import BrandPillars from "@/components/home/BrandPillars";
import TrustStrip from "@/components/home/TrustStrip";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
  title: "Darelief Walkwear | Luxury Women's Comfort Footwear",
  description: "Designed for Everyday Comfort. Made for Every Woman. Explore luxury flats, block heels, strappy sandals, and office loafers engineered with 6mm CloudStep™ memory foam cushioning."
};

export default function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <CategoryShortcuts />
      <NewArrivals />
      <BrandPillars />
      <TrustStrip />
      <BestSellers />
      <Testimonials />
    </main>
  );
}
