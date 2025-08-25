import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TicketDetailsPageView } from "pages-sections/customer-dashboard/support-tickets/page-view";
// API FUNCTIONS
import api from "utils/__api__/ticket";
// CUSTOM DATA MODEL
import { SlugParams } from "models/Common";

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const ticket = await api.getTicket(slug);

  return {
    title: `${ticket.title} | ZAG`,
    description: `Revisa los detalles de tu ticket de soporte "${ticket.title}" en ZAG. Estado, respuestas y seguimiento de tu consulta.`,
    authors: [{ name: "Didiel Figueroa", url: "figueroadidiel@gmail.com" }],
    keywords: ["ticket", "soporte", "consulta", "ayuda", "ZAG", "tienda online", "atención al cliente"]
  };
}

export default async function SupportTicketDetails({ params }: SlugParams) {
  const { slug } = await params;
  const ticket = await api.getTicket(slug);

  if (!ticket) notFound();

  return <TicketDetailsPageView ticket={ticket} />;
}
