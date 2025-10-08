// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import MockAdapter from "axios-mock-adapter";
import * as db from "./data";
import navbarNavigation from "data/navbarNavigation";
import { categoryMenus } from "data/navigations";

export const LayoutEndpoints = (Mock: MockAdapter) => {
  Mock.onGet("/api/layout").reply(() => {
    try {
      return [
        200,
        {
          footer: {
            logo: "/assets/images/logo-black.png",
            contact: db.footerContact,
            about: db.footerAboutLinks,
            socials: db.footerSocialLinks,
            description: db.footerDescription,
            customers: db.footerCustomerCareLinks
          },
          mobileNavigation: {
            version1: db.mobileNavigation,
            version2: db.mobileNavigationTwo,
            logo: "/assets/images/z-logo.png"
          },
          topbar: {
            label: "GRATIS",
            title: "Envío express gratis a partir de $100.000",
            socials: db.topbarSocialLinks,
            languageOptions: db.languageOptions
          },
          header: {
            categories: db.categories,
            categoryMenus: categoryMenus,
            navigation: navbarNavigation,
            logo: "/assets/images/logo.png"
          }
        }
      ];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
