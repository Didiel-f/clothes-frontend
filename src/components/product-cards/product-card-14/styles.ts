"use client";

import { styled } from "@mui/material/styles";

export const StyledRoot = styled("div")(({ theme }) => ({
  "& .img-wrapper": {
    display: "flex",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: "1rem",
    backgroundColor: theme.palette.grey[50],
    img: { transition: "all 1s cubic-bezier(0, 0, 0.1, 1)" }
  },

  ":hover .img-wrapper > img": { scale: 0.9 }
}));

export const PriceText = styled("p")(({ theme }) => ({
  gap: 8,
  fontSize: 17,
  fontWeight: 600,
  marginTop: 4,
  marginBottom: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  ".base-price": {
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "line-through",
    color: theme.palette.grey[600]
  }
}));

export const Content = styled("div")(({ theme }) => ({
  textAlign: "center",
  ".button-small": { maxWidth: 170, margin: "auto" }
}));
