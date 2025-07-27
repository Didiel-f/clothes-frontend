"use client";

import { styled } from "@mui/material/styles";

export const BannerRoot = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  alignItems: "center",
  ":hover .banner-img": { transform: "scale(1.1)" },
  "& .banner-img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    transition: "all 4s cubic-bezier(0, 0, 0.1, 1)"
  },
  "& .content": {
    zIndex: 2,
    maxWidth: 380,
    marginLeft: "2rem",
    padding: "4rem 2rem",
    position: "relative",
    "& .title": {
      fontWeight: 600,
      lineHeight: 1.3,
      fontSize: "2.3rem"
    },
    "& .badge": {
      color: "white",
      padding: "5px 10px",
      display: "inline-block",
      backgroundColor: theme.palette.primary.main
    },
    "& .price": {
      fontSize: 20,
      fontWeight: 600,
      marginBlock: "1.5rem",
      del: {
        fontSize: 16,
        marginLeft: 8,
        fontWeight: 400,
        color: theme.palette.grey[300]
      }
    }
  }
}));

export const BannerWrapper = styled("div")(() => ({
  height: "100%",
  display: "flex",
  borderRadius: 12,
  overflow: "hidden",
  position: "relative",
  alignItems: "center",
  ":hover .banner-img": { transform: "scale(1.1)" },
  "& .banner-img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    transition: "all 4s cubic-bezier(0, 0, 0.1, 1)"
  },
  "& .ban-content": {
    minHeight: 380,
    position: "relative",
    zIndex: 2,
    padding: "3rem 2rem",
    textAlign: "center",
    width: "100%",
    height: "100%",
    "& .title": {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1,
      marginBottom: "2rem"
    }
  }
}));
