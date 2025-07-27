"use client";

import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
// MUI ICON COMPONENTS
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
// LOCAL CUSTOM HOOK
import useCarousel from "./useCarousel";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import ProductCard12 from "components/product-cards/product-card-12";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// STYLED COMPONENT
const Heading = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: "5rem",
  alignItems: "center",
  marginBottom: "2.5rem",
  justifyContent: "space-between",

  "& .title": {
    fontSize: 30,
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: { fontSize: 27 }
  },

  "& .description": {
    fontSize: 16,
    color: theme.palette.grey[600],
    [theme.breakpoints.down("sm")]: { fontSize: 14 }
  }
}));

const ButtonGroup = styled("div")(({ theme }) => ({
  ".forward-btn": {
    backgroundColor: "white",
    boxShadow: theme.shadows[1],
    marginLeft: theme.spacing(0.5)
  },
  ":dir(rtl) .MuiSvgIcon-root": { rotate: "180deg" }
}));

// ==============================================================
type Props = { products: Product[] };
// ==============================================================

export default function Content({ products }: Props) {
  const { carouselRef, responsive, handleNext, handlePrev } = useCarousel();

  return (
    <Container>
      <Heading>
        <div>
          <h3 className="title">Trending Items</h3>
          <p className="description">There are many variations passages</p>
        </div>

        <ButtonGroup>
          <IconButton onClick={handlePrev}>
            <ArrowBack fontSize="small" />
          </IconButton>

          <IconButton onClick={handleNext} className="forward-btn">
            <ArrowForward fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </Heading>

      <Carousel ref={carouselRef} slidesToShow={4} responsive={responsive} arrows={false}>
        {products.map((product) => (
          <ProductCard12 product={product} key={product.id} />
        ))}
      </Carousel>
    </Container>
  );
}
