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
import { title } from "process";

// ===========================================================
type Props = { product: IProduct };
// ===========================================================

export default function ProductCard9({ product }: Props) {

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

        </div>
      </ContentWrapper>
    </Wrapper>
  );
}
