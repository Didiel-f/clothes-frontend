"use client";

import { Fragment, PropsWithChildren, useCallback, useState } from "react";
// GLOBAL CUSTOM COMPONENTS
import Sticky from "components/sticky";
import StickyWrapper from "components/sticky-wrapper";
import SideNavbarTwo from "components/page-sidenav/side-navbar-2";

import { CategoryList } from "components/categories";
import { MobileMenu } from "components/navbar/mobile-menu";
import { MobileNavigationBar } from "components/mobile-navigation";
import { Header, HeaderCart, HeaderLogin } from "components/header";
import { MobileHeader, HeaderSearch } from "components/header/mobile-header";
import { Topbar, TopbarSocialLinks } from "components/topbar";
import { SearchInputWithCategory, SearchInput } from "components/search-box";
// LOCAL CUSTOM COMPONENTS
import Footer from "./footer";
// CUSTOM DATA MODEL
import { Category } from "models/Common";
import LayoutModel from "models/Layout.model";

// ==============================================================
interface Props extends PropsWithChildren {
  data: LayoutModel;
  navigation: Category[];
}
// ==============================================================

export default function ShopLayout4({ children, navigation, data }: Props) {
  const { topbar, header, mobileNavigation, categories } = data;

  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);

  // SIDEBAR FOOTER LINKS
  const footerLinks = [
    { id: 1, title: "Terms", url: "/" },
    { id: 2, title: "Privacy", url: "/" },
    { id: 3, title: "Help", url: "/" }
  ];

  // SIDEBAR CONTENT
  const Sidebar = (
    <Fragment>
      <SideNavbarTwo navigation={navigation} />
      <Footer links={footerLinks} />
    </Fragment>
  );

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
    <div className="bg-white">
      {/* TOP BAR SECTION */}
      <Topbar label={topbar.label} title={topbar.title}>
        <Topbar.Right>
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
            <SearchInputWithCategory categories={categories} />
          </Header.Mid>

          <Header.Right>
            {/* HEADER LOGIN BUTTON */}
            <HeaderLogin />

            {/* HEADER CART BUTTON */}
            <HeaderCart />
          </Header.Right>
        </Header>
      </Sticky>

      {/* BODY CONTENT */}
      <StickyWrapper SideNav={Sidebar}>{children}</StickyWrapper>

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar navigation={mobileNavigation.version1} />
    </div>
  );
}
