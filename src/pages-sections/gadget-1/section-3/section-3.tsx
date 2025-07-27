import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENT
import LazyImage from "components/LazyImage";
// STYLED COMPONENT
import { BannerRoot, BannerWrapper } from "./styles";
// IMAGES
import bannerIphone from "../../../../public/assets/images/banners/banner-59.jpg";
import bannerIpod from "../../../../public/assets/images/banners/banner-60.jpg";

export default async function Section3() {
  return (
    <Container className="mt-4">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <BannerRoot>
            <LazyImage src={bannerIphone} alt="Iphone" className="banner-img" />

            <div className="content">
              <span className="badge">SAVE 60% OFF</span>
              <h2 className="title">Super Friendly Gadget Store</h2>
              <p className="price">
                $23.99
                <del>$28.99</del>
              </p>

              <Button variant="contained" size="large" color="primary">
                Shop Now
              </Button>
            </div>
          </BannerRoot>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <BannerWrapper>
            <LazyImage src={bannerIpod} alt="Air pod" className="banner-img" />

            <div className="ban-content">
              <h2 className="title">Minimal Earbuds</h2>
              <Button variant="contained" size="large" color="warning">
                Shop Now
              </Button>
            </div>
          </BannerWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}
