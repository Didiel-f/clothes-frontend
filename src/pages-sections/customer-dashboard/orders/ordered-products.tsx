import Image from "next/image";
// MUI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { format } from "date-fns/format";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import Order from "models/Order.model";

// ==============================================================
type Props = { order: Order };
// ==============================================================

export default function OrderedProducts({ order }: Props) {
  const { id, createdAt, items, deliveredAt } = order;

  return (
    <Card sx={{ p: 0, mb: "30px" }}>
      <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
        <Item title="Order ID:" value={id} />
        <Item title="Placed on:" value={format(new Date(createdAt), "dd MMM, yyyy")} />
        <Item
          title="Delivered on:"
          value={deliveredAt ? format(new Date(deliveredAt), "dd MMM, yyyy") : "None"}
        />
      </FlexBetween>

      {items?.map((item, ind) => (
        <FlexBetween px={2} py={1} flexWrap="wrap" key={ind}>
          <FlexBox gap={2.5} alignItems="center">
            <Avatar variant="rounded" sx={{ height: 64, width: 64, backgroundColor: "grey.100" }}>
              <Image fill alt={item.product_name} src={item.product_img} sizes="(60px, 60px)" />
            </Avatar>

            <div>
              <Typography variant="h6">{item.product_name}</Typography>
              <Typography variant="body1" sx={{ color: "grey.600" }}>
                {currency(item.product_price)} x {item.product_quantity}
              </Typography>
            </div>
          </FlexBox>

          {item.variant ? (
            <Typography noWrap variant="body1" sx={{ color: "grey.600" }}>
              Product properties: {item.variant}
            </Typography>
          ) : null}

          <Button variant="text" color="primary">
            Write a Review
          </Button>
        </FlexBetween>
      ))}
    </Card>
  );
}

function Item({ title, value }: { title: string; value: string }) {
  return (
    <FlexBox gap={1} alignItems="center">
      <Typography variant="body1" sx={{ color: "grey.600" }}>
        {title}
      </Typography>
      <p>{value}</p>
    </FlexBox>
  );
}
