import { PropsWithChildren } from "react";
// MUI
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENTS
import Navigation from "./navigation";

export default function CustomerDashboardLayout({ children }: PropsWithChildren) {
  return (
    <Container className="mt-2 mb-2">
      <Grid container spacing={3}>
        <Grid size={{ lg: 3, xs: 12 }} sx={{ display: { xs: "none", lg: "block" } }}>
          <Navigation />
        </Grid>

        <Grid size={{ lg: 9, xs: 12 }}>{children}</Grid>
      </Grid>
    </Container>
  );
}
