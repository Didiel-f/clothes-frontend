import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
// CUSTOM DATA MODEL
import { SlugParams } from "models/Common";
import { getProductData } from "utils/__api__/products";

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductData(slug);
  if (!product) notFound();

  return {
    title: product.name + " - Bazaar Next.js E-commerce Template",
    description: "Bazaar is a React Next.js E-commerce template.",
    authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
    keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
  };
}

export default async function ProductDetails({ params }: SlugParams) {
  const { slug } = await params;
  const [product] = await Promise.all([
    getProductData(slug),
    //getRelatedProducts(),
  ]);

  if (!product) notFound();

  return (
    <ProductDetailsPageView
      product={product}
      //relatedProducts={relatedProducts}
    />
  );
}
