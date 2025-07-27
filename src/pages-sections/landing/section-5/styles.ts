import { styled } from "@mui/material/styles";

// STYLED COMPONENT
export const StyledRoot = styled("div")(({ theme }) => ({
  marginBottom: "2rem",
  "& .model-content": {
    marginBlock: theme.spacing(25),
    "& .list": {
      marginTop: "2rem",
      ".item": {
        gap: ".5rem",
        fontSize: 16,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        marginBottom: ".5rem",
        color: theme.palette.grey[900]
      }
    }
  },
  "& .api-content": { marginTop: theme.spacing(25), marginBottom: theme.spacing(12) },
  "& .server": { display: "flex", marginBottom: "5rem", justifyContent: "center" }
}));

export const ImageBox = styled("div")(({ theme }) => ({
  padding: 32,
  display: "flex",
  borderRadius: 16,
  justifyContent: "center",
  backgroundColor: theme.palette.grey[300]
}));
