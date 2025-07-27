"use client";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default styled(Box)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  position: "relative",
  "&:hover:after": { opacity: 0.3 },
  "&:after": {
    inset: 0,
    zIndex: 1,
    opacity: 0,
    content: '""',
    width: "100%",
    height: "100%",
    position: "absolute",
    transition: "all 250ms ease-in-out",
    backgroundColor: theme.palette.action.active
  }
}));
