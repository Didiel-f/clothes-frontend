import { Metadata } from "next";
import { PaymentMethodsPageView } from "pages-sections/customer-dashboard/payment-methods/page-view";
// API FUNCTIONS
import api from "utils/__api__/payments";

export const metadata: Metadata = {
  title: "Métodos de Pago | ZAG",
  description: "Gestiona tus métodos de pago guardados en ZAG. Agrega, edita o elimina tarjetas y cuentas bancarias de forma segura.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["métodos de pago", "tarjetas", "cuentas bancarias", "pagos", "ZAG", "tienda online", "seguridad"]
};

// ==============================================================
interface Props {
  searchParams: Promise<{ page: string }>;
}
// ==============================================================

export default async function PaymentMethods({ searchParams }: Props) {
  const { page } = await searchParams;
  const data = await api.getPayments(+page || 1);

  if (!data || data.payments.length === 0) {
    return <div>Data not found</div>;
  }

  return <PaymentMethodsPageView payments={data.payments} totalPages={data.totalPages} />;
}
