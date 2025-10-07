"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
// MUI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
// CONTEXTO DEL CARRITO
import { useCartStore } from "contexts/CartContext";

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
  const clearCart = useCartStore((state) => state.clearCart);
  const [hasClearedCart, setHasClearedCart] = useState(false);

  // Limpiar el carrito cuando se carga la página de confirmación
  useEffect(() => {
    // Solo limpiar el carrito una vez cuando se carga la página
    // Esto evita que se limpie múltiples veces si el usuario recarga la página
    if (!hasClearedCart) {
      clearCart();
      setHasClearedCart(true);
    }
  }, [clearCart, hasClearedCart]);

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
