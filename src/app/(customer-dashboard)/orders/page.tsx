"use client";

import { useSearchParams } from "next/navigation";
import { OrdersPageView } from "pages-sections/customer-dashboard/orders/page-view";
import { useMyOrders } from "lib/useMyOrders";
import { CircularProgress, Box } from "@mui/material";

export default function Orders() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  
  const { orders, pagination, isLoading } = useMyOrders(page, 10);
console.log("orders", orders);
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!orders || orders.length === 0) {
    return <div>No tienes pedidos aún</div>;
  }

  return <OrdersPageView orders={orders} totalPages={pagination?.pageCount || 1} />;
}
