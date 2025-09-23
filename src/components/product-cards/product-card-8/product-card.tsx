"use client";

import Link from "next/link";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import HoverActions from "./hover-actions";
// CUSTOM UTILS LIBRARY FUNCTION
import { calculateDiscount, currency } from "lib";
// STYLED COMPONENTS
import { Card, CardMedia, CardContent } from "./styles";
import { IProduct } from "models/Product.model";
import { getDiscount } from "components/utils/getDiscount";
import DiscountChip from "../discount-chip";
import { Box, Typography, alpha, Chip } from "@mui/material";

// ==============================================================
type Props = { product: IProduct, onOpen: () => void; };
// ==============================================================

export default function ProductCard8({ product, onOpen }: Props) {
  const { slug, name, price, images, category, brand } = product;
  const { isDiscountAvailable, discount } = getDiscount(product);

  function getFirstImageUrl(images: unknown): string {
    if (Array.isArray(images) && images.length > 0) {
      const url = (images[0] as any)?.url;
      if (typeof url === "string" && url.length > 0) return url;
    }
    return "/assets/images/faces/7.png"; // fallback
  }

  const imgSrc = getFirstImageUrl(images);

  return (
    <Card>
      <CardMedia>
        <Link href={`/products/${slug}`}>
          <LazyImage
            width={2000}
            height={2000}
            src={imgSrc}
            alt="category"
            className="product-img"
          />
        </Link>
        {/* PRODUCT PRICE */}
        {isDiscountAvailable && <DiscountChip discount={discount} />}
        <HoverActions onOpen={onOpen} />
      </CardMedia>

      <CardContent>
        {/* PRODUCT CATEGORY */}
        <p className="category">{category?.name}</p>

        {/* PRODUCT TITLE / NAME */}
        <p className="title">{brand.name} {name}</p>

        {isDiscountAvailable ? (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", color: "text.disabled", m: 0 }}
            >
              {currency(price)}
            </Typography>

            {/* Precio con pill */}
            <Typography
              component="strong"
              sx={(theme) => ({
                m: 0,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontWeight: 800,
                fontSize: 20,
                lineHeight: 1,
                color: theme.palette.error.main,
                backgroundColor: alpha(theme.palette.error.main, 0.12),
                fontVariantNumeric: "tabular-nums",
              })}
            >
              {calculateDiscount(price, discount)}
            </Typography>

            {/* Badge con el % off */}
            <Chip
              label={`-${discount}%`}
              color="error"
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </Box>
        ) : (
          <Typography
            component="strong"
            sx={{
              display: "inline-block",
              mt: 0.5,
              fontWeight: 800,
              fontSize: 20,
              color: "primary.main",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {currency(price)}
          </Typography>
        )}

      </CardContent>
    </Card>
  );
}
