import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import CarouselCard1 from "components/carousel-cards/carousel-card-1";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section1() {
  const carouselData = await api.getMainCarousel();

  return (
    <div className="bg-white mb-4">
      <Container className="pt-2 pb-3">
        <Carousel slidesToShow={1} arrows={false} dots autoplay>
          {carouselData.map((item, ind) => (
            <CarouselCard1
              key={ind}
              title={item.title!}
              imgUrl={item.imgUrl!}
              buttonLink={item.buttonLik!}
              buttonText={item.buttonText!}
              description={item.description!}
            />
          ))}
        </Carousel>
      </Container>
    </div>
  );
}
