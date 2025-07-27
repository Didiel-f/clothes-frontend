import Link from "next/link";
import Image from "next/image";
// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import { CartItem } from "contexts/CartContext";

// ==============================================================
interface Props {
  item: CartItem;
  handleCartAmountChange: (amount: number, product: CartItem) => () => void;
}
// ==============================================================

export default function MiniCartItem({ item, handleCartAmountChange }: Props) {
  return (
    <FlexBox
      py={2}
      px={2.5}
      key={item.id}
      alignItems="center"
      borderBottom="1px dashed"
      borderColor="divider"
      gap={2}>
      <Link href={`/products/${item.slug}`}>
        <Avatar variant="rounded" sx={{ width: 75, height: 75, borderRadius: 3 }}>
          <Image alt={item.title} src={item.thumbnail} fill sizes="(75px, 75px)" />
        </Avatar>
      </Link>

      <Box flex="1" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
        <Typography noWrap variant="h6" className="title">
          {item.title}
        </Typography>

        <Typography variant="body1" sx={{ fontSize: 12, color: "grey.600", mb: 1 }}>
          {currency(item.price)} x {item.qty}
        </Typography>

        <FlexBox alignItems="center" gap={1}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={handleCartAmountChange(item.qty + 1, item)}
            sx={{ height: 24, width: 24, borderRadius: 1.5 }}>
            <Add fontSize="small" />
          </Button>

          <Typography variant="h6" sx={{ mx: "3px" }}>
            {item.qty}
          </Typography>

          <Button
            size="small"
            color="primary"
            variant="outlined"
            disabled={item.qty === 1}
            onClick={handleCartAmountChange(item.qty - 1, item)}
            sx={{ height: 24, width: 24, borderRadius: 1.5 }}>
            <Remove fontSize="small" />
          </Button>
        </FlexBox>
      </Box>

      <IconButton size="small" onClick={handleCartAmountChange(0, item)}>
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}
