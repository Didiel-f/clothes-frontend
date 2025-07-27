import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
// STYLED COMPONENT
import { StyledContent } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/market-2";

export default async function Section8() {
  const brands = await api.getBrands();

  if (!brands || !brands) return null;

  const responsive = [
    { breakpoint: 1024, settings: { slidesToShow: 4 } },
    { breakpoint: 800, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } }
  ];

  return (
    <Container className="mt-4 mb-4">
      <Typography variant="h3" sx={{ mb: 3 }}>
        Featured Brands
      </Typography>

      <StyledContent>
        <Carousel slidesToShow={5} arrows={false} responsive={responsive}>
          {brands.map(({ id, image }) => (
            <div className="brand-item" key={id}>
              <Image fill src={image} alt="brand" sizes="(110px, 50px)" />
            </div>
          ))}
        </Carousel>
      </StyledContent>
    </Container>
  );
}
