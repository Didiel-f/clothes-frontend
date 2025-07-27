import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import FlexRowCenter from "components/flex-box/flex-row-center";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// ======================================================
interface Props {
  price: number;
  title: string;
  imgUrl: string;
  rating: number;
  reviewCount?: number;
}
// ======================================================

export default function TopRatingProductCard(props: Props) {
  const { title, price, imgUrl, rating = 5, reviewCount = 10 } = props;

  return (
    <div>
      <HoverBox mb={2} mx="auto" borderRadius={3}>
        <LazyImage
          alt={title}
          width={380}
          height={380}
          src={imgUrl}
          style={{ objectFit: "contain", objectPosition: "center center" }}
        />
      </HoverBox>

      <FlexRowCenter mb={1} gap={0.5}>
        <Rating size="small" value={rating} color="warn" readOnly />
        <Typography component="small" sx={{ fontSize: 12 }}>
          ({reviewCount})
        </Typography>
      </FlexRowCenter>

      <Typography
        noWrap
        variant="body1"
        sx={{ fontWeight: 500, marginBottom: 0.5, textAlign: "center" }}>
        {title}
      </Typography>

      <Typography
        noWrap
        variant="body1"
        color="primary"
        sx={{ fontWeight: 500, textAlign: "center" }}>
        {currency(price)}
      </Typography>
    </div>
  );
}
