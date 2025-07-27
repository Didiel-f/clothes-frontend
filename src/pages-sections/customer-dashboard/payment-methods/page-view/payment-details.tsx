import { Fragment } from "react";
import Card from "@mui/material/Card";
import CreditCard from "@mui/icons-material/CreditCard";
// LOCAL CUSTOM COMPONENT
import PaymentForm from "../payment-form";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import Payment from "models/Payment.model";

// ==============================================================
type Props = { payment: Payment };
// ==============================================================

export default function PaymentDetailsPageView({ payment }: Props) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader
        Icon={CreditCard}
        buttonText="Back"
        title="Add New Payment"
        href="/payment-methods"
      />

      {/* PAYMENT DETAILS EDIT FORM */}
      <Card sx={{ padding: 3 }}>
        <PaymentForm payment={payment} />
      </Card>
    </Fragment>
  );
}
