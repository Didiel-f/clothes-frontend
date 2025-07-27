import { Fragment } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
// LOCAL CUSTOM COMPONENTS
import OrderRow from "../order-row";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import Order from "models/Order.model";

// ====================================================
type Props = { orders: Order[]; totalPages: number };
// ====================================================

export default function OrdersPageView({ orders, totalPages }: Props) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={ShoppingBag} title="My Orders" />

      {/* ORDER LIST AREA */}
      {orders.map((order) => (
        <OrderRow order={order} key={order.id} />
      ))}

      {/* ORDERS PAGINATION */}
      <Pagination count={totalPages} />
    </Fragment>
  );
}
