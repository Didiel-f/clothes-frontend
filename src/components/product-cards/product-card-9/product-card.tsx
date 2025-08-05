import Link from "next/link";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import DiscountChip from "../discount-chip";
import ProductPrice from "../product-price";
import ProductTags from "./components/tags";
import AddToCartButton from "./components/add-to-cart";
import FavoriteButton from "./components/favorite-button";
// STYLED COMPONENT
import { ContentWrapper, Wrapper } from "./styles";
import { IProduct, IVariant } from "models/Product.model";
import { title } from "process";
import { useState } from "react";
import AddToCart from "../product-card-1/add-to-cart";

// ===========================================================
type Props = { product: IProduct };
// ===========================================================

export default function ProductCard9({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | undefined>(undefined)
  const hasStock = product.variants.some(variant => variant.stock > 0);

  return (
    <Wrapper>
      {/* PRODUCT FAVORITE BUTTON */}
      <FavoriteButton />

      <ContentWrapper>
        <div className="img-wrapper">
          {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
          <DiscountChip discount={20} />

          {/* PRODUCT IMAGE / THUMBNAIL */}
          <LazyImage src={product.images[0].url} alt={title} width={500} height={500} />
        </div>

        <div className="content">
          <div>
            {/* PRODUCT TAG LIST */}
            <ProductTags tags={["Bike", "Motor", "Ducati"]} />

            {/* PRODUCT TITLE / NAME */}
            <Link href={`/products/${product.slug}`}>
              <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>
                {title}
              </Typography>
            </Link>

            {/* PRODUCT PRICE */}
            <ProductPrice price={product.price} discount={20} />
          </div>

          {/* PRODUCT ADD TO CART BUTTON */}
          <AddToCart hasStock={hasStock} product={product} selectedVariant={selectedVariant} />
        </div>
      </ContentWrapper>
    </Wrapper>
  );
}
