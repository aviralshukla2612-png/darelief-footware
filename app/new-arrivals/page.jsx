import CollectionTemplate from "@/components/collection/CollectionTemplate";

export const metadata = {
  title: "New Arrivals | Darelief Walkwear",
  description: "Explore the latest season of luxury women's flats, sandals, heels, and office wear."
};

export default function NewArrivalsPage() {
  return (
    <CollectionTemplate
      categorySlug="new-arrivals"
      title="New Arrivals"
      subtitle="The latest modern silhouettes crafted with our signature CloudStep™ comfort technology."
    />
  );
}
