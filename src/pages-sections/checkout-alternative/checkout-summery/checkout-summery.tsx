"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

export default function CheckoutSummary() {
  const { state } = useCart();

  if (!state || !state.cart.length) return null;

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2, color: "secondary.900" }}>
        Your order
      </Typography>

      {state.cart.map(({ title, qty, price, id }) => (
        <FlexBetween mb={1.5} key={id}>
          <p>
            {qty} x {title}
          </p>

          <p>{currency(price)}</p>
        </FlexBetween>
      ))}

      <Box component={Divider} borderColor="grey.300" my={3} />

      <ListItem title="Subtotal" value={2610} />
      <ListItem title="Shipping" />
      <ListItem title="Tax" value={40} />
      <ListItem title="Discount" mb={3} />

      <Box component={Divider} borderColor="grey.300" mb={1} />

      <ListItem title="Total" value={2650} color="inherit" />
    </div>
  );
}

function ListItem({
  title,
  mb = 0.5,
  value = 0,
  color = "grey.600"
}: {
  mb?: number;
  title: string;
  value?: number;
  color?: string;
}) {
  return (
    <FlexBetween mb={mb}>
      <Typography variant="body1" sx={{ color }}>
        {title}:
      </Typography>

      <Typography variant="h6">{value ? currency(value) : "-"}</Typography>
    </FlexBetween>
  );
}
