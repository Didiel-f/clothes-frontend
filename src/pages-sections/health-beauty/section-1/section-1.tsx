import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Carousel } from "components/carousel";
// STYLED COMPONENTS
import { COMMON_DOT_STYLES } from "components/carousel/styles";
import { GridItemOne, GridItemTwo, StyledButton, StyledGrid } from "./styles";
// CUSTOM DATA MODEL
import { HealthCarouselItem } from "models/Carousel.model";

// ==========================================================================
type Props = { carouselData: HealthCarouselItem[] };
// ==========================================================================

export default function Section1({ carouselData }: Props) {
  return (
    <Container className="mb-1">
      <Carousel dots arrows={false} slidesToShow={1} dotStyles={COMMON_DOT_STYLES}>
        {carouselData.map((item) => (
          <div key={item.id}>
            <StyledGrid container>
              <GridItemOne size={{ sm: 7, xs: 12 }}>
                <h1 className="title">{item.title}</h1>
                <StyledButton variant="contained" size="large">
                  Shop Now
                </StyledButton>
              </GridItemOne>

              <GridItemTwo size={{ sm: 5, xs: 12 }}>
                <LazyImage width={570} height={360} src={item.imgUrl} alt={item.title} />
              </GridItemTwo>
            </StyledGrid>
          </div>
        ))}
      </Carousel>
    </Container>
  );
}
