import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import ProductCard7 from "components/product-cards/product-card-7";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ====================================================
interface Props {
  heading: string;
  description: string;
  products: Product[];
}
// ====================================================

export default function Section3({ products, heading, description }: Props) {
  const responsive = [
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } }
  ];

  return (
    <div className="mb-2">
      <Typography variant="h1">{heading}</Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "grey.600" }}>
        {description}
      </Typography>

      <Carousel
        responsive={responsive}
        slidesToShow={3}
        arrowStyles={{
          width: 40,
          height: 40,
          boxShadow: 5,
          color: "primary.main",
          backgroundColor: "white",
          borderRadius: "0 !important"
        }}>
        {products.map((product) => (
          <div className="pt-1 pb-1" key={product.id}>
            <ProductCard7 product={product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
