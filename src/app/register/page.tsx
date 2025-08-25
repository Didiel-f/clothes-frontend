import type { Metadata } from "next";
import { RegisterPageView } from "pages-sections/sessions/page-view";

export const metadata: Metadata = {
  title: "Crear Cuenta | ZAG",
  description: "Únete a ZAG y crea tu cuenta para acceder a ofertas exclusivas, seguimiento de pedidos y una experiencia de compra personalizada.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["registro", "crear cuenta", "nuevo usuario", "ZAG", "tienda online", "ofertas exclusivas"]
};

export default function Register() {
  return <RegisterPageView />;
}
