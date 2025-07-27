import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { NavLink3 } from "components/nav-link";
import { Carousel } from "components/carousel";
import FlexBetween from "components/flex-box/flex-between";
import { ProductCard10 } from "components/product-cards/product-card-10";
// API FUNCTIONS
import api from "utils/__api__/market-2";

export default async function Section4() {
  const products = await api.getProducts();

  if (!products || !products.length) return null;

  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } }
  ];

  return (
    <Container className="pt-4 pb-4">
      <FlexBetween mb={3}>
        <Typography variant="h3">Deals Of The Day</Typography>
        <NavLink3 text="More Products" href="/" hoverColor="dark.main" />
      </FlexBetween>

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
