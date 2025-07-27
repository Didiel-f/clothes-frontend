"use client";

import { PropsWithChildren, RefObject } from "react";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import SlickCarousel, { type Settings } from "react-slick";
// LOCAL CUSTOM COMPONENTS
import CarouselDots from "./components/carousel-dots";
import CarouselArrows from "./components/carousel-arrows";
// STYLED COMPONENT
import { RootStyle } from "./styles";

// ==============================================================
interface Props extends PropsWithChildren, Settings {
  dotColor?: string;
  spaceBetween?: number;
  dotStyles?: SxProps<Theme>;
  arrowStyles?: SxProps<Theme>;
  ref?: RefObject<SlickCarousel | null>;
}
// ==============================================================

export default function Carousel({
  ref,
  dotColor,
  children,
  arrowStyles,
  dots = false,
  arrows = true,
  slidesToShow = 4,
  spaceBetween = 10,
  dotStyles = { mt: 4 },
  ...others
}: Props) {
  const theme = useTheme();

  const settings: Settings = {
    dots,
    arrows,
    slidesToShow,
    rtl: theme.direction === "rtl",
    ...CarouselArrows({ sx: arrowStyles }),
    ...CarouselDots({ dotColor, sx: dotStyles }),
    ...others
  };

  return (
    <RootStyle space={spaceBetween}>
      <SlickCarousel ref={ref} {...settings}>
        {children}
      </SlickCarousel>
    </RootStyle>
  );
}
