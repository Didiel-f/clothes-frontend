import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
// STYLED COMPONENTS
import { COMMON_DOT_STYLES } from "components/carousel/styles";
import { Wrapper, StyledButton, ContentWrapper } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/furniture-1";

export default async function Section1() {
  const mainCarouselData = await api.getMainCarouselData();

  if (!mainCarouselData) return null;

  return (
    <Wrapper>
      <Carousel dots arrows={false} slidesToShow={1} spaceBetween={0} dotStyles={COMMON_DOT_STYLES}>
        {mainCarouselData.map((item) => (
          <div key={item.id}>
            <ContentWrapper>
              <Container>
                <div className="carousel-content">
                  <h6>{item.subTitle}</h6>
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <StyledButton color="primary" variant="contained">
                    {item.buttonText}
                  </StyledButton>
                </div>
              </Container>
            </ContentWrapper>
          </div>
        ))}
      </Carousel>
    </Wrapper>
  );
}
