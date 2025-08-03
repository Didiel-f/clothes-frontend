"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, PropsWithChildren, useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import {
  Footer1,
  FooterApps,
  FooterContact,
  FooterLinksWidget,
  FooterSocialLinks
} from "components/footer";
import Sticky from "components/sticky";
import { CategoryList } from "components/categories";
import { Navbar, NavigationList } from "components/navbar";
import { MobileMenu } from "components/navbar/mobile-menu";
import { MobileNavigationBar } from "components/mobile-navigation";
import { Header, HeaderCart, HeaderLogin } from "components/header";
import { MobileHeader, HeaderSearch } from "components/header/mobile-header";
import { Topbar, TopbarLanguageSelector, TopbarSocialLinks } from "components/topbar";
import { SearchInput, SearchInputWithCategory } from "components/search-box";
// CUSTOM DATA MODEL
import LayoutModel from "models/Layout.model";

// ==============================================================
interface Props extends PropsWithChildren {
  data: LayoutModel;
}
// ==============================================================

export default function ShopLayout1({ children, data }: Props) {
  const { footer, header, topbar, mobileNavigation } = data;

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
      {/* TOP BAR SECTION */}
      <Topbar label={topbar.label} title={topbar.title}>
        <Topbar.Right>
          { //<TopbarLanguageSelector languages={topbar.languageOptions} />
          }
          <TopbarSocialLinks links={topbar.socials} />
        </Topbar.Right>
      </Topbar>

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header mobileHeader={MOBILE_VERSION_HEADER}>
          <Header.Logo url={header.logo} />

          {isFixed ? (
            <Header.CategoryDropdown>
              <CategoryList categories={header.categoryMenus} />
            </Header.CategoryDropdown>
          ) : null}

          <Header.Mid>
            <SearchInputWithCategory categories={header.categories} />
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
      <Navbar
        border={1}
        elevation={0}
        navigation={<NavigationList navigation={header.navigation} />}
        categories={<CategoryList categories={header.categoryMenus} />}
      />

      {/* BODY CONTENT */}
      {children}

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar navigation={mobileNavigation.version1} />

      {/* FOOTER SECTION */}
      <Footer1>
        <Footer1.Brand>
          <Link href="/">
            <Image src={footer.logo} alt="logo" width={105} height={50} />
          </Link>

          <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "grey.500", maxWidth: 370 }}>
            {footer.description}
          </Typography>

          <FooterApps playStoreUrl={footer.playStoreUrl} appleStoreUrl={footer.appStoreUrl} />
        </Footer1.Brand>

        <Footer1.Widget1>
          <FooterLinksWidget title="About Us" links={footer.about} />
        </Footer1.Widget1>

        <Footer1.Widget2>
          <FooterLinksWidget title="Customer Care" links={footer.customers} />
        </Footer1.Widget2>

        <Footer1.Contact>
          <FooterContact
            phone={footer.contact.phone}
            email={footer.contact.email}
            address={footer.contact.address}
          />

          <FooterSocialLinks links={footer.socials} />
        </Footer1.Contact>
      </Footer1>
    </Fragment>
  );
}
