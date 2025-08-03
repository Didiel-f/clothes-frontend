"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// CUSTOM DATA MODEL
import { IProduct, IVariant } from "models/Product.model";

// ================================================================
type Props = { hasStock: boolean, product: IProduct, selectedVariant: IVariant | undefined; };
// ================================================================

export default function AddToCart({ hasStock, product, selectedVariant }: Props) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { dispatch } = useCart();
  const handleAddToCart = () => {
    setLoading(true);
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { product, variant: selectedVariant!, qty: 1 }
    });

    router.push("/mini-cart", { scroll: false });
    setLoading(false);
  };

  return (
    <Button
      color="primary"
      variant="contained"
      loading={isLoading}
      onClick={handleAddToCart}
      disabled={!hasStock || !selectedVariant}
      sx={{ mb: 4.5, px: "1.75rem", height: 40 }}>
      Añadir al carrito
    </Button>
  );
}
