import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import ProductCard2 from "components/product-cards/product-card-2";
// API FUNCTIONS
import api from "utils/__api__/gadget-1";

export default async function Section4() {
  const products = await api.getMostViewedList();

  const responsive = [
    { breakpoint: 950, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } }
  ];

  return (
    <div className="mt-4">
      <Container>
        <Typography variant="h2" sx={{ mb: "2rem", lineHeight: 1 }}>
          Most Views Products
        </Typography>

        <Carousel
          slidesToShow={4}
          responsive={responsive}
          arrowStyles={{ color: "dark.main", backgroundColor: "white", top: "40%" }}>
          {products.map((product) => (
            <ProductCard2 key={product.id} product={product} />
          ))}
        </Carousel>
      </Container>
    </div>
  );
}
