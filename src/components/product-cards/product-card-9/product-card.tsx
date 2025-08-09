import Link from "next/link";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
// LOCAL CUSTOM COMPONENTS
import DiscountChip from "../discount-chip";
import ProductPrice from "../product-price";
import ProductTags from "./components/tags";
import FavoriteButton from "./components/favorite-button";
// STYLED COMPONENT
import { ContentWrapper, Wrapper } from "./styles";
import { IProduct } from "models/Product.model";
import { getEffectiveDiscount } from "lib";

// ===========================================================
type Props = { product: IProduct };
// ===========================================================


export default function ProductCard9({ product }: Props) {
  const discount = getEffectiveDiscount(product);
  const img = product.images?.[0]?.url ?? "/placeholder.png";
  const name = product.name ?? product.slug ?? "Producto";
  const alt = product.images?.[0]?.alternativeText ?? name;

  return (
    <Wrapper>
      <FavoriteButton />
      <ContentWrapper>
        <div className="img-wrapper">
          {discount > 0 && <DiscountChip discount={discount} />}
          <LazyImage src={img} alt={alt} width={500} height={500} />
        </div>
        <div className="content">
          <ProductTags tags={["Bike", "Motor", "Ducati"]} />
          <Link href={`/products/${product.slug}`}>
            <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>
              {name}
            </Typography>
          </Link>
          <ProductPrice price={product.price} discount={discount} />
        </div>
      </ContentWrapper>
    </Wrapper>
  );
}

