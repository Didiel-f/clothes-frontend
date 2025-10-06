"use client";

import { useParams } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/customer-dashboard/orders/page-view";
import { useMyOrder } from "lib/useMyOrders";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function OrderDetails() {
  const params = useParams();
  const orderId = params.id as string;
  
  const { order, isLoading, error } = useMyOrder(orderId);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">
          Error al cargar la orden: {error.message}
        </Typography>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>
          Orden no encontrada
        </Typography>
      </Box>
    );
  }

  return <OrderDetailsPageView order={order} />;
}
