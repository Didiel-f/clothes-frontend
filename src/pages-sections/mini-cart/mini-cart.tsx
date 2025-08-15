import Link from "next/link";
import { useRouter } from "next/navigation";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Clear from "@mui/icons-material/Clear";
// LOCAL CUSTOM COMPONENTS
import MiniCartItem from "./components/cart-item";
import EmptyCartView from "./components/empty-view";
// GLOBAL CUSTOM COMPONENT
import { FlexBetween, FlexBox } from "components/flex-box";
import OverlayScrollbar from "components/overlay-scrollbar";
// CUSTOM ICON COMPONENT
import CartBag from "icons/CartBag";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { CartItem, useCartStore } from "contexts/CartContext";

export default function MiniCart() {
  const router = useRouter();
  const { cart, addItem } = useCartStore();
  const CART_LENGTH = cart.length;

  const handleCartAmountChange = (amount: number, item: CartItem) => () => {
    addItem({
      ...item,
      qty: amount,
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  };

  return (
    <Box height="100vh" width={380}>
      {/* HEADING SECTION */}
      <FlexBetween ml={3} mr={2} height={74}>
        <FlexBox gap={1} alignItems="center" color="secondary.main">
          <CartBag color="inherit" />
          <Typography variant="h6">{CART_LENGTH} productos</Typography>
        </FlexBox>

        <IconButton onClick={router.back}>
          <Clear />
        </IconButton>
      </FlexBetween>

      <Divider />

      {/* CART ITEM LIST */}
      <Box height={`calc(100% - ${CART_LENGTH ? "207px" : "75px"})`}>
        {CART_LENGTH > 0 ? (
          <OverlayScrollbar>
            {cart.map((item) => (
              <MiniCartItem
                item={item}
                key={item.variant.documentId}
                handleCartAmountChange={handleCartAmountChange}
              />
            ))}
          </OverlayScrollbar>
        ) : (
          <EmptyCartView />
        )}
      </Box>

      {/* CART BOTTOM ACTION BUTTONS */}
      {CART_LENGTH > 0 ? (
        <Box p={2.5}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mb: "0.75rem", height: 40 }}
            LinkComponent={Link}
            href="/checkout-alternative">
            Comprar ahora ({currency(getTotalPrice())})
          </Button>

          <Button
            fullWidth
            color="primary"
            variant="outlined"
            sx={{ height: 40 }}
            LinkComponent={Link}
            href="/cart">
            Ver carrito
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
