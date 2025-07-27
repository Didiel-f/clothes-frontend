import { PropsWithChildren } from "react";
// MUI
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";

export default function FooterCopyright({ children }: PropsWithChildren) {
  return (
    <div className="bg-white">
      <Box component={Divider} pt={{ md: 8, xs: 3 }} />

      <Container>
        <FlexBetween pt={2} pb={{ sm: 10, md: 2 }}>
          <p>© {new Date().getFullYear()} By UI Lib. All rights reserved.</p>
          {children}
        </FlexBetween>
      </Container>
    </div>
  );
}
