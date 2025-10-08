"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import FlexBetween from "components/flex-box/flex-between";
import { currency } from "lib";
import { useCartStore, useCartSubtotal, useCartTotals } from "contexts/CartContext";



export default function CheckoutSummary({ showShipping = true }: { showShipping?: boolean }) {

  const cart = useCartStore((s) => s.cart);
  const shipping = useCartStore((s) => s.shippingPrice);
  const discount = useCartStore((s) => s.discount);
  const subtotal = useCartSubtotal();
  const total = useCartTotals();

  // si no hay carrito, no renderizamos
  if (!cart?.length) return null;

  const shippingNum = Number(shipping ?? 0);
  const discountNum = Number(discount ?? 0);

  // Si tu "envío gratis" también es 0, ajusta esta condición a lo que corresponda
  const isShippingPending = shippingNum === 0 && cart.length > 0;

  // Lógica de envío gratis
  const freeShippingThreshold = 100000;
  const amountToFreeShipping = freeShippingThreshold - subtotal;
  const hasFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2, color: "secondary.900" }}>
        Tu orden
      </Typography>

      {/* Mensaje de envío gratis */}
      {subtotal > 0 && subtotal < freeShippingThreshold && (
        <Box sx={{ mb: 2, p: 1.5, bgcolor: 'info.lighter', borderRadius: 1 }}>
          <Typography variant="body2" color="info.main">
            ¡Te faltan {currency(amountToFreeShipping)} para envío gratis!
          </Typography>
        </Box>
      )}

      {hasFreeShipping && (
        <Box sx={{ mb: 2, p: 1.5, bgcolor: 'success.lighter', borderRadius: 1 }}>
          <Typography variant="body2" color="success.main">
            🎉 ¡Felicitaciones! Tienes envío gratis
          </Typography>
        </Box>
      )}

      {cart.map(({ product: { name, price, documentId }, qty }) => (
        <FlexBetween mb={1.5} key={documentId ?? name}>
          <p>{qty} x {name}</p>
          <p>{currency(Number(price))}</p>
        </FlexBetween>
      ))}

      <Box component={Divider} borderColor="grey.300" my={3} />

      <Row title="Subtotal" value={subtotal} />
      {showShipping && (
        <Row
          title="Envío"
          value={shippingNum}
          rightSlot={
            isShippingPending ? (
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="caption" color="text.secondary">
                  Ingrese dirección
                </Typography>
              </Box>
            ) : hasFreeShipping && shippingNum === 0 ? (
              <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                ¡Gratis!
              </Typography>
            ) : null
          }
        />
      )}
      {discountNum ? <Row title="Discount" value={discountNum} mb={3} /> : null}

      <Box component={Divider} borderColor="grey.300" mb={1} />

      <Row title="Total" value={total} emphasize />
    </div>
  );
}

function Row({
  title,
  value = 0,
  mb = 0.5,
  emphasize = false,
  rightSlot
}: {
  title: string;
  value?: number;
  mb?: number;
  emphasize?: boolean;
  rightSlot?: React.ReactNode;
}) {
  const Left = (
    <Typography variant="body1" sx={{ color: emphasize ? "inherit" : "grey.600" }}>
      {title}:
    </Typography>
  );

  const Right = emphasize ? (
    <Typography variant="h6">{currency(value)}</Typography>
  ) : (
    <Typography variant="body1">{value ? currency(value) : "-"}</Typography>
  );

  return (
    <FlexBetween mb={mb}>
      {Left}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {Right}
        {rightSlot}
      </Box>
    </FlexBetween>
  );
}
