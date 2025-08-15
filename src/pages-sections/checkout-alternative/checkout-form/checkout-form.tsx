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

const validationSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  lastname: yup.string().required("El apellido es requerido"),
  rut: yup.string().required("Ingrese RUT"),
  phone: yup.string().required("Ingrese teléfono"),
  email: yup.string().email("Correo inválido").required("Correo es requerido"),
  address: yup.mixed<Address>().required("Se necesita una dirección de envío"),
  voucher: yup.string().optional(),
});

type FormValues = yup.InferType<typeof validationSchema>;

interface Props {
  deliveryAddresses?: Address[];
}

export default function CheckoutForm({ deliveryAddresses }: Props) {

  const initialValues: Partial<FormValues> = {
    name: "",
    lastname: "",
    rut: "",
    phone: "",
    email: "",
    address: undefined,
    voucher: "",
  };

  const methods = useForm<FormValues>({
    defaultValues: initialValues as FormValues,
    resolver: yupResolver(validationSchema) as Resolver<FormValues>,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;



  const handleSubmitForm = handleSubmit((values) => {
    console.log("SUBMIT CHECKOUT", values);
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
