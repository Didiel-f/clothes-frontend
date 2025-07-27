import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import ProductCard6 from "components/product-cards/product-card-6";
// COMMON CAROUSEL STYLES
import { CAROUSEL_ARROW_STYLE } from "../styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =========================================================
type Props = { title: string; products: Product[] };
// =========================================================

export default function Section5({ products, title }: Props) {
  const responsive = [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } }
  ];

  return (
    <div className="mt-2">
      <Typography variant="h2" sx={{ mb: 3, lineHeight: 1 }}>
        {title}
      </Typography>

      <Carousel slidesToShow={4} responsive={responsive} arrowStyles={CAROUSEL_ARROW_STYLE}>
        {products.map((product) => (
          <div className="pb-1" key={product.id}>
            <ProductCard6 product={product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
