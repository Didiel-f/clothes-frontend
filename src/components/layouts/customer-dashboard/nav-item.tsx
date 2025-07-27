"use client";

import { usePathname } from "next/navigation";
// MUI ICON COMPONENTS
import CreditCard from "@mui/icons-material/CreditCard";
import SupportAgent from "@mui/icons-material/SupportAgent";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
// STYLED COMPONENTS
import { StyledLink } from "./styles";

const icons = {
  CreditCard,
  SupportAgent,
  PlaceOutlined,
  PersonOutlined,
  FavoriteBorder,
  ShoppingBagOutlined
};

// ==============================================================
interface Item {
  icon: string;
  href: string;
  title: string;
  count?: number;
}
// ==============================================================

export default function NavItem({ item }: { item: Item }) {
  const { href, icon, title, count } = item;

  const pathname = usePathname();
  const Icon = icons[icon as keyof typeof icons];

  return (
    <StyledLink href={href} key={title} isActive={pathname === href}>
      <div className="title">
        <Icon color="inherit" fontSize="small" className="nav-icon" />
        <span>{title}</span>
      </div>

      {count ? <span>{count}</span> : null}
    </StyledLink>
  );
}
