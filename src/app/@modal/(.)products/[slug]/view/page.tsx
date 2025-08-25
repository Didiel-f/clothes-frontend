import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import ProductQuickView from "./quick-view";
// API FUNCTIONS
// CUSTOM DATA MODEL
import { SlugParams } from "models/Common";
import { getProductData } from "utils/__api__/products";

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductData(slug)

  if (!product) notFound();

  return {
    title: `${product.name} - Vista Rápida | ZAG`,
    description: `${product.name} - Vista rápida del producto. Descubre características, precios y disponibilidad en ZAG, tu tienda online de calzado y ropa.`,
    authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
    keywords: [product.name, "vista rápida", "producto", "ZAG", "tienda online", "calzado", "ropa", "moda"]
  };
}

export default async function QuickViewPage({ params }: SlugParams) {
  const { slug } = await params;
  const product = await getProductData(slug)

  if (!product) notFound();

  return <ProductQuickView product={product} />;
}
