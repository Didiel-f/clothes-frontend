import { Fragment } from "react";
import BoxLink from "./box-link";
import { FlexBox, FlexRowCenter } from "components/flex-box";

export default function LoginBottom() {
  return (
    <Fragment>
      {/* DON'T HAVE ACCOUNT AREA */}
      <FlexRowCenter gap={1} my={3}>
        No tienes una cuenta?
        <BoxLink title="Registrarse" href="/register" />
      </FlexRowCenter>

      {/* FORGET YOUR PASSWORD AREA */}
      <FlexBox gap={1} py={2} borderRadius={1} justifyContent="center" bgcolor="grey.200">
        Olvidaste tu contraseña?
        <BoxLink title="Restablecer" href="/reset-password" />
      </FlexBox>
    </Fragment>
  );
}
