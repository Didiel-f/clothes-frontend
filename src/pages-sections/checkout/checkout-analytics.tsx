"use client";

import { useEffect } from "react";
import { useCartStore, useCartTotals } from "contexts/CartContext";
import { trackBeginCheckout } from "utils/analytics";

/**
 * Componente que trackea el evento begin_checkout de GA4
 * Se monta cuando el usuario entra al checkout
 */
export default function CheckoutAnalytics() {
  const { cart, discountCode } = useCartStore();
  const total = useCartTotals();

  useEffect(() => {
    if (cart.length > 0) {
      trackBeginCheckout(cart, total, discountCode || undefined);
    }
  }, []); // Solo una vez al montar

  return null; // No renderiza nada
}

