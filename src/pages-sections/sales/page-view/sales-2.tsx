"use client";

import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import ProductList from "../product-list";
import ProductPagination from "../product-pagination";
import { IProduct } from "models/Product.model";
// CUSTOM DATA MODEL

// ==============================================================
interface Props {
  page: number;
  pageSize: number;
  products: IProduct[];
  totalProducts: number;
}
// ==============================================================

export default function SalesTwoPageView({ products, page }: Props) {
  return (
    <Container className="mt-2">
      {/* PRODUCT LIST AREA */}
      <ProductList products={products} />

      {/* PAGINATION AREA */}
      <ProductPagination page={page} perPage={20} totalProducts={100} />
    </Container>
  );
}
