import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CheckoutForm from "../checkout-form";
import CheckoutSummery from "../checkout-summery";
import { getAddresses, getDeliveryTimes, getCards } from "utils/__api__/checkout";
import { DeliveryAddressesProvider } from "contexts/delivery-addresses-context";

async function getSessionUser() {
  // TODO: reemplazar por tu auth real
  // return { id: "123", email: "x@y.z" } si logueado; null si no
  return null;
}

export default async function CheckoutAlternativePageView() {
  const [addresses] = await Promise.all([getAddresses(), getDeliveryTimes(), getCards()]);
  const user:any = await getSessionUser();
  const isLoggedIn = Boolean(user?.id);
  const userId = user?.id ?? null;

  return (
    <Container sx={{ my: 4 }}>
      <DeliveryAddressesProvider
        isLoggedIn={isLoggedIn}
        userId={userId}
        initialAddresses={isLoggedIn ? addresses : []}
      >
        <Grid container spacing={3}>
          <Grid size={{ md: 8, xs: 12 }}>
            <CheckoutForm
              deliveryAddresses={isLoggedIn ? addresses : undefined}
            />
          </Grid>

          <Grid size={{ md: 4, xs: 12 }}>
            <CheckoutSummery />
          </Grid>
        </Grid>
      </DeliveryAddressesProvider>
    </Container>
  );
}
