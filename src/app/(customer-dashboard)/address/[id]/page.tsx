import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddressDetailsPageView } from "pages-sections/customer-dashboard/address/page-view";
// API FUNCTIONS
import api from "utils/__api__/address";
// CUSTOM DATA MODEL
import { IdParams } from "models/Common";

export async function generateMetadata({ params }: IdParams): Promise<Metadata> {
  const { id } = await params;
  const address = await api.getAddress(id);
  if (!address) notFound();

  return {
    title: `${address.regionName} - Detalles de Dirección | ZAG`,
    description: `Gestiona tu dirección de envío en ${address.regionName}. Edita o elimina esta dirección de tu cuenta ZAG.`,
    authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
    keywords: ["dirección", "envío", "domicilio", "editar", "ZAG", "tienda online", "logística"]
  };
}

export default async function Address({ params }: IdParams) {
  const { id } = await params;
  const address = await api.getAddress(id);

  if (!address) notFound();

  return <AddressDetailsPageView address={address} />;
}
