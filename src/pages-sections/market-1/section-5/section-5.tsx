import Link from "next/link";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
// CUSTOM ICON COMPONENT
import NewArrival from "icons/NewArrival";
// GLOBAL CUSTOM COMPONENTS
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import { SectionCreator } from "components/section-header";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section5() {
  const newArrivalsList = await api.getNewArrivalList();

  return (
    <SectionCreator icon={<NewArrival />} title="New Arrivals" seeMoreLink="#">
      <Card className="p-1">
        <Grid container spacing={3}>
          {newArrivalsList.map(({ id, title, price, thumbnail, slug }) => (
            <Grid size={{ lg: 2, md: 3, sm: 4, xs: 6 }} key={id}>
              <Link href={`/products/${slug}`}>
                <HoverBox borderRadius={3} mb={2}>
                  <LazyImage width={180} height={180} alt={title} src={thumbnail} />
                </HoverBox>

                <Typography noWrap variant="body1" sx={{ mb: 0.5, fontWeight: 500 }}>
                  {title}
                </Typography>

                <Typography variant="h6" color="primary">
                  {currency(price)}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Card>
    </SectionCreator>
  );
}
