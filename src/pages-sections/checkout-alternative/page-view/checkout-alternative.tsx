import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CheckoutForm from "../checkout-form";
import CheckoutSummery from "../checkout-summery";
import { getAddresses, getDeliveryTimes, getCards } from "utils/__api__/checkout";
import { DeliveryAddressesProvider } from "contexts/delivery-addresses-context";

async function getSessionUser() {
  // TODO: reemplazar por tu verdadera lógica de auth (cookies/session/next-auth/etc.)
  // return { id: "123", email: "..." } si está logueado, si no null
  return null; // <-- ahora: NO logueado
}

export default async function CheckoutAlternativePageView() {
  const [addresses] = await Promise.all([getAddresses(), getDeliveryTimes(), getCards()]);
  const user = await getSessionUser();
  const isLoggedIn = Boolean(user);

  return (
    <Container sx={{ my: "1.5rem" }}>
      <DeliveryAddressesProvider
        isLoggedIn={isLoggedIn}
        initialAddresses={isLoggedIn ? addresses : []} // solo pre-carga si hay login
      >
        <Grid container spacing={3}>
          <Grid size={{ md: 8, xs: 12 }}>
            <CheckoutForm
              deliveryAddresses={isLoggedIn ? addresses : undefined} // opcional: mantiene compat
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
