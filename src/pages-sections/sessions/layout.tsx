import { PropsWithChildren, ReactNode } from "react";
// LOCAL CUSTOM COMPONENTS
import LogoWithTitle from "./components/logo-title";
import SocialButtons from "./components/social-buttons";
// GLOBAL CUSTOM COMPONENTS
import FlexRowCenter from "components/flex-box/flex-row-center";
// COMMON STYLED COMPONENT
import { Wrapper } from "./styles";

// ==============================================================
interface Props extends PropsWithChildren {
  bottomContent: ReactNode;
}
// ==============================================================

export default function AuthLayout({ children, bottomContent }: Props) {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
      <Wrapper elevation={6}>
        {/* LOGO WITH TITLE AREA */}
        <LogoWithTitle />

        {/* FORM AREA */}
        {children}

        {/* SOCIAL BUTTON AREA */}
        <SocialButtons />

        {/* RENDER BOTTOM CONTENT BASED ON CONDITION */}
        {bottomContent}
      </Wrapper>
    </FlexRowCenter>
  );
}
