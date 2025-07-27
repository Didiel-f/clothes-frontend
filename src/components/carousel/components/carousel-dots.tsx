import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
// STYLED COMPONENTS
import { Dot, DotList } from "../styles";

// ==============================================================
interface Props {
  dotColor?: string;
  sx?: SxProps<Theme>;
}
// ==============================================================

export default function CarouselDots({ dotColor, sx }: Props) {
  return {
    appendDots: (dots: ReactNode) => <DotList sx={sx}>{dots}</DotList>,
    customPaging: () => <Dot dotColor={dotColor} />
  };
}
