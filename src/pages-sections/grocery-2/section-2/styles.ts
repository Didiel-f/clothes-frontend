"use client";

import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const ServiceCard = styled("div")(({ theme }) => ({
  gap: "1rem",
  display: "flex",
  flexWrap: "wrap",
  padding: "1.5rem",
  borderRadius: "8px",
  alignItems: "center",
  border: `1px solid ${theme.palette.grey[400]}`,
  "& .description": { color: theme.palette.grey[600] },
  ".title": { fontSize: 20, fontWeight: 600, color: theme.palette.grey[900] },
  [theme.breakpoints.between("sm", "md")]: {
    textAlign: "center",
    padding: "1rem 0.5rem",
    flexDirection: "column"
  }
}));
