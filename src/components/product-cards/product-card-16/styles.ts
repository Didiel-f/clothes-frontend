"use client";

import { styled, alpha } from "@mui/material/styles";

export const StyledRoot = styled("div")(({ theme }) => ({
  borderRadius: 12,
  overflow: "hidden",
  border: `1px solid ${theme.palette.grey[300]}`,
  "&:hover .img-wrapper img": { scale: 1.1 },
  "& .img-wrapper": {
    display: "flex",
    position: "relative",
    backgroundColor: theme.palette.grey[50],
    img: { transition: "0.3s" }
  },
  "& .content": {
    padding: "1rem",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between"
  }
}));


export const PriceText = styled("p")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "baseline",
  gap: 8,
  marginTop: ".75rem",
  padding: "6px 10px",
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.primary.main, 0.10),
  color: theme.palette.primary.dark,
  fontWeight: 700,
  fontSize: 18,
  lineHeight: 1,
  fontVariantNumeric: "tabular-nums",
  ".currency": { fontSize: 14, opacity: 0.8, marginRight: 2 },
  ".base-price": {
    fontSize: 13,
    marginLeft: 8,
    textDecoration: "line-through",
    color: theme.palette.grey[600],
  },
}));

