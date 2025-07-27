"use client";

import Link from "next/link";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
// MUI ICON COMPONENTS
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
// LOCAL CUSTOM HOOK
import useCarousel from "./useCarousel";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { FlexBetween } from "components/flex-box";
import ProductCard11 from "components/product-cards/product-card-11";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// STYLED COMPONENT
const ButtonGroup = styled("div")(({ theme }) => ({
  ".forward-btn": {
    backgroundColor: "white",
    boxShadow: theme.shadows[2],
    marginLeft: theme.spacing(0.5)
  },
  ...(theme.direction === "rtl" && {
    ".MuiSvgIcon-root": { rotate: "180deg" }
  })
}));

// ==============================================================
type Props = { products: Product[] };
// ==============================================================

export default function Content({ products }: Props) {
  const { carouselRef, responsive, handleNext, handlePrev } = useCarousel();

  return (
    <Container>
      <FlexBetween mt={10} mb={5}>
        <div>
          <Typography variant="h2" sx={{ fontSize: { sm: 34, xs: 28 } }}>
            New Arrival Products
          </Typography>

          <Typography variant="body1" sx={{ color: "grey.600", fontSize: { sm: 16, xs: 14 } }}>
            There are many variations passages
          </Typography>
        </div>

        <ButtonGroup>
          <IconButton onClick={handlePrev}>
            <ArrowBack fontSize="small" />
          </IconButton>

          <IconButton
            className="forward-btn"
            onClick={handleNext}
            sx={{ backgroundColor: "white", boxShadow: 2, ml: 0.5 }}>
            <ArrowForward fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </FlexBetween>

      <Carousel ref={carouselRef} slidesToShow={4} responsive={responsive} arrows={false}>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <ProductCard11 product={product} />
          </Link>
        ))}
      </Carousel>
    </Container>
  );
}
