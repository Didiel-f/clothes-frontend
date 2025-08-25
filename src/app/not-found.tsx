import { Metadata } from "next";
import { NotFoundPageView } from "pages-sections/not-found";

export const metadata: Metadata = {
  title: "404 - Página no encontrada | ZAG",
  description: "La página que buscas no existe. Regresa al inicio de ZAG, tu tienda online de calzado y ropa.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["404", "página no encontrada", "error", "ZAG", "tienda online"]
};

export default function NotFound() {
  return <NotFoundPageView />;
}
