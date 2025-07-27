"use client";

import { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import ProductCategoryItem from "../shared/product-category-item";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
// CUSTOM DATA MODELS
import Shop from "models/Shop.model";
import Brand from "models/Brand.model";

// ======================================================
interface Props {
  shops: Shop[];
  brands: Brand[];
}
// ======================================================

export default function Sidebar({ brands, shops }: Props) {
  const [selected, setSelected] = useState("");
  const [type, setType] = useState<"brands" | "shops">("brands");

  const handleCategoryClick = (slug: string) => () => {
    setSelected((prev) => (prev === slug ? "" : slug));
  };

  const list = useMemo(() => {
    return type === "brands" ? brands : shops;
  }, [type, brands, shops]);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 250,
        height: "100%",
        padding: "1.25rem",
        borderRadius: "10px",
        display: { xs: "none", md: "block" }
      }}>
      <FlexBox mt={-1} mb={1}>
        <Typography
          variant="h3"
          onClick={() => setType("brands")}
          sx={{
            cursor: "pointer",
            padding: "0.5rem 1rem",
            color: type === "brands" ? "grey.900" : "grey.600"
          }}>
          Brands
        </Typography>

        <Typography
          variant="h3"
          sx={{ cursor: "pointer", color: "grey.400", paddingTop: "0.5rem" }}>
          |
        </Typography>

        <Typography
          variant="h3"
          onClick={() => setType("shops")}
          sx={{
            cursor: "pointer",
            padding: "0.5rem 1rem",
            color: type === "shops" ? "grey.900" : "grey.600"
          }}>
          Shops
        </Typography>
      </FlexBox>

      {list.map((item: any) => (
        <ProductCategoryItem
          key={item.id}
          title={item.name}
          isSelected={!!selected.match(item.slug)}
          onClick={handleCategoryClick(item.slug)}
          imgUrl={type === "shops" ? `/assets/images/shops/${item.thumbnail}.png` : item.image}
          sx={{ mb: "0.75rem" }}
        />
      ))}

      <ProductCategoryItem
        title={`View All ${type}`}
        sx={{ mt: 8, bgcolor: "grey.100", justifyContent: "center" }}
      />
    </Card>
  );
}
