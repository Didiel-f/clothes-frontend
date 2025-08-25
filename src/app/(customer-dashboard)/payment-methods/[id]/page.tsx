import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentDetailsPageView } from "pages-sections/customer-dashboard/payment-methods/page-view";
// API FUNCTIONS
import api from "utils/__api__/payments";
// TYPES
import { IdParams } from "models/Common";

export const metadata: Metadata = {
  title: "Detalles del Método de Pago | ZAG",
  description: "Edita o elimina tu método de pago guardado en ZAG. Mantén tu información de pago actualizada y segura.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["método de pago", "editar", "eliminar", "pagos", "ZAG", "tienda online", "configuración"]
};

export default async function PaymentMethodDetails({ params }: IdParams) {
  const { id } = await params;
  const payment = await api.getPayment(id);

  if (!payment) notFound();

  return <PaymentDetailsPageView payment={payment} />;
}
