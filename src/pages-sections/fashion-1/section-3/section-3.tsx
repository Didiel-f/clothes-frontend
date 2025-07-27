// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
import ProductCard2 from "components/product-cards/product-card-2";
// API FUNCTIONS
import api from "utils/__api__/fashion-1";

export default async function Section3() {
  const products = await api.getNewArrivals();

  if (!products || !products.length) return null;

  const responsive = [
    { breakpoint: 950, settings: { slidesToShow: 4 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } }
  ];

  return (
    <SectionCreator title="New Arrivals" seeMoreLink="#">
      <Carousel
        slidesToShow={6}
        responsive={responsive}
        arrowStyles={{
          color: "dark.main",
          backgroundColor: "transparent",
          top: "40%",
          boxShadow: "none"
        }}>
        {products.map((product) => (
          <ProductCard2
            key={product.id}
            product={product}
            rounded={false}
            showReview={false}
            showFavorite={false}
          />
        ))}
      </Carousel>
    </SectionCreator>
  );
}
