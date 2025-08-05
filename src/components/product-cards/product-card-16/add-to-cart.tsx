"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// MUI
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM HOOKS
import useCart from "hooks/useCart";
import { IProduct, IVariant } from "models/Product.model";

// ==============================================================
type Props = { hasStock: boolean, product: IProduct, selectedVariant: IVariant | undefined; };
// ==============================================================

export default function AddToCart({ hasStock, product, selectedVariant }: Props) {

  const { dispatch } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);

    setTimeout(() => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
      payload: { product, variant: selectedVariant!, qty: 1 }
      });

      router.push("/mini-cart", { scroll: false });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Button
      color="primary"
      variant="outlined"
      loading={isLoading}
      onClick={handleAddToCart}
      sx={{ padding: "3px" }}>
      <Add fontSize="small" />
    </Button>
  );
}
