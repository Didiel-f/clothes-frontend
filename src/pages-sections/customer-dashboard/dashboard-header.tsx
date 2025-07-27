"use client";

import Link from "next/link";
// MUI
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
// MUI ICON COMPONENTS
import { SvgIconComponent, Menu } from "@mui/icons-material";
// GLOBAL CUSTOM COMPONENTS
import SideNav from "components/side-nav";
import FlexBox from "components/flex-box/flex-box";
import { Navigation } from "components/layouts/customer-dashboard";

// STYLED COMPONENT
const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(-2),
  marginBottom: theme.spacing(3),

  "& .header-hold": {
    flexGrow: 1,
    display: "flex",
    marginTop: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    "& .btn-link": { display: "none" },
    [theme.breakpoints.up(575)]: {
      "& .btn-link": { display: "block" }
    }
  },

  "& .btn-link": {
    display: "none",
    paddingInline: "2rem",
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down(575)]: { display: "flex", marginTop: "1rem" }
  },

  "& .right": {
    gap: "1rem",
    display: "flex",
    alignItems: "center"
  },

  "& .avatar": {
    width: 35,
    height: 35,
    backgroundColor: theme.palette.grey[200]
  },

  [theme.breakpoints.up("lg")]: {
    "& .right > div": { display: "none" }
  },

  [theme.breakpoints.down("md")]: { flexDirection: "column" }
}));

// ==============================================================

interface WithButton {
  href: string;
  title: string;
  buttonText: string;
  Icon: SvgIconComponent;
}

interface WithoutButton {
  title: string;
  href?: never;
  buttonText?: never;
  Icon: SvgIconComponent;
}

type Props = WithoutButton | WithButton;
// ==============================================================

export default function DashboardHeader({ title, buttonText, href, Icon }: Props) {
  const HEADER_LINK = (
    <Button href={href} color="primary" LinkComponent={Link} className="btn-link">
      {buttonText}
    </Button>
  );

  return (
    <StyledRoot>
      <div className="header-hold">
        <FlexBox alignItems="center" gap={1.5}>
          {Icon && (
            <Avatar variant="rounded" className="avatar">
              <Icon color="primary" />
            </Avatar>
          )}

          <Typography noWrap variant="h2">
            {title}
          </Typography>
        </FlexBox>

        {/* SHOW ONLY SMALL DEVICE */}
        <div className="right">
          <SideNav
            position="left"
            handler={(close) => (
              <IconButton onClick={close}>
                <Menu fontSize="small" />
              </IconButton>
            )}>
            <Navigation />
          </SideNav>

          {buttonText ? HEADER_LINK : null}
        </div>
      </div>

      {buttonText ? HEADER_LINK : null}
    </StyledRoot>
  );
}
