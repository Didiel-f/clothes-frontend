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
  return (
    <div className="mb-1">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Tamaño
      </Typography>
      <div className="variant-group">
        {variants.map((variant) => {
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
              disabled={variant.stock < 1}
              color={isActive ? "primary" : "default"}
            />
          );
        })}
      </div>
    </div>
  );
}
