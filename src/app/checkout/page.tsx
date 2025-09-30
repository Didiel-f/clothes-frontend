import { Metadata } from "next";
import CheckoutPageView from "pages-sections/checkout/page-view/checkout";

export const metadata: Metadata = {
  title: "Finalizar Compra | ZAG",
  description: "Completa tu compra en ZAG. Ingresa tus datos de envío y elige tu método de pago preferido. Envío seguro a todo Chile.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["checkout", "finalizar compra", "pago", "envío", "ZAG", "tienda online", "calzado", "ropa"]
};

export default async function Checkout() {
  return <CheckoutPageView />;
}
