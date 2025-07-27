"use client";

import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";
// LOCAL CUSTOM COMPONENT
import HeaderCategoryDropdown from "./header-category-dropdown";
// STYLED COMPONENTS
import { HeaderWrapper, StyledContainer } from "./styles";

// ==============================================================
interface Props {
  className?: string;
  children?: ReactNode;
  mobileHeader: ReactNode;
}
// ==============================================================

export default function Header({ className, children, mobileHeader }: Props) {
  return (
    <HeaderWrapper className={clsx(className)}>
      <StyledContainer>
        <div className="main-header">{children}</div>
        <div className="mobile-header">{mobileHeader}</div>
      </StyledContainer>
    </HeaderWrapper>
  );
}

function HeaderLeft({ children }: PropsWithChildren) {
  return (
    <FlexBox minWidth={100} alignItems="center">
      {children}
    </FlexBox>
  );
}

Header.Logo = ({ url }: { url: string }) => {
  return (
    <HeaderLeft>
      <Link href="/">
        <LazyImage src={url} alt="logo" width={105} height={50} />
      </Link>
    </HeaderLeft>
  );
};

Header.CategoryDropdown = ({ children }: PropsWithChildren) => {
  return (
    <HeaderLeft>
      <HeaderCategoryDropdown>{children}</HeaderCategoryDropdown>
    </HeaderLeft>
  );
};

Header.Mid = ({ children }: PropsWithChildren) => {
  return children;
};

Header.Right = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};
