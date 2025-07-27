import { Fragment } from "react";
// CUSTOM ICON COMPONENT
import CustomerService from "icons/CustomerService";
// LOCAL CUSTOM COMPONENTS
import TicketCard from "../ticket-card";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import Ticket from "models/Ticket.model";

// =============================================
interface Props {
  tickets: Ticket[];
  totalPages: number;
}
// =============================================

export default function TicketsPageView({ tickets, totalPages }: Props) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader title="Support Ticket" Icon={CustomerService} />

      {/* SUPPORT TICKET LIST AREA */}
      {tickets.map((item) => (
        <TicketCard ticket={item} key={item.id} />
      ))}

      {/* PAGINATION AREA */}
      <Pagination count={totalPages} />
    </Fragment>
  );
}
