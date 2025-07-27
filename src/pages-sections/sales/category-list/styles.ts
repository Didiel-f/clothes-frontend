import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

export const StyledRoot = styled("div")(({ theme }) => ({
  overflow: "hidden",
  marginBottom: theme.spacing(4),
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
  "& > a": { flex: "1 1 0" }
}));

type Selected = { selected: boolean };

export const CategoryBoxWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "selected"
})<Selected>(({ selected, theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBlock: "3rem",
  minWidth: "200px",
  cursor: "pointer",
  borderRadius: 12,
  position: "relative",
  flexDirection: "column",
  transition: "all 250ms ease-in-out",
  border: `1px solid ${theme.palette.grey[400]}`,
  background: selected ? "white" : "transparent",
  "& > .icon": {
    fontSize: 44,
    color: selected ? theme.palette.primary.main : "inherit"
  },
  "& > .title": {
    fontSize: 14,
    fontWeight: 500,
    color: selected ? theme.palette.primary.main : "inherit"
  }
}));

export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "selected"
})<Selected>(({ selected, theme }) => ({
  top: "1rem",
  right: "1rem",
  fontWeight: 600,
  fontSize: "10px",
  padding: "5px 10px",
  position: "absolute",
  color: selected ? "white" : "inherit",
  boxShadow: selected ? "0px 8px 20px -5px rgba(255, 103, 128, 0.9)" : "inherit",
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.grey[300]
}));
