import CollectionTemplate from "@/components/collection/CollectionTemplate";

export const metadata = {
  title: "Sandals & Slides | Darelief Walkwear",
  description: "Strappy, braided, and slip-on sandals with cushioned footbeds."
};

export default function SandalsPage() {
  return (
    <CollectionTemplate
      categorySlug="sandals"
      title="Sandals Collection"
      subtitle="Minimalist strappy block heels and slip-on slides engineered for brunch, weddings, and casual strolls."
    />
  );
}
