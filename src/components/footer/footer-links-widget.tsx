import { Fragment } from "react";
// STYLED COMPONENTS
import { Heading, StyledLink } from "./styles";

// ==============================================================
interface Props {
  isDark?: boolean;
  title: string;
  links: { title: string; url: string }[];
}
// ==============================================================

export default function FooterLinksWidget({ isDark, links, title }: Props) {
  return (
    <Fragment>
      <Heading>{title}</Heading>

      {links.map((item, ind) => (
        <StyledLink isDark={isDark} href={item.url} key={ind}>
          {item.title}
        </StyledLink>
      ))}
    </Fragment>
  );
}
