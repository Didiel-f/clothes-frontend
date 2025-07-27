import { PropsWithChildren } from "react";
import Button, { ButtonProps } from "@mui/material/Button";

// ==================================================
interface Props extends PropsWithChildren, ButtonProps {}
// ==================================================

const STYLE = {
  color: "dark.main",
  backgroundColor: "white",
  ":hover": {
    color: "#fff",
    backgroundColor: "dark.main"
  }
};

export default function WhiteButton({ children, ...props }: Props) {
  return (
    <Button color="dark" variant="contained" sx={STYLE} {...props}>
      {children}
    </Button>
  );
}
