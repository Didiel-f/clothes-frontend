"use client";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { IVariant } from "models/Product.model";

type Props = {
  variants: IVariant[],
  selectedVariant: IVariant | undefined,
  setSelectedVariant: (variant: IVariant | undefined) => void
};

export default function ProductVariantSelector({ variants, selectedVariant, setSelectedVariant }: Props) {
  // Filtrar solo las variantes que tienen stock
  const availableVariants = variants.filter(variant => variant.stock > 0);
  
  // Si no hay variantes disponibles, no mostrar el selector
  if (availableVariants.length === 0) {
    return null;
  }

  return (
    <div className="mb-1">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Tamaño
      </Typography>
      <div className="variant-group">
        {availableVariants.map((variant) => {
          const { documentId, shoesSize, clotheSize, isShoe } = variant
          const variantNameLowerCase = isShoe ? shoesSize?.toUpperCase() : clotheSize?.toUpperCase();
          const isActive = selectedVariant?.documentId === documentId

          return (
            <Chip
              key={documentId}
              label={variantNameLowerCase}
              size="small"
              variant="outlined"
              onClick={() => setSelectedVariant(variant)}
              color={isActive ? "primary" : "default"}
            />
          );
        })}
      </div>
    </div>
  );
}
