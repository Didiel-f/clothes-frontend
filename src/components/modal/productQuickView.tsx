"use client";

import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton, Grid, Box, Typography, Divider } from "@mui/material";
import Button from "@mui/material/Button";

import { Carousel } from "components/carousel";
import { currency } from "lib";
import { IProduct } from "models/Product.model";

type Props = {
    open: boolean;
    onClose: () => void;
    onViewProduct: () => void;
    product: IProduct;
};

export default function ProductQuickView({ open, onClose, product, onViewProduct }: Props) {

    return (
        <Dialog open={open} onClose={onClose} maxWidth={false} sx={{ zIndex: 1501, boxShadow: 5 }}>
            <DialogContent sx={{ maxWidth: 900, width: "100%" }}>
                <IconButton onClick={onClose} sx={{ position: "absolute", top: 3, right: 3 }}>
                    <Close fontSize="small" color="secondary" />
                </IconButton>
                <div>
                    <Grid container spacing={3}>
                        <Grid size={{ md: 6, xs: 12 }}>
                            <Carousel
                                slidesToShow={1}
                                infinite={false}
                                arrowStyles={{
                                    boxShadow: 0,
                                    color: "primary.main",
                                    backgroundColor: "transparent"
                                }}>
                                {product?.images?.map((item) => (
                                    <Box
                                        key={item.documentId}
                                        src={item.url}
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
                                {product?.category?.name || ""}
                            </Typography>

                            <Typography variant="h2" sx={{ pt: 1, pb: 2, lineHeight: 1 }}>
                                {product?.name}
                            </Typography>

                            <Typography variant="h1" color="primary">
                                {currency(product?.price)}
                            </Typography>

                            <Typography variant="body1" sx={{ my: 2 }}>
                                {product?.shortDescription || ""}
                            </Typography>

                            <Divider sx={{ mb: 2 }} />

                            <Button
                                size="large"
                                color="dark"
                                variant="contained"
                                onClick={onViewProduct}    
                            >
                                Ver producto
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
        </Dialog>
    );
}
