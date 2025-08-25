import { Metadata } from "next";
import { AddressPageView } from "pages-sections/customer-dashboard/address/page-view";
// API FUNCTIONS
import api from "utils/__api__/address";

export const metadata: Metadata = {
  title: "Mis Direcciones | ZAG",
  description: "Gestiona tus direcciones de envío guardadas en ZAG. Agrega, edita o elimina direcciones para recibir tus pedidos rápidamente.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["direcciones", "envío", "domicilio", "ZAG", "tienda online", "pedidos", "logística"]
};

// ==============================================================
interface Props {
  searchParams: Promise<{ page: string }>;
}
// ==============================================================

export default async function Address({ searchParams }: Props) {
  const { page } = await searchParams;
  const data = await api.getAddressList(+page || 1);

  if (!data || data.addressList.length === 0) {
    return <div>Data not found</div>;
  }

  return <AddressPageView addressList={data.addressList} totalPages={data.totalPages} />;
}
