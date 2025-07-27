"use client";

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const TableRow = styled(Card)(({ theme }) => ({
  gap: 16,
  marginBlock: "1.25rem",
  display: "grid",
  borderRadius: 10,
  cursor: "pointer",
  alignItems: "center",
  padding: "1rem 1.2rem",
  gridTemplateColumns: "1.5fr 2fr 1.5fr auto",
  [theme.breakpoints.down("sm")]: {
    gap: 8,
    gridTemplateColumns: "repeat(2, 1fr)"
  },
  ".east": {
    color: theme.palette.grey[500],
    transform: `rotate(${theme.direction === "rtl" ? "180deg" : "0deg"})`
  }
}));

export default TableRow;
