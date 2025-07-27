import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Carousel } from "components/carousel";
import { FooterApps } from "components/footer";
// CUSTOM DATA MODEL
import { GroceryTwoCarouselItem } from "models/Carousel.model";
// STYLED COMPONENTS
import { GridItemOne, GridItemTwo, StyledRoot, StyledGrid } from "./styles";

// ========================================================================
type Props = { carouselData: GroceryTwoCarouselItem[] };
// ========================================================================

export default function Section1({ carouselData }: Props) {
  return (
    <StyledRoot className="mb-3">
      <Carousel
        dots
        arrows={false}
        spaceBetween={0}
        slidesToShow={1}
        dotColor="white"
        dotStyles={{
          left: 40,
          bottom: 25,
          justifyContent: "flex-start",
          // "&:dir(rtl)": { left: "auto", right: 40, backgroundColor: "green" },
          "& li.slick-active span": { backgroundColor: "grey.500" }
        }}>
        {carouselData.map((item) => (
          <StyledGrid container key={item.id}>
            <GridItemOne size={{ sm: 7, xs: 12 }}>
              <Typography variant="h1">{item.title}</Typography>
              <Typography variant="h6">{item.description}</Typography>
              <Typography variant="h5">Try our mobile app!</Typography>
              <FooterApps appleStoreUrl="#" playStoreUrl="#" />
            </GridItemOne>

            <GridItemTwo size={{ sm: 5, xs: 12 }}>
              <LazyImage priority width={570} height={360} src={item.imgUrl} alt={item.title} />
            </GridItemTwo>
          </StyledGrid>
        ))}
      </Carousel>
    </StyledRoot>
  );
}
