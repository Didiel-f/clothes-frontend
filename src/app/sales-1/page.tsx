import { Metadata } from "next";
import { SalesOnePageView } from "pages-sections/sales/page-view";
import { getProducts } from "utils/__api__/products";
// SALES API FUNCTIONS
import api from "utils/__api__/sales";

export const metadata: Metadata = {
  title: "Sales 1 - Bazaar Next.js E-commerce Template",
  description:
    "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

// ==============================================================
interface Props {
  searchParams: Promise<{ page: string }>;
}
// ==============================================================

export default async function SalesOne({ searchParams }: Props) {
  const { page } = await searchParams;

  const currentPage = +page || 1;

  const categories = await api.getCategories();
  const products = await getProducts();

  if (!categories || !products) {
    return <div>Failed to load</div>;
  }

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <SalesOnePageView
      page={currentPage}
      categories={categories}
      products={products.data}
      pageSize={1}
      totalProducts={1}
      offer="Flash Deals,"
      discount="Enjoy Upto 80% discounts"
    />
  );
}
