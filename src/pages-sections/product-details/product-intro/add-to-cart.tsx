"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { IProduct, IVariant } from "models/Product.model";
import { useCartStore } from "contexts/CartContext";

type Props = {
  hasStock: boolean;
  product: IProduct;
  selectedVariant: IVariant | undefined;
};

export default function AddToCart({ hasStock, product, selectedVariant }: Props) {
  const router = useRouter();
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (!selectedVariant) return;
  
    addItem({
      product,               // el precio viene aquí, como dijiste
      variant: selectedVariant, // la variante tiene su propio documentId
      qty: 1,
    });
  
    router.push("/mini-cart", { scroll: false });
  };
  

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={handleAddToCart}
      disabled={!hasStock || !selectedVariant}
      sx={{ mb: 4.5, px: "1.75rem", height: 40 }}
    >
      Añadir al carrito
    </Button>
  );
}
