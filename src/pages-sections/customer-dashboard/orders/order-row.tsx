import Link from "next/link";
// MUI
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import East from "@mui/icons-material/East";
import { format } from "date-fns/format";
// LOCAL CUSTOM COMPONENT
import TableRow from "../table-row";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import Order from "models/Order.model";

// =================================================
type Props = { order: Order };
// =================================================

export default function OrderRow({ order }: Props) {
  const getColor = (status: string) => {
    if (status === "Pending") return "secondary";
    else if (status === "Processing") return "info";
    else if (status === "Delivered") return "success";
    else if (status === "Cancelled") return "error";
    else return "default";
  };

  return (
    // <Link href={`/orders/${(order as any).documentId || order.id}`}>
      <TableRow sx={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr" }}>
        <Typography noWrap variant="h5">
          #{(order as any).documentId ? String((order as any).documentId).substring(0, 18) : String(order.id).substring(0, 18)}
        </Typography>

        <Box textAlign="center">
          <Chip size="small" label={order.status} color={getColor(order.status)} />
        </Box>

        <Typography variant="body1" sx={{ textAlign: { sm: "center", xs: "left" } }}>
          {format(new Date(order.createdAt), "MMM dd, yyyy")}
        </Typography>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {currency(order.totalPrice)}
        </Typography>

        <Box justifyContent="end" display={{ sm: "inline-flex", xs: "none" }}>
          <IconButton>
            <East className="east" fontSize="small" />
          </IconButton>
        </Box>
      </TableRow>
    // </Link>
  );
}
