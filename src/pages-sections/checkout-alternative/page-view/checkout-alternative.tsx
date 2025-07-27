import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import CheckoutForm from "../checkout-form";
import CheckoutSummery from "../checkout-summery";
// API FUNCTIONS
import { getAddresses, getDeliveryTimes, getCards } from "utils/__api__/checkout";

export default async function CheckoutAlternativePageView() {
  const [addresses, deliveryTimes, cards] = await Promise.all([
    getAddresses(),
    getDeliveryTimes(),
    getCards()
  ]);

  return (
    <Container sx={{ my: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid size={{ md: 8, xs: 12 }}>
          <CheckoutForm deliveryAddresses={addresses} deliveryTimes={deliveryTimes} cards={cards} />
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <CheckoutSummery />
        </Grid>
      </Grid>
    </Container>
  );
}
