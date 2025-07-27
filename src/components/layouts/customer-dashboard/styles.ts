"use client";

import Link from "next/link";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Card)(({ theme }) => ({
  paddingBottom: "1.5rem",
  [theme.breakpoints.down("md")]: {
    boxShadow: "none",
    overflowY: "auto",
    height: "calc(100vh - 64px)"
  }
}));

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive"
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  display: "flex",
  alignItems: "center",
  borderLeft: "4px solid",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.25rem",
  justifyContent: "space-between",
  borderColor: "transparent",
  transition: "all 0.2s ease-in-out",
  "& .title": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1)
  },
  "& .nav-icon": { color: theme.palette.grey[600] },
  "&:hover": {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    "& .nav-icon": { color: theme.palette.primary.main }
  },

  ...(isActive && {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    "& .nav-icon": { color: theme.palette.primary.main }
  })
}));
