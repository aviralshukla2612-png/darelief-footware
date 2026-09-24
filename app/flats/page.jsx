import CollectionTemplate from "@/components/collection/CollectionTemplate";

export const metadata = {
  title: "Flats & Ballerinas | Darelief Walkwear",
  description: "Pointed, round, and bow-detailed flats engineered for all-day painless commuting."
};

export default function FlatsPage() {
  return (
    <CollectionTemplate
      categorySlug="flats"
      title="Flats Collection"
      subtitle="Chic pointed, square-toe, and quilted ballerina flats designed with cushioned heel collars to prevent blisters."
    />
  );
}
