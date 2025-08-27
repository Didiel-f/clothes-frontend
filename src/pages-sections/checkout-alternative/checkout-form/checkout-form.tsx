"use client";

import Button from "@mui/material/Button";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// GLOBAL
import { FormProvider } from "components/form-hook";
// LOCALES
import DeliveryAddresses from "./delivery-addresses";
import Voucher from "./payments/voucher";
// TIPOS
import ClientInfoForm from "./delivery-addresses/client-info-form";
import Address from "models/Address.model";
// HOOKS
import { usePersistRHF } from "hooks/usePersistRHF";
// COMPONENTS
import { MercadoPagoButton } from "./delivery-addresses/MercadoPagoButton";

// ================== CONFIG BÁSICA ==================
type Props = {
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
  // dirección seleccionada
  address?: Address;
  // dirección (si usas RHF aquí mismo)
  regionName?: string;
  countyName?: string;
  countyCode?: string | null;
  streetName?: string;
  streetNumber?: string;
  houseApartment?: string;
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  lastname: yup.string().optional(),
  rut: yup.string().optional(),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Correo inválido").required("Correo es requerido"),
}) as yup.ObjectSchema<any>;

// ================== PERSISTENCIA CON HOOK ==================
const FORM_KEY = "checkout:form";

const DEFAULTS: FormValues = {
  name: "",
  lastname: "",
  rut: "",
  phone: "",
  email: "",
  address: undefined,
  regionName: "",
  countyName: "",
  countyCode: null,
  streetName: "",
  streetNumber: "",
  houseApartment: ""
};

// ==========================================================

export default function CheckoutForm({ deliveryAddresses }: Props) {
  // 1) RHF con valores por defecto
  const methods = useForm<FormValues>({
    defaultValues: DEFAULTS,
    resolver: yupResolver(validationSchema) as unknown as Resolver<FormValues>
  });

  // 2) Usar el hook de persistencia robusto
  usePersistRHF(FORM_KEY, methods, {
    // Opcional: limpiar solo ciertos campos o transformar datos
    serialize: (values) => {
      // Saneos mínimo: si countyCode está vacío, limpiamos calle/número
      const sanitized = values.countyCode == null || values.countyCode === ""
        ? { ...values, streetName: "", streetNumber: "" }
        : values;
      
      // Asegurar que el campo address se mantenga
      return sanitized;
    },
    // Opcional: limpiar al enviar exitosamente
    clearOnSubmitSuccess: true
  });

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const handleSubmitForm = handleSubmit(async (values) => {
    console.log("SUBMIT CHECKOUT", values);
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <ClientInfoForm />
      <DeliveryAddresses deliveryAddresses={deliveryAddresses} />
      <Voucher />
      <MercadoPagoButton 
        formValues={{
          regionName: methods.watch("regionName") || "",
          countyName: methods.watch("countyName") || "",
          streetName: methods.watch("streetName") || "",
          streetNumber: methods.watch("streetNumber") || "",
          houseApartment: methods.watch("houseApartment") || "",
          firstName: methods.watch("name") || "",
          lastName: methods.watch("lastname") || "",
          phone: methods.watch("phone") || "",
          email: methods.watch("email") || "",
          rut: methods.watch("rut") || "",
        }}
      />
    </FormProvider>
  );
}
