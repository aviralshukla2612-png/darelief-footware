import CollectionTemplate from "@/components/collection/CollectionTemplate";

export const metadata = {
  title: "Office Wear Loafers & Flats | Darelief Walkwear",
  description: "Sophisticated corporate loafers, slingbacks, and tailored footwear for the modern professional."
};

export default function OfficeWearPage() {
  return (
    <CollectionTemplate
      categorySlug="office-wear"
      title="Office Wear Collection"
      subtitle="Tailored loafers, pointed slingbacks, and structured shoes engineered for 12-hour boardroom days."
    />
  );
}
