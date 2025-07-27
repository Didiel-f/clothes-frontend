"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
// STYLED COMPONENT
import { HoverWrapper } from "./styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ==============================================================
type Props = { product: Product };
// ==============================================================

export default function HoverActions({ product }: Props) {
  const { id, title, price, thumbnail, slug } = product;

  const { dispatch } = useCart();

  const router = useRouter();
  const [isFavorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite((state) => !state);
  };

  const handleAddToCart = () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { id, slug, price, title, thumbnail, qty: 1 }
    });

    router.push("/mini-cart", { scroll: false });
  };

  return (
    <HoverWrapper className="controller">
      <span onClick={() => router.push(`/products/${slug}/view`, { scroll: false })}>
        <RemoveRedEye />
      </span>

      <Divider orientation="horizontal" flexItem />

      <span onClick={handleFavorite}>
        {isFavorite ? (
          <Favorite color="primary" fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" color="primary" />
        )}
      </span>

      <Divider orientation="horizontal" flexItem />

      <span onClick={handleAddToCart}>
        <AddShoppingCart />
      </span>
    </HoverWrapper>
  );
}
