import CollectionTemplate from "@/components/collection/CollectionTemplate";

export const metadata = {
  title: "Heels & Block Heels | Darelief Walkwear",
  description: "Architectural block heels, kitten heels, and slingbacks with zero wobble."
};

export default function HeelsPage() {
  return (
    <CollectionTemplate
      categorySlug="heels"
      title="Heels Collection"
      subtitle="Balanced 2-inch to 2.5-inch block and kitten heels with pressure-relief ball cushions."
    />
  );
}
