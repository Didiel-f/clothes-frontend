import { Metadata } from "next";
import { CartPageView } from "pages-sections/cart/page-view";

export const metadata: Metadata = {
  title: "Carrito de compras | ZAG",
  description: `ZAG es una tienda online de calzado y ropa. Compra online y recibe tu pedido en la comodidad de tu casa.`,
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["carrito", "compras", "ZAG", "tienda online", "calzado", "ropa"]
};

export default function Cart() {
  return <CartPageView />;
}
