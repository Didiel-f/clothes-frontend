"use client";

import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// MUI
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENTS
import { TextField, FormProvider } from "components/form-hook";
import FlexRowCenter from "components/flex-box/flex-row-center";
// LOCAL CUSTOM COMPONENT
import BoxLink from "../components/box-link";

// FORM FIELD INITIAL VALUE
const initialValues = { email: "" };

// FORM FIELD VALIDATION SCHEMA
const validationSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required")
});

export default function ResetPassword() {
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = methods;

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });

  return (
    <Fragment>
      <Typography variant="h3" sx={{ mb: 3, textAlign: "center" }}>
        Reset your password
      </Typography>

      {/* FORM AREA */}
      <FormProvider methods={methods} onSubmit={handleSubmitForm}>
        <Stack spacing={2}>
          <TextField fullWidth name="email" type="email" label="Email" />

          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            loading={isSubmitting}>
            Reset
          </Button>
        </Stack>
      </FormProvider>

      {/* BOTTOM LINK AREA */}
      <FlexRowCenter mt={3} justifyContent="center" gap={1}>
        Don&apos;t have an account?
        <BoxLink title="Register" href="/register" />
      </FlexRowCenter>
    </Fragment>
  );
}
