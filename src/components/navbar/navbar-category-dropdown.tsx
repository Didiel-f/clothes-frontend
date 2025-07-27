"use client";

import { PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import { CategoryMenu } from "components/categories";
// CUSTOM ICON COMPONENT
import Category from "icons/Category";
import ChevronRight from "icons/ChevronRight";
// STYLED COMPONENT
import { CategoryMenuButton } from "./styles";

export default function NavbarCategoryDropdown({ children }: PropsWithChildren) {
  return (
    <CategoryMenu
      render={(handler) => (
        <CategoryMenuButton variant="text" onClick={(e) => handler(e)}>
          <div className="prefix">
            <Category fontSize="small" className="icon" />
            <Typography variant="h6">Categories</Typography>
          </div>

          <ChevronRight className="dropdown-icon" fontSize="small" />
        </CategoryMenuButton>
      )}>
      {children}
    </CategoryMenu>
  );
}
