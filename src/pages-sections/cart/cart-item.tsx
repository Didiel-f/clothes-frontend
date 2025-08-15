"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
import FlexBox from "components/flex-box/flex-box";
import { currency } from "lib";
import { Wrapper } from "./styles";
import { CartItem as CartModel, useCartStore } from "contexts/CartContext";


type Props = { item: CartModel };

export default function CartItem({ item }: Props) {
  const { product, variant, qty } = item;
  const { name, images, slug, price } = product;
  const { isShoe, shoesSize, clotheSize, documentId: variantDocumentId } = variant;

  const productSize = isShoe ? shoesSize : clotheSize;

  // acciones del store
  const updateQty  = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);

  const handleCartAmountChange = (amount: number) => () => {
    if (amount <= 0) {
      removeItem(variantDocumentId);
    } else {
      updateQty(variantDocumentId, amount);
    }
  };

  const unit = Number(price) || 0;

  return (
    <Wrapper>
      <Image
        alt={name}
        width={150}
        height={150}
        src={images?.[0]?.url ?? "/placeholder.png"}
      />

      {/* DELETE BUTTON */}
      <IconButton
        size="small"
        onClick={handleCartAmountChange(0)}
        sx={{ position: "absolute", right: 15, top: 15 }}
      >
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/products/${slug}`}>
          <Typography noWrap component="h3" sx={{ fontSize: 18 }}>
            {name} - {productSize}
          </Typography>
        </Link>

        {/* PRICE */}
        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Typography variant="body1" sx={{ color: "grey.600" }}>
            {currency(unit)} x {qty}
          </Typography>

          <Typography variant="h6" color="primary">
            {currency(unit * qty)}
          </Typography>
        </FlexBox>

        {/* QTY CONTROLS */}
        <FlexBox alignItems="center" gap={2}>
          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            disabled={qty === 1}
            onClick={handleCartAmountChange(qty - 1)}
          >
            <Remove fontSize="small" />
          </Button>

          <Typography variant="h6">{qty}</Typography>

          <Button
            color="primary"
            sx={{ p: "5px" }}
            variant="outlined"
            onClick={handleCartAmountChange(qty + 1)}
          >
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
}
