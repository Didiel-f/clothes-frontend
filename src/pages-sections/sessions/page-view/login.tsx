"use client";

import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import * as yup from "yup";
// GLOBAL CUSTOM COMPONENTS
import { TextField, FormProvider } from "components/form-hook";
// LOCAL CUSTOM COMPONENTS
import Label from "../components/label";
import EyeToggleButton from "../components/eye-toggle-button";
// LOCAL CUSTOM HOOK
import usePasswordVisible from "../use-password-visible";

// LOGIN FORM FIELD VALIDATION SCHEMA
const validationSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("Invalid Email Address").required("Email is required")
});

export default function LoginPageView() {
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/orders';

  // LOGIN FORM FIELDS INITIAL VALUES
  const initialValues = { email: "", password: "" };

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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso - redirigir a la página original o al dashboard
        window.location.href = redirectTo;
      } else {
        // Mostrar error
        alert(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error de conexión. Intenta nuevamente.');
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <div className="mb-1">
        <Label>Correo electrónico</Label>
        <TextField fullWidth name="email" size="small" type="email" placeholder="exmple@mail.com" />
      </div>

      <div className="mb-2">
        <Label>Contraseña</Label>
        <TextField
          fullWidth
          size="small"
          name="password"
          autoComplete="on"
          placeholder="*********"
          type={visiblePassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
            }
          }}
        />
      </div>

      <Button
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        loading={isSubmitting}>
        Iniciar sesión
      </Button>
    </FormProvider>
  );
}
