"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// MUI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
// CONTEXTO DEL CARRITO
import { useCartStore } from "contexts/CartContext";
// GOOGLE ANALYTICS
import { trackPurchase } from "utils/analytics";

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
  const searchParams = useSearchParams();
  const { cart, clearCart, shippingPrice, discount, discountCode, tax } = useCartStore();
  const [hasTrackedPurchase, setHasTrackedPurchase] = useState(false);

  useEffect(() => {
    // Obtener parámetros de Mercado Pago
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const merchantOrderId = searchParams.get("merchant_order_id");
    
    // Solo trackear si:
    // 1. Hay un payment_id (viene de Mercado Pago)
    // 2. El pago fue aprobado
    // 3. Hay productos en el carrito
    // 4. No se ha trackeado antes
    const shouldTrack = paymentId && 
                       status === "approved" && 
                       cart.length > 0 && 
                       !hasTrackedPurchase;
    
    if (shouldTrack) {
      // Calcular el total
      const subtotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.qty,
        0
      );
      const total = subtotal + shippingPrice - discount + tax;
      
      // 📊 Google Analytics: Trackear la compra
      trackPurchase(
        merchantOrderId || paymentId,  // ID de la transacción
        cart,                          // Productos comprados
        total,                         // Total pagado
        shippingPrice,                 // Costo de envío
        tax,                           // Impuestos
        discountCode || undefined      // Cupón usado
      );
      
      // Marcar como trackeado para evitar duplicados
      setHasTrackedPurchase(true);
      
      // Limpiar el carrito DESPUÉS de trackear
      clearCart();
    } else if (!paymentId && cart.length > 0 && !hasTrackedPurchase) {
      // Si no hay payment_id pero hay carrito, es una visita directa o recarga
      // Limpiar el carrito sin trackear
      clearCart();
      setHasTrackedPurchase(true);
    }
  }, [searchParams, cart, clearCart, shippingPrice, discount, discountCode, tax, hasTrackedPurchase]);

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
