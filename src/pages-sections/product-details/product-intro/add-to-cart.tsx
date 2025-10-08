"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { IProduct, IVariant } from "models/Product.model";
import { useCartStore } from "contexts/CartContext";
// GOOGLE ANALYTICS
import { trackAddToCart } from "utils/analytics";

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
  
    const qty = 1;
    
    // Agregar al carrito
    addItem({
      product,               // el precio viene aquí, como dijiste
      variant: selectedVariant, // la variante tiene su propio documentId
      qty,
    });

    // 📊 Google Analytics: Trackear agregar al carrito
    trackAddToCart(product, selectedVariant, qty);
  
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
