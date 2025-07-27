import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import ProductCard1 from "components/product-cards/product-card-1";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =======================================================
type Props = { title: string; products: Product[] };
// =======================================================

export default function ProductCarousel({ products, title }: Props) {
  const responsive = [
    { breakpoint: 1440, settings: { slidesToShow: 3 } },
    { breakpoint: 950, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } }
  ];

  return (
    <div className="mb-3">
      <Typography variant="h2" sx={{ mb: 3 }}>
        {title}
      </Typography>

      <Carousel slidesToShow={4} responsive={responsive}>
        {products.map((product) => (
          <Box py={0.5} key={product.id}>
            <ProductCard1 product={product} />
          </Box>
        ))}
      </Carousel>
    </div>
  );
}
