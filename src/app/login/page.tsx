import type { Metadata } from "next";
import { LoginPageView } from "pages-sections/sessions/page-view";

export const metadata: Metadata = {
  title: "Iniciar Sesión | ZAG",
  description: "Accede a tu cuenta de ZAG para gestionar tus pedidos, direcciones y métodos de pago. Tu tienda online de calzado y ropa.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["login", "iniciar sesión", "cuenta", "ZAG", "tienda online", "calzado", "ropa"]
};

export default function Login() {
  return <LoginPageView />;
}
