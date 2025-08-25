import { Metadata } from "next";
import CheckoutAlternativePageView from "pages-sections/checkout-alternative/page-view";

export const metadata: Metadata = {
  title: "Finalizar Compra | ZAG",
  description: "Completa tu compra en ZAG. Ingresa tus datos de envío y elige tu método de pago preferido. Envío seguro a todo Chile.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["checkout", "finalizar compra", "pago", "envío", "ZAG", "tienda online", "calzado", "ropa"]
};

export default async function CheckoutAlternative() {
  return <CheckoutAlternativePageView />;
}
