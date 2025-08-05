"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// MUI
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
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

    setTimeout(() => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
      payload: { product, variant: selectedVariant!, qty: 1 }
      });
      router.push("/mini-cart", { scroll: false });
      setLoading(false);
    }, 500);
  };

  return (
    <Button
      color="primary"
      loading={isLoading}
      variant="contained"
      sx={{ padding: 0.5, minHeight: 0 }}
      disabled={!hasStock || !selectedVariant}
      onClick={handleAddToCart}>
      <Add fontSize="small" />
    </Button>
  );
}
