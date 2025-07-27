import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
// GLOBAL CUSTOM COMPONENTS
import { TextField } from "components/form-hook";
// LOCAL CUSTOM HOOK
import useDeliveryDate from "./use-delivery-date";
// LOCAL CUSTOM COMPONENT
import Heading from "../heading";
// TYPES
import { DeliveryTime } from "models/Common";

// ==============================================================
type Props = { deliveryTimes: DeliveryTime[] };
// ==============================================================

export default function DeliveryDate({ deliveryTimes }: Props) {
  const { dates } = useDeliveryDate();

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Heading number={1} title="Delivery Date and Time" />

      <Grid container spacing={3}>
        <Grid size={{ sm: 6, xs: 12 }}>
          <TextField
            select
            fullWidth
            name="date"
            size="medium"
            label="Delivery Date"
            slotProps={{
              select: {
                MenuProps: {
                  elevation: 2
                }
              }
            }}>
            {dates.map((item) => (
              <MenuItem value={item.value} key={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ sm: 6, xs: 12 }}>
          <TextField
            select
            fullWidth
            name="time"
            size="medium"
            label="Delivery Time"
            slotProps={{
              select: {
                MenuProps: {
                  elevation: 2
                }
              }
            }}>
            {deliveryTimes.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Card>
  );
}
