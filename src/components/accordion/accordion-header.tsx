import type { ComponentProps } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
// MUI ICON COMPONENTS
import ChevronRight from "@mui/icons-material/ChevronRight";
// STYLED COMPONENT
import { RootContainer } from "./styles";

// =================================================================
interface Props extends ComponentProps<"div"> {
  open?: boolean;
  showIcon?: boolean;
  sx?: SxProps<Theme>;
}
// =================================================================

export default function AccordionHeader({
  sx,
  ref,
  children,
  open = false,
  showIcon = true,
  ...others
}: Props) {
  return (
    <RootContainer ref={ref} open={open} sx={sx} {...others}>
      {children}
      {showIcon && <ChevronRight className="caret" fontSize="small" />}
    </RootContainer>
  );
}
