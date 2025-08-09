import Image from "next/image";
// MUI
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import FlexRowCenter from "components/flex-box/flex-row-center";
import { getBrands } from "utils/__api__/fashion-2";
// API FUNCTIONS

export default async function Section9() {
  const brands = await getBrands();

  const responsive = [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } }
  ];

  return (
    <Container className="mt-4">
      <Divider sx={{ mb: 4, borderColor: "grey.200" }} />

      <Carousel autoplay arrows={false} slidesToShow={5} responsive={responsive}>
        {brands.map(({ id, logo }) => (
          <FlexRowCenter position="relative" key={id} height={40} margin="auto" width={110}>
            <Image
              fill
              alt="brand"
              src={logo.url}
              sizes="(110px, 50px)"
              style={{ filter: "grayscale(1)", objectFit: "contain" }}
            />
          </FlexRowCenter>
        ))}
      </Carousel>

      <Divider sx={{ mt: 4, borderColor: "grey.200" }} />
    </Container>
  );
}
