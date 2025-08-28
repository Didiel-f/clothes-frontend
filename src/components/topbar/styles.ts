"use client";

import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

import { layoutConstant } from "utils/constants";

export const StyledRoot = styled("div", {
  shouldForwardProp: (prop) => prop !== "bgColor" && prop !== "expand"
})<{ bgColor?: string; expand: boolean }>(({ theme, bgColor, expand }) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  color: theme.palette.secondary.contrastText,
  background: bgColor || theme.palette.primary[600],
  transition: "height 300ms ease",
  "& .menuItem": { minWidth: 100 },
  "& .marginRight": { marginRight: "1.25rem" },
  "& .expand": { display: "none", padding: 0 },
  "& .handler": { height: layoutConstant.topbarHeight },
  "& .menuTitle": { fontSize: 12, marginLeft: "0.5rem", fontWeight: 600 },
  "& .topbarRight": { display: "flex", alignItems: "center" },

  [theme.breakpoints.down("sm")]: {
    height: expand ? 80 : layoutConstant.topbarHeight,
    "& .MuiSvgIcon-root": { color: "white" },
    "& .topbarRight": {
      paddingBottom: 5,
      alignItems: "center",
      display: expand ? "flex" : "none"
    },
    "& .expand": {
      display: "block",
      height: layoutConstant.topbarHeight
    }
  }
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: { alignItems: "start", flexDirection: "column" }
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  color: "white",
  fontWeight: 600,
  backgroundColor: theme.palette.secondary.main,
  "& .MuiChip-label": { paddingInline: ".8rem" }
}));

export const LeftContent = styled("div")(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  ".tag": {
    gap: ".5rem",
    display: "flex",
    alignItems: "center"
  },
  ".title": {
    fontSize: "14px",
    fontWeight: 500,
    color: "white"
  }
}));
