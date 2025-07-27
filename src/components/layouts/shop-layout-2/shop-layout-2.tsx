"use client";

import { Fragment, PropsWithChildren, ReactNode, useCallback, useState } from "react";
import Divider from "@mui/material/Divider";
// GLOBAL CUSTOM COMPONENTS
import Sticky from "components/sticky";
import { SearchInput } from "components/search-box";
import { CategoryList } from "components/categories";
import { MobileMenu } from "components/navbar/mobile-menu";
import { Header, HeaderCart, HeaderLogin } from "components/header";
import { MobileHeader, HeaderSearch } from "components/header/mobile-header";
import { Topbar, TopbarLanguageSelector, TopbarSocialLinks } from "components/topbar";
// CUSTOM DATA MODEL
import LayoutModel from "models/Layout.model";

// ==============================================================
interface LayoutProps extends PropsWithChildren {
  data: LayoutModel;
  navbar?: ReactNode;
}
// ==============================================================

export default function ShopLayout2({ children, navbar, data }: LayoutProps) {
  const { header, topbar, mobileNavigation } = data;

  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);

  const MOBILE_VERSION_HEADER = (
    <MobileHeader>
      <MobileHeader.Left>
        <MobileMenu navigation={header.navigation} />
      </MobileHeader.Left>

      <MobileHeader.Logo logoUrl={mobileNavigation.logo} />

      <MobileHeader.Right>
        <HeaderSearch>
          <SearchInput />
        </HeaderSearch>

        <HeaderLogin />
        <HeaderCart />
      </MobileHeader.Right>
    </MobileHeader>
  );

  return (
    <Fragment>
      {/* TOP BAR AREA */}
      <Topbar label={topbar.label} title={topbar.title}>
        <Topbar.Right>
          <TopbarLanguageSelector languages={topbar.languageOptions} />
          <TopbarSocialLinks links={topbar.socials} />
        </Topbar.Right>
      </Topbar>

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={70}>
        <Header mobileHeader={MOBILE_VERSION_HEADER}>
          <Header.Logo url={header.logo} />

          {isFixed ? (
            <Header.CategoryDropdown>
              <CategoryList categories={header.categoryMenus} />
            </Header.CategoryDropdown>
          ) : null}

          <Header.Mid>
            <SearchInput />
          </Header.Mid>

          <Header.Right>
            {/* HEADER LOGIN BUTTON */}
            <HeaderLogin />

            {/* HEADER CART BUTTON */}
            <HeaderCart />
          </Header.Right>
        </Header>
      </Sticky>

      {/* NAVIGATION BAR */}
      {navbar ?? <Divider />}

      {/* BODY CONTENT */}
      {children}
    </Fragment>
  );
}
