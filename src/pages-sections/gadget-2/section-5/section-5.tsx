import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// STYLED COMPONENTS
import { BlackBox, StyledButton, YellowBox } from "./styles";
// IMPORT IMAGES
import iphone12 from "../../../../public/assets/images/products/iphone-12-2.png";
import speaker from "../../../../public/assets/images/products/lenovo-speaker.png";

export default function Section5() {
  return (
    <Container>
      <Grid container spacing={3} mt={5}>
        <Grid size={{ lg: 6, xs: 12 }}>
          <YellowBox>
            <div>
              <Typography variant="body1" sx={{ mb: 1, fontSize: 16 }}>
                Lenovo Think plus K3 Mini
              </Typography>

              <Typography variant="h2">
                Waterproof <br /> Speakers
              </Typography>

              <StyledButton>Shop Now</StyledButton>
            </div>

            <div className="img-wrapper">
              <LazyImage src={speaker} alt="Watch" />
            </div>
          </YellowBox>
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <BlackBox>
            <div className="img-wrapper">
              <LazyImage src={iphone12} alt="Watch" />
            </div>

            <div className="content">
              <Typography variant="body1" sx={{ mb: 1, fontSize: 16 }}>
                Blast Past Fast.
              </Typography>

              <Typography variant="h2">
                IPhone 12 Pro <br /> For You
              </Typography>

              <StyledButton>Shop Now</StyledButton>
            </div>
          </BlackBox>
        </Grid>
      </Grid>
    </Container>
  );
}
