"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import { Checkbox, TextField, FormProvider } from "components/form-hook";
// LOCAL CUSTOM COMPONENTS
import EyeToggleButton from "../components/eye-toggle-button";
// LOCAL CUSTOM HOOK
import Label from "../components/label";
import BoxLink from "../components/box-link";
import usePasswordVisible from "../use-password-visible";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";

// REGISTER FORM FIELD VALIDATION SCHEMA
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email Address").required("Email is required"),
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!")
});

export default function RegisterPageView() {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();

  // COMMON INPUT PROPS FOR TEXT FIELD
  const inputProps = {
    endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
  };

  // REGISTER FORM FIELDS INITIAL VALUES
  const initialValues = {
    name: "",
    email: "",
    password: "",
    re_password: "",
    agreement: false
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registro exitoso - redirigir al dashboard
        alert('¡Cuenta creada exitosamente!');
        window.location.href = '/orders';
      } else {
        // Mostrar error
        alert(data.error || 'Error al crear la cuenta');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Error de conexión. Intenta nuevamente.');
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <div className="mb-1">
        <Label>Full Name</Label>
        <TextField fullWidth name="name" size="small" placeholder="Ralph Awards" />
      </div>

      <div className="mb-1">
        <Label>Email or Phone Number</Label>
        <TextField fullWidth name="email" size="small" type="email" placeholder="exmple@mail.com" />
      </div>

      <div className="mb-1">
        <Label>Password</Label>
        <TextField
          fullWidth
          size="small"
          name="password"
          placeholder="*********"
          type={visiblePassword ? "text" : "password"}
          slotProps={{ input: inputProps }}
        />
      </div>

      <div className="mb-1">
        <Label>Retype Password</Label>
        <TextField
          fullWidth
          size="small"
          name="re_password"
          placeholder="*********"
          type={visiblePassword ? "text" : "password"}
          slotProps={{ input: inputProps }}
        />
      </div>

      <div className="agreement">
        <Checkbox
          name="agreement"
          size="small"
          color="secondary"
          label={
            <FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start" gap={1}>
              <Box display={{ sm: "inline-block", xs: "none" }}>By signing up, you agree to</Box>
              <Box display={{ sm: "none", xs: "inline-block" }}>Accept Our</Box>
              <BoxLink title="Terms & Condition" href="/" />
            </FlexBox>
          }
        />
      </div>

      <Button
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        loading={isSubmitting}>
        Create an Account
      </Button>
    </FormProvider>
  );
}
