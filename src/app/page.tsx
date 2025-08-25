import { Metadata } from "next";
import FashionTwoPageView from "pages-sections/fashion-2/page-view";
import Layout1 from "./fashion-2/layout";

export const metadata: Metadata = {
  title: "ZAG - Tienda online",
  description:
    "Zag es una tienda online de calzado y ropa",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["e-commerce", "Tienda de ropa", "Zapatillas", "Calzado"]
};
export default function IndexPage() {
return <Layout1>
  <FashionTwoPageView />
</Layout1>;
}
