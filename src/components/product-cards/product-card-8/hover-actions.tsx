"use client";

import { Fragment, useState } from "react";
// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// CUSTOM COMPONENTS
import { FavoriteButton, QuickViewButton } from "./styles";
import { IProduct } from "models/Product.model";

// ==============================================================
type Props = { onOpen: () => void; };
// ==============================================================

export default function HoverActions({ onOpen }: Props) {
  const [isFavorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite((state) => !state);
  };

  return (
    <div className="hidden md:block">
      {/* PRODUCT FAVORITE BUTTON */}
      <FavoriteButton className="product-actions" onClick={handleFavorite}>
        {isFavorite ? (
          <Favorite className="icon" fontSize="small" color="primary" />
        ) : (
          <FavoriteBorder className="icon" fontSize="small" />
        )}
      </FavoriteButton>

      {/* PRODUCT QUICK VIEW BUTTON */}
      <div className="quick-view-btn">
        <QuickViewButton
          fullWidth
          size="large"
          color="dark"
          variant="contained"
          className="product-view-action"
          onClick={() => onOpen()}>
          Vista rápida
        </QuickViewButton>
      </div>

    </div>
  );
}
