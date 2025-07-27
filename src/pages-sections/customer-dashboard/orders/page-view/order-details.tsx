import { Fragment } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
// LOCAL CUSTOM COMPONENTS
import OrderSummery from "../order-summery";
import OrderProgress from "../order-progress";
import OrderedProducts from "../ordered-products";
import DashboardHeader from "../../dashboard-header";
// CUSTOM DATA MODEL
import Order from "models/Order.model";

// =============================================================
type Props = { order: Order };
// =============================================================

export default function OrderDetailsPageView({ order }: Props) {
  return (
    <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader href="/orders" Icon={ShoppingBag} title="Order Details" buttonText="Back" />

      {/* ORDER PROGRESS AREA */}
      <OrderProgress
        status={order.status}
        deliveredAt={order.deliveredAt}
        isDelivered={order.isDelivered}
      />

      {/* ORDERED PRODUCT LIST */}
      <OrderedProducts order={order} />

      {/* SHIPPING AND ORDER SUMMERY */}
      <OrderSummery order={order} />
    </Fragment>
  );
}
