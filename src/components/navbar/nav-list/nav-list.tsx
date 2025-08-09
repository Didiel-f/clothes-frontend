"use client";

import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import { NavLink } from "components/nav-link";
import FlexBox from "components/flex-box/flex-box";

import NavItemChild from "./nav-item-child";

import { NAV_LINK_STYLES, ChildNavListWrapper } from "../styles";
import { Menu, MenuItemWithChild } from "models/Navigation.model";

// ==============================================================
type Props = { navigation: Menu[] };
// ==============================================================

export default function NavigationList({ navigation }: Props) {
  const renderNestLevel = (children: MenuItemWithChild[]) => {
    return children.map((nav) => {
      if (nav.child) {
        return (
          <NavItemChild nav={nav} key={nav.title}>
            {renderNestLevel(nav.child)}
          </NavItemChild>
        );
      }

      return (
        <NavLink href={nav.url!} key={nav.title}>
          <MenuItem>{nav.title}</MenuItem>
        </NavLink>
      );
    });
  };

  const renderRootLevel = (list: Menu[]) => {
    return list.map((nav) => {
      if (nav.child && nav.child.length > 0) {
        return (
          <FlexBox
            key={nav.title}
            alignItems="center"
            position="relative"
            flexDirection="column"
            sx={{ "&:hover": { "& > .child-nav-item": { display: "block" } } }}>
            <NavLink href={nav.url!}>
              <FlexBox alignItems="center" gap={0.3} sx={NAV_LINK_STYLES}>
                {nav.title}
                <KeyboardArrowDown sx={{ color: "grey.500", fontSize: "1.1rem" }} />
              </FlexBox>
            </NavLink>

            <ChildNavListWrapper className="child-nav-item">
              <Card elevation={5} sx={{ mt: 2.5, py: 1, minWidth: 100, overflow: "unset" }}>
                {renderNestLevel(nav.child)}
              </Card>
            </ChildNavListWrapper>
          </FlexBox>
        );
      }

      // SIN HIJOS → solo muestra el link directo
      return (
        <NavLink href={nav.url!} key={nav.title}>
          <FlexBox alignItems="center" sx={NAV_LINK_STYLES}>
            {nav.title}
          </FlexBox>
        </NavLink>
      );
    });
  };

  return <FlexBox gap={4}>{renderRootLevel(navigation)}</FlexBox>;
}
