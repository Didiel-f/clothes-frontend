import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Done from "@mui/icons-material/Done";
// CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// IMAGES
import productModelImage from "../../../../public/assets/images/landing/product-model.png";
import restApiImage from "../../../../public/assets/images/landing/rest-api-endpoint.png";
// STYLED COMPONENT
import { ImageBox, StyledRoot } from "./styles";

const model = [
  "Product model",
  "User model",
  "Shop model",
  "Order model",
  "Address model",
  "20+ more models"
];

export default function Section5() {
  return (
    <StyledRoot>
      <Container>
        <div className="model-content">
          <Grid container spacing={{ md: 8, xs: 4 }} alignItems="center" justifyContent="center">
            <Grid size={{ lg: 4, md: 5, sm: 6, xs: 10 }}>
              <ImageBox>
                <LazyImage alt="product-model" src={productModelImage} />
              </ImageBox>
            </Grid>

            <Grid size={{ lg: 4, md: 5, sm: 6, xs: 10 }}>
              <Typography variant="h2" sx={{ maxWidth: 400, fontSize: { md: 28, xs: 27 } }}>
                Data structure with Typescript Data models
              </Typography>

              <div className="list">
                {model.map((item) => (
                  <div className="item" key={item}>
                    <Done color="success" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="api-content">
          <Grid container spacing={{ md: 8, xs: 4 }} alignItems="center" justifyContent="center">
            <Grid size={{ lg: 4, md: 5, xs: 10 }} textAlign={{ xs: "center", md: "start" }}>
              <Typography variant="h2" sx={{ fontSize: 28 }}>
                REST API endpoints
              </Typography>

              <Typography variant="body1" sx={{ fontSize: 16 }}>
                Customize and use existing data structure to implement your server easily.
              </Typography>
            </Grid>

            <Grid size={{ md: 6, xs: 12 }}>
              <ImageBox>
                <LazyImage src={restApiImage} alt="rest-api-endpoint" />
              </ImageBox>
            </Grid>
          </Grid>
        </div>

        <div className="server">
          <a
            href="https://www.getbazaar.io/"
            target="_blank"
            style={{ width: "50%", display: "block" }}>
            <LazyImage
              width={800}
              height={180}
              alt="Bazaar server"
              src="https://ui-lib.com/wp-content/uploads/2023/10/bazaar-server.jpg"
            />
          </a>
        </div>
      </Container>
    </StyledRoot>
  );
}
