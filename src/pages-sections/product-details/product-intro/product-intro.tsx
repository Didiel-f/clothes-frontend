"use client"
// MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
import ProductGallery from "./product-gallery";
import ProductVariantSelector from "./product-variant-selector";
import { SizeGuideTable } from "../size-guide";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import { StyledRoot } from "./styles";
// CUSTOM DATA MODEL
import { IProduct, IVariant } from "models/Product.model";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductDescription from "../product-description";
// GOOGLE ANALYTICS
import { trackViewItem } from "utils/analytics";
// CUSTOM HOOKS
import { useSizeGuide } from "hooks/useSizeGuide";

// ================================================================
type Props = { product: IProduct };
// ================================================================

export default function ProductIntro({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | undefined>(undefined)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const hasStock = product.variants.some(variant => variant.stock > 0);
  
  // Obtener guías de tallas basadas en la marca del producto
  const { sizeGuides, loading: sizeGuideLoading } = useSizeGuide(product.brand?.slug);

  // 📊 Google Analytics: Trackear vista del producto
  useEffect(() => {
    trackViewItem(product, selectedVariant);
  }, [product, selectedVariant]);

  return (
    <StyledRoot>
      <Grid container spacing={3} justifyContent="space-around">
        {/* IMAGE GALLERY AREA */}
        {product.images && (<Grid size={{ lg: 5, md: 7, xs: 12 }}>
          <ProductGallery images={product.images!} />
        </Grid>)}

        {/* PRODUCT INFO AREA */}
        <Grid size={{ lg: 6, md: 5, xs: 12 }}>
          {/* PRODUCT NAME */}
          <Typography variant="h1" sx={{ mb: 1 }}>
            {product.name}
          </Typography>

          {/* PRODUCT BRAND */}
          {product.brand && (
            <p className="brand">
              Marca:{" "}
              <Link href={`/products/search?brand=${product.brand.slug}`} >
                <strong className="underline">{product.brand.name}</strong>
              </Link>
            </p>
          )}

          {/* PRODUCT CATEGORY */}
          {product.category && (
            <p className="brand">
              Categoría:{" "}
              <Link href={`/products/search?category=${product.category.slug}`}>
                <strong>{product.category.name}</strong>
              </Link>
            </p>
          )}


          {/* PRODUCT VARIANTS */}
          <ProductVariantSelector selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} variants={product.variants} />

          {/* SIZE GUIDE BUTTON */}
          {sizeGuides.length > 0 && (
            <div className="my-3">
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setSizeGuideOpen(true)}
                disabled={sizeGuideLoading}
              >
                📏 Ver guía de tallas
              </Button>
            </div>
          )}

          {/* PRICE & STOCK */}
          <div className="price">
            <Typography variant="h2" sx={{ color: "primary.main", mb: 0.5, lineHeight: 1 }}>
              {currency(product.price)}
            </Typography>

            {hasStock
              ? (
                <Chip 
                  label="Stock Disponible" 
                  color="success" 
                  size="small" 
                  variant="outlined"
                />
              )
              : (
                <Chip 
                  label="Agotado" 
                  color="error" 
                  size="small" 
                  variant="filled"
                />
              )
            }
          </div>

          {/* ADD TO CART BUTTON */}
          <AddToCart hasStock={hasStock} product={product} selectedVariant={selectedVariant} />
          <ProductDescription description={product.shortDescription} />
        </Grid>
      </Grid>

      {/* SIZE GUIDE DIALOG */}
      <Dialog 
        open={sizeGuideOpen} 
        onClose={() => {
          setSizeGuideOpen(false);
          setActiveTab(0); // Reset al cerrar
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Guía de Tallas
          <IconButton
            aria-label="cerrar"
            onClick={() => {
              setSizeGuideOpen(false);
              setActiveTab(0);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {sizeGuides.length > 1 && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs 
                value={activeTab} 
                onChange={(_, newValue) => setActiveTab(newValue)}
                centered
              >
                {sizeGuides.map((guide, index) => (
                  <Tab 
                    key={index} 
                    label={guide.target === 'adults' ? 'Adultos' : 'Niños'} 
                  />
                ))}
              </Tabs>
            </Box>
          )}
          
          {sizeGuides[activeTab] && <SizeGuideTable guide={sizeGuides[activeTab]} />}
        </DialogContent>
      </Dialog>
    </StyledRoot>
  );
}
