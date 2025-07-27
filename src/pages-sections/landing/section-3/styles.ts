import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected"
})<{ selected: number }>(({ theme, selected }) => ({
  fontWeight: 600,
  color: selected ? theme.palette.primary.main : "inherit",
  ":hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main
  }
}));

export const TitleBadge = styled("span")(({ theme }) => ({
  margin: "0 4px",
  color: theme.palette.grey[500]
}));

export const Wrapper = styled("div")(({ theme }) => ({
  marginBottom: "1.5rem",
  padding: "6% 6% 0px",
  overflow: "hidden",
  cursor: "pointer",
  marginTop: "1rem",
  position: "relative",
  borderRadius: "0.5rem",
  backgroundColor: theme.palette.grey[200],
  border: `1px solid ${theme.palette.grey[300]}`,
  "& .overlay": { transition: "0.3s ease-in-out" },
  "&:hover": { ".overlay": { opacity: 1 } }
}));

export const StatusChip = styled("div")(({ theme }) => ({
  width: 44,
  height: 44,
  zIndex: 11,
  top: "10px",
  right: "8px",
  color: "#fff",
  fontWeight: 700,
  fontSize: "13px",
  borderRadius: 36,
  padding: "11px 7px",
  position: "absolute",
  boxShadow: theme.shadows[2],
  background: theme.palette.dark.main
}));

export const StyledFlex = styled("div")({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0, 0.54)"
});
