import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import BannerCard from "./banner-card";
// GLOBAL CUSTOM COMPONENTS
import { NavLink3 } from "components/nav-link";

export default function Offers() {
  return (
    <Container className="pb-4">
      <Grid container spacing={3}>
        {/* NEW ARRIVALS */}
        <Grid size={{ xs: 12, md: 4 }}>
          <BannerCard img="/assets/images/banners/banner-18.jpg">
            <Typography variant="body1" sx={{ fontSize: 13, letterSpacing: 1.2 }}>
              NEW ARRIVALS
            </Typography>

            <Typography
              variant="h4"
              sx={{
                my: 2,
                fontSize: 20,
                letterSpacing: 1,
                span: { fontWeight: 400, fontSize: 14, color: "error.main" }
              }}>
              SKI CLOTHES SALE
              <br />
              <span>Up to 35% Off</span>
            </Typography>

            <NavLink3 href="/" text="Shop Now" color="dark.main" hoverColor="dark.main" />
          </BannerCard>
        </Grid>

        {/* BEST SELLER */}
        <Grid size={{ xs: 12, md: 4 }}>
          <BannerCard img="/assets/images/banners/banner-19.jpg" color="white">
            <Typography variant="body1" sx={{ fontSize: 13, letterSpacing: 1.2 }}>
              BEST SELLER
            </Typography>

            <Typography
              variant="h4"
              sx={{
                my: 2,
                fontSize: 20,
                letterSpacing: 1,
                span: { fontWeight: 400, fontSize: 14 }
              }}>
              TRENDING WOMEN
              <br />
              <span>SUNGLASSES</span>
            </Typography>

            <NavLink3 href="/" text="Shop Now" color="white" hoverColor="white" />
          </BannerCard>
        </Grid>

        {/* NEW ARRIVALS */}
        <Grid size={{ xs: 12, md: 4 }}>
          <BannerCard img="/assets/images/banners/banner-20.jpg">
            <Typography variant="body1" sx={{ fontSize: 13, letterSpacing: 1.2 }}>
              NEW ARRIVALS
            </Typography>

            <Typography
              variant="h4"
              sx={{
                my: 2,
                fontSize: 20,
                letterSpacing: 1,
                span: { fontWeight: 400, fontSize: 14 }
              }}>
              NEW LATEST BAG
              <br />
              <span>COLLECTION</span>
            </Typography>

            <NavLink3 href="/" text="Shop Now" color="dark.main" hoverColor="dark.main" />
          </BannerCard>
        </Grid>
      </Grid>
    </Container>
  );
}
