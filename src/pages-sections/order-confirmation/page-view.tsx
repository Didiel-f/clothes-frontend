"use client";

import Link from "next/link";
import Image from "next/image";
// MUI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

// STYLED COMPONENT
const Wrapper = styled(Card)(({ theme }) => ({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center",
  h1: { marginTop: "1.5rem", lineHeight: 1.1, fontSize: 30, fontWeight: 600 },
  p: { color: theme.palette.grey[800], marginTop: "0.3rem" }
}));

const StyledButton = styled(Button)({
  marginTop: "2rem",
  padding: "11px 24px"
});

export default function OrderConfirmationPageView() {
  return (
    <Container className="mt-2 mb-5">
      <Wrapper>
        <Image
          width={116}
          height={116}
          alt="complete"
          src="/assets/images/illustrations/party-popper.svg"
        />
        <h1>¡Tu pedido ha sido completado!</h1>
        <p>Recibirás un correo electrónico de confirmación con los detalles del pedido.</p>

        <StyledButton
          color="primary"
          disableElevation
          variant="contained"
          className="button-link"
          LinkComponent={Link}
          href="/">
          Seguir comprando
        </StyledButton>
      </Wrapper>
    </Container>
  );
}
