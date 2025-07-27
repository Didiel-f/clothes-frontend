"use client";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import BannerCard from "../banner-card";
import CarouselCard from "./carousel-card";
// GLOBAL CUSTOM COMPONENTS
import { NavLink3 } from "components/nav-link";
import { Carousel } from "components/carousel";
import { COMMON_DOT_STYLES } from "components/carousel/styles";
// CUSTOM DATA MODEL
import { MainCarouselItem } from "models/Market-2.model";

// ======================================================
type Props = { carouselData: MainCarouselItem[] };
// ======================================================

export default function Section1({ carouselData }: Props) {
  return (
    <div className="pt-2">
      <Container>
        <Grid container spacing={2}>
          {/* MAIN CAROUSEL AREA */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Carousel
              dots
              arrows={false}
              spaceBetween={0}
              slidesToShow={1}
              dotStyles={COMMON_DOT_STYLES}>
              {carouselData.map((item, ind) => (
                <CarouselCard
                  key={ind}
                  mode="light"
                  title={item.title!}
                  bgImage={item.imgUrl!}
                  discount={item.discount!}
                  category={item.category!}
                  buttonLink={item.buttonLink!}
                  buttonText={item.buttonText!}
                  description={item.description!}
                />
              ))}
            </Carousel>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={2} height="100%" direction={{ md: "column", sm: "row", xs: "column" }}>
              {/* SUMMER SALE BANNER */}
              <BannerCard
                imageFull
                flex={1}
                img="/assets/images/banners/banner-17.jpg"
                maxHeight={240}>
                <Typography variant="body1" sx={{ fontSize: 13, letterSpacing: 1.2 }}>
                  NEW ARRIVALS
                </Typography>

                <Typography variant="h4" sx={{ mb: 2, fontSize: 20, letterSpacing: 1.2 }}>
                  SUMMER
                  <br />
                  SALE 20% OFF
                </Typography>

                <NavLink3 href="/" text="Shop Now" color="dark.main" />
              </BannerCard>

              {/* DESKTOP & LAPTOP BANNER */}
              <BannerCard
                imageFull
                flex={1}
                img="/assets/images/banners/banner-16.jpg"
                maxHeight={240}>
                <Typography variant="body1" sx={{ fontSize: 13, letterSpacing: 1.2 }}>
                  GAMING 4K
                </Typography>

                <Typography variant="h4" sx={{ mb: 2, fontSize: 20, letterSpacing: 1.2 }}>
                  DESKTOPS &
                  <br />
                  LAPTOPS
                </Typography>

                <NavLink3 href="/" text="Shop Now" color="dark.main" />
              </BannerCard>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
