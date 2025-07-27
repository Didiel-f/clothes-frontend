import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import PaymentItem from "./payment-item";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

export default function PaymentSummary() {
  return (
    <Card sx={{ padding: { sm: 3, xs: 2 } }}>
      <PaymentItem title="Subtotal:" amount={2610} />
      <PaymentItem title="Shipping:" />
      <PaymentItem title="Tax:" amount={40} />
      <PaymentItem title="Discount:" amount={40} />

      <Divider sx={{ my: 2 }} />

      <Typography variant="h4" sx={{ textAlign: "right" }}>
        {currency(2650)}
      </Typography>
    </Card>
  );
}
