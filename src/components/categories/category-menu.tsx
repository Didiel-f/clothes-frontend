"use client";

import { MouseEvent, PropsWithChildren, useCallback, useEffect, useState, JSX } from "react";
import { styled } from "@mui/material/styles";

// STYLED COMPONENT
const StyledMenuRoot = styled("div", {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open: boolean }>(({ open, theme: { direction } }) => ({
  cursor: "pointer",
  position: "relative",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
    transform: `rotate(${open ? (direction === "rtl" ? "-90deg" : "90deg") : "0deg"})`
  },
  "& .categories": {
    zIndex: 100,
    position: "relative",
    transition: "all 250ms ease-in-out",
    transform: open ? "scaleY(1)" : "scaleY(0)"
  }
}));

// ===========================================================
interface Props extends PropsWithChildren {
  render: (handler: Function) => JSX.Element;
}
// ===========================================================

export default function CategoryMenu({ render, children }: Props) {
  const [open, setOpen] = useState(false);

  const handleToggleMenu = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen((open) => !open);
  };

  const handleCloseMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    window.addEventListener("click", handleCloseMenu);
    window.addEventListener("scroll", handleCloseMenu);
    return () => {
      window.removeEventListener("click", handleCloseMenu);
      window.removeEventListener("scroll", handleCloseMenu);
    };
  }, [handleCloseMenu]);

  return (
    <StyledMenuRoot open={open}>
      {render(handleToggleMenu)}
      <div className="categories">{children}</div>
    </StyledMenuRoot>
  );
}
