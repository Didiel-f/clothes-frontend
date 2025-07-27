"use client";

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const FB_STYLE = { background: "#3B5998", color: "white" };
const GOOGLE_STYLE = { background: "#4285F4", color: "white" };

export const Wrapper = styled(Card)(({ theme }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: { width: "100%" },
  ".agreement": { marginTop: 12, marginBottom: 24 },
  ".googleButton": { ...GOOGLE_STYLE, "&:hover": { ...GOOGLE_STYLE } },
  ".facebookButton": { marginBottom: 10, ...FB_STYLE, "&:hover": { ...FB_STYLE } }
}));
