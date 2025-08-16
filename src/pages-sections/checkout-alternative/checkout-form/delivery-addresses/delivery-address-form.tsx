"use client"
import { useEffect, useMemo, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import { FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField as MuiTextField } from "@mui/material";
// RHF
import { Controller } from "react-hook-form";
// Tipos de tu API (ajústalos si difieren)
type IStreet = { streetId: number; streetName: string };

// Si tienes este modelo en tu app:
import { useChilexpressRegions } from "hooks/chilexpress/useChilexpressRegions";
import { useChilexpressCounties } from "hooks/chilexpress/useChilexpressCounties";
import { useChilexpressStreets } from "hooks/chilexpress/use-chilexpress-streets";
import { useDeliveryAddressesCTX } from "contexts/delivery-addresses-context";
import Address from "models/Address.model";
import { useChilexpressRates } from "hooks/chilexpress/useChilexpressRates";
import { useCartStore } from "contexts/CartContext";

// ======== VALIDACIÓN ========
const validationSchema = yup.object({
  regionCode: yup.string().required("Región es requerida"),
  regionName: yup.string().required(),
  countyName: yup.string().required("Comuna es requerida"),
  countyCode: yup.string().required(),
  streetId: yup.mixed<number>().required("Calle es requerida"),
  streetName: yup.string().required(),
  streetNumber: yup.string().required("Número es requerido"),
  houseApartment: yup.string().required()
});

type FormValues = yup.InferType<typeof validationSchema>;

// ==================================================================
interface Props {
  handleCloseModal: () => void;
  deliveryAddress?: Address;
}
// ==================================================================

export default function DeliveryAddressForm({
  deliveryAddress,
  handleCloseModal,
}: Props) {
  const initialValues: FormValues = useMemo(
    () => ({
      regionCode: (deliveryAddress as any)?.regionCode ?? "",
      regionName: (deliveryAddress as any)?.regionName ?? "",
      countyName: (deliveryAddress as any)?.countyName ?? "",
      countyCode: (deliveryAddress as any)?.countyCode ?? "",
      streetId: (deliveryAddress as any)?.streetId ?? (null as any),
      streetName: (deliveryAddress as any)?.streetName ?? "",
      streetNumber: (deliveryAddress as any)?.streetNumber ?? "",
      houseApartment: (deliveryAddress as any)?.houseApartment ?? ""
    }),
    [deliveryAddress]
  );

  const [streetQuery, setStreetQuery] = useState("");
  const [rawQuery, setRawQuery] = useState("");
  const { isLoggedIn, addAddress, replaceOnlyAddress, canAddAnother } = useDeliveryAddressesCTX();
  const methods = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema) as Resolver<FormValues>,
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const {
    control, setValue, watch, handleSubmit, reset, getValues,
    formState: { isValid, isSubmitting }
  } = methods;

  const regionCode = watch("regionCode");
  const countyName = watch("countyName");
  const { regions } = useChilexpressRegions();
  const { counties } = useChilexpressCounties(regionCode);
  const { streets = [], loading: streetsLoading } = useChilexpressStreets({
    countyName,
    streetName: streetQuery
  });

  const countyCode = watch("countyCode")
  const { data: rate } = useChilexpressRates(countyCode ?? null);
  const addShippingPrice = useCartStore((s) => s.addShippingPrice);
  useEffect(() => {
    if (!countyCode) return;
    const val = Number(rate?.serviceValue);
    if (!Number.isFinite(val)) return;
    addShippingPrice(val);
  }, [countyCode, rate?.serviceValue, addShippingPrice]);

  const streetOnSelectHandler = (street: IStreet | null) => {
    setValue("streetId", street ? street.streetId : (null as any), { shouldValidate: true, shouldDirty: true });
    setValue("streetName", street?.streetName ?? "", { shouldValidate: true, shouldDirty: true });
    streetNumberOnSelectHandler("");
  };  

  const streetNumberOnSelectHandler = (val: string | null) => {
    setValue("streetNumber", val ?? "", { shouldValidate: true, shouldDirty: true });
    houseApartmentOnSelectHandler("");
  };
  

  const houseApartmentOnSelectHandler = (val: string | null) => {
    setValue("houseApartment", val ?? "", { shouldValidate: true, shouldDirty: true });
  };

  // Función wrapper para evitar propagación al formulario padre
  const handleFormSubmit = () => {
    // Llamar directamente a la función de submit
    handleSubmit((values) => {
      // Ensambla el DeliveryAddress real si necesitas adaptar tipos/campos
      const addr = {
        ...values,
      } as unknown as Address;

      if (isLoggedIn) {
        addAddress(addr); // puede agregar múltiples
      } else {
        // NO logueado -> siempre 1 (reemplaza)
        replaceOnlyAddress(addr);
      }

      console.log("Nueva dirección:", addr);
      handleCloseModal();
      reset();
    })();
  };

  useEffect(() => {
    const t = setTimeout(() => setStreetQuery(rawQuery.trim()), 250);
    return () => clearTimeout(t);
  }, [rawQuery]);

  return (
    <Dialog open onClose={handleCloseModal}>
      <DialogContent>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Añade información de dirección
        </Typography>

        <form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleFormSubmit();
        }}>
          <Grid container spacing={3}>
            {/* ===== Región ===== */}
            <Grid size={{ sm: 6, xs: 12 }}>
              <Controller
                name="regionCode"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth error={!!error}>
                    <InputLabel id="regionCode-label">Región</InputLabel>
                    <Select
                      labelId="regionCode-label"
                      label="Región"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value as string;
                        field.onChange(val);
                      
                        const r = regions.find((x) => x.regionId === val);
                        setValue("regionName", r?.regionName ?? "", { shouldValidate: true, shouldDirty: true });
                      
                        // reset en cascada + validar
                        setValue("countyName", "", { shouldValidate: true, shouldDirty: true });
                        setValue("countyCode", "", { shouldValidate: true, shouldDirty: true });
                        setValue("streetId", null as any, { shouldValidate: true, shouldDirty: true });
                        setValue("streetName", "", { shouldValidate: true, shouldDirty: true });
                        setValue("streetNumber", "", { shouldValidate: true, shouldDirty: true });
                        setValue("houseApartment", "", { shouldValidate: true, shouldDirty: true });
                      
                        streetOnSelectHandler(null); // esto ya vuelve a invalidar calle
                      }}
                    >
                      {regions.map((r) => (
                        <MenuItem key={r.regionId} value={r.regionId}>
                          {r.regionName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            {/* ===== Comuna ===== */}
            <Grid size={{ sm: 6, xs: 12 }}>
              <Controller
                name="countyName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth error={!!error} disabled={!regionCode}>
                    <InputLabel id="countyName-label">Comuna</InputLabel>
                    <Select
                      labelId="countyName-label"
                      label="Comuna"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      
                        const selected = counties.find((c) => c.countyName === e.target.value);
                        setValue("countyCode", selected?.countyCode ?? "", { shouldValidate: true, shouldDirty: true });
                        setValue("streetId", null as any, { shouldValidate: true, shouldDirty: true });
                        setValue("streetName", "", { shouldValidate: true, shouldDirty: true });
                        setValue("streetNumber", "", { shouldValidate: true, shouldDirty: true });
                        setValue("houseApartment", "", { shouldValidate: true, shouldDirty: true });
                      
                        streetOnSelectHandler(null);
                      }}                      
                    >
                      {counties.map((c) => (
                        <MenuItem key={c.countyCode} value={c.countyName}>
                          {c.countyName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            {/* ===== Calle ===== */}
            <Grid size={{ sm: 6, xs: 12 }}>
              <Controller
                name="streetName"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    disabled={!countyName}
                    options={streets}
                    loading={streetsLoading}
                    getOptionLabel={(opt) =>
                      typeof opt === "string" ? opt : opt.streetName
                    }
                    value={
                      field.value
                        ? streets.find((s) => s.streetName === field.value) ?? null
                        : null
                    }
                    onChange={(_, street) => {
                      if (street && typeof street !== "string") {
                        streetOnSelectHandler(street as IStreet);
                      } else {
                        streetOnSelectHandler(null);
                      }
                    }}
                    onInputChange={(_, q) => {
                      if (!countyName) return;
                      setRawQuery(q);
                      if (q.trim() === "") {
                        // Borró todo → limpiar selección y dejar inválido
                        streetOnSelectHandler(null);
                      } else {
                        // Si está escribiendo algo distinto a la selección actual, invalida streetId
                        const selectedName = getValues("streetName");
                        if (selectedName && selectedName !== q) {
                          setValue("streetId", null as any, { shouldValidate: true, shouldDirty: true });
                        }
                      }
                    }}
                    renderInput={(params) => (
                      <MuiTextField {...params} label="Calle" />
                    )}
                  />
                )}
              />
            </Grid>

            {/* ===== Número ===== */}
            <Grid size={{ sm: 6, xs: 12 }}>
              <Controller
                name="streetNumber"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MuiTextField
                    label="Número"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    disabled={!watch("streetName")}
                    value={field.value ?? ""}
                    onChange={(e) => streetNumberOnSelectHandler(e.target.value)}
                  />
                )}
              />
            </Grid>

            {/* ===== Casa / Depto ===== */}
            <Grid size={{ sm: 6, xs: 12 }}>
              <Controller
                name="houseApartment"
                control={control}
                render={({ field }) => (
                  <MuiTextField
                    label="Casa / Depto"
                    fullWidth
                    disabled={!watch("streetNumber")}
                    value={field.value ?? ""}
                    onChange={(e) => houseApartmentOnSelectHandler(e.target.value)}
                    placeholder="Ej: Depto 301"
                  />
                )}
              />
            </Grid>

            <Grid size={{ sm: 6, xs: 12 }}>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleFormSubmit}
                disabled={!isValid || isSubmitting}
              >
                Guardar
              </Button>

            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
