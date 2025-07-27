"use client";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Carousel } from "components/carousel";
// CUSTOM DATA MODEL
import { GiftCarouselItem } from "models/Carousel.model";
// STYLED COMPONENTS
import { COMMON_DOT_STYLES } from "components/carousel/styles";
import { StyledRoot, StyledGrid, ContentWrapper, GridItemTwo, CarouselButton } from "./styles";

// ==========================================================
type Props = { carouselData: GiftCarouselItem[] };
// ==========================================================

export default function Section1({ carouselData }: Props) {
  const { palette } = useTheme();

  return (
    <StyledRoot>
      <Container>
        <div className="carousel-wrapper">
          <Carousel
            dots
            arrows={false}
            spaceBetween={0}
            slidesToShow={1}
            dotStyles={COMMON_DOT_STYLES}
            dotColor={palette.grey[400]}>
            {carouselData.map(({ id, title, subTitle, buttonText, imgUrl }) => (
              <div key={id}>
                <StyledGrid container>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <ContentWrapper>
                      <Typography variant="body1" sx={{ color: "primary.main" }}>
                        {subTitle}
                      </Typography>

                      <Typography variant="h1" sx={{ maxWidth: 600 }}>
                        {title}
                      </Typography>

                      <CarouselButton disableElevation variant="contained">
                        {buttonText}
                      </CarouselButton>
                    </ContentWrapper>
                  </Grid>

                  <GridItemTwo size={{ xs: 12, sm: 6 }}>
                    <LazyImage alt={title} width={600} height={450} src={imgUrl} />
                  </GridItemTwo>
                </StyledGrid>
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </StyledRoot>
  );
}
