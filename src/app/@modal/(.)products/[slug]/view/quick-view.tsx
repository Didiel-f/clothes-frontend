"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import Close from "@mui/icons-material/Close";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import FlexBox from "components/flex-box/flex-box";
// LOCAL CUSTOM HOOKS
import useCart from "hooks/useCart";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =====================================================
type Props = { product: Product };
// =====================================================

export default function ProductQuickView({ product }: Props) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const { dispatch } = useCart();

  const handleAddToCart = () => {
    setLoading(true);

    setTimeout(() => {
      dispatch({ type: "CHANGE_CART_AMOUNT", payload: { ...product, qty: 1 } });
      setLoading(false);
    }, 500);
  };

  return (
    <Dialog open maxWidth={false} onClose={router.back} sx={{ zIndex: 1501, boxShadow: 5 }}>
      <DialogContent sx={{ maxWidth: 900, width: "100%" }}>
        <div>
          <Grid container spacing={3}>
            <Grid size={{ md: 6, xs: 12 }}>
              <Carousel
                slidesToShow={1}
                arrowStyles={{
                  boxShadow: 0,
                  color: "primary.main",
                  backgroundColor: "transparent"
                }}>
                {product.images!.map((item: string, index: number) => (
                  <Box
                    key={index}
                    src={item}
                    component="img"
                    alt="product"
                    sx={{
                      mx: "auto",
                      width: "100%",
                      objectFit: "contain",
                      height: { sm: 400, xs: 250 }
                    }}
                  />
                ))}
              </Carousel>
            </Grid>

            <Grid alignSelf="center" size={{ md: 6, xs: 12 }}>
              <Typography
                variant="body1"
                sx={{ color: "grey.500", textTransform: "uppercase", textDecoration: "underline" }}>
                {product.categories[0] || "Cosmetic"}
              </Typography>

              <Typography variant="h2" sx={{ pt: 1, pb: 2, lineHeight: 1 }}>
                {product.title}
              </Typography>

              <Typography variant="h1" color="primary">
                {currency(product.price)}
              </Typography>

              <FlexBox alignItems="center" gap={1} mt={2}>
                <Rating size="small" color="warn" value={4} readOnly />
                <Typography variant="h6" lineHeight="1">
                  (50)
                </Typography>
              </FlexBox>

              <Typography variant="body1" sx={{ my: 2 }}>
                {product?.description ||
                  "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus liberpuro ate vol faucibus adipiscing."}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Button
                size="large"
                color="dark"
                variant="contained"
                loading={isLoading}
                onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </div>

        <IconButton onClick={router.back} sx={{ position: "absolute", top: 3, right: 3 }}>
          <Close fontSize="small" color="secondary" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}
