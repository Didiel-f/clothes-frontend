// checkout-form.tsx
"use client";

import Button from "@mui/material/Button";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// GLOBAL
import { FormProvider } from "components/form-hook";
// LOCALES
// TIPOS
import Address from "models/Address.model";
// 🆕
import { makeKey } from "utils/ns";
import { ls } from "utils/form-persist";
import { usePersistRHF } from "hooks/usePersistRHF";
import DeliveryAddresses from "pages-sections/checkout/checkout-form/delivery-addresses";
import ClientInfoForm from "pages-sections/checkout/checkout-form/delivery-addresses/client-info-form";
import Voucher from "pages-sections/checkout/checkout-form/payments/voucher";

type Props = {
  isLoggedIn?: boolean;
  userId?: string | null;
  deliveryAddresses?: Address[];
};

// Ajusta a tus campos reales:
type FormValues = {
  // cliente
  name: string;
  lastname?: string;
  rut?: string;
  phone: string;
  email: string;
  // dirección (si la manejas dentro del mismo form con RHF)
  regionName?: string;
  regionId?: string;
  countyName?: string;
  countyCode?: string | null;
  streetName?: string;
  streetNumber?: string;
  houseApartment?: string;
  // ... cualquier otro que uses
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  lastname: yup.string().optional(),
  rut: yup.string().optional(),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Correo inválido").required("Correo es requerido"),
  // agrega validaciones de dirección según tu flujo
}) as yup.ObjectSchema<any>;

export default function CheckoutForm({ isLoggedIn = false, userId = null, deliveryAddresses }: Props) {
  const ns = makeKey(isLoggedIn ? userId : undefined);
  const FORM_KEY = ns("checkout:form");

  const DEFAULTS: FormValues = {
    name: "",
    lastname: "",
    rut: "",
    phone: "",
    email: "",
    regionName: "",
    regionId: "",
    countyName: "",
    countyCode: null,
    streetName: "",
    streetNumber: "",
    houseApartment: ""
  };

  // 1) defaultValues:
  // - Si estuvieras logueado y ya trajiste perfil/direcciones del servidor,
  //   reemplaza aquí con esos datos.
  const methods = useForm<FormValues>({
    defaultValues: ls.get<FormValues>(FORM_KEY, DEFAULTS),
    resolver: yupResolver(validationSchema) as unknown as Resolver<FormValues>
  });

  // 2) persistencia automática (limpia en submit si es invitado)
  usePersistRHF<FormValues>(FORM_KEY, methods, {
    clearOnSubmitSuccess: !isLoggedIn,
    // ejemplo: si countyCode es null, limpia calle
    serialize: (v) => (!v.countyCode ? { ...v, streetName: "", streetNumber: "" } : v)
  });

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const handleSubmitForm = handleSubmit(async (values) => {
    // Aquí haces tu submit real
    // Si estás logueado: backend manda (perfil + direcciones)
    // Si NO: el LS se limpia por clearOnSubmitSuccess

    // Demo:
    alert(JSON.stringify(values, null, 2));
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <ClientInfoForm />
      <DeliveryAddresses deliveryAddresses={deliveryAddresses} />
      <Voucher />
      <Button size="large" type="submit" color="primary" variant="contained" loading={isSubmitting}>
        Pagar
      </Button>
    </FormProvider>
  );
}
