import { PropsWithChildren } from "react";
// MUI
import Card from "@mui/material/Card";
// GLOBAL CUSTOM COMPONENT
import FlexRowCenter from "components/flex-box/flex-row-center";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
      <Card elevation={3} sx={{ maxWidth: 500, padding: "2rem 3rem", width: "100%" }}>
        {children}
      </Card>
    </FlexRowCenter>
  );
}
