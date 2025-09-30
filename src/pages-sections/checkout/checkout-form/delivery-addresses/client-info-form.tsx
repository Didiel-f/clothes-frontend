import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FlexBetween } from "components/flex-box";
import Heading from "../heading";
import { TextField } from "components/form-hook";

export default function ClientInfoForm() {

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <FlexBetween mb={4}>
        <Heading number={1} title="Datos personales" mb={0} />
      </FlexBetween>

      <Grid container spacing={3}>
        <Grid size={{ sm: 6, xs: 12 }}>
          <TextField fullWidth name="name" label="Ingresa tu nombre" />
        </Grid>

        <Grid size={{ sm: 6, xs: 12 }}>
          <TextField fullWidth name="lastname" label="Apellido" />
        </Grid>

        <Grid size={{ sm: 6, xs: 12 }}>
          <TextField fullWidth name="rut" label="RUT" />
        </Grid>

        <Grid size={{ sm: 6, xs: 12 }}>
          <TextField fullWidth name="phone" label="Número de teléfono" />
        </Grid>

        <Grid size={{ sm: 6, xs: 12 }}>
          <TextField fullWidth name="email" label="Correo electrónico" />
        </Grid>
      </Grid>
    </Card>
  );
}
