import CollectionTemplate from "@/components/collection/CollectionTemplate";

export const metadata = {
  title: "Comfort & Orthotic Support | Darelief Walkwear",
  description: "Ergonomic arch support slides, cork wedges, and therapeutic memory foam footwear."
};

export default function ComfortPage() {
  return (
    <CollectionTemplate
      categorySlug="comfort"
      title="Comfort Collection"
      subtitle="Deep heel cups, contoured arch support, and shock-absorbing EVA soles designed to relieve foot fatigue."
    />
  );
}
