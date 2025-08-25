import type { Metadata } from "next";
import { ResetPasswordPageView } from "pages-sections/sessions/page-view";

export const metadata: Metadata = {
  title: "Restablecer Contraseña | ZAG",
  description: "Restablece tu contraseña de ZAG de forma segura. Recupera el acceso a tu cuenta para seguir disfrutando de nuestras ofertas.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["restablecer contraseña", "recuperar cuenta", "ZAG", "tienda online", "seguridad"]
};

export default function ResetPassword() {
  return <ResetPasswordPageView />;
}
