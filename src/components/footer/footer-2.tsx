import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENTS
import FooterApps from "./footer-apps";
import FooterSocialLinks from "./footer-social-links";
// STYLED COMPONENTS
import { StyledFooter, StyledLink } from "./styles";
// CUSTOM DATA
import { footerSocialLinks, footerCustomerCareLinks, footerDescription } from "data/layout-data";

// ==============================================================
interface Props {
  bgColor?: string;
  color?: "light" | "dark";
}
// ==============================================================

export default function Footer2({ bgColor = "#141850", color = "dark" }: Props) {
  return (
    <StyledFooter sx={{ backgroundColor: bgColor }}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Link href="/">
            <Image
              alt="logo"
              width={105}
              height={50}
              src="/assets/images/logo.svg"
              style={{ marginBottom: "1.25rem" }}
            />
          </Link>

          <Typography
            variant="body1"
            sx={{ mb: 2.5, maxWidth: 370, color: color === "dark" ? "grey.500" : "white" }}>
            {footerDescription}
          </Typography>

          <FooterApps appleStoreUrl="#" playStoreUrl="#" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          {/* CUSTOMER CARE LINKS */}
          <div className="links">
            {footerCustomerCareLinks.map(({ title, url }) => (
              <StyledLink isDark={color === "light"} href={url} key={title}>
                {title}
              </StyledLink>
            ))}
          </div>

          {/* SOCIAL LINKS WITH ICON */}
          <FooterSocialLinks links={footerSocialLinks} />
        </Grid>
      </Grid>
    </StyledFooter>
  );
}
