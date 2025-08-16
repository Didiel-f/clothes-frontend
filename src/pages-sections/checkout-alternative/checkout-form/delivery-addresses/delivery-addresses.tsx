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
import { useHydration } from "hooks/useHydration";
// LOCAL CUSTOM COMPONENTS
import Heading from "../heading";
import DeliveryAddressForm from "./delivery-address-form";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
// TYPES
import { useDeliveryAddressesCTX } from "contexts/delivery-addresses-context";
import Address from "models/Address.model";

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

type Props = { deliveryAddresses?: Address[] };

export default function DeliveryAddresses({ deliveryAddresses }: Props) {
  const isHydrated = useHydration();
  
  const {
    openModal,
    editDeliveryAddress,
    toggleModal,
    handleAddNewAddress,
    handleEditDeliveryAddress,
    handleDeleteDeliveryAddress
  } = useDeliveryAddresses();

  const { isLoggedIn, addresses } = useDeliveryAddressesCTX();
  const { control } = useFormContext();

  // === Fuente de datos a renderizar según login ===
  // - Logueado: lista completa
  // - Anónimo: solo la primera (si existe)
  const source: Address[] = isLoggedIn
    ? (deliveryAddresses ?? addresses ?? [])
    : (addresses && addresses.length ? [addresses[0]] : []);

  // Solo mostrar el texto del botón después de la hidratación para evitar mismatch
  const addBtnLabel = !isHydrated 
    ? "Agregar dirección" // Texto por defecto durante SSR
    : isLoggedIn
      ? "Añade nueva dirección"
      : (source.length ? "Cambiar dirección" : "Agregar dirección");

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <FlexBetween mb={4}>
        <Heading number={2} title="Dirección de envío" mb={0} />

        <Button
          color="primary"
          variant="outlined"
          onClick={handleAddNewAddress}
          // Si NO está logueado y ya hay 1, igualmente abrimos el modal para reemplazar.
          // Si prefieres bloquear, descomenta la línea de abajo:
          // disabled={!isLoggedIn && !canAddAnother}
        >
          {addBtnLabel}
        </Button>
      </FlexBetween>

      <Grid container spacing={3}>
        {source?.map((item, ind) => (
          <Grid size={{ md: 4, sm: 6, xs: 12 }} key={ind}>
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState: { error } }) => {
                const selected = field.value as Address | undefined;
                const isActive = selected ? selected.houseApartment === item.houseApartment : false;

                return (
                  <AddressCard
                    error={Boolean(error)}
                    active={isActive}
                    onClick={() => {
                      // Actualizar el campo address
                      field.onChange(item);
                      
                      // También actualizar los campos individuales para mantener consistencia
                      const { setValue } = useFormContext();
                      setValue("regionName", item.regionName || "");
                      setValue("countyName", item.countyName || "");
                      setValue("countyCode", item.countyCode || null);
                      setValue("streetName", item.streetName || "");
                      setValue("streetNumber", item.streetNumber || "");
                      setValue("houseApartment", item.houseApartment || "");
                    }}
                  >
                    <FlexBox position="absolute" top={5} right={5}>
                      {/* Editar siempre disponible (en anónimo actúa como "reemplazar") */}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditDeliveryAddress(item);
                        }}
                      >
                        <ModeEditOutline fontSize="inherit" />
                      </IconButton>

                      {/* Eliminar solo si está logueado (múltiples direcciones) */}
                      {isHydrated && isLoggedIn && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDeliveryAddress(item.houseApartment);
                          }}
                        >
                          <DeleteOutline fontSize="inherit" />
                        </IconButton>
                      )}
                    </FlexBox>

                    <Typography noWrap variant="h6">
                      {item.streetName}
                    </Typography>
                    <Typography variant="body1">{item.regionName}</Typography>
                    <Typography variant="body1">{item.countyName}</Typography>
                    <Typography variant="body1">{item.streetNumber}</Typography>
                    <Typography variant="body1">{item.houseApartment}</Typography>
                  </AddressCard>
                );
              }}
            />
          </Grid>
        ))}
      </Grid>

      {isHydrated && openModal && (
        <DeliveryAddressForm handleCloseModal={toggleModal} deliveryAddress={editDeliveryAddress} />
      )}
    </Card>
  );
}
