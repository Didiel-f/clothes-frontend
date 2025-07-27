"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const RootContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open: boolean }>(({ open, theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: ".5rem 1rem",
  justifyContent: "space-between",
  ".caret": {
    transition: "transform 250ms ease-in-out",
    transform: `rotate(${open ? "90deg" : "0deg"})`,
    ...(theme.direction === "rtl" && {
      transform: `rotate(${open ? "90deg" : "180deg"})`
    })
  }
}));
