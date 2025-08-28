"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

// ==============================================================
type LinkProps = { isDark?: boolean };
// ==============================================================

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isDark"
})<LinkProps>(({ theme, isDark }) => ({
  borderRadius: 4,
  display: "block",
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  ...(!isDark && {
    color: theme.palette.grey[900],
    "&:hover": { color: theme.palette.grey[100] }
  })
}));

export const StyledFooter = styled("footer")(({ theme }) => ({
  color: "white",
  borderRadius: 12,
  padding: "2.5rem",
  marginBottom: "1rem",
  "& .links": {
    marginTop: "4rem",
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: { marginTop: 0 }
  },
  [theme.breakpoints.down("lg")]: { marginBottom: "5rem" }
}));

export const StyledRoot = styled("footer")(({ theme }) => ({
  color: "white",
  borderRadius: 8,
  padding: "2.5rem",
  marginBottom: "1rem",
  background: theme.palette.primary[600],
  [theme.breakpoints.down("md")]: { marginBottom: "5rem !important" }
}));

export const Heading = styled("h6")(({ theme }) => ({
  fontSize: 18,
  lineHeight: 1,
  fontWeight: 500,
  marginBottom: 12,
  color:theme.palette.grey[900],
}));

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "variant"
})<{ variant: "light" | "dark" }>(({ variant, theme }) => ({
  margin: 4,
  fontSize: 12,
  padding: "10px",
  ".icon": { color: "white" },
  ...(variant === "light" && { backgroundColor: "rgba(0,0,0,0.2)" }),
  ...(variant === "dark" && {
    backgroundColor: theme.palette.grey[700],
    ":hover": { backgroundColor: theme.palette.grey[800] }
  })
}));

export const AppItem = styled("div")({
  gap: 8,
  margin: 8,
  color: "white",
  display: "flex",
  borderRadius: 8,
  padding: "12px 16px",
  alignItems: "center",
  backgroundColor: "#161d2b",
  "& .title": { fontSize: "14px", fontWeight: 500, lineHeight: 1.3 },
  "& .subtitle": { lineHeight: 1, fontSize: "8px" }
});
