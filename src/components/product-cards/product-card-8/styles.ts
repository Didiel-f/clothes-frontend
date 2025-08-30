"use client";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

export const Card = styled("div")({
  ":hover": {
    img: { transform: "scale(1.1)" },
    ".product-actions": { right: 15 },
    ".product-view-action": { opacity: 1 }
  }
});

export const CardMedia = styled("div")(({ theme }) => ({
  aspectRatio: "1/1",
  borderRadius: 12,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.grey[100],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    transition: "0.3s",
    width: "100%",
    height: "100%",
    objectFit: "contain"
  }
}));

export const CardContent = styled("div")(({ theme }) => ({
  padding: "1rem",
  textAlign: "center",
  "& .title": { fontSize: 16, fontWeight: 600 },
  "& .category": { fontSize: 12, color: theme.palette.grey[500] },
  "& .price": { fontSize: 16, fontWeight: 600, paddingBlock: "0.25rem" },
  "& .ratings": {
    gap: ".5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .total": { fontSize: 12, color: theme.palette.grey[500] }
  }
}));

export const FavoriteButton = styled(IconButton)(({ theme }) => ({
  top: 15,
  right: -40,
  position: "absolute",
  backgroundColor: "white",
  transition: "right 0.3s .1s",
  color: theme.palette.text.primary,
  ".icon": { fontSize: 16 },

  [theme.breakpoints.down("sm")]: {
    right: 15,
    transition: "none",
  },

  [theme.breakpoints.up("sm")]: {
    ".MuiCardMedia-root:hover &": {
      right: 15,
    },
  },
}));


export const AddToCartButton = styled(IconButton)(({ theme }) => ({
  top: 55,
  right: -40,
  position: "absolute",
  backgroundColor: "white",
  transition: "right 0.3s .2s",
  color: theme.palette.text.primary,
  ".icon": { fontSize: 16 }
}));

export const QuickViewButton = styled(Button)({
  left: 0,
  bottom: 12,
  opacity: 0,
  borderRadius: 12,
  position: "absolute",
  transition: "opacity 0.5s",
  display: "none",
  "@media (min-width: 768px)": {
    display: "block"
  }
});
