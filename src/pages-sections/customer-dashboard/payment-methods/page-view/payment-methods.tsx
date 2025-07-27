import { Fragment } from "react";
import CreditCard from "@mui/icons-material/CreditCard";
// LOCAL CUSTOM COMPONENT
import ListCard from "../list-card";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import Payment from "models/Payment.model";

// ==============================================================
type Props = { payments: Payment[]; totalPages: number };
// ==============================================================

export default function PaymentMethodsPageView({ payments, totalPages }: Props) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={CreditCard} title="Payment Methods" />

      {/* ALL PAYMENT LIST AREA */}
      {payments.map((item) => (
        <ListCard
          id={item.id}
          key={item.id}
          exp={item.exp}
          card_no={item.card_no}
          username={item.user}
          payment_method={item.payment_method}
        />
      ))}

      {/* PAGINATION AREA */}
      <Pagination count={totalPages} />
    </Fragment>
  );
}
