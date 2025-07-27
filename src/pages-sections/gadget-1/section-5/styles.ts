"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const Wrapper = styled("div")(({ theme }) => ({
  gap: 10,
  minHeight: 300,
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "center",
  ":hover img": { transform: "scale(1.1)" },

  "& img": {
    objectFit: "cover",
    transition: "all 4s cubic-bezier(0, 0, 0.1, 1)"
  },

  "& .content": {
    zIndex: 1,
    maxWidth: 330,
    paddingLeft: "3rem",
    position: "relative",
    "& .title": {
      fontWeight: 600,
      lineHeight: 1.3,
      fontSize: "2rem"
    },
    "& .btn": {
      fontWeight: 600,
      fontSize: 12,
      marginTop: "2rem",
      display: "inline-block",
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },

    [theme.breakpoints.down("sm")]: { paddingLeft: "2rem", maxWidth: 270 }
  }
}));
