"use client";

import { Fragment, PropsWithChildren } from "react";
// MUI
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import {
  Footer3,
  FooterContact,
  FooterCopyright,
  FooterLinksWidget,
  FooterSocialLinks
} from "components/footer";
import Sticky from "components/sticky";
import LazyImage from "components/LazyImage";
import { SearchInput } from "components/search-box";
import NavigationList from "components/navbar/nav-list";
import { MobileMenu } from "components/navbar/mobile-menu";
import { MobileNavigationBar } from "components/mobile-navigation";
import { Header, HeaderCart, HeaderLogin } from "components/header";
import { HeaderSearch, MobileHeader } from "components/header/mobile-header";
import { Topbar, TopbarSocialLinks } from "components/topbar";
// CUSTOM DATA MODEL
import LayoutModel from "models/Layout.model";

// ==============================================================
interface Props extends PropsWithChildren {
  data: LayoutModel;
  showFooter?: boolean;
  showMobileMenu?: boolean;
  centeredNavigation?: boolean;
}
// ==============================================================

export default function ShopLayout3({
  data,
  children,
  showFooter = true,
  showMobileMenu = true,
  centeredNavigation = false
}: Props) {
  const { header, topbar, footer, mobileNavigation } = data;

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
          <TopbarSocialLinks links={topbar.socials} />
        </Topbar.Right>
      </Topbar>

      {/* HEADER */}
      <Sticky fixedOn={0} scrollDistance={300}>
        <Header mobileHeader={MOBILE_VERSION_HEADER}>
          <Header.Logo url={header.logo} />

          <Header.Mid>
            <Box mr="auto" ml={centeredNavigation ? "auto" : "2rem"}>
              <NavigationList navigation={header.navigation} />
            </Box>
          </Header.Mid>

          <Header.Right>
            <HeaderLogin />
            <HeaderCart />
          </Header.Right>
        </Header>

        <Divider />
      </Sticky>

      {/* BODY CONTENT */}
      {children}

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      {showMobileMenu ? <MobileNavigationBar navigation={mobileNavigation.version1} /> : null}

      {/* FOOTER */}
      {showFooter ? (
        <Fragment>
          <Footer3>
            <Footer3.Brand>
              <Box maxWidth={100}>
                <LazyImage src={footer.logo} alt="logo" width={105} height={50} />
              </Box>

              <Typography variant="body1" sx={{ mb: 2.5, maxWidth: { xl: 400 } }}>
                {footer.description}
              </Typography>
            </Footer3.Brand>

            <Footer3.Widget1>
              <FooterLinksWidget isDark title="About Us" links={footer.about} />
            </Footer3.Widget1>

            <Footer3.Widget2>
              <FooterLinksWidget isDark title="Customer Care" links={footer.customers} />
            </Footer3.Widget2>

            <Footer3.Contact>
              <FooterContact
                color="inherit"
                phone={footer.contact.phone}
                email={footer.contact.email}
                address={footer.contact.address}
              />
            </Footer3.Contact>
          </Footer3>

          <FooterCopyright>
            <FooterSocialLinks variant="dark" links={footer.socials} />
          </FooterCopyright>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
