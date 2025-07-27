"use client";

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const StyledCard = styled(Card)(({ theme }) => ({
  padding: "3rem 4rem",
  boxShadow: theme.shadows[6],
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top right",
  backgroundImage: `linear-gradient(to right,#fff 75%, transparent), url(/assets/images/products/bg-gradient.png)`,
  ":hover": { boxShadow: theme.shadows[4] },
  ".content": { maxWidth: 390 },
  [theme.breakpoints.down("sm")]: { padding: "2rem" },

  "& .description": {
    marginTop: "0.5rem",
    marginBottom: "1.5rem",
    color: theme.palette.grey[600]
  },

  "& .title": {
    fontSize: 25,
    fontWeight: 600,
    lineHeight: 1.3
  }
}));
