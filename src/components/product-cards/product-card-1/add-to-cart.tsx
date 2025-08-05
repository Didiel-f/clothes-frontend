"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
// GLOBAL CUSTOM HOOKS
import useCart from "hooks/useCart";
import { IProduct, IVariant } from "models/Product.model";
// CUSTOM DATA MODEL

// ==============================================================
type Props = { hasStock: boolean, product: IProduct, selectedVariant: IVariant | undefined; };
// ==============================================================

export default function AddToCart({ hasStock, product, selectedVariant }: Props) {
  const { dispatch } = useCart();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

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
      variant="outlined"
      loading={isLoading}
      onClick={handleAddToCart}
      disabled={!hasStock || !selectedVariant}
      sx={{ padding: "3px", alignSelf: "self-end" }}>
      <Add fontSize="small" />
    </Button>
  );
}
