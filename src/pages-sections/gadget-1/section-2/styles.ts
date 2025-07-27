"use client";

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

export const Title = styled("h2")(() => ({
  fontSize: 25,
  lineHeight: 1,
  fontWeight: 600,
  marginBottom: "2rem"
}));

export const StyledRoot = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  textAlign: "center",
  padding: "2rem 0.5rem",
  "& .icon-box": {
    width: 60,
    height: 60,
    margin: "auto",
    display: "grid",
    borderRadius: 12,
    placeItems: "center",
    color: theme.palette.primary.main,
    transition: "all 0.3s ease-in-out",
    backgroundColor: theme.palette.grey[100]
  },

  "& .content": {
    paddingTop: "2rem",
    textAlign: "center",
    "& h6": { fontSize: 14, fontWeight: 600, transition: "all 0.3s ease-in-out" },
    "& p": { fontSize: 12, fontWeight: 500, color: theme.palette.grey[600] }
  },

  ":hover": {
    boxShadow: theme.shadows[5],
    "& .content h6": { color: theme.palette.primary.main }
  }
}));
