"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const Wrapper = styled("div")(({ theme }) => ({
  gap: 10,
  minHeight: 350,
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "end",
  ":hover img": { transform: "scale(1.1)" },

  "& img": {
    objectFit: "cover",
    objectPosition: "top center",
    transition: "all 4s cubic-bezier(0, 0, 0.1, 1)"
  },

  "& .content": {
    zIndex: 1,
    width: "100%",
    textAlign: "center",
    padding: "2rem",
    position: "relative",
    "& .title": {
      fontWeight: 600,
      lineHeight: 1.3,
      fontSize: "1.5rem"
    },
    "& .badge": {
      fontSize: 16,
      marginBottom: 4,
      display: "inline-block"
    }
  }
}));
