import { Metadata } from "next";
import FashionTwoPageView from "pages-sections/fashion-2/page-view";

export const metadata: Metadata = {
  title: "Moda y Estilo | ZAG",
  description: "Descubre las últimas tendencias en moda, calzado y accesorios en ZAG. Estilo único y calidad garantizada para todos los gustos.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["moda", "estilo", "tendencias", "ZAG", "tienda online", "calzado", "ropa", "accesorios"]
};

export default function FashionShopTwo() {
  return <FashionTwoPageView />;
}
