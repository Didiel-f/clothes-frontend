import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { ProductCard5 } from "components/product-cards/product-card-5";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
// STYLED COMPONENT
import { SubTitle } from "../styles";

// ================================================================
type Props = { products: Product[] };
// ================================================================

export default function Section3({ products }: Props) {
  const responsive = [
    { breakpoint: 1440, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } }
  ];

  return (
    <div className="mb-2">
      <Typography variant="h2">Top New Products</Typography>
      <SubTitle>Best deal with medical and beauty items</SubTitle>

      <Carousel
        slidesToShow={4}
        responsive={responsive}
        arrowStyles={{
          color: "primary.main",
          backgroundColor: "primary.100",
          "&:hover": { backgroundColor: "primary.200" }
        }}>
        {products.map((product) => (
          <div className="pb-1" key={product.id}>
            <ProductCard5 product={product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
