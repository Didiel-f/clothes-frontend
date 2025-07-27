import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// CUSTOM ICON COMPONENT
import GiftBox from "icons/GiftBox";
// GLOBAL CUSTOM COMPONENTS
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { calculateDiscount, currency } from "lib";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section12() {
  const bigDiscountList = await api.getBigDiscountList();

  const responsive = [
    { breakpoint: 1024, settings: { slidesToShow: 5 } },
    { breakpoint: 959, settings: { slidesToShow: 4 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 370, settings: { slidesToShow: 1 } }
  ];

  return (
    <SectionCreator icon={<GiftBox />} title="Big Discounts" seeMoreLink="#">
      <Carousel dots slidesToShow={6} responsive={responsive} arrowStyles={{ top: "40%" }}>
        {bigDiscountList.map(({ id, title, thumbnail, price, discount, slug }) => (
          <Box key={id} pb={1}>
            <Card className="p-1">
              <Link href={`/products/${slug}`}>
                <HoverBox borderRadius={3} mb={1}>
                  <LazyImage width={500} height={500} alt={title} src={thumbnail} />
                </HoverBox>

                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  {title}
                </Typography>

                <Typography variant="h6" color="primary">
                  {calculateDiscount(price, discount)}
                  <Box
                    component="del"
                    fontSize={12}
                    fontWeight={500}
                    color="grey.600"
                    marginInlineStart={0.5}>
                    {currency(price)}
                  </Box>
                </Typography>
              </Link>
            </Card>
          </Box>
        ))}
      </Carousel>
    </SectionCreator>
  );
}
