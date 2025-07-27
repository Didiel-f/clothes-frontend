import { styled, keyframes } from "@mui/material/styles";

const headerHeight = 72;

const slideFromTop = keyframes`
from { top: -${headerHeight}px; }
to { top: 0; }`;

// STYLED COMPONENT
export const HeaderWrapper = styled("div")(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  "& .link": {
    fontWeight: 400,
    cursor: "pointer",
    padding: "0.25rem 1.25rem",
    color: theme.palette.grey[600],
    transition: "color 250ms ease-in-out",
    "&:hover": { color: theme.palette.primary.main }
  },

  "& .fixedHeader": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    background: "white",
    height: headerHeight,
    boxShadow: theme.shadows[2],
    animation: `${slideFromTop} 250ms ease-in-out`,
    "& .link": { color: "inherit" }
  },

  [theme.breakpoints.down("sm")]: {
    "& .right-links": { display: "none" },
    "& .purchase-link": { display: "none" }
  }
}));
