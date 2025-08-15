"use client";

import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM HOOK
import { useCartStore } from "contexts/CartContext";
// LOCAL CUSTOM COMPONENTS
import CartItem from "../cart-item";
import CheckoutForm from "../checkout-form";

export default function CartPageView() {
  const { cart } = useCartStore();

  return (
    <Grid container spacing={3}>
      {/* CART PRODUCT LIST */}
      <Grid size={{ md: 8, xs: 12 }}>
        {cart.map((item) => (
          <CartItem key={item.variant.documentId} item={item} />
        ))}
      </Grid>

      {/* CHECKOUT FORM */}
      <Grid size={{ md: 4, xs: 12 }}>
        <CheckoutForm />
      </Grid>
    </Grid>
  );
}
