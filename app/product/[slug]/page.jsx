import { getProductBySlug, products } from "@/data/products";
import ProductDetailView from "@/components/product/ProductDetailView";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | Darelief Walkwear" };

  return {
    title: `${product.name} | Darelief Walkwear`,
    description: product.description
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
