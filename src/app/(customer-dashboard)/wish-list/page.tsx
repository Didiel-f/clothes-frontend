import { Metadata } from "next";
import { WishListPageView } from "pages-sections/customer-dashboard/wish-list";
import { getProducts } from "utils/__api__/products";

export const metadata: Metadata = {
  title: "Wish List - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

// ==============================================================
//interface Props {
 // searchParams: Promise<{ page: string }>;
//}
// ==============================================================

export default async function WishList() {
  //export default async function WishList({ searchParams }: Props) {
  //const { page } = await searchParams;
  const products = await getProducts();

  if(products === null) return <div>Data not found</div>;
  
  if (!products) {
    return <div>Data not found</div>;
  }

  return <WishListPageView products={products.data} totalPages={1} />;
}
