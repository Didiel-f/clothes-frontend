import Link from "next/link";
import Card from "@mui/material/Card";
// CUSTOM ICON COMPONENT
import CategoryIcon from "icons/Category";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
// LOCAL CUSTOM COMPONENT
import TopCategoriesCard from "../shared/top-categories-card";
// API FUNCTIONS
import api from "utils/__api__/market-1";

export default async function Section3() {
  const categories = await api.getTopCategories();

  const responsive = [
    { breakpoint: 959, settings: { slidesToShow: 2 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } }
  ];

  return (
    <SectionCreator seeMoreLink="#" title="Top Categories" icon={<CategoryIcon color="primary" />}>
      <Carousel slidesToShow={3} responsive={responsive}>
        {categories.map((item) => (
          <Link href={`/products/search?category=${item.slug}`} key={item.id}>
            <Card elevation={6} className="p-1">
              <TopCategoriesCard
                title={item.name}
                imgUrl={item.image!}
                subtitle={item.description!}
              />
            </Card>
          </Link>
        ))}
      </Carousel>
    </SectionCreator>
  );
}
