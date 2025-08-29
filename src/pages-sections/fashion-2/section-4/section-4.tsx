"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Carousel } from "components/carousel";
import ProductCard8 from "components/product-cards/product-card-8";
import { IProduct } from "models/Product.model";
import { useProducts } from "hooks/useProducts";

type Props = {
  onOpenProduct: (product: IProduct) => void;
};


export default function Section4({ onOpenProduct }: Props) {
  const { products, loading, error } = useProducts();

  const responsive = [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } },
  ];

  return (
    <Container className="mt-4">
      <Typography variant="h2" sx={{ mb: "2rem", textAlign: "center" }}>
        Productos destacados
      </Typography>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Carousel slidesToShow={4} responsive={responsive} arrowStyles={{ backgroundColor: "dark.main", top: "37%" }}>
          {products.map((product) => (
            <ProductCard8 key={product.id} product={product} onOpen={() => onOpenProduct(product)} />
          ))}
        </Carousel>
      )}
    </Container>
  );
}