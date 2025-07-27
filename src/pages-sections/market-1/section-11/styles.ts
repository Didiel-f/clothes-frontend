"use client";

import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const StyledFab = styled(Fab)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: 12,
  fontSize: "1.75rem",
  boxShadow: theme.shadows[0],
  backgroundColor: theme.palette.grey[100],
  "& .MuiSvgIcon-root": { color: theme.palette.grey[600] }
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: "3rem",
  height: "100%",
  display: "flex",
  borderRadius: 12,
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  transition: "all 300ms ease-out",
  ":hover": { boxShadow: theme.shadows[2] },

  "& h4": {
    fontWeight: 500,
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1.25)
  },

  "& p": {
    color: theme.palette.grey[600]
  }
}));
