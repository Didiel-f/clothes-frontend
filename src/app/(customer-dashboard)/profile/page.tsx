import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfilePageView } from "pages-sections/customer-dashboard/profile/page-view";
// API FUNCTIONS
import api from "utils/__api__/users";

export async function generateMetadata(): Promise<Metadata> {
  const user = await api.getUser();
  if (!user) notFound();

  const name = `${user.name.firstName} ${user.name.lastName}`;

  return {
    title: `${name} - Mi Perfil | ZAG`,
    description: "Gestiona tu perfil personal en ZAG. Actualiza tu información, contraseña y preferencias de cuenta.",
    authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
    keywords: ["perfil", "mi cuenta", "configuración", "ZAG", "tienda online", "usuario"]
  };
}

export default async function Profile() {
  const user = await api.getUser();

  if (!user) notFound();

  return <ProfilePageView user={user} />;
}
