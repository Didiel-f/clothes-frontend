import { ReactNode } from "react";
import { Public_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

export const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

import "overlayscrollbars/overlayscrollbars.css";
// SLICK CAROUSEL CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// THEME PROVIDER
import ThemeProvider from "theme/theme-provider";
// PRODUCT CART PROVIDER
// SITE SETTINGS PROVIDER
import SettingsProvider from "contexts/SettingContext";
// GLOBAL CUSTOM COMPONENTS
import RTL from "components/rtl";
import ProgressBar from "components/progress";

// IMPORT i18n SUPPORT FILE
import "i18n";

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="body" className={publicSans.className}>
          <SettingsProvider>
            <ThemeProvider>
              <ProgressBar />
              <RTL>
                {modal}
                {children}
              </RTL>
            </ThemeProvider>
          </SettingsProvider>

        <GoogleAnalytics gaId="G-XKPD36JXY0" />
      </body>
    </html>
  );
}
