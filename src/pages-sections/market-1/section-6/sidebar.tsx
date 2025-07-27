"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
// LOCAL CUSTOM COMPONENT
import ProductCategoryItem from "../shared/product-category-item";
// CUSTOM DATA MODELS
import Brand from "models/Brand.model";

// ==============================================================
type Props = { brands: Brand[] };
// ==============================================================

export default function Sidebar({ brands }: Props) {
  const [selected, setSelected] = useState("");

  const handleCategoryClick = (brand: Brand) => () => {
    if (selected === brand.slug) setSelected("");
    else setSelected(brand.slug);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 250,
        height: "100%",
        minWidth: "240px",
        padding: "1.25rem",
        display: { xs: "none", md: "block" }
      }}>
      {brands.map((brand) => (
        <ProductCategoryItem
          id={brand.id}
          key={brand.id}
          title={brand.name}
          imgUrl={brand.image}
          sx={{ mb: "0.75rem" }}
          onClick={handleCategoryClick(brand)}
          isSelected={selected === brand.slug}
        />
      ))}

      <ProductCategoryItem
        id="all"
        title="View All Brands"
        isSelected={selected === "all"}
        sx={{ mt: 8, height: 44, justifyContent: "center" }}
      />
    </Card>
  );
}
