import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileEditPageView } from "pages-sections/customer-dashboard/profile/page-view";
// API FUNCTIONS
import api from "utils/__api__/users";

export async function generateMetadata(): Promise<Metadata> {
  const user = await api.getUser();

  if (!user) {
    return notFound();
  }

  const name = `${user.name.firstName} ${user.name.lastName}`;

  return {
    title: `${name} - Editar Perfil | ZAG`,
    description: "Edita tu información personal en ZAG. Actualiza tu nombre, email, contraseña y preferencias de cuenta.",
    authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
    keywords: ["editar perfil", "actualizar información", "configuración", "ZAG", "tienda online", "usuario"]
  };
}

export default async function ProfileEdit() {
  const user = await api.getUser();

  if (!user) {
    return notFound();
  }

  return <ProfileEditPageView user={user} />;
}
