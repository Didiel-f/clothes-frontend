import { Metadata } from "next";
import { WishListPageView } from "pages-sections/customer-dashboard/wish-list";
import { getProducts } from "utils/__api__/products";

export const metadata: Metadata = {
  title: "Lista de Deseos | ZAG",
  description: "Guarda tus productos favoritos en tu lista de deseos de ZAG. Recibe notificaciones cuando bajen de precio o estén disponibles.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["lista de deseos", "favoritos", "productos", "notificaciones", "ZAG", "tienda online", "ofertas"]
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
