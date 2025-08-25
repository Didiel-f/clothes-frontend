import { Metadata } from "next";
import { OrdersPageView } from "pages-sections/customer-dashboard/orders/page-view";
// API FUNCTIONS
import api from "utils/__api__/orders";

export const metadata: Metadata = {
  title: "Mis Pedidos | ZAG",
  description: "Revisa el estado de todos tus pedidos en ZAG. Seguimiento en tiempo real, historial de compras y detalles de envío.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["pedidos", "mis compras", "historial", "seguimiento", "ZAG", "tienda online", "envío"]
};

// ==============================================================
interface Props {
  searchParams: Promise<{ page: string }>;
}
// ==============================================================

export default async function Orders({ searchParams }: Props) {
  const { page } = await searchParams;
  const data = await api.getOrders(+page || 1);

  if (!data || data.orders.length === 0) {
    return <div>Failed to load</div>;
  }

  return <OrdersPageView orders={data.orders} totalPages={data.totalPages} />;
}
