"use client";

import Badge from "@mui/material/Badge";
import IconComponent from "components/IconComponent";
// STYLED COMPONENTS
import { StyledNavLink, Wrapper } from "./styles";
// CUSTOM DATA MODEL
import { MobileNavItem } from "models/Layout.model";
import { useCartStore } from "contexts/CartContext";

// ==============================================================
type Props = { navigation: MobileNavItem[] };
// ==============================================================

export default function MobileNavigationBar({ navigation }: Props) {
  const { cart } = useCartStore();

  return (
    <Wrapper>
      {navigation.map(({ icon, href, title, badge }) => (
        <StyledNavLink href={href} key={title}>
          {badge ? (
            <Badge badgeContent={cart.length} color="primary">
              <IconComponent icon={icon} fontSize="small" className="icon" />
            </Badge>
          ) : (
            <IconComponent icon={icon} fontSize="small" className="icon" />
          )}

          {title}
        </StyledNavLink>
      ))}
    </Wrapper>
  );
}
