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
    title: `${product.name} | ZAG`,
    description: `${product.name} - ${product.shortDescription || 'Descubre este increíble producto en ZAG, tu tienda online de calzado y ropa.'}`,
    authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
    keywords: [product.name, "ZAG", "tienda online", "calzado", "ropa", "moda", "estilo"]
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
