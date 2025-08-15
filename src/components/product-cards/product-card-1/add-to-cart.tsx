"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
// GLOBAL CUSTOM HOOKS
import { IProduct, IVariant } from "models/Product.model";
import { useCartStore } from "contexts/CartContext";
// CUSTOM DATA MODEL

// ==============================================================
type Props = { hasStock: boolean, product: IProduct, selectedVariant: IVariant | undefined; };
// ==============================================================

export default function AddToCart({ hasStock, product, selectedVariant }: Props) {
  const { addItem } = useCartStore();

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    setLoading(true);
    addItem({
      product,               // el precio viene aquí, como dijiste
      variant: selectedVariant, // la variante tiene su propio documentId
      qty: 1,
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
