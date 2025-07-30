import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import CarouselCard1 from "components/carousel-cards/carousel-card-1";
import { getCarouselData } from "utils/__api__/fashion-2";
// API FUNCTIONS

export default async function Section1() {
  const carouselData = await getCarouselData();

  return (
    <Box bgcolor="grey.100" mb={7.5}>
      <Container className="pt-2 pb-3">
        <Carousel dots spaceBetween={0} slidesToShow={1} arrows={false}>
          {carouselData?.map((item, ind) => (
            <CarouselCard1
              key={ind}
              buttonColor="dark"
              title={item.title!}
              imgUrl={item?.image?.url!}
              buttonLink={item.buttonLink!}
              buttonText={item.buttonText!}
              description={item.description!}
            />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
