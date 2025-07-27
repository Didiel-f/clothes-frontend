import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import Card from "./card";
import CardTwo from "./card-2";

export default async function Section1() {
  return (
    <div className="mt-2">
      <Container>
        <Grid container spacing={3}>
          <Grid size={{ md: 6, xs: 12 }}>
            <Card
              badge="Starting At Only $699"
              title="Samsung Smart Watch Pro"
              imgUrl="/assets/images/banners/banner-61.jpg"
              body="The Samsung Smart Watch A8 WiFi Gray is a mid-range watch"
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <Card
              badgeColor="info"
              badge="Starting At Only $699"
              title="Waterproof JBL Speaker"
              imgUrl="/assets/images/banners/banner-62.jpg"
              body="Rock out with powerful JBL Pro Sound that deliver clean"
            />
          </Grid>

          <Grid size={{ md: 3, xs: 12 }}>
            <CardTwo
              url="/gadget-1"
              badge="New Arrival"
              title="Apple AirPods Max Space Orange"
              imgUrl="/assets/images/banners/banner-63.jpg"
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <Card
              badgeColor="success"
              badge="Grab 50% Offer!"
              title="JBL Live Over Ear Headphone"
              imgUrl="/assets/images/banners/banner-64.jpg"
              body="Wirelesses stream high-quality sound even at lower bit rates"
            />
          </Grid>

          <Grid size={{ md: 3, xs: 12 }}>
            <CardTwo
              url="/gadget-1"
              badge="New Arrival"
              title="Fujifilm Instant Camera For Portrait"
              imgUrl="/assets/images/banners/banner-65.jpg"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
