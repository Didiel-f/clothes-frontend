"use client";

import { useEffect } from "react";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM HOOK
import { useCartStore } from "contexts/CartContext";
// LOCAL CUSTOM COMPONENTS
import CartItem from "../cart-item";
import CheckoutSummary from "pages-sections/checkout/checkout-summery";
// GOOGLE ANALYTICS
import { trackViewCart } from "utils/analytics";

export default function CartPageView() {
  const { cart } = useCartStore();

  // 📊 Google Analytics: Trackear vista del carrito
  useEffect(() => {
    if (cart.length > 0) {
      trackViewCart(cart);
    }
  }, []); // Solo cuando se monta el componente

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
        <CheckoutSummary showShipping={false} />
      </Grid>
    </Grid>
  );
}
