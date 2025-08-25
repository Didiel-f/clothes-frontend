import { ReactNode } from "react";
import { Public_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

export const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

import "overlayscrollbars/overlayscrollbars.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ThemeProvider from "theme/theme-provider";
import SettingsProvider from "contexts/SettingContext";
import RTL from "components/rtl";
import ProgressBar from "components/progress";

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* ⬇️ Columna flex de alto completo */}
      <body
  id="body"
  className={publicSans.className}
  style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}
>
  <SettingsProvider>
    <ThemeProvider>
      <ProgressBar />
      <RTL>
        {modal}
        {/* ⬅️ main crece y empuja el footer */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>
      </RTL>
    </ThemeProvider>
  </SettingsProvider>

  <GoogleAnalytics gaId="G-XKPD36JXY0" />
</body>

    </html>
  );
}
