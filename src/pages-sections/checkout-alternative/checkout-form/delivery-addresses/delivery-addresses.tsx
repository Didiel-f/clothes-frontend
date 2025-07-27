import { Controller, useFormContext } from "react-hook-form";
// MUI
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
// MUI ICON COMPONENTS
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ModeEditOutline from "@mui/icons-material/ModeEditOutline";
// LOCAL CUSTOM HOOK
import useDeliveryAddresses from "./use-delivery-addresses";
// LOCAL CUSTOM COMPONENTS
import Heading from "../heading";
import DeliveryAddressForm from "./delivery-address-form";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
// TYPES
import { DeliveryAddress } from "models/Common";

// STYLED COMPONENTS
const AddressCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "error"
})<{ active: boolean; error: boolean }>(({ theme, active, error }) => ({
  padding: "1rem",
  boxShadow: "none",
  cursor: "pointer",
  position: "relative",
  backgroundColor: theme.palette.grey[100],
  border: `1px solid ${active ? theme.palette.primary.main : "transparent"}`,
  ...(error && {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.light, 0.3)
  }),
  h6: { marginBottom: theme.spacing(0.5) },
  p: { color: theme.palette.grey[700] }
}));

// ==============================================================
type Props = { deliveryAddresses: DeliveryAddress[] };
// ==============================================================

export default function DeliveryAddresses({ deliveryAddresses }: Props) {
  const {
    openModal,
    editDeliveryAddress,
    toggleModal,
    handleAddNewAddress,
    handleEditDeliveryAddress,
    handleDeleteDeliveryAddress
  } = useDeliveryAddresses();

  const { control } = useFormContext();

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      {/* HEADING & BUTTON SECTION */}
      <FlexBetween mb={4}>
        <Heading number={2} title="Delivery Address" mb={0} />

        <Button color="primary" variant="outlined" onClick={handleAddNewAddress}>
          Add New Address
        </Button>
      </FlexBetween>

      {/* ADDRESS LIST SECTION */}
      <Grid container spacing={3}>
        {deliveryAddresses.map((item, ind) => (
          <Grid size={{ md: 4, sm: 6, xs: 12 }} key={ind}>
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <AddressCard
                  error={Boolean(error)}
                  active={item.street1 === field.value}
                  onClick={() => field.onChange(item.street1)}>
                  <FlexBox position="absolute" top={5} right={5}>
                    <IconButton size="small" onClick={() => handleEditDeliveryAddress(item)}>
                      <ModeEditOutline fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteDeliveryAddress(item.id)}>
                      <DeleteOutline fontSize="inherit" />
                    </IconButton>
                  </FlexBox>

                  <Typography noWrap variant="h6">
                    {item.name}
                  </Typography>
                  <Typography variant="body1">{item.street1}</Typography>
                  {item.street2 ? <Typography variant="body1">{item.street2}</Typography> : null}
                  <Typography variant="body1">{item.phone}</Typography>
                </AddressCard>
              )}
            />
          </Grid>
        ))}
      </Grid>

      {/* SHOW DELIVERY ADDRESS FORM MODAL WHEN CLICK EDIT BUTTON */}
      {openModal && (
        <DeliveryAddressForm handleCloseModal={toggleModal} deliveryAddress={editDeliveryAddress} />
      )}
    </Card>
  );
}
