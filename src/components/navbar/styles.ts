"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { NavLink } from "components/nav-link";

// COMMON STYLED OBJECT
export const NAV_LINK_STYLES = {
  fontWeight: 500,
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  "&:hover": { color: "primary.main" },
  "&:last-child": { marginRight: 0 }
};

export const StyledNavLink = styled(NavLink)({ ...NAV_LINK_STYLES });

export const ParentNav = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active"
})<{ active: number }>(({ theme, active }) => ({
  position: "relative",
  ...(active && { color: theme.palette.primary.main }),
  "& .arrow": { fontSize: ".875rem" },
  ":dir(rtl) .arrow": { transform: "rotate(180deg)" },
  "&:hover": {
    color: theme.palette.primary.main,
    "& > .parent-nav-item": { display: "block" }
  }
}));

export const ParentNavItem = styled("div", {
  shouldForwardProp: (prop) => prop !== "right"
})<{ right: boolean }>(({ right }) => ({
  top: 0,
  zIndex: 5,
  left: "100%",
  paddingLeft: 8,
  display: "none",
  position: "absolute",
  ...(right && { right: "100%", left: "auto", paddingRight: 8 })
}));

export const NavBarWrapper = styled(Card, {
  shouldForwardProp: (prop) => prop !== "border"
})<{ border: number }>(({ theme, border }) => ({
  height: "60px",
  display: "block",
  overflow: "unset",
  borderRadius: "0px",
  position: "relative",
  ...(border && { borderBottom: `1px solid ${theme.palette.grey[200]}` }),
  [theme.breakpoints.down(1150)]: { display: "none" }
}));

export const InnerContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== "centered"
})<{ centered?: boolean }>(({ centered }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: centered ? "center" : "space-between"
}));

export const CategoryMenuButton = styled(Button)(({ theme }) => ({
  width: 278,
  backgroundColor: theme.palette.grey[100],
  ".prefix": {
    gap: 8,
    flex: 1,
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey[800],
    ".icon": { color: theme.palette.primary.main }
  },

  ".dropdown-icon": {
    fontSize: "1rem",
    color: theme.palette.grey[600],
    ...(theme.direction === "rtl" && { rotate: "180deg" })
  }
}));

export const ChildNavListWrapper = styled("div")({
  zIndex: 5,
  left: "50%",
  top: "100%",
  display: "none",
  position: "absolute",
  transform: "translate(-50%, 0%)"
});
