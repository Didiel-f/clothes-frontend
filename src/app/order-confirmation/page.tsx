import { Metadata } from "next";
import { OrderConfirmationPageView } from "pages-sections/order-confirmation";

export const metadata: Metadata = {
  title: "Confirmación de Pedido | ZAG",
  description: "Tu pedido ha sido confirmado exitosamente. Recibirás un email con los detalles de tu compra y seguimiento del envío.",
  authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
  keywords: ["confirmación", "pedido", "compra exitosa", "ZAG", "tienda online", "envío"]
};

export default function OrderConfirmation() {
  return <OrderConfirmationPageView />;
}
