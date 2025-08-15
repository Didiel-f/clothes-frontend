"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// MUI
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM HOOKS
import { IProduct, IVariant } from "models/Product.model";
import { useCartStore } from "contexts/CartContext";

// ==============================================================
type Props = { hasStock: boolean, product: IProduct, selectedVariant: IVariant | undefined; };
// ==============================================================

export default function AddToCart({ hasStock, product, selectedVariant }: Props) {

  const { updateQty } = useCartStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    if(!selectedVariant) return
    setIsLoading(true);
    updateQty(selectedVariant?.documentId, 1 )
    router.push("/mini-cart", { scroll: false });
    setIsLoading(false);
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
