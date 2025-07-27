import { Fragment } from "react";
import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import NavItem from "./nav-item";
// STYLED COMPONENTS
import { MainContainer } from "./styles";
// API FUNCTIONS
import { getNavigation } from "utils/__api__/user-dashboard";

export default async function Navigation() {
  const navigation = await getNavigation();

  if (!navigation) return null;

  return (
    <MainContainer>
      {navigation.map((item) => (
        <Fragment key={item.title}>
          <Typography
            variant="body1"
            sx={{
              fontSize: 12,
              color: "grey.600",
              padding: "26px 30px 1rem",
              textTransform: "uppercase"
            }}>
            {item.title}
          </Typography>

          {item.list.map((listItem) => (
            <NavItem item={listItem} key={listItem.title} />
          ))}
        </Fragment>
      ))}
    </MainContainer>
  );
}
