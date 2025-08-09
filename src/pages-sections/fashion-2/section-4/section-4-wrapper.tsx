"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "models/Product.model";
import Section4 from "./section-4";
import ProductQuickView from "components/modal/productQuickView";

export default function ProductQuickViewClient() {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const router = useRouter();

  const handleOpen = (product: IProduct) => setSelectedProduct(product);
  const handleClose = () => setSelectedProduct(null);
  const handleViewProduct = () => {
    if (selectedProduct) {
      handleClose();
      router.push(`/products/${selectedProduct.slug}`);
    }
  };

  return (
    <>
      <Section4 onOpenProduct={handleOpen} />
      {selectedProduct && (
        <ProductQuickView
          open={!!selectedProduct}
          onClose={handleClose}
          onViewProduct={handleViewProduct}
          product={selectedProduct}
        />
      )}
    </>
  );
}
