"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { ProductCard10 } from "components/product-cards/product-card-10";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// STYLED COMPONENTS
import { SectionHeader } from "./styles";
// UTIL METHOD
import axios from "utils/axiosInstance";

export default function Section9() {
  const [selected, setSelected] = useState("new");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/market-2/products", { params: { type: selected } })
      .then(({ data }) => setProducts(data));
  }, [selected]);

  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } }
  ];

  // SELECTED BUTTON
  const handleSelected = (item: string) => () => setSelected(item);

  // FILTERABLE BUTTON LIST
  const FILTER_BUTTONS = [
    { id: 1, title: "New Arrivals", value: "new" },
    { id: 2, title: "Best Seller", value: "best" },
    { id: 3, title: "Most Popular", value: "popular" },
    { id: 4, title: "View All", value: "view" }
  ];

  return (
    <Container className="pb-4">
      <SectionHeader>
        {/* SECTION TITLE */}
        <div>
          <h3 className="title">Selected Products</h3>
          <p>All our new arrivals in a exclusive brand selection</p>
        </div>

        {/* FILTERED BUTTON LIST */}
        <div className="button-group">
          {FILTER_BUTTONS.map(({ id, title, value }) => (
            <Button
              key={id}
              color="primary"
              onClick={handleSelected(value)}
              variant={value === selected ? "contained" : "outlined"}>
              {title}
            </Button>
          ))}
        </div>
      </SectionHeader>

      {/* PRODUCT CAROUSEL */}
      <Carousel
        slidesToShow={5}
        responsive={responsive}
        arrowStyles={{ backgroundColor: "dark.main" }}>
        {products.map((product) => (
          <ProductCard10 product={product} key={product.id} />
        ))}
      </Carousel>
    </Container>
  );
}
