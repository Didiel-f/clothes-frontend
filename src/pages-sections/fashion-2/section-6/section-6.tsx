"use client"; // 👈 obligatorio ahora

import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import ProductCard8 from "components/product-cards/product-card-8";
import { useProducts } from "hooks/useProducts";
import { IProduct } from "models/Product.model";


type Props = {
  onOpenProduct: (product: IProduct) => void;
};
export default function Section6({ onOpenProduct }: Props) {
  const { products, loading, error } = useProducts();

  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } }
  ];

  return (
    <Container className="mt-4">
      <Typography variant="h2" sx={{ textAlign: "center", mb: "2rem" }}>
        Productos destacados
      </Typography>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
      <Carousel
        slidesToShow={5}
        responsive={responsive}
        arrowStyles={{ backgroundColor: "dark.main", top: "34%" }}>
        {products && products?.map((product) => (
          <ProductCard8 key={product.documentId} product={product} onOpen={() => onOpenProduct(product)} />
        ))}
      </Carousel>
      )}
    </Container>
  );
}
