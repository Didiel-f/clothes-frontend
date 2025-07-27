import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// MUI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// GLOBAL CUSTOM COMPONENT
import OverlayScrollbar from "components/overlay-scrollbar";
// ICON COMPONENTS
import Icons from "icons/duotone";
import ChevronRight from "icons/ChevronRight";
// DATA TYPES
import { CategoryMenuItem, CategoryMenuItemWithChild } from "models/Navigation.model";
// STYLED COMPONENTS
import {
  Wrapper,
  StyledCard,
  CategoryList,
  MenusContainer,
  SubCategoryList,
  CategoryListItem,
  SubCategoryListItem
} from "./styles";

// ===============================================================
interface Props {
  title: string;
  menuList: CategoryMenuItem[];
}
// ===============================================================

export default function CategoryBasedMenu({ title, menuList }: Props) {
  const [selected, setSelected] = useState(menuList[0].title);

  const list = menuList.reduce<string[]>((prev, curr) => [...prev, curr.title], []);
  const childList = menuList.find((item) => item.title === selected);

  return (
    <Wrapper>
      <div className="menu-title">
        {title} <KeyboardArrowDown className="icon" />
      </div>

      <MenusContainer className="menu-list">
        <StyledCard>
          {/* MAIN CATEGORIES SECTION */}
          <CategoryList>
            {list.map((name) => (
              <CategoryListItem
                key={name}
                active={selected === name}
                onMouseEnter={() => setSelected(name)}>
                <span>{name}</span>
                <ChevronRight fontSize="small" className="icon" />
              </CategoryListItem>
            ))}
          </CategoryList>

          {/* SUB / CHILD CATEGORIES SECTION */}
          <SubChildList subChildren={childList!} />
        </StyledCard>
      </MenusContainer>
    </Wrapper>
  );
}

// ==============================================================
type SubChildListProps = { subChildren: CategoryMenuItem };
// ==============================================================

function SubChildList({ subChildren }: SubChildListProps) {
  return (
    <OverlayScrollbar sx={{ width: "100%" }}>
      <Box px={6} py={2} height="100%">
        {subChildren.child.map((item, key) => (
          <div key={key}>
            {/* NAV / CATEGORY TITLE */}
            <Typography variant="h6" sx={{ my: 3 }}>
              {item.title}
            </Typography>

            {/* NAV LIST ITEM / CATEGORY LIST ITEM */}
            <SubCategoryList>
              {item.child!.map((sub, key) => (
                <SubChildItem item={sub} key={key} />
              ))}
            </SubCategoryList>
          </div>
        ))}
      </Box>
    </OverlayScrollbar>
  );
}

// ==============================================================
type SubChildItemProps = { item: CategoryMenuItemWithChild };
// ==============================================================

function SubChildItem({ item }: SubChildItemProps) {
  const { title, url = "/", icon, img } = item;

  const Icon = icon ? Icons[icon as keyof typeof Icons] : null;

  return (
    <Link href={url}>
      <SubCategoryListItem>
        {img ? (
          <Avatar className="sub-item-avatar">
            <Image alt={title} src={img} fill sizes="(max-width: 768px) 100vw, 100vw" />
          </Avatar>
        ) : null}

        {Icon ? <Icon sx={{ fontSize: 16 }} /> : null}
        {title}
      </SubCategoryListItem>
    </Link>
  );
}
