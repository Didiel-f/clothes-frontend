import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

export const CardRoot = styled(Card)(() => ({
  padding: "1.5rem",
  marginBottom: "2rem"
}));

export const FormWrapper = styled("div")(({ theme }) => ({
  gap: "20px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  "& > h6": { marginBottom: "1rem" },
  [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" }
}));

export const ButtonWrapper = styled("div")(({ theme }) => ({
  gap: "20px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" }
}));
