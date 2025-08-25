import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/customer-dashboard/orders/page-view";
// API FUNCTIONS
import api from "utils/__api__/orders";
// CUSTOM DATA MODEL
import { IdParams } from "models/Common";

export async function generateMetadata({ params }: IdParams): Promise<Metadata> {
  const { id } = await params;
  const order = await api.getOrder(id);
  if (!order) notFound();

  return {
    title: `Pedido #${order.id} | ZAG`,
    description: `Revisa los detalles completos de tu pedido #${order.id} en ZAG. Estado del envío, productos y facturación.`,
    authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
    keywords: ["pedido", "detalles", "seguimiento", "envío", "ZAG", "tienda online", "facturación"]
  };
}

export default async function OrderDetails({ params }: IdParams) {
  const { id } = await params;
  const order = await api.getOrder(id);

  if (!order) notFound();

  return <OrderDetailsPageView order={order} />;
}
