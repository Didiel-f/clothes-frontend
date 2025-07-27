import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
export const Title = styled("h2")(({ theme }) => ({
  fontSize: 28,
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "4rem",
  textTransform: "uppercase",
  color: theme.palette.secondary.main
}));

export const StyledContent = styled("div")(({ theme }) => ({
  zIndex: 1,
  position: "relative",
  "&:after, &:before": {
    zIndex: -1,
    width: 200,
    height: 100,
    content: '""',
    position: "absolute",
    background: theme.palette.grey[300]
  },
  "&:after": {
    top: -50,
    right: -90,
    borderRadius: "300px 300px 0 0 "
  },
  "&:before": {
    left: -90,
    bottom: -50,
    borderRadius: "0 0 300px 300px"
  }
}));

export const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "260px",

  "& h4": {
    fontSize: 16,
    maxWidth: 200,
    fontWeight: 600,
    textAlign: "center",
    marginTop: "1.5rem",
    marginInline: "auto"
  }
});
