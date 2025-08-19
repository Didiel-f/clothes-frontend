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
        <HoverActions product={product} onOpen={onOpen}/>
      </CardMedia>

      <CardContent>
        {/* PRODUCT CATEGORY */}
        <p className="category">{category?.name}</p>

        {/* PRODUCT TITLE / NAME */}
        <p className="title">{brand.name} {name}</p>


        {isDiscountAvailable ? (
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              justifyContent: "center", // 👈 esta es la clave
            }}
          >
            <h4
              className="price"
              style={{ textDecoration: "line-through", color: "#999", margin: 0 }}
            >
              {currency(price)}
            </h4>
            <h4 className="price" style={{ color: "#e53935", margin: 0 }}>
              {calculateDiscount(price, discount)}
            </h4>
          </div>
        ) : (
          <h4 className="price">{currency(price)}</h4>
        )}

      </CardContent>
    </Card>
  );
}
