"use client";

import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren, useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import {
  Footer1,
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
import { Topbar, TopbarSocialLinks } from "components/topbar";
import { SearchInput, SearchInputWithCategory } from "components/search-box";
// CUSTOM DATA MODEL
import LayoutModel from "models/Layout.model";
import { Box } from "@mui/material";

// ==============================================================
interface Props extends PropsWithChildren {
  data: LayoutModel;
}
// ==============================================================

export default function ShopLayout1({ children, data }: Props) {
  const { footer, header, topbar, mobileNavigation, categories } = data;

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

        {/* <HeaderLogin /> */}
        <HeaderCart />
      </MobileHeader.Right>
    </MobileHeader>
  );

  return (
    // ⬇️ Contenedor de página que ocupa toda la altura
    <Box minHeight="100dvh" display="flex" flexDirection="column">
      {/* TOP BAR */}
      <Topbar label={topbar.label} title={topbar.title}>
        <Topbar.Right>
          <TopbarSocialLinks links={topbar.socials} />
        </Topbar.Right>
      </Topbar>

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header mobileHeader={MOBILE_VERSION_HEADER}>
          <Header.Logo url={header.logo} />
          <Header.Mid>
            <SearchInputWithCategory categories={categories} />
          </Header.Mid>
          <Header.Right>
            {/* <HeaderLogin /> */}
            <HeaderCart />
          </Header.Right>
        </Header>
      </Sticky>

      {/* NAV */}
      <Navbar
        border={1}
        elevation={0}
        navigation={<NavigationList navigation={header.navigation} />}
      />

      {/* ⬇️ Área de contenido que crece y empuja el footer */}
      <Box component="main" flexGrow={1} display="flex" flexDirection="column">
        {children}
      </Box>

      {/* MOBILE NAV (si es fixed, no afecta) */}
      <MobileNavigationBar navigation={mobileNavigation.version1} />

      {/* FOOTER */}
      <Footer1>
        <Footer1.Brand>
          <Link href="/">
            <Image src={footer.logo} alt="logo" width={105} height={50} />
          </Link>
          <Typography variant="body1" sx={{ mt: 1, mb: 3, color: "grey.900", maxWidth: 370 }}>
            {footer.description}
          </Typography>
        </Footer1.Brand>

        <Footer1.Widget1>
          <FooterLinksWidget title="Acerca de nosotros" links={footer.about} />
        </Footer1.Widget1>

        <Footer1.Contact>
          <FooterContact
            phone={footer.contact.phone}
            email={footer.contact.email}
            address={footer.contact.address}
          />
          <FooterSocialLinks links={footer.socials} />
        </Footer1.Contact>
      </Footer1>
    </Box>
  );
}
