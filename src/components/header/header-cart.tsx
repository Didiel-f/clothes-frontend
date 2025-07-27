import Link from "next/link";
// MUI
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";

export default function HeaderCart() {
  const { state } = useCart();

  return (
    <Badge badgeContent={state.cart.length} color="primary">
      <IconButton LinkComponent={Link} href="/mini-cart">
        <ShoppingBagOutlined sx={{ color: "grey.600" }} />
      </IconButton>
    </Badge>
  );
}
